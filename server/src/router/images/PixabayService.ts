import Axios from 'axios';
import httpCodes from 'http-status-codes';

import { IImageQueryParams, IPixabayGetImageReturnModel, ILocalPixabayGetImageReturnModel } from '@shared/';
import { IProperties } from 'helpers/Properties';


export class PixabayService {

    public constructor(
        protected properties: IProperties
    ) { }

    public async loadImageData(queryParams: IImageQueryParams): Promise<ILocalPixabayGetImageReturnModel | undefined> {

        if (queryParams.pixabay_offset === undefined) { return; }

        const params = {
            key: this.properties.PIXABAY_API,
            q: queryParams.q,
            page: +queryParams.pixabay_offset + 1,
            per_page: queryParams.perPageLimit,
        };

        const axiosResp = await Axios.get<IPixabayGetImageReturnModel>('https://pixabay.com/api/', { params });
        if (axiosResp.status === httpCodes.OK) {
            return { ...axiosResp.data, imgProvider: 'pixabay' };
        }
        else {
            throw axiosResp;
        }
    }
}

