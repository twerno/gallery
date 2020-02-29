import '@testing-library/jest-dom/extend-expect';
import { wait } from '@testing-library/react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { GalleryResponsivePicture, IGalleryResponsivePictureProps } from '../GalleryResponsivePicture';

describe('GalleryResponsivePicture', () => {

    const props: IGalleryResponsivePictureProps = {
        pictureData: {
            alt: 'alt',
            defaultImgSrc: 'img.jpg',
            responsiveSrcList: [{ src: 'img-big.jpg', media: '(min-width: 600px)' }]
        },
        isVisible: true,
        onLoadHandler: () => { },
    };

    componentBasicTests(
        "GalleryResponsivePicture visible",
        <GalleryResponsivePicture {...{ ...props, isVisible: true }} />
    );

    componentBasicTests(
        "GalleryResponsivePicture hidden",
        <GalleryResponsivePicture {...{ ...props, isVisible: false }} />
    );


    test('onLoadHandler', async () => {

        const localProps: IGalleryResponsivePictureProps = {
            ...props,
            isVisible: false,
            onLoadHandler: jest.fn(),
        };

        const wrapper = shallow(
            <GalleryResponsivePicture {...localProps} />
        );
        const picture = wrapper.first();
        expect(picture.name()).toBe('styled.picture');

        await wait(() => wrapper.simulate('load'));

        expect(localProps.onLoadHandler).toBeCalled();
    });

});

