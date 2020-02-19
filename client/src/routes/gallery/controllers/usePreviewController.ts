import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/Store';

import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { IGalleryState } from '../redux/GalleryItemState';


export interface IUsePreviewControllerProps {
    perPageLimit: number;
}

export interface IUsePreviewControllerResult {
    previewIdx: number | undefined;
    previewPrevHandler: () => void;
    previewNextHandler: () => void;
}

export const usePreviewController = (props: IUsePreviewControllerProps): IUsePreviewControllerResult => {
    const dispatch = useDispatch();
    const { loadingMeta, images, previewIdx } = useSelector<RootState, IGalleryState>(rootState => rootState.galleryItems);

    const hasMorePages = loadingMeta?.limit === undefined ||
        Math.max(loadingMeta.limit.giphyPages, loadingMeta.limit.pixabayPages) > (loadingMeta?.pageIdx || 0);

    const previewPrevHandler = () => {
        dispatch(galleryItemSlice.actions.previewMove('prev'));
    }

    const previewNextHandler = () => {
        if (images.length > (previewIdx || 0) + props.perPageLimit && hasMorePages) {
            dispatch(galleryItemSlice.actions.loadNextPage());
        }
        dispatch(galleryItemSlice.actions.previewMove('next'));
    }

    return {
        previewIdx,
        previewPrevHandler,
        previewNextHandler,
    };
};
