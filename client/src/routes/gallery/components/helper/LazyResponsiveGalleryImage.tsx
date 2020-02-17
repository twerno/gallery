import { LazyLoader } from 'components/LazyLoader';
import * as React from 'react';

import { HideablePicture } from '../styled/GalleryItem';

export interface IResponsiveImgProps {
    alt: string;
    defaultImgSrc: string | undefined;
    srcSet?: Array<{ src: string | undefined; media: string; }>;
}

export interface ILazyResponsiveImageProps {
    loadingPlaceholder: React.ReactElement;
    wrapper: React.FC<{
        isLoaded: boolean,
        ref: (node?: Element | null | undefined) => void,
    }>;
    imageProps: IResponsiveImgProps
}

export const LazyResponsiveGalleryImage = (props: ILazyResponsiveImageProps) => {
    const image = props.imageProps;

    const id = React.useState(Math.random() + '' + Math.random());

    const srcSet = image.srcSet?.map(
        (src, idx) => <source srcSet={src.src} media={src.media} key={`${id}_${idx}`} />
    );

    return (
        <LazyLoader
            loadingPlaceholder={props.loadingPlaceholder}
            wrapper={props.wrapper}
        >
            {({ setLoaded, isLoaded }) =>
                <HideablePicture
                    onLoad={() => setLoaded(true)}
                    isHidden={!isLoaded}
                >
                    {srcSet}
                    <img src={image.defaultImgSrc} alt={image.alt} />
                </HideablePicture>}
        </LazyLoader>
    );
}
