import { Router } from 'express';

import { IImageQueryParams, IImageQueryRespBody } from '@shared/lib';
import { ImagesService } from './ImagesService';
import { requestHandlerWraper, AsyncHandler } from '../ApiUtils';

export class ImagesApi {

    public router = Router();

    public constructor(
        public imageService: ImagesService
    ) {
        this.router.get('/query', requestHandlerWraper(this.queryHandler));
    }

    private queryHandler: AsyncHandler<IImageQueryParams, IImageQueryRespBody, never>
        = async (req, res) => {
            const result = await this.imageService.query(req.query);
            res.json(result);
        }

}

