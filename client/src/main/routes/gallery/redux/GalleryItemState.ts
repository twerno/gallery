import { IGiphyImage, IPixabayImage } from '@shared/';
import { IGalleryUrlQuery } from 'main/routes/Path';

export interface IPreviewGiphyImg extends IGiphyImage {
    imgProvider: 'giphy';
}

export interface IPreviewPixabyImg extends IPixabayImage {
    imgProvider: 'pixabay';
}

export type IPreviewImg = IPreviewGiphyImg | IPreviewPixabyImg;

export interface IGalleryStateMeta {
    pageIdx: number;
    limit?: {
        pixabayPages: number;
        giphyPages: number;
    }
    query?: IGalleryUrlQuery;
}

export interface IGalleryState {
    images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
    loadingMeta: IGalleryStateMeta;

    errors?: string[];

    previewIdx?: number;
}

export interface IItemsLoadedActionPayload {
    images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
    limit: {
        pixabayPages: number;
        giphyPages: number;
    }
}
