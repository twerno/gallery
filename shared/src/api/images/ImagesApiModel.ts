import { IMap } from '../../utils/IMap';
import { IGiphyGetImageReturnModel } from './GiphyApiModel';
import { IPixabayGetImageReturnModel } from './PixabayApiModel';

export interface IImageQueryParams extends IMap<string> {
    q: string;
    offset: string;
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
