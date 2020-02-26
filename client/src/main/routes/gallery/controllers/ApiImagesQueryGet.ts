import { IImagesApiSearchQuery, IImagesApiSearchRespBody } from '@shared/';
import Axios, { AxiosResponse } from 'axios';
import RouteUtils from 'main/utils/RouteUtils';

export async function imagesApiSearchGet(params: IImagesApiSearchQuery): Promise<AxiosResponse<IImagesApiSearchRespBody>> {
    const url = `/api/images/search${RouteUtils.makeQueryFromMap(params)}`;

    return Axios.get<IImagesApiSearchRespBody>(url);
}
