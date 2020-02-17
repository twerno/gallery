import { IGiphyImage } from '@shared/';
import AnimatedLoader from 'components/AnimatedLoader';
import * as React from 'react';

import { IPreviewImage } from './FullScreenPreview';
import { IResponsiveImgProps, LazyResponsiveGalleryImage } from './helper/LazyResponsiveGalleryImage';
import { GalleryItem as GalleryItem } from './styled/GalleryItem';
import GalleryItemPlaceholder from './styled/GalleryItemPlaceholder';

interface ILazyGalleryItemGiphyImageProps {
    disable?: boolean;
    image: IGiphyImage;
    setPreview: React.Dispatch<React.SetStateAction<IPreviewImage>>;
}

export const LazyGalleryItemGiphyImage = (props: ILazyGalleryItemGiphyImageProps) => {

    const fixed_still = props.image.images.fixed_height_still;
    const small_still = props.image.images.fixed_height_small_still;
    const original = props.image.images.original;

    const imageProps: IResponsiveImgProps = {
        alt: props.image.title,
        defaultImgSrc: small_still?.url,
        srcSet: [
            { src: fixed_still?.url, media: '(min-width: 600px)' },
        ]
    };

    const clickHandler = () => props.setPreview({ imgProvider: 'giphy', img: props.image });

    return (
        <LazyResponsiveGalleryImage
            loadingPlaceholder={<GalleryItemPlaceholder children={<AnimatedLoader />} />}
            imageProps={imageProps}
            wrapper={(wrapperProps => (
                <GalleryItem
                    {...wrapperProps}
                    disable={props.disable}
                    onClick={clickHandler}
                />))}
        />
    );
};
