import {
    GalleryActions,
    GalleryImagesLoadedAction,
    GalleryLoadingErrors,
    GalleryLoadMoreAction,
    GalleryQueryChangeAction,
    GallerySetPreview,
} from './GalleryActions';
import { IGalleryState } from './GalleryState';

const initialState: IGalleryState = {
    images: [],
    loadingMeta: {
        pageIdx: 0
    }
};

export function galleryReducer(
    state = initialState,
    action: GalleryActions
): IGalleryState {
    switch (action.type) {

        case GalleryQueryChangeAction:
            return {
                images: [],
                loadingMeta: {
                    query: { ...action.data.query },
                    pageIdx: 0,
                    limit: undefined
                }
            }

        case GalleryImagesLoadedAction:
            return {
                ...state,
                images: [...state.images, ...action.data.images],
                loadingMeta: {
                    ...state.loadingMeta,
                    limit: action.data.limit,
                },
                errors: undefined
            }

        case GalleryLoadMoreAction:
            return {
                ...state,
                loadingMeta: {
                    ...state.loadingMeta,
                    pageIdx: state.loadingMeta.pageIdx + 1
                },
                errors: undefined
            }

        case GalleryLoadingErrors:
            return {
                ...state,
                errors: [...action.data.errors]
            }

        case GallerySetPreview:
            return {
                ...state,
                previewIdx: action.data.previewIdx
            }

        default:
            return state
    }
}