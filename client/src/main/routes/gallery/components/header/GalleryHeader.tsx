import * as React from 'react';
import Headroom from 'react-headroom';
import { GalleryHeaderSearchForm, IGalleryHeaderSearchFormProps } from './GalleryHeaderSearchForm';

export interface IGalleryHeaderProps extends IGalleryHeaderSearchFormProps {

}

export const GalleryHeader = (props: IGalleryHeaderProps) => {

    return (
        <Headroom style={{ backgroundColor: 'white', zIndex: 10 }}>
            <GalleryHeaderSearchForm {...props} />
        </Headroom>
    );
}