import { IPixabayImage } from '@shared/';
import { LazyLoader } from 'components/LazyLoader';
import * as React from 'react';
import { useStyles } from 'utils/ComponentHelper';

import styles from '../gallery.module.css';


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
                <div className={useStyles(styles.galleryItem)} ref={ref}>
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
                        <source srcSet={img_180} media="(min-width: 600px)" />
                        <img src={img_small} alt={alt} className={styles.galleryItemImg} />
                    </picture>
            }
        </LazyLoader>
    );
};