import * as React from 'react';
import GalleryStyles from './styles/GalleryStyles';

export interface IResponsivePictureProps {
    alt: string;
    defaultImgSrc: string | undefined;
    responsiveSrcList?: Array<{ src: string | undefined; media: string; }>;
}

export interface IGalleryResponsivePictureProps {
    isVisible: boolean;
    onLoadHandler: () => void;
    pictureData: IResponsivePictureProps;
}

export const GalleryResponsivePicture = (props: IGalleryResponsivePictureProps) => {
    const { onLoadHandler, isVisible, pictureData } = props;

    const srcSet = pictureData.responsiveSrcList?.map(
        (src) => <source srcSet={src.src} media={src.media} key={`${src.src}_${src.media}`} />
    );

    return (
        <GalleryStyles.GalleryItemPicture
            onLoad={onLoadHandler}
            isHidden={!isVisible}
        >
            {srcSet}
            <GalleryStyles.GalleryItemImg src={pictureData.defaultImgSrc} alt={pictureData.alt} />
        </GalleryStyles.GalleryItemPicture>
    );
}