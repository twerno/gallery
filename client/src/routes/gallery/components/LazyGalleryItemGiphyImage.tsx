import { IGiphyImage } from '@shared/';
import AnimatedLoader from 'components/AnimatedLoader';
import * as React from 'react';

import { IGallerySetPreviewAction } from '../redux/GalleryActions';
import { IResponsiveImgProps, LazyResponsiveGalleryImage } from './helper/LazyResponsiveGalleryImage';
import { GalleryItem as GalleryItem } from './styled/GalleryItem';
import GalleryItemPlaceholder from './styled/GalleryItemPlaceholder';

interface ILazyGalleryItemGiphyImageProps {
    imageIdx: number;
    disable?: boolean;
    image: IGiphyImage;
    setPreview: React.Dispatch<IGallerySetPreviewAction>;
}

export const LazyGalleryItemGiphyImage = (props: ILazyGalleryItemGiphyImageProps) => {

    const fixed_still = props.image.images.fixed_height_still;
    const small_still = props.image.images.fixed_height_small_still;

    const imageProps: IResponsiveImgProps = {
        alt: props.image.title,
        defaultImgSrc: small_still?.url,
        srcSet: [
            { src: fixed_still?.url, media: '(min-width: 600px)' },
        ]
    };

    const clickHandler =
        () => props.setPreview({ type: 'GallerySetPreview', data: { previewIdx: props.imageIdx } });

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
