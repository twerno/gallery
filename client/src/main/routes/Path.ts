import RouteUtils from 'main/utils/RouteUtils';
import { IGalleryUrlQuery } from './gallery/model/galleryQuery';

export const Path = {
    homeRoute: '/',
    homeUrl() { return this.homeRoute },

    galleryRoute: '/gallery/search',
    galleryUrl(query: IGalleryUrlQuery) { return RouteUtils.makeUrl(this.galleryRoute, null, query) },

};
