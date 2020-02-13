import {
    IImageQueryParams,
    IImageQueryRespBody,
    ILocalGiphyGetImageReturnModel,
    ILocalPixabayGetImageReturnModel,
    INumberMap,
} from '@shared/';
import axios from 'axios';
import * as React from 'react';
import { IGalleryUrlQuery } from 'routes/Path';
import { useRefresh } from 'utils/ComponentHelper';
import RouteUtils from 'utils/RouteUtils';

import { GiphyPaginator, PixabyPaginator } from '../helpers/Paginators';

export interface IUseLoadPagesProps {
    perPageLimit: number;
    query: IGalleryUrlQuery;
}

export interface IUseLoadPagesResult {
    pageIdx: number;
    pages: Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>[];
    hasMorePages: boolean;
    loadNextPageHandler: () => void;
    isLoading: boolean;
    errors: string[];
}

interface ILoadImagesControllerMutableState {
    pixabyPaginator: PixabyPaginator;
    giphyPaginator: GiphyPaginator;
    loadedPages: INumberMap<boolean>;
    query: IGalleryUrlQuery;
    loadingsNo: number;
}

export const useLoadImagesController = (props: IUseLoadPagesProps): IUseLoadPagesResult => {
    const [pageIdx, setPageIdx] = React.useState(0);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [pages, setPages] = React.useState<Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>[]>([]);
    const doRefresh = useRefresh();

    const mutableState = React.useRef<ILoadImagesControllerMutableState>(initState(props));

    // reset state after query change
    React.useEffect(() => {
        resetState(mutableState, setPageIdx, setPages, setErrors);
        mutableState.current.query.q = props.query.q;
    }, [props.query.q]);

    // load data from the server
    React.useEffect(() => {
        asyncLoadNextPage(props, mutableState, pageIdx, pages, setPages, doRefresh, setErrors, setPageIdx);
    }, [props.query.q, pageIdx]);

    const hasMorePages = mutableState.current.pixabyPaginator.hasMorePages(pageIdx)
        || mutableState.current.giphyPaginator.hasMorePages(pageIdx);

    const isLoading: boolean = mutableState.current.loadingsNo > 0;

    const loadNextPageHandler = () => {
        setPageIdx(pageIdx + 1);
    };

    return {
        hasMorePages,
        pageIdx,
        pages,
        loadNextPageHandler,
        isLoading,
        errors
    };
};

function initPaginators(data: IImageQueryRespBody, pixabyPaginator: PixabyPaginator, giphyPaginator: GiphyPaginator) {
    data.providers.map(provider => {
        provider.imgProvider === 'pixabay'
            ? pixabyPaginator.computeTotalPages(provider)
            : provider.imgProvider === 'giphy'
                ? giphyPaginator.computeTotalPages(provider)
                : null;
    });
}

function initState(props: IUseLoadPagesProps): ILoadImagesControllerMutableState {
    return {
        giphyPaginator: new GiphyPaginator(props.perPageLimit),
        pixabyPaginator: new PixabyPaginator(props.perPageLimit),
        query: { ...props.query },
        loadedPages: {},
        loadingsNo: 0
    };
}

function getApiImagesQueryUrl(pageIdx: number, props: IUseLoadPagesProps, state: ILoadImagesControllerMutableState): string {

    const queryParams: IImageQueryParams = {
        q: props.query.q,
        pixabay_offset: state.pixabyPaginator.hasMorePages(pageIdx) ? pageIdx + '' : undefined,
        giphy_offset: state.giphyPaginator.hasMorePages(pageIdx) ? pageIdx + '' : undefined,
        perPageLimit: props.perPageLimit + '',
        services: 'both'
    };

    return `/api/images/query${RouteUtils.makeQueryFromMap(queryParams)}`;
}

function resetState(
    mutableState: React.MutableRefObject<ILoadImagesControllerMutableState>,
    setPageIdx: React.Dispatch<React.SetStateAction<number>>,
    setPages: React.Dispatch<React.SetStateAction<(ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[][]>>,
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
): void {
    setPageIdx(0);
    setPages([]);
    setErrors([]);

    const currentState = mutableState.current;
    currentState.giphyPaginator.clear();
    currentState.pixabyPaginator.clear();
    currentState.loadedPages = {};
    currentState.query.q = undefined;
    currentState.loadingsNo = 0;
}

function asyncLoadNextPage(
    props: IUseLoadPagesProps,
    mutableState: React.MutableRefObject<ILoadImagesControllerMutableState>,
    pageIdx: number,
    pages: (ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[][],
    setPages: React.Dispatch<React.SetStateAction<(ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[][]>>,
    refresh: () => void,
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    setPageIdx: React.Dispatch<React.SetStateAction<number>>,
) {
    // the page is already loaded -- return
    if (mutableState.current.loadedPages[pageIdx] === true) { return; }
    mutableState.current.loadedPages[pageIdx] = true;

    const url = getApiImagesQueryUrl(pageIdx, props, mutableState.current);

    mutableState.current.loadingsNo++;
    axios.get<IImageQueryRespBody>(url)
        .then(val => {
            // promise is not longer valid -- return
            if (props.query.q !== mutableState.current.query.q) { return; }

            setPages([...pages, val.data.providers]);
            initPaginators(
                val.data,
                mutableState.current.pixabyPaginator,
                mutableState.current.giphyPaginator
            );
        })
        .catch(err => {
            resetState(mutableState, setPageIdx, setPages, setErrors);
            if (typeof err.message === 'string') {
                setErrors([err.message]);
            }
            else {
                setErrors([err.toString()]);
            }
        })
        .finally(() => {
            // promise is not longer valid -- return
            if (props.query.q !== mutableState.current.query.q) { return; }

            mutableState.current.loadingsNo--;

            // force refresh manually; changing loadingsNo does not refresh it   
            refresh();
        });
}
