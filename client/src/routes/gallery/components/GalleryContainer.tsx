import * as React from 'react';
import { useDispatch } from 'react-redux';
import { IGalleryUrlQuery } from 'routes/Path';
import styled from 'styled-components';

import { IGallerySetPreviewAction } from '../redux/GalleryActions';
import { IPreviewGiphyImg, IPreviewPixabyImg } from '../redux/GalleryState';
import { LazyGalleryItemGiphyImage } from './LazyGalleryItemGiphyImage';
import { LazyGalleryItemLoadMoreTrigger } from './LazyGalleryItemLoadMoreTrigger';
import { LazyGalleryItemPixabyImage } from './LazyGalleryItemPixabyImage';

export interface IGalleryProps {
    disable: boolean;
    canLoadMore: boolean;
    loadMoreCallback: () => void;
    images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
    className?: string;
    query: IGalleryUrlQuery;
}

const _GalleryContainer: React.FC<IGalleryProps> = (props: IGalleryProps) => {

    const dispatch = useDispatch<React.Dispatch<IGallerySetPreviewAction>>();

    const galleryItems = props.images?.map((img, idx) =>
        img.imgProvider === 'giphy'
            ? <LazyGalleryItemGiphyImage
                image={img}
                key={`giphy_${img.id}`}
                disable={props.disable}
                imageIdx={idx}
                setPreview={dispatch}
            />
            : <LazyGalleryItemPixabyImage
                image={img}
                key={`pixabay_${img.id}`}
                disable={props.disable}
                imageIdx={idx}
                setPreview={dispatch}
            />
    );

    return (
        <div className={props.className}>
            {galleryItems}
            {props.canLoadMore &&
                <LazyGalleryItemLoadMoreTrigger
                    loadMoreCallback={props.loadMoreCallback}
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
