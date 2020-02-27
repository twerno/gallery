import { IPixabayImage } from '@shared/';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { galleryItemSlice } from '../../redux/GalleryItemSlice';
import { IResponsivePictureProps, LazyResponsiveGalleryPicture } from './LazyResponsiveGalleryPicture';
import { GalleryItem } from './GalleryStyles';

interface IGalleryItemPixabyProps {
    imageIdx: number;
    disabled?: boolean;
    image: IPixabayImage;
}

export const GalleryItemPixaby = (props: IGalleryItemPixabyProps) => {
    const img_small = props.image.previewURL;
    const img_640 = props.image.webformatURL;
    const img_180 = img_640.replace(/_\d{3}\./, '_180\.');

    const alt = props?.image?.tags?.split(',')
        .map(s => s.trim())
        .reduce((prev, tag) => `${prev} ${tag}`, '');

    const responsivePictureProps: IResponsivePictureProps = {
        alt,
        defaultImgSrc: img_small,
        responsiveSrcList: [
            { src: img_180, media: '(min-width: 600px)' },
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
