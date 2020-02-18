import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { galleryItemSlice } from 'routes/gallery/redux/GalleryItemSlice';

const rootReducer = combineReducers({
    galleryItems: galleryItemSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer
});
