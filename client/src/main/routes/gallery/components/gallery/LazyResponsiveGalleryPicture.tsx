import AnimatedLoader from 'main/components/AnimatedLoader';
import { LazyLoader } from 'main/components/LazyLoader/LazyLoader';
import * as React from 'react';
import { GalleryResponsivePicture, IResponsivePictureProps } from './GalleryResponsivePicture';
import GalleryStyles from './styles/GalleryStyles';

export interface ILazyResponsivePictureProps {
    containerRef: React.RefObject<HTMLDivElement>;
    pictureData: IResponsivePictureProps
}

export const LazyResponsiveGalleryPicture = (props: ILazyResponsivePictureProps) => {
    return (
        <LazyLoader
            loadingPlaceholder={lazyResponsiveGalleryLoadingPlaceholder}
            containerRef={props.containerRef}
        >
            {
                ({ setLoaded, isLoaded }) =>
                    <GalleryResponsivePicture
                        isVisible={isLoaded}
                        onLoadHandler={() => setLoaded(true)}
                        pictureData={props.pictureData}
                    />
            }
        </LazyLoader>
    );
};

export const lazyResponsiveGalleryLoadingPlaceholder =
    <GalleryStyles.ItemLoadingPlaceholder children={<AnimatedLoader />} />;