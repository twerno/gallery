

import { GiphyService } from './GiphyService';
import { PixabayService } from './PixabayService';
import { IProperties } from 'helpers/Properties';
import { IImageQueryParams, IImageQueryRespBody } from '@shared/';

export class ImagesService {

    private giphyService: GiphyService;
    private pixabayService: PixabayService;

    public constructor(
        protected properties: IProperties
    ) {
        this.giphyService = new GiphyService(properties);
        this.pixabayService = new PixabayService(properties);
    }

    public async query(params: IImageQueryParams): Promise<IImageQueryRespBody> {
        const data: IImageQueryRespBody = {};
        const promises: Promise<any>[] = [];

        if (params.services !== 'pixabay') {
            const promise = this.giphyService.loadImageData(params)
                .then(result => data.giphy = result);
            promises.push(promise);
        }

        if (params.services !== 'giphy') {
            const promise = this.pixabayService.loadImageData(params)
                .then(result => data.pixaby = result);
            promises.push(promise);
        }

        await Promise.all(promises);
        return data;
    }

}