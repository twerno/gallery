import { LazyLoader } from 'components/LazyLoader';
import * as React from 'react';
import { GalleryItem } from './styled/GalleryItem';
import GalleryItemPlaceholder from './styled/GalleryItemPlaceholder';
import AnimatedLoader from 'components/AnimatedLoader';

export interface ILazyGalleryItemLoadMoreTriggerProps {
    loadMoreCallback: () => void;
}

export const LazyGalleryItemLoadMoreTrigger = (props: ILazyGalleryItemLoadMoreTriggerProps) => {

    const [used, setUsed] = React.useState(false);

    return (
        <LazyLoader
            loadingPlaceholder={<GalleryItemPlaceholder children={<AnimatedLoader />} />}
            wrapper={(props) => <GalleryItem {...props} />}
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
