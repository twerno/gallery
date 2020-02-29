import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import { IPreviewGiphyImg, IPreviewPixabyImg } from 'main/routes/gallery/redux/GalleryItemState';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { Gallery } from '../Gallery';

describe('Gallery', () => {

    componentBasicTests(
        "empty Gallery - disabled: false",
        <Gallery images={[]} disabled={false} />
    );

    componentBasicTests(
        "empty Gallery - disabled: true",
        <Gallery images={[]} disabled={true} />
    );

    const images: (IPreviewGiphyImg | IPreviewPixabyImg)[] = [
        {
            imgProvider: 'giphy',
            embed_url: 'embed_url',
            id: 'id',
            images: {
                fixed_height_small_still: {
                    height: '200',
                    url: 'http://example.com.not/image.jpg',
                    width: '200'
                },
                original: {
                    height: '300',
                    url: 'http://example.com.not/image.jpg',
                    width: '300'
                }
            },
            title: 'title',
            type: 'type'
        }
    ];

    componentBasicTests(
        "Gallery - disabled: false",
        <Gallery images={images} disabled={false} />
    );

    componentBasicTests(
        "Gallery - disabled: true",
        <Gallery images={images} disabled={true} />
    );

});

