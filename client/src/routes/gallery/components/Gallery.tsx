import { ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel } from '@shared/';
import * as React from 'react';

import styles = require('../gallery.module.css');
import { GiphyRenderer } from './GiphyRenderer';
import { LazyLoadMore } from './LazyLoadMore';
import { PixabyRenderer } from './PixabyRenderer';
import GalleryItem from './styled/GalleryItem';
import GalleryItemPlaceholder from './styled/GalleryItemPlaceholder';

export interface IGalleryProps {
    hasMorePages: boolean;
    canLoadMorePages: boolean;
    loadNextPageCallback: () => void;
    pages: Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>[] | undefined;
    className?: string;
}

export const Gallery: React.FC<IGalleryProps> = (props: IGalleryProps) => {

    const placeholder = <GalleryItem><GalleryItemPlaceholder /></GalleryItem>;

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
            {props.hasMorePages && props.canLoadMorePages &&
                <LazyLoadMore
                    placeholder={placeholder}
                    wrapper={({ children, ref }) => (<GalleryItem ref={ref}>{children}</GalleryItem>)}
                    loadMoreCallback={props.loadNextPageCallback}
                    key={`load_next_page_${props.pages?.length}`}
                />
            }
        </div>
    );
}