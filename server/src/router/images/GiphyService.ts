import Axios from 'axios';
import httpCodes from 'http-status-codes';

import { IGiphyReturnModel, IImageQueryParams } from '@shared/';
import { IProperties } from 'helpers/Properties';


export class GiphyService {

    public constructor(
        protected properties: IProperties
    ) { }

    public async loadImageData(queryParams: IImageQueryParams): Promise<IGiphyReturnModel> {

        const params = {
            api_key: this.properties.GIPHY_API,
            q: queryParams.q,
            offset: queryParams.offset,
            limit: queryParams.perPageLimit
        };

        const axiosResp = await Axios.get<IGiphyReturnModel>('http://api.giphy.com/v1/gifs/search', { params });
        if (axiosResp.status === httpCodes.OK) {
            return axiosResp.data;
        }
        else {
            throw axiosResp;
        }
    }
}

