import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStringMap } from '@shared/';
import { IGalleryUrlQuery } from 'main/routes/Path';

import { IGalleryState, IItemsLoadedActionPayload } from './GalleryItemState';

const initialState: IGalleryState = {
    images: [],
    loadingMeta: {
        pageIdx: 0
    }
}

export const galleryItemSlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {

        newQuery(state, action: PayloadAction<IGalleryUrlQuery>): IGalleryState {
            return {
                images: [],
                loadingMeta: {
                    pageIdx: 0,
                    query: { ...action.payload }
                }
            };
        },

        itemsLoaded(state: IGalleryState, action: PayloadAction<IItemsLoadedActionPayload>): IGalleryState {
            const imageIds: IStringMap<any> = {};
            state.images.forEach(img => imageIds[img.id] = null);
            const newImages = action.payload.images.filter(img => imageIds[img.id] === undefined);
            return {
                ...state,
                images: [...state.images, ...newImages],
                loadingMeta: {
                    ...state.loadingMeta,
                    limit: { ...action.payload.limit }
                }
            };
        },

        loadNextPage(state): IGalleryState {
            return {
                ...state,
                loadingMeta: {
                    ...state.loadingMeta,
                    pageIdx: state.loadingMeta.pageIdx + 1
                }
            };
        },

        loadingErrors(state, action: PayloadAction<string[]>): IGalleryState {
            return {
                ...state,
                errors: [...action.payload]
            };
        },

        setPreview(state, action: PayloadAction<number | undefined>): IGalleryState {
            return {
                ...state,
                previewIdx: action.payload
            };
        },

        previewMove(state, action: PayloadAction<'prev' | 'next'>): IGalleryState {

            if (state.previewIdx === undefined) {
                return state;
            }

            const nextPreviewIdx = action.payload === 'prev' && state.previewIdx > 0
                ? state.previewIdx - 1
                : action.payload === 'next' && state.previewIdx < state.images.length
                    ? state.previewIdx + 1
                    : state.previewIdx;

            return {
                ...state,
                previewIdx: nextPreviewIdx
            };
        },

    }
});
