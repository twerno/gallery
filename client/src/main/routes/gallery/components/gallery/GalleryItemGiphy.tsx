import { IGiphyImage } from '@shared/';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { galleryItemSlice } from '../../redux/GalleryItemSlice';
import { IResponsivePictureProps, LazyResponsiveGalleryPicture } from './LazyResponsiveGalleryPicture';
import { GalleryItem } from './GalleryStyles';

interface IGalleryItemGiphyProps {
    imageIdx: number;
    disabled?: boolean;
    image: IGiphyImage;
}

export const GalleryItemGiphy = (props: IGalleryItemGiphyProps) => {

    const fixed_still = props.image.images.fixed_height_still;
    const small_still = props.image.images.fixed_height_small_still;

    const responsivePictureProps: IResponsivePictureProps = {
        alt: props.image.title,
        defaultImgSrc: small_still?.url,
        responsiveSrcList: [
            { src: fixed_still?.url, media: '(min-width: 600px)' },
        ]
    };

    const dispatch = useDispatch();
    const clickHandler =
        () => dispatch(galleryItemSlice.actions.showFullImg(props.imageIdx));

    const ref = React.createRef<HTMLDivElement>();
    return (
        <GalleryItem
            ref={ref}
            disabled={props.disabled}
            onClick={clickHandler}
        >
            <LazyResponsiveGalleryPicture
                containerRef={ref}
                responsivePicture={responsivePictureProps}
            />
        </GalleryItem>
    );
};
