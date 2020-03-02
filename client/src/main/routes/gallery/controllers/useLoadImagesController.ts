import { Path } from 'main/routes/Path';
import { RootState } from 'main/store/RootReducer';
import { useIsObsolete } from 'main/utils/ComponentHelper';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IGalleryUrlQuery } from '../model/galleryQuery';
import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { IGalleryState, IPreviewImg } from '../redux/GalleryItemState';
import LoadImagesControllerHelper from './LoadImagesControllerHelper';
import ImagesRpcService from '../rpcService/ImagesRpcService';

export interface IUseLoadPagesProps {
    query: IGalleryUrlQuery;
    perPageLimit: number;
}

export interface IUseLoadPagesResult {
    images: IPreviewImg[];
    pageIdx?: number;
    hasMorePages: boolean;
    isLoading: boolean;
    errors: string[] | undefined;
    loadMoreHandler: () => void;
    searchUpdateHandler: (newSearch: IGalleryUrlQuery) => void;
}

export const useLoadImagesController = (props: IUseLoadPagesProps): IUseLoadPagesResult => {
    /**
     * counter of pending promises used to determined if there is an active loading
     * counter is being reseted on every query change (promise become obsolete)
     */
    const [pendingPromisesCounter, setPendingPromisesCounter] = React.useState<number>(0);

    /**
     * Redux state
     */
    const { loadingMeta, errors, images } = useSelector<RootState, IGalleryState>(rootState => rootState.galleryItems);
    const dispatch = useDispatch();

    /**
     * helper for async actions to determined if action is being resolved in valid context
     * when context changes (param was updated or component was unmounted), isObsolete will return true
     */
    const { isObsolete, updateParam } = useIsObsolete(props.query);

    /**
     * on query change, update local state and dispatch new query to redux store
     */
    React.useEffect(() => {
        updateParam(props.query);
        setPendingPromisesCounter(0);
        dispatch(galleryItemSlice.actions.newQuery(props.query));
    }, [props.query.q]);

    /**
     * handle on change of redux store loading meta obj by triggering new rpc request
     */
    React.useEffect(() => {
        asyncLoadImageData();
    }, [loadingMeta.query?.q, loadingMeta.pageIdx]);

    /**
     * rpc request 
     */
    const asyncLoadImageData = () => {
        const queryParams = LoadImagesControllerHelper.buildImagesAPIGetQuery(props, loadingMeta);

        setPendingPromisesCounter(state => state + 1);
        ImagesRpcService.search(queryParams, props)
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


    const hasMorePages =
        loadingMeta?.limit === undefined // not loaded yet
        || Math.max(loadingMeta.limit.giphyPages, loadingMeta.limit.pixabayPages) > (loadingMeta?.pageIdx || 0);

    const loadMoreHandler = () => {
        dispatch(galleryItemSlice.actions.loadNextPage());
    };

    const history = useHistory();
    const searchUpdateHandler = (search: IGalleryUrlQuery) => {
        if (isObsolete(search)) { return; }
        if (errors && errors.length > 0) {
            asyncLoadImageData();
        }

        history.push(Path.galleryUrl(search));
    }

    return {
        images,
        errors,

        pageIdx: loadingMeta?.pageIdx,
        isLoading: pendingPromisesCounter > 0,
        hasMorePages,

        loadMoreHandler,
        searchUpdateHandler,
    };
};
