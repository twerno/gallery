import { IImagesApiSearchQuery } from '@shared/';
import { RootState } from 'main/store/RootReducer';
import { useIsObsolete } from 'main/utils/ComponentHelper';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGalleryUrlQuery } from '../model/galleryQuery';
import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { IGalleryState, IPreviewImg } from '../redux/GalleryItemState';
import { imagesApiSearchGet } from './ApiImagesQueryGet';
import LoadImagesControllerHelper from './LoadImagesControllerHelper';

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

export const useLoadImagesController = (props: IUseLoadPagesProps): IUseLoadPagesResult => {
    /**
     * counter of pending promises used to determined if there is an active loading
     * counter is reset on every query change (promise become obsolete)
     */
    const [pendingPromisesCounter, setPendingPromisesCounter] = React.useState<number>(0);

    /**
     * Redux state
     */
    const { loadingMeta, errors, images } = useSelector<RootState, IGalleryState>(rootState => rootState.galleryItems);
    const dispatch = useDispatch();

    /**
     * helper for async actions to determined if action is being resolved in valid context
     * is context change (param is updated or component unmounted) isObsolete returns true
     */
    const { isObsolete, updateParam } = useIsObsolete(props.query);

    /**
     * effects to be executed on query change
     * reseting state and updating param, 
     * handling of all current pending promises will be terminated
     */
    React.useEffect(() => {
        updateParam(props.query);
        setPendingPromisesCounter(0);
        dispatch(galleryItemSlice.actions.newQuery(props.query));
    }, [props.query.q]);

    /**
     * effect that is in control of loading data
     * triggers on changes in loadingMeta object from redux state
     */
    React.useEffect(() => {
        // if (loadingMeta.query?.q === undefined) { return };
        asyncLoadImageData();
    }, [loadingMeta.query?.q, loadingMeta.pageIdx]);

    const asyncLoadImageData = () => {
        const queryParams = LoadImagesControllerHelper.getApiImagesQueryParams(props, loadingMeta);

        setPendingPromisesCounter(state => state + 1);
        asyncLoadImageDataAndMapResponse(queryParams, props)
            .then(payload => {
                if (isObsolete(props.query)) { return; }

                setPendingPromisesCounter(state => state - 1);
                dispatch(galleryItemSlice.actions.itemsLoaded(payload));
            })
            .catch(errors => {
                if (isObsolete(props.query)) { return; }

                setPendingPromisesCounter(0);
                dispatch(galleryItemSlice.actions.loadingErrors(errors));
            });
    }

    const hasMorePages = loadingMeta?.limit === undefined ||
        Math.max(loadingMeta.limit.giphyPages, loadingMeta.limit.pixabayPages) > (loadingMeta?.pageIdx || 0);

    // 
    const triggerRefreshManually = () => {
        if (isObsolete(props.query)) { return };
        asyncLoadImageData();
    }

    return {
        images,
        errors,

        pageIdx: loadingMeta?.pageIdx,
        isLoading: pendingPromisesCounter > 0,
        hasMorePages,

        triggerRefreshManually,
    };
};

async function asyncLoadImageDataAndMapResponse(
    queryParams: IImagesApiSearchQuery,
    props: IUseLoadPagesProps,
) {
    return imagesApiSearchGet(queryParams)
        .then(val => {
            const images = LoadImagesControllerHelper.mapImages(val.data.providers);
            const limit = LoadImagesControllerHelper.computeLimit(val.data.providers, props.perPageLimit);

            return { images, limit };
        })
        .catch(err => {
            let errors: string[];
            if (typeof err.message === 'string') {
                errors = [err.message];
            }
            else {
                errors = [err.toString()];
            }

            throw errors;
        });
}