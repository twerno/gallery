import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { GalleryItem, IGalleryItemProps } from '../GalleryItem';

describe('GalleryItem', () => {

    const props: IGalleryItemProps = {
        disabled: true,
        imageIdx: 0,
        responsivePicture: {
            alt: 'alt',
            defaultImgSrc: 'img.jpg',
            responsiveSrcList: [{ src: 'img-big.jpg', media: '(min-width: 600px)' }]
        },
    };

    componentBasicTests(
        "GalleryItem - disabled: false",
        <GalleryItem {...props} disabled={false} />
    );

    componentBasicTests(
        "GalleryItem - disabled: true",
        <GalleryItem {...props} disabled={true} />
    );

    componentBasicTests(
        "GalleryItem - imageIdx: 1",
        <GalleryItem {...props} imageIdx={1} />
    );
});

