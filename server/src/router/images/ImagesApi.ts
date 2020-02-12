import { Router } from 'express';

import { IImageQueryParams, IImageQueryRespBody, IStringMap } from '@shared/lib';
import { ImagesService } from './ImagesService';
import { requestHandlerWraper, AsyncHandler } from '../ApiUtils';

export class ImagesApi {

    public router = Router();

    public constructor(
        public imageService: ImagesService
    ) {
        this.router.get('/query', requestHandlerWraper(this.queryHandler));
    }

    private queryHandler: AsyncHandler<IImageQueryParams & IStringMap<string>, IImageQueryRespBody, never>
        = async (req, res) => {
            console.log('received request /query');
            const result = await this.imageService.query(req.query);
            res.json(result);
        }

}

