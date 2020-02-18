import * as React from 'react';
import { IGalleryUrlQuery } from 'routes/Path';
import styled from 'styled-components';

import { IPreviewGiphyImg, IPreviewPixabyImg } from '../redux/GalleryItemState';
import { LazyGalleryItemGiphyImage } from './LazyGalleryItemGiphyImage';
import { LazyGalleryItemLoadMoreTrigger } from './LazyGalleryItemLoadMoreTrigger';
import { LazyGalleryItemPixabyImage } from './LazyGalleryItemPixabyImage';

export interface IGalleryProps {
    disable: boolean;
    canLoadMore: boolean;
    images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
    className?: string;
    query: IGalleryUrlQuery;
}

const _GalleryContainer: React.FC<IGalleryProps> = (props: IGalleryProps) => {

    const galleryItems = props.images?.map((img, idx) =>
        img.imgProvider === 'giphy'
            ? <LazyGalleryItemGiphyImage
                image={img}
                key={`giphy_${img.id}`}
                disable={props.disable}
                imageIdx={idx}
            />
            : <LazyGalleryItemPixabyImage
                image={img}
                key={`pixabay_${img.id}`}
                disable={props.disable}
                imageIdx={idx}
            />
    );

    return (
        <div className={props.className}>
            {galleryItems}
            {props.canLoadMore &&
                <LazyGalleryItemLoadMoreTrigger
                    key={`loadMore_${props.images.length}_${props.query.q}`}
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
