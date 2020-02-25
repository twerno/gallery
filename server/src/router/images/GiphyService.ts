import Axios from 'axios';
import httpCodes from 'http-status-codes';

import { IImageQueryParams, ILocalGiphyGetImageReturnModel, IGiphyGetImageReturnModel } from '@shared/';
import { IProperties } from 'helpers/Properties';


export class GiphyService {

    public constructor(
        protected properties: IProperties
    ) { }

    public async loadImageData(queryParams: IImageQueryParams): Promise<ILocalGiphyGetImageReturnModel | undefined> {

        if (queryParams.giphy_offset === undefined || (queryParams.services && queryParams.services !== 'giphy')) {
            return;
        }

        const params = {
            api_key: this.properties.GIPHY_API,
            q: queryParams.q,
            offset: queryParams.giphy_offset + 1,
            limit: queryParams.perPageLimit
        };

        const axiosResp = await Axios.get<IGiphyGetImageReturnModel>('http://api.giphy.com/v1/gifs/search', { params });
        if (axiosResp.status === httpCodes.OK) {
            return { ...axiosResp.data, imgProvider: 'giphy' };
        }
        else {
            throw axiosResp;
        }
    }
}

