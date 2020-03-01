import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { lazyResponsiveGalleryLoadingPlaceholder, LazyResponsiveGalleryPicture } from '../LazyResponsiveGalleryPicture';

describe('LazyResponsiveGalleryPicture', () => {

    const props = {
        pictureData: {
            alt: 'alt',
            defaultImgSrc: 'img.jpg',
            responsiveSrcList: [{ src: 'img-big.jpg', media: '(min-width: 600px)' }]
        }
    }

    const newContainerRef = () => ({ current: document.createElement('div') });

    componentBasicTests(
        "LazyResponsiveGalleryPicture - not visible test - children should not be visible",
        <LazyResponsiveGalleryPicture {...props} containerRef={newContainerRef()} />
    );

    componentBasicTests(
        "lazyResponsiveGalleryLoadingPlaceholder",
        lazyResponsiveGalleryLoadingPlaceholder
    );

    test('LazyResponsiveGalleryPicture - props: loadingPlaceholder', async () => {
        const wrapper = shallow(<LazyResponsiveGalleryPicture {...props} containerRef={newContainerRef()} />);

        expect(wrapper.props().loadingPlaceholder).toEqual(lazyResponsiveGalleryLoadingPlaceholder);
    });

    test('LazyResponsiveGalleryPicture - props: containerRef', async () => {
        const ref = newContainerRef();
        const wrapper = shallow(<LazyResponsiveGalleryPicture {...props} containerRef={ref} />);

        expect(wrapper.props().containerRef).toEqual(ref);
    });

});
