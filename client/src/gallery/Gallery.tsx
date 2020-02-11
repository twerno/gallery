import { IGiphyImage, ILocalGiphyGetImageReturnModel, ILocalPixabayGetImageReturnModel, IPixabayImage } from '@shared/';
import * as React from 'react';

import styles from './gallery.module.css';

export interface IGalleryProps {
    providers: Array<ILocalGiphyGetImageReturnModel | ILocalPixabayGetImageReturnModel> | undefined;
}

export const Gallery = (props: IGalleryProps) => {

    return (
        <div className={styles["gallery-wrapper"]}>
            <div className={styles.gallery}>
                {props.providers && props.providers
                    .map((images, idx) => images.imgProvider === 'giphy'
                        ? images.data.map(img => <GiphyRenderer image={img} key={img.id} />)
                        : images.imgProvider === 'pixabay'
                            ? images.hits.map(img => <PixabyRenderer image={img} key={img.id} />)
                            : <div key={idx}>Unknown provider</div>
                    )
                }
            </div>
        </div>
    );
}

export interface IGiphyRendererProps {
    image: IGiphyImage;
}

export const GiphyRenderer = (props: IGiphyRendererProps) => {

    const [isPlaying, setPlaying] = React.useState(false);

    const fixed_still = props.image.images.fixed_height_still;
    const fixed = props.image.images.fixed_height;

    // const classes = `${styles["gallery-item"]} 
    // ${isPlaying ? styles["galleryItem--pauseBtn"] : styles["galleryItem--playBtn"]}`;

    return (
        <div
            className={styles["gallery-item"]}
            // onClick={() => setPlaying(!isPlaying)}
            // onMouseEnter={() => setPlaying(true)}
            onMouseLeave={() => setPlaying(false)}
            onTouchStartCapture={() => setPlaying(true)}
            onTouchCancel={() => setPlaying(false)}
            onTouchCancelCapture={() => setPlaying(false)}
            onTouchEnd={() => setPlaying(false)}
        >
            <img src={isPlaying ? fixed?.url : fixed_still?.url} />
        </div>
    )
}

export interface IPixabyRenderer {
    image: IPixabayImage;
}

export const PixabyRenderer = (props: IPixabyRenderer) => {
    const img_640 = props.image.webformatURL;
    const img_340 = img_640.replace(/_\d{3}/, '_340');
    const img_960 = img_640.replace(/_\d{3}/, '_960');
    const alt = props?.image?.tags?.split(', ').reduce((prev, tag) => prev + tag, '');

    return (
        <div className={styles["gallery-item"]}>
            <img
                src={img_340}
                alt={alt}
                srcSet={`${img_340} 340w, ${img_640} 640w, ${img_960} 960w`}
                sizes="(max-width: 600px) 340px, 50vw"
            />
        </div>
    )
}