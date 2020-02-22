import { IImageQueryParams, IImageQueryRespBody } from '@shared/';
import Axios, { AxiosResponse } from 'axios';
import RouteUtils from 'main/utils/RouteUtils';

export async function apiImagesQueryGet(params: IImageQueryParams): Promise<AxiosResponse<IImageQueryRespBody>> {
    const url = `/api/images/query${RouteUtils.makeQueryFromMap(params)}`;

    return Axios.get<IImageQueryRespBody>(url);
}
