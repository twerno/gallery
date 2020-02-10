import { Router } from 'express';

import { IImageQueryParams, IImageQueryRespBody } from '../../shared/ImagesParams';
import { AsyncHandler, requestHandlerWraper } from '../ApiUtils';
import { ImagesService } from './ImagesService';

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

