import { IGiphyGetImageReturnModel } from './GiphyApiModel';
import { IPixabayGetImageReturnModel } from './PixabayApiModel';

export type IImagesApiSearchQuery = {
    q?: string;
    pixabay_offset?: string;
    giphy_offset?: string;
    perPageLimit: string;
    services?: 'giphy' | 'pixabay';
    [key: string]: any; // hack to satisfy express.Params
}

export interface IImagesApiSearchRespBody {
    providers: (ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel)[];
}

export interface ILocalPixabayGetImageReturnModel extends IPixabayGetImageReturnModel {
    imgProvider: 'pixabay'
}

export interface ILocalGiphyGetImageReturnModel extends IGiphyGetImageReturnModel {
    imgProvider: 'giphy'
}
