import * as React from 'react';
import { IResponsivePictureProps } from './GalleryResponsivePicture';
import { LazyResponsiveGalleryPicture } from './LazyResponsiveGalleryPicture';
import GalleryStyles from './styles/GalleryStyles';

export interface IGalleryItemProps {
    imageIdx: number;
    disabled?: boolean;
    responsivePicture: IResponsivePictureProps;
}

export const GalleryItem = (props: IGalleryItemProps) => {

    // const dispatch = useDispatch();
    // const clickHandler =
    //     () => dispatch(galleryItemSlice.actions.showFullImg(props.imageIdx));

    const ref = React.createRef<HTMLDivElement>();
    return (
        <GalleryStyles.GalleryItem
            ref={ref}
            disabled={props.disabled}
        // onClick={clickHandler}
        >
            <LazyResponsiveGalleryPicture
                containerRef={ref}
                pictureData={props.responsivePicture}
            />
        </GalleryStyles.GalleryItem>
    );
};
