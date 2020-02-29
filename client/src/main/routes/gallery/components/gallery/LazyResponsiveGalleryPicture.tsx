import AnimatedLoader from 'main/components/AnimatedLoader';
import { LazyLoaderTrigger } from 'main/components/LazyLoader';
import * as React from 'react';
import { GalleryResponsivePicture, IResponsivePictureProps } from './GalleryResponsivePicture';
import GalleryStyles from './styles/GalleryStyles';

export interface ILazyResponsivePictureProps {
    containerRef: React.RefObject<HTMLDivElement>;
    pictureData: IResponsivePictureProps
}

export const LazyResponsiveGalleryPicture = (props: ILazyResponsivePictureProps) => {
    return (
        <LazyLoaderTrigger
            loadingPlaceholder={loadingPlaceHolder}
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
        </LazyLoaderTrigger>
    );
};

const loadingPlaceHolder = <GalleryStyles.ItemLoadingPlaceholder children={<AnimatedLoader />} />;