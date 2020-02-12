import { IPixabayImage } from '@shared/';
import { LazyLoader } from 'components/LazyLoader';
import * as React from 'react';

import GalleryItem from './styled/GalleryItem';
import GalleryItemImg from './styled/GalleryItemImg';
import GalleryItemImgContainer from './styled/GalleryItemImgContainer';


export interface IPixabyRenderer {
    image: IPixabayImage;
    placeholder: React.ReactElement;
}

export const PixabyRenderer = (props: IPixabyRenderer) => {
    const img_small = props.image.previewURL;
    const img_640 = props.image.webformatURL;
    const img_180 = img_640.replace(/_\d{3}\./, '_180\.');

    const alt = props?.image?.tags?.split(',')
        .map(s => s.trim())
        .reduce((prev, tag) => `${prev} ${tag}`, '');

    return (
        <LazyLoader
            placeholder={props.placeholder}
            wrapper={({ children, ref }) => (
                <GalleryItem ref={ref}>
                    {children}
                </GalleryItem >
            )}
        >
            {
                ({ setLoaded, isLoaded }) =>
                    <GalleryItemImgContainer
                        onLoad={() => setLoaded(true)}
                        isHidden={!isLoaded}
                    >
                        <source srcSet={img_180} media="(min-width: 600px)" />
                        <GalleryItemImg src={img_small} alt={alt} />
                    </GalleryItemImgContainer>
            }
        </LazyLoader >
    );
};