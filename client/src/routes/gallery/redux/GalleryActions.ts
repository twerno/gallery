import { IGalleryUrlQuery } from 'routes/Path';

import { IPreviewGiphyImg, IPreviewPixabyImg } from './GalleryState';

export const GalleryQueryChangeAction = 'GalleryQueryChangeAction'
export const GalleryImagesLoadedAction = 'GalleryImagesLoadedAction'
export const GalleryLoadMoreAction = 'GallertLoadMoreAction';
export const GalleryLoadingErrors = 'GalleryLoadingErrors';
export const GallerySetPreview = 'GallerySetPreview';

export type GALLERY_ACTION_TYPE =
    typeof GalleryQueryChangeAction
    | typeof GalleryImagesLoadedAction
    | typeof GalleryLoadMoreAction
    | typeof GallerySetPreview
    ;

export interface IGalleryChangeQueryAction {
    type: typeof GalleryQueryChangeAction;
    data: {
        query: IGalleryUrlQuery;
    }
}


export interface IGalleryImagesLoadedAction {
    type: typeof GalleryImagesLoadedAction;
    data: {
        images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
        limit: {
            pixabayPages: number;
            giphyPages: number;
        }
    }
}

export interface IGallertLoadMoreAction {
    type: typeof GalleryLoadMoreAction;
}

export interface IGallerySetErrorAction {
    type: typeof GalleryLoadingErrors;
    data: {
        errors: string[];
    }
}

export interface IGallerySetPreviewAction {
    type: typeof GallerySetPreview;
    data: {
        previewIdx?: number;
    };
}

export type GalleryActions = IGalleryChangeQueryAction
    | IGalleryImagesLoadedAction
    | IGallertLoadMoreAction
    | IGallerySetErrorAction
    | IGallerySetPreviewAction
    ;
