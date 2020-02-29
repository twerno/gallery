import '@testing-library/jest-dom/extend-expect';
import { wait } from '@testing-library/react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { LazyResponsiveGalleryPicture } from '../LazyResponsiveGalleryPicture';

let observerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null;

const mockObserveFn = (callback: (entries: IntersectionObserverEntry[]) => void) => {
    observerCallback = callback;
    return {
        observe: jest.fn(),
        unobserve: jest.fn()
    };
};

window.IntersectionObserver = jest.fn().mockImplementation(mockObserveFn);

describe('HomePage', () => {

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


    test('LazyResponsiveGalleryPicture - element is visible - children should be render', async () => {

        const containerRef = React.createRef<HTMLDivElement>();
        const wrapper = mount(
            <div ref={containerRef}>
                <LazyResponsiveGalleryPicture {...props} containerRef={containerRef} />
            </div>
        );

        // not null or undefined
        expect(observerCallback).toBeTruthy();
        expect(containerRef.current).toBeTruthy();
        await wait(() => {
            if (observerCallback && containerRef.current) {
                observerCallback([{
                    boundingClientRect: containerRef.current.getBoundingClientRect(),
                    intersectionRatio: 1,
                    intersectionRect: containerRef.current.getBoundingClientRect(),
                    isIntersecting: true,
                    time: 0,
                    target: containerRef.current,
                    rootBounds: containerRef.current.getBoundingClientRect(),
                }])
            }
        });

        const expected = toJson(wrapper);
        expect(expected).toMatchSnapshot();
    });

});

