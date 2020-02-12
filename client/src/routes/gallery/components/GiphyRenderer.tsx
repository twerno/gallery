import { IGiphyImage } from '@shared/';
import { LazyLoader } from 'components/LazyLoader';
import * as React from 'react';
import { useStyles } from 'utils/ComponentHelper';

import styles from '../gallery.module.css';

export interface IGiphyRendererProps {
    image: IGiphyImage;
    placeholder: React.ReactElement;
}

export const GiphyRenderer = (props: IGiphyRendererProps) => {

    const [isPlaying, setPlaying] = React.useState(false);

    const fixed_still = props.image.images.fixed_height_still;
    const small_still = props.image.images.fixed_height_small_still;

    // const classes = `${styles["gallery-item"]} 
    // ${isPlaying ? styles["galleryItem--pauseBtn"] : styles["galleryItem--playBtn"]}`;

    return (
        <LazyLoader
            placeholder={props.placeholder}
            wrapper={({ children, ref, isLoaded }) => (
                <div
                    ref={ref}
                    className={useStyles(styles.galleryItem, isLoaded && styles.playIndicator)}
                    onMouseLeave={() => setPlaying(false)}
                    onTouchStartCapture={() => setPlaying(true)}
                    onTouchCancel={() => setPlaying(false)}
                    onTouchCancelCapture={() => setPlaying(false)}
                    onTouchEnd={() => setPlaying(false)}
                >
                    {children}
                </div>
            )}
        >
            {
                ({ setLoaded, isLoaded }) =>
                    <picture
                        onLoad={() => setLoaded(true)}
                        className={useStyles(
                            styles.galleryItemImgWrapper,
                            !isLoaded && styles.galleryItemImgWrapper__hidden)
                        }
                    >
                        <source srcSet={fixed_still?.url} media="(min-width: 600px)" />
                        <img src={small_still.url} alt={props.image.title} className={styles.galleryItemImg} />
                    </picture>
            }
        </LazyLoader>
    );
};
