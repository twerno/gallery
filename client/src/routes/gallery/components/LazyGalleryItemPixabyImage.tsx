import { IPixabayImage } from '@shared/';
import AnimatedLoader from 'components/AnimatedLoader';
import * as React from 'react';

import { IPreviewImage } from './FullScreenPreview';
import { IResponsiveImgProps, LazyResponsiveGalleryImage } from './helper/LazyResponsiveGalleryImage';
import { GalleryItem } from './styled/GalleryItem';
import GalleryItemPlaceholder from './styled/GalleryItemPlaceholder';


interface ILazyGalleryItemPixabyImageProps {
    disable?: boolean;
    image: IPixabayImage;
    setPreview: React.Dispatch<React.SetStateAction<IPreviewImage>>;
}

export const LazyGalleryItemPixabyImage = (props: ILazyGalleryItemPixabyImageProps) => {
    const img_small = props.image.previewURL;
    const img_640 = props.image.webformatURL;
    const img_180 = img_640.replace(/_\d{3}\./, '_180\.');

    const alt = props?.image?.tags?.split(',')
        .map(s => s.trim())
        .reduce((prev, tag) => `${prev} ${tag}`, '');

    const imageProps: IResponsiveImgProps = {
        alt,
        defaultImgSrc: img_small,
        srcSet: [
            { src: img_180, media: '(min-width: 600px)' },
        ]
    };

    const clickHandler = () => props.setPreview({ imgProvider: 'pixabay', img: props.image });

    return (
        <LazyResponsiveGalleryImage
            loadingPlaceholder={<GalleryItemPlaceholder children={<AnimatedLoader />} />}
            imageProps={imageProps}
            wrapper={wrapperProps => (
                <GalleryItem
                    {...wrapperProps}
                    disable={props.disable}
                    onClick={clickHandler}
                />)}
        />
    );

};
