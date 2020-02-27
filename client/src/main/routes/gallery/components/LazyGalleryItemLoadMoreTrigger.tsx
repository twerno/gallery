import AnimatedLoader from 'main/components/AnimatedLoader';
import { LazyLoaderTrigger } from 'main/components/LazyLoader';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { galleryItemSlice } from '../redux/GalleryItemSlice';
import { GalleryItemPlaceholderWraper } from './gallery/GalleryStyles';

export interface ILazyGalleryItemLoadMoreTriggerProps {

}

export const LazyGalleryItemLoadMoreTrigger = (props: ILazyGalleryItemLoadMoreTriggerProps) => {

    const dispatch = useDispatch();
    const [used, setUsed] = React.useState(false);

    return null;
    // return (
    //     <LazyLoaderTrigger
    //         loadingPlaceholder={<GalleryItemPlaceholderWraper children={<AnimatedLoader />} />}
    //         // wrapper={(props) => <GalleryItem {...props} />}
    //         rootMargin="600px 0px"
    //     >
    //         {({ }) => {
    //             if (!used) {
    //                 setUsed(true);
    //                 dispatch(galleryItemSlice.actions.loadNextPage());
    //             }
    //             return null;
    //         }}
    //     </LazyLoaderTrigger>
    // );
}
