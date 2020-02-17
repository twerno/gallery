import { IPixabayImage } from '@shared/';
import * as React from 'react';

import { FullScreenPreviewLoadingPlaceholder } from './FullScreenPreview';
import { IResponsiveImgProps, LazyResponsiveGalleryImage } from './helper/LazyResponsiveGalleryImage';
import { FullScreenGalleryItem } from './styled/GalleryItem';

interface IFullScreenPreviewPixabyImageProps {
    image: IPixabayImage;
}

export const FullScreenPreviewPixabyImage = (props: IFullScreenPreviewPixabyImageProps) => {

    const img_small = props.image.previewURL;
    const img_640 = props.image.webformatURL;
    const img_180 = img_640.replace(/_\d{3}\./, '_180\.');
    const img_340 = img_640.replace(/_\d{3}\./, '_340\.');
    const img_960 = img_640.replace(/_\d{3}\./, '_960\.');

    const alt = props?.image?.tags?.split(',')
        .map(s => s.trim())
        .reduce((prev, tag) => `${prev} ${tag}`, '');

    const imageProps: IResponsiveImgProps = {
        alt,
        defaultImgSrc: img_small,
        srcSet: [
            { src: img_960, media: '(min-width: 920px)' },
            { src: img_640, media: '(min-width: 600px)' },
            { src: img_340, media: '(min-width: 300px)' },
            { src: img_180, media: '(min-width: 140px)' },
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
