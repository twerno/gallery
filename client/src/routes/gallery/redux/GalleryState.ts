import { IGiphyImage, IPixabayImage } from '@shared/';
import { IGalleryUrlQuery } from 'routes/Path';

export interface IPreviewGiphyImg extends IGiphyImage {
    imgProvider: 'giphy';
}

export interface IPreviewPixabyImg extends IPixabayImage {
    imgProvider: 'pixabay';
}

export interface IGalleryStateMeta {
    pageIdx: number;
    limit?: {
        pixabayPages: number;
        giphyPages: number;
    }
    query?: IGalleryUrlQuery;
}

export interface IGalleryState {
    errors?: string[];
    images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
    loadingMeta: IGalleryStateMeta;

    previewIdx?: number;
}
