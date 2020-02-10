import Axios from 'axios';
import httpCodes from 'http-status-codes';

import { IImageQueryParams, IPixabayReturnModel } from '../../../../shared';
import { IProperties } from '../../helpers/Properties';

export class PixabayService {

    public constructor(
        protected properties: IProperties
    ) { }

    public async loadImageData(queryParams: IImageQueryParams): Promise<IPixabayReturnModel> {

        const params = {
            key: this.properties.PIXABAY_API,
            q: queryParams.q,
            page: queryParams.offset,
            per_page: queryParams.perPageLimit
        };

        const axiosResp = await Axios.get<IPixabayReturnModel>('https://pixabay.com/api/', { params });
        if (axiosResp.status === httpCodes.OK) {
            return axiosResp.data;
        }
        else {
            throw axiosResp;
        }
    }
}

