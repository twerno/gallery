import { combineReducers } from '@reduxjs/toolkit';
import { galleryItemSlice } from 'main/routes/gallery/redux/GalleryItemSlice';

const rootReducers = combineReducers({
    galleryItems: galleryItemSlice.reducer,
});

export default rootReducers;

export type RootState = ReturnType<typeof rootReducers>