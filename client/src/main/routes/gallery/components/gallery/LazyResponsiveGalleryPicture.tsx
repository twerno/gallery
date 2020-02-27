import AnimatedLoader from 'main/components/AnimatedLoader';
import { LazyLoaderTrigger } from 'main/components/LazyLoader';
import * as React from 'react';
import { GalleryImg, GalleryItemPlaceholderWraper, GalleryPicture } from './GalleryStyles';

export interface IResponsivePictureProps {
    alt: string;
    defaultImgSrc: string | undefined;
    responsiveSrcList?: Array<{ src: string | undefined; media: string; }>;
}

export interface ILazyResponsivePictureProps {
    containerRef: React.RefObject<HTMLDivElement>;
    responsivePicture: IResponsivePictureProps
}

export const LazyResponsiveGalleryPicture = (props: ILazyResponsivePictureProps) => {
    const pictureData = props.responsivePicture;

    const id = React.useState(Math.random() + '' + Math.random());

    const srcSet = pictureData.responsiveSrcList?.map(
        (src, idx) => <source srcSet={src.src} media={src.media} key={`${id}_${idx}`} />
    );

    return (
        <LazyLoaderTrigger
            loadingPlaceholder={loadingPlaceHolder}
            containerRef={props.containerRef}
        >
            {
                ({ setLoaded, isLoaded }) =>
                    <GalleryPicture
                        onLoad={() => setLoaded(true)}
                        isHidden={!isLoaded}
                    >
                        {srcSet}
                        <GalleryImg src={pictureData.defaultImgSrc} alt={pictureData.alt} />
                    </GalleryPicture>
            }
        </LazyLoaderTrigger>
    );
};

const loadingPlaceHolder = <GalleryItemPlaceholderWraper children={<AnimatedLoader />} />;