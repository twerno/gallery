import { IGiphyImage } from '@shared/';
import * as React from 'react';

import { FullScreenPreviewLoadingPlaceholder } from './FullScreenPreview';
import { IResponsiveImgProps, LazyResponsiveGalleryImage } from './helper/LazyResponsiveGalleryImage';
import { FullScreenGalleryItem } from './styled/GalleryItem';

interface IFullScreenPreviewGiphyImageProps {
    image: IGiphyImage;
}

export const FullScreenPreviewGiphyImage = (props: IFullScreenPreviewGiphyImageProps) => {

    const gif_md_size = props.image.images.fixed_height;
    const gif_sm_size = props.image.images.fixed_height_small;
    const original = props.image.images.original;

    const imageProps: IResponsiveImgProps = {
        alt: props.image.title,
        defaultImgSrc: gif_sm_size?.url,
        srcSet: [
            { src: original?.url, media: `(min-width: ${+original.width - 40}px)` },
            { src: gif_md_size?.url, media: `(min-width: ${+(gif_md_size?.width || 0) - 40}px)` },
        ]
    };

    return (
        <LazyResponsiveGalleryImage
            loadingPlaceholder={<FullScreenPreviewLoadingPlaceholder />}
            wrapper={(wrapperProps => <FullScreenGalleryItem {...wrapperProps} />)}
            imageProps={imageProps}
        />
    );
};
