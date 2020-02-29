import '@testing-library/jest-dom/extend-expect';
import { wait } from '@testing-library/react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import * as React from 'react';
import { componentBasicTests } from 'test/componentBasicTests';
import { LazyResponsiveGalleryPicture } from '../LazyResponsiveGalleryPicture';

let observerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null;
let observer: { observe: jest.Mock, unobserve: jest.Mock, disconnect: jest.Mock } | null = null;

const mockObserveFn = (callback: (entries: IntersectionObserverEntry[]) => void) => {
    observerCallback = callback;
    observer = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }
    return observer;
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
                observerCallback([
                    getIntersectionObserverElementFrom(containerRef.current)
                ])
            }
        });

        const expected = toJson(wrapper);
        expect(expected).toMatchSnapshot();
    });

    test('LazyResponsiveGalleryPicture - disconnects an observer', async () => {

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
                observerCallback([
                    getIntersectionObserverElementFrom(containerRef.current)
                ])
            }
        });

        await wait(() => {
            if (observerCallback && containerRef.current) {
                observerCallback([
                    getIntersectionObserverElementFrom(containerRef.current)
                ])
            }
        });

        expect(observer?.disconnect).toBeCalledTimes(1);
    });

});

function getIntersectionObserverElementFrom(element: HTMLDivElement) {
    return {
        boundingClientRect: element.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: element.getBoundingClientRect(),
        isIntersecting: true,
        time: 0,
        target: element,
        rootBounds: element.getBoundingClientRect(),
    };
}