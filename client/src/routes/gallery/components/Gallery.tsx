import { ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel } from '@shared/';
import AnimatedLoader from 'components/AnimatedLoader';
import * as React from 'react';
import { IGalleryUrlQuery } from 'routes/Path';

import styles = require('../gallery.module.css');
import { GiphyRenderer } from './GiphyRenderer';
import { LazyLoadMore } from './LazyLoadMore';
import { PixabyRenderer } from './PixabyRenderer';
import GalleryItem from './styled/GalleryItem';
import GalleryItemPlaceholder from './styled/GalleryItemPlaceholder';

export interface IGalleryProps {
    canLoadMorePages: boolean;
    loadNextPageCallback: () => void;
    pages: Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>[] | undefined;
    className?: string;
    query: IGalleryUrlQuery;
}

export const Gallery: React.FC<IGalleryProps> = (props: IGalleryProps) => {

    const placeholder = <AnimatedGalleryItemPlaceholder />;

    const images = props.pages?.map(page =>
        (page || []).map((images, pageIdx) => {
            switch (images.imgProvider) {
                case 'giphy':
                    return images.data.map(img => <GiphyRenderer placeholder={placeholder} image={img} key={img.id} />);

                case 'pixabay':
                    return images.hits.map(img => <PixabyRenderer placeholder={placeholder} image={img} key={img.id} />);

                default:
                    return <div key={pageIdx}>{`Unknown provider: "${(images as any).imgProvider}"`}</div>;
            }
        })
    );

    return (
        <div className={styles.galleryContainer}>
            {images}
            {props.canLoadMorePages &&
                <LazyLoadMore
                    placeholder={placeholder}
                    wrapper={({ children, ref }) => (<GalleryItem ref={ref}>{children}</GalleryItem>)}
                    loadMoreCallback={props.loadNextPageCallback}
                    key={`load_next_page_${props.query.q}_${props.pages?.length}`}
                />
            }
        </div>
    );
}

const AnimatedGalleryItemPlaceholder = () => (
    <GalleryItem>
        <GalleryItemPlaceholder>
            <AnimatedLoader />
        </GalleryItemPlaceholder>
    </GalleryItem>
);