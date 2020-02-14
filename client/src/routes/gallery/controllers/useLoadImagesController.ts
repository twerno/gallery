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
import { useIsMounted, useRefresh } from 'utils/ComponentHelper';
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
    /**
     * 
     */
    triggerRealoadManually: () => void;
}

interface ILoadImagesControllerMutableState {
    pixabyPaginator: PixabyPaginator;
    giphyPaginator: GiphyPaginator;
    loadedPages: INumberMap<boolean>;
    query: IGalleryUrlQuery;
    loadingsNo: number;
    pageIdx: number;
}

export const useLoadImagesController = (props: IUseLoadPagesProps): IUseLoadPagesResult => {
    const [errors, setErrors] = React.useState<string[]>([]);
    const [pages, setPages] = React.useState<Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>[]>([]);
    const doRefresh = useRefresh();
    const { isMounted } = useIsMounted();

    const mutableState = React.useRef<ILoadImagesControllerMutableState>(initState(props));

    // reset state after query change
    React.useEffect(() => {
        resetState(mutableState, setPages, setErrors);
        mutableState.current.query.q = props.query.q;
    }, [props.query.q]);

    const triggerRealoadManually = () => {
        asyncLoadNextPage(props, mutableState, setPages, doRefresh, setErrors, isMounted);
    }

    // load data from the server
    React.useEffect(() => {
        triggerRealoadManually();
    }, [props.query.q, mutableState.current.pageIdx]);

    const hasMorePages = mutableState.current.pixabyPaginator.hasMorePages(mutableState.current.pageIdx)
        || mutableState.current.giphyPaginator.hasMorePages(mutableState.current.pageIdx);

    const isLoading: boolean = mutableState.current.loadingsNo > 0;

    const loadNextPageHandler = () => {
        mutableState.current.pageIdx++;
        doRefresh();
    };

    return {
        hasMorePages,
        pageIdx: mutableState.current.pageIdx,
        pages,
        loadNextPageHandler,
        isLoading,
        errors,
        triggerRealoadManually
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
        loadingsNo: 0,
        pageIdx: 0
    };
}

function getApiImagesQueryUrl(props: IUseLoadPagesProps, state: ILoadImagesControllerMutableState): string {
    const pageIdx: number = state.pageIdx;

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
    setPages: React.Dispatch<React.SetStateAction<(ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[][]>>,
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
): void {
    setPages([]);
    setErrors([]);

    const currentState = mutableState.current;
    currentState.giphyPaginator.clear();
    currentState.pixabyPaginator.clear();
    currentState.loadedPages = {};
    currentState.loadingsNo = 0;
    currentState.pageIdx = 0;

    // clearing query will break promise resolution
    // currentState.query.q = undefined;
}

function asyncLoadNextPage(
    props: IUseLoadPagesProps,
    mutableState: React.MutableRefObject<ILoadImagesControllerMutableState>,
    setPages: React.Dispatch<React.SetStateAction<(ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[][]>>,
    doRefresh: () => void,
    setErrors: React.Dispatch<React.SetStateAction<string[]>>,
    isMounted: () => boolean
) {
    // the page is already loaded -- return
    if (mutableState.current.loadedPages[mutableState.current.pageIdx] === true) { return; }
    mutableState.current.loadedPages[mutableState.current.pageIdx] = true;

    setErrors([]);

    const url = getApiImagesQueryUrl(props, mutableState.current);

    mutableState.current.loadingsNo++;
    axios.get<IImageQueryRespBody>(url)
        .then(val => {
            // promise is not longer valid -- return
            if (!isMounted() || props.query.q !== mutableState.current.query.q) { return; }

            setPages((prevState) => [...prevState, val.data.providers]);
            initPaginators(
                val.data,
                mutableState.current.pixabyPaginator,
                mutableState.current.giphyPaginator
            );
        })
        .catch(err => {
            // promise is not longer valid -- return
            if (!isMounted() || props.query.q !== mutableState.current.query.q) { return; }

            resetState(mutableState, setPages, setErrors);
            if (typeof err.message === 'string') {
                setErrors([err.message]);
            }
            else {
                setErrors([err.toString()]);
            }
        })
        .finally(() => {
            // promise is not longer valid -- return
            if (!isMounted() || props.query.q !== mutableState.current.query.q) { return; }

            mutableState.current.loadingsNo--;

            // force refresh manually; changing loadingsNo does not trigger refresh
            doRefresh();
        });
}
