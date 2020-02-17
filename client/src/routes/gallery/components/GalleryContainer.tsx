import { ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel } from '@shared/';
import * as React from 'react';
import { IGalleryUrlQuery } from 'routes/Path';
import styled from 'styled-components';

import { IPreviewImage } from './FullScreenPreview';
import { LazyGalleryItemGiphyImage } from './LazyGalleryItemGiphyImage';
import { LazyGalleryItemLoadMoreTrigger } from './LazyGalleryItemLoadMoreTrigger';
import { LazyGalleryItemPixabyImage } from './LazyGalleryItemPixabyImage';

export interface IGalleryProps {
    disable: boolean;
    canLoadMore: boolean;
    loadMoreCallback: () => void;
    pages: Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>[] | undefined;
    className?: string;
    query: IGalleryUrlQuery;
    setPreview: React.Dispatch<React.SetStateAction<IPreviewImage>>;
}

const _GalleryContainer: React.FC<IGalleryProps> = (props: IGalleryProps) => {

    const galleryItems = props.pages?.map(page =>
        (page || []).map((images, pageIdx) => {
            switch (images.imgProvider) {
                case 'giphy':
                    return images.data.map(img => (
                        <LazyGalleryItemGiphyImage
                            image={img}
                            key={img.id}
                            disable={props.disable}
                            setPreview={props.setPreview}
                        />)
                    );

                case 'pixabay':
                    return images.hits.map(img => (
                        <LazyGalleryItemPixabyImage
                            image={img}
                            key={img.id}
                            disable={props.disable}
                            setPreview={props.setPreview}
                        />
                    ));

                default:
                    return <div key={pageIdx}>{`Unknown provider: "${(images as any).imgProvider}"`}</div>;
            }
        })
    );

    return (
        <div className={props.className}>
            {galleryItems}
            {props.canLoadMore &&
                <LazyGalleryItemLoadMoreTrigger
                    loadMoreCallback={props.loadMoreCallback}
                />
            }
        </div>
    );
}

export const GalleryContainer = styled(_GalleryContainer)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    overflow-x: hidden;
    position: relative;
    left: 0px;
    right: 0px;
    margin: 0px 10px;

    &::after {
        content: '';
        flex-grow: 999999999;
        height: 0;
    }
`;
