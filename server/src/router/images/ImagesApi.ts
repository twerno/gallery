import { IImagesApiSearchQuery, IImagesApiSearchRespBody } from '@shared/lib';
import { Router } from 'express';
import { AsyncHandler, asyncRequestHandler } from '../../helpers/ApiUtils';
import { ImagesService } from './ImagesService';

export default class ImagesApi {

    public constructor(
        public readonly apiPath: string,
        public readonly imageService: ImagesService,
    ) { }

    public register(router: Router): this {
        const path = this.apiPath;

        router.get(`${path}/search`, asyncRequestHandler(this.queryHandler));

        return this;
    }

    private queryHandler: AsyncHandler<never, IImagesApiSearchRespBody, never>
        = async (req, res) => {

            const query = req.query as IImagesApiSearchQuery;
            // TODO validate query
            const result = await this.imageService.search(query);
            res.json(result);
        }
}
