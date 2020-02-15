import { IGiphyImage } from '@shared/';
import { LazyLoader } from 'components/LazyLoader';
import * as React from 'react';

import GalleryItemImg from './styled/GalleryItemImg';
import GalleryItemImgContainer from './styled/GalleryItemImgContainer';
import { GalleryItemWithPlayIndicator } from './styled/GalleryItemWithPlayIndicator';

export interface IGiphyRendererProps {
    image: IGiphyImage;
    placeholder: React.ReactElement;
}

export const GiphyRenderer = (props: IGiphyRendererProps) => {

    const fixed_still = props.image.images.fixed_height_still;
    const small_still = props.image.images.fixed_height_small_still;

    return (
        <LazyLoader
            placeholder={props.placeholder}
            wrapper={({ children, ref, isLoaded }) => (
                <GalleryItemWithPlayIndicator
                    ref={ref}
                    indicator={isLoaded ? 'play' : 'none'}
                >
                    {children}
                </GalleryItemWithPlayIndicator>
            )}
        >
            {
                ({ setLoaded, isLoaded }) =>
                    <GalleryItemImgContainer
                        onLoad={() => setLoaded(true)}
                        isHidden={!isLoaded}
                    >
                        <source srcSet={fixed_still?.url} media="(min-width: 600px)" />
                        <GalleryItemImg src={small_still.url} alt={props.image.title} />
                    </GalleryItemImgContainer>
            }
        </LazyLoader>
    );
};
