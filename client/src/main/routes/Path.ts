import RouteUtils from 'main/utils/RouteUtils';

export interface IGalleryUrlQuery {
    q: string | undefined;
}

export const Path = {
    homeRoute: '/',
    homeUrl() { return this.homeRoute },

    galleryRoute: '/gallery/search',
    galleryUrl(query: IGalleryUrlQuery) { return RouteUtils.makeUrl(this.galleryRoute, null, query) },

};
