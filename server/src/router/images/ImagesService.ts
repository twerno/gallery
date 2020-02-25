

import { GiphyService } from './GiphyService';
import { PixabayService } from './PixabayService';
import { IProperties } from 'helpers/Properties';
import { IImageQueryParams, ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel, IImageQueryRespBody } from '@shared/';

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

        const promises: Promise<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel | undefined>[] = [
            this.giphyService.loadImageData(params),
            this.pixabayService.loadImageData(params)
        ];

        const providers = (await Promise.all(promises))
            .filter(notEmpty);

        return { providers };
    }

}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}