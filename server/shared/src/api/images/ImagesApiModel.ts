import { IGiphyGetImageReturnModel } from './GiphyApiModel';
import { IPixabayGetImageReturnModel } from './PixabayApiModel';

export type IImageQueryParams = {
    q?: string;
    pixabay_offset?: string;
    giphy_offset?: string;
    perPageLimit: string;
    services: 'giphy' | 'pixabay' | 'both';
    [key: string]: any; // hack to satisfy express.Params
}

export interface IImageQueryRespBody {
    providers: (ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[];
}

export interface ILocalPixabayGetImageReturnModel extends IPixabayGetImageReturnModel {
    imgProvider: 'pixabay'
}

export interface ILocalGiphyGetImageReturnModel extends IGiphyGetImageReturnModel {
    imgProvider: 'giphy'
}
