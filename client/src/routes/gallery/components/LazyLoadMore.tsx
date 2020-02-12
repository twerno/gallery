import * as React from 'react';

import { LazyLoader } from 'components/LazyLoader';
import { useStyles } from 'utils/ComponentHelper';
import styles from '../gallery.module.css';

export interface ILazyLoadModeProps {
    loadMoreCallback: () => void;
    placeholder: React.ReactElement;
}

export const LazyLoadMore = (props: ILazyLoadModeProps) => {

    const [used, setUsed] = React.useState(false);

    return (
        <LazyLoader
            placeholder={props.placeholder}
            wrapper={({ children, ref }) => (
                <div className={useStyles(styles.galleryItem)} ref={ref}>
                    {children}
                </div>
            )}
            rootMargin="600px 0px"
        >
            {({ }) => {
                if (!used) {
                    setUsed(true);
                    props.loadMoreCallback();
                }
                return null;
            }}
        </LazyLoader>
    );
}
