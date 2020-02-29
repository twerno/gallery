import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import GalleryStyles from '../GalleryStyles';

describe('GalleryStyles', () => {

    componentBasicTests(
        "GalleryContainer",
        <GalleryStyles.GalleryContainer />
    );

    componentBasicTests(
        "GalleryItem - disabled=true",
        <GalleryStyles.GalleryItem disabled={true} />
    );

    componentBasicTests(
        "GalleryItem - disabled=false",
        <GalleryStyles.GalleryItem disabled={false} />
    );

    componentBasicTests(
        "GalleryItem - disabled:default",
        <GalleryStyles.GalleryItem />
    );

    componentBasicTests(
        "GalleryItemImg",
        <GalleryStyles.GalleryItemImg />
    );

    componentBasicTests(
        "GalleryItemPicture - visible=true",
        <GalleryStyles.GalleryItemPicture visible={true} />
    );

    componentBasicTests(
        "GalleryItemPicture - visible=false",
        <GalleryStyles.GalleryItemPicture visible={false} />
    );

    componentBasicTests(
        "ItemLoadingPlaceholder",
        <GalleryStyles.ItemLoadingPlaceholder />
    );

});

