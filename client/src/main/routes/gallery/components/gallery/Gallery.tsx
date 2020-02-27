import * as React from 'react';
import { IPreviewGiphyImg, IPreviewPixabyImg } from '../../redux/GalleryItemState';
import { GalleryItemGiphy } from './GalleryItemGiphy';
import { GalleryItemPixaby } from './GalleryItemPixaby';
import { GalleryContainer } from './GalleryStyles';

export interface IGalleryProps {
    disabled: boolean;
    images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
}

export const Gallery = (props: IGalleryProps) => {

    const items = props.images?.map(
        (img, idx) =>
            img.imgProvider === 'giphy'
                ? <GalleryItemGiphy
                    image={img}
                    imageIdx={idx}
                    key={`giphy_${img.id}`}
                    disabled={props.disabled}
                />
                : <GalleryItemPixaby
                    image={img}
                    imageIdx={idx}
                    key={`pixabay_${img.id}`}
                    disabled={props.disabled}
                />
    );

    return (
        <GalleryContainer>
            {items}
        </GalleryContainer>
    );
};
