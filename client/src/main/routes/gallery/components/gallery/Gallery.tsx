import * as React from 'react';
import { IPreviewGiphyImg, IPreviewPixabyImg } from '../../redux/GalleryItemState';
import GalleryItemGiphyHelper from './helper/GalleryItemGiphyHelper';
import GalleryItemPixabayHelper from './helper/GalleryItemPixabayHelper';
import { GalleryItem } from './GalleryItem';
import GalleryStyles from './styles/GalleryStyles';

export interface IGalleryProps {
    disabled: boolean;
    images: (IPreviewGiphyImg | IPreviewPixabyImg)[];
}

export const Gallery = (props: IGalleryProps) => {

    const items = props.images?.map(
        (img, idx) =>
            ({
                imageIdx: idx,
                disabled: props.disabled,
                key: `${img.imgProvider}_${img.id}`,
                responsivePicture: img.imgProvider === 'giphy'
                    ? GalleryItemGiphyHelper.convertToResponsivePictureProps(img)
                    : GalleryItemPixabayHelper.convertToResponsivePictureProps(img)
            }));

    return (
        <GalleryStyles.GalleryContainer>
            {items.map(v => <GalleryItem {...v} />)}
        </GalleryStyles.GalleryContainer>
    );
};
