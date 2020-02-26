

import {
    typeUtils,
    IImagesApiSearchQuery, IImagesApiSearchRespBody,
    ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel
} from '@shared/';
import { IProperties } from 'helpers/Properties';
import { GiphyService } from './GiphyService';
import { PixabayService } from './PixabayService';

export class ImagesService {

    private giphyService: GiphyService;
    private pixabayService: PixabayService;

    public constructor(
        protected properties: IProperties
    ) {
        this.giphyService = new GiphyService(properties);
        this.pixabayService = new PixabayService(properties);
    }

    public async search(params: IImagesApiSearchQuery): Promise<IImagesApiSearchRespBody> {

        const promises: Promise<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel | undefined>[] = [
            this.giphyService.loadImageData(params),
            this.pixabayService.loadImageData(params)
        ];

        const providers = (await Promise.all(promises))
            .filter(typeUtils.notEmpty);

        return { providers };
    }

}

