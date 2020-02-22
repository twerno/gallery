import { IImageQueryParams, ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel } from '@shared/';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGalleryUrlQuery } from 'main/routes/Path';
import { RootState } from 'main/store/RootReducer';
import { useIsMounted } from 'main/utils/ComponentHelper';

import { PaginatorHelper } from '../helpers/Paginators';
import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { IGalleryState, IGalleryStateMeta, IPreviewImg } from '../redux/GalleryItemState';
import { apiImagesQueryGet } from './ApiImagesQueryGet';
import { store } from 'main/store/Store';

export interface IUseLoadPagesProps {
    query: IGalleryUrlQuery;
    perPageLimit: number;
}

export interface IUseLoadPagesResult {
    images: (IPreviewImg)[];
    pageIdx?: number;
    hasMorePages: boolean;
    isLoading: boolean;
    errors: string[] | undefined;
    triggerRefreshManually: () => void;
}

interface ILoadImagesControllerMutableState {
    query?: IGalleryUrlQuery;
    loadingsNo: number;
}

export const useLoadImagesController = (props: IUseLoadPagesProps): IUseLoadPagesResult => {
    const { isMounted } = useIsMounted();

    const { loadingMeta, errors, images } = useSelector<RootState, IGalleryState>(rootState => rootState.galleryItems);
    const dispatch = useDispatch();

    const isValid = () => isMounted() && loadingMeta?.query?.q === mutableState.current.query?.q;

    const mutableState = React.useRef<ILoadImagesControllerMutableState>({
        query: { q: undefined }, loadingsNo: 0
    });

    // reset state when query changes
    React.useEffect(() => {
        dispatch(galleryItemSlice.actions.newQuery(props.query));
        mutableState.current.query = props.query;
        mutableState.current.loadingsNo = 0;
    }, [props.query.q]);

    // load data from the server on state change
    React.useEffect(() => {
        if (loadingMeta.query?.q === undefined) { return };
        asyncLoadMore(props, loadingMeta, mutableState, isValid, dispatch);
    }, [loadingMeta.query?.q, loadingMeta.pageIdx]);

    const hasMorePages = loadingMeta?.limit === undefined ||
        Math.max(loadingMeta.limit.giphyPages, loadingMeta.limit.pixabayPages) > (loadingMeta?.pageIdx || 0);

    const isLoading: boolean = mutableState.current.loadingsNo > 0;

    // 
    const triggerRefreshManually = () => {
        if (!isValid() || loadingMeta.query?.q === undefined) { return };
        asyncLoadMore(props, loadingMeta, mutableState, isValid, dispatch);
    }

    return {
        images,
        hasMorePages,
        pageIdx: loadingMeta?.pageIdx,
        isLoading,
        errors,
        triggerRefreshManually,
    };
};

function computeLimit(providers: (ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[], imagesPerPage: number) {
    const limit = {
        pixabayPages: 0,
        giphyPages: 0,
    };

    providers.map(provider => {
        if (provider.imgProvider === 'pixabay') {
            limit.pixabayPages = PaginatorHelper.computeTotalPixabayPages(provider, imagesPerPage);
        }
        else if (provider.imgProvider === 'giphy') {
            limit.giphyPages = PaginatorHelper.computeTotalGiphyPages(provider, imagesPerPage);
        }
    });

    return limit;
}

function getApiImagesQueryParams(props: IUseLoadPagesProps, loadingMeta: IGalleryStateMeta): IImageQueryParams {
    const pageIdx: number = loadingMeta.pageIdx;

    const pageOffset = (maxPagesNo: number | undefined) => maxPagesNo == undefined
        ? 0
        : maxPagesNo > pageIdx
            ? pageIdx
            : undefined;


    return {
        q: loadingMeta?.query?.q,
        pixabay_offset: pageOffset(loadingMeta.limit?.pixabayPages) + '',
        giphy_offset: pageOffset(loadingMeta.limit?.giphyPages) + '',
        perPageLimit: props.perPageLimit + '',
        services: 'both'
    };
}

function asyncLoadMore(
    props: IUseLoadPagesProps,
    loadingMeta: IGalleryStateMeta,
    mutableState: React.MutableRefObject<ILoadImagesControllerMutableState>,
    isValid: () => boolean,
    dispatch: React.Dispatch<any>,
) {
    const queryParams = getApiImagesQueryParams(props, loadingMeta);

    mutableState.current.loadingsNo++;
    apiImagesQueryGet(queryParams)
        .then(val => {
            // promise is not longer valid -- return
            if (!isValid()) { return; }

            const images = mapImages(val.data.providers);
            const limit = computeLimit(val.data.providers, props.perPageLimit);

            mutableState.current.loadingsNo--;
            dispatch(galleryItemSlice.actions.itemsLoaded({ images, limit }));
        })
        .catch(err => {
            // promise is not longer valid -- return
            if (!isValid()) { return; }

            let errors: string[];
            if (typeof err.message === 'string') {
                errors = [err.message];
            }
            else {
                errors = [err.toString()];
            }

            mutableState.current.loadingsNo = 0;
            dispatch(galleryItemSlice.actions.loadingErrors(errors));
        });
}

function mapImages(providers: (ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[]) {
    return providers
        .map<(IPreviewImg)[]>(provider =>
            provider.imgProvider === 'pixabay'
                ? provider.hits.map(img => ({ imgProvider: provider.imgProvider, ...img }))
                : provider.imgProvider === 'giphy'
                    ? provider.data.map(img => ({ imgProvider: provider.imgProvider, ...img }))
                    : []
        )
        .reduce((prev, curr) => [...prev, ...curr], []);
}