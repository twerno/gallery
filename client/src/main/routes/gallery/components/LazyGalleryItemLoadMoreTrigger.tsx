import AnimatedLoader from 'main/components/AnimatedLoader';
import { LazyLoader } from 'main/components/LazyLoader';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { GalleryItem } from './styled/GalleryItem';
import GalleryItemPlaceholder from './styled/GalleryItemPlaceholder';

export interface ILazyGalleryItemLoadMoreTriggerProps {

}

export const LazyGalleryItemLoadMoreTrigger = (props: ILazyGalleryItemLoadMoreTriggerProps) => {

    const dispatch = useDispatch();
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
                    dispatch(galleryItemSlice.actions.loadNextPage());
                }
                return null;
            }}
        </LazyLoader>
    );
}
