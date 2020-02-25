import { IImageQueryParams, IImageQueryRespBody } from '@shared/lib';
import { Router } from 'express';
import { AsyncHandler, asyncRequestHandler } from '../ApiUtils';
import { ImagesService } from './ImagesService';

export default class ImagesApi {

    public constructor(
        public readonly apiPath: string,
        public readonly imageService: ImagesService,
    ) { }

    public register(router: Router): this {
        const path = this.apiPath;

        router.get(`${path}/query`, asyncRequestHandler(this.queryHandler));

        return this;
    }

    private queryHandler: AsyncHandler<IImageQueryParams, IImageQueryRespBody, never>
        = async (req, res) => {

            const query = req.params;
            // TODO validate query

            const result = await this.imageService.query(query);
            res.json(result);
        }
}
