import { ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel } from '@shared/';
import * as React from 'react';

import styles from '../gallery.module.css';
import { GiphyRenderer } from './GiphyRenderer';
import { LazyLoadMore } from './LazyLoadMore';
import { PixabyRenderer } from './PixabyRenderer';

export interface IGalleryProps {
    hasMorePages: boolean;
    canLoadMorePages: boolean;
    loadNextPageCallback: () => void;
    pages: Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel>[] | undefined;
}

export const Gallery = (props: IGalleryProps) => {

    const placeholder = <Placeholder />;

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
        <div className={styles.wrapper}>
            <div className={styles.gallery}>
                {images}
                {props.hasMorePages && props.canLoadMorePages &&
                    <LazyLoadMore
                        placeholder={placeholder}
                        loadMoreCallback={props.loadNextPageCallback}
                        key={`load_next_page_${props.pages?.length}`}
                    />
                }
            </div>
        </div>
    );
}

const Placeholder = () => <div className={styles.galleryItemPlaceholder} />;
