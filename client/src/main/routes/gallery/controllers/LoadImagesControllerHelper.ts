import { ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel, IImagesApiSearchQuery } from "@shared/";

import { IPreviewImg, IGalleryStateMeta } from "../redux/GalleryItemState";
import { IUseLoadPagesProps } from "./useLoadImagesController";
import { PaginatorHelper } from "../helpers/Paginators";

export default {

    mapImages,
    computeLimit,
    getApiImagesQueryParams,
}

function mapImages(providers: (ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[]) {
    return providers
        .map<(IPreviewImg)[]>(provider =>
            provider.imgProvider === 'pixabay'
                ? provider.hits.map(img => ({ imgProvider: provider.imgProvider, ...img }))
                : provider.imgProvider === 'giphy'
                    ? provider.data.map(img => ({ imgProvider: provider.imgProvider, ...img }))
                    : []
        )
        .reduce((prev, curr) => [...prev, ...curr], []);
}

function getApiImagesQueryParams(props: IUseLoadPagesProps, loadingMeta: IGalleryStateMeta): IImagesApiSearchQuery {
    const pageIdx: number = loadingMeta.pageIdx;

    const pageOffset = (maxPagesNo: number | undefined) => maxPagesNo == undefined
        ? 0
        : maxPagesNo > pageIdx
            ? pageIdx
            : undefined;

    return {
        q: loadingMeta?.query?.q,
        pixabay_offset: pageOffset(loadingMeta.limit?.pixabayPages) + '',
        giphy_offset: pageOffset(loadingMeta.limit?.giphyPages) + '',
        perPageLimit: props.perPageLimit + '',
        services: undefined
    };
}

function computeLimit(providers: (ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[], imagesPerPage: number) {
    const limit = {
        pixabayPages: 0,
        giphyPages: 0,
    };

    providers.map(provider => {
        if (provider.imgProvider === 'pixabay') {
            limit.pixabayPages = PaginatorHelper.computeTotalPixabayPages(provider, imagesPerPage);
        }
        else if (provider.imgProvider === 'giphy') {
            limit.giphyPages = PaginatorHelper.computeTotalGiphyPages(provider, imagesPerPage);
        }
    });

    return limit;
}