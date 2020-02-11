import RouteUtils from 'utils/RouteUtils';

export const Path = {
    homeRoute: '/',
    homeUrl() { return this.homeRoute },

    galleryRoute: '/gallery/search/:query',
    galleryUrl(query: string) { return RouteUtils.makeUrl(this.galleryRoute, { query }) },

};
