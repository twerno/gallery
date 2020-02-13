import { IGiphyGetImageReturnModel } from './GiphyApiModel';
import { IPixabayGetImageReturnModel } from './PixabayApiModel';

export interface IImageQueryParams {
    q: string | undefined;
    pixabay_offset: string | undefined;
    giphy_offset: string | undefined;
    perPageLimit: string;
    services: 'giphy' | 'pixabay' | 'both';
}

export interface IImageQueryRespBody {
    providers: Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>;
}

export interface ILocalPixabayGetImageReturnModel extends IPixabayGetImageReturnModel {
    imgProvider: 'pixabay'
}

export interface ILocalGiphyGetImageReturnModel extends IGiphyGetImageReturnModel {
    imgProvider: 'giphy'
}
