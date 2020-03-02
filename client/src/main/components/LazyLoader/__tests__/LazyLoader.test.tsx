import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import * as React from 'react';
import { LazyLoader } from '../LazyLoader';
import { useInViewMockMeta } from '@mock/react-intersection-observer';

describe('LazyLoader', () => {

    test('LazyLoader - not in view; not loaded', async () => {
        const wrapper = mountLazyLoader({ inView: false });

        expect(wrapper.find(`div.data-loaded-false`).exists()).toBe(false);
        expect(wrapper.find(`div.data-loaded-true`).exists()).toBe(false);
        expect(wrapper.find(`div.placeholder-test`).exists()).toBe(true);
    });

    test('LazyLoader - in view; not loaded', async () => {
        const wrapper = mountLazyLoader({ inView: true });

        expect(wrapper.find(`div.data-loaded-false`).exists()).toBe(true);
        expect(wrapper.find(`div.data-loaded-true`).exists()).toBe(false);
        expect(wrapper.find(`div.placeholder-test`).exists()).toBe(true);
    });

    test('LazyLoader - in view; loaded', async () => {
        const wrapper = mountLazyLoader({ inView: true, isLoadedVal: true });

        expect(wrapper.find(`div.data-loaded-false`).exists()).toBe(false);
        expect(wrapper.find(`div.data-loaded-true`).exists()).toBe(true);
        expect(wrapper.find(`div.placeholder-test`).exists()).toBe(false);
    });

    test('LazyLoader - containerRef', async () => {
        const containerRef = React.createRef<HTMLDivElement>();
        mountLazyLoader({ inView: true, isLoadedVal: true, containerRef });

        expect(useInViewMockMeta.returnAsRef).toBeTruthy();
        expect(useInViewMockMeta.returnAsRef).toBeCalledTimes(1);
        expect(useInViewMockMeta.returnAsRef).toBeCalledWith(containerRef.current);
    });

    test('LazyLoader - defaults', async () => {
        mountLazyLoader({ inView: false });

        expect(useInViewMockMeta.params).toBeTruthy();
        expect(useInViewMockMeta.params.triggerOnce).toBe(true);
        expect(useInViewMockMeta.params.rootMargin).toBe('0px 0px');
    });

    test('LazyLoader - rootMargin', async () => {
        mountLazyLoader({ inView: false, rootMargin: '100px 100px' });

        expect(useInViewMockMeta.params).toBeTruthy();
        expect(useInViewMockMeta.params.rootMargin).toBe('100px 100px');
    });

    function mountLazyLoader({ inView, isLoadedVal, containerRef, rootMargin }: IMountLazyLoaderProps) {
        useInViewMockMeta.returnAsInView = inView;
        const placeholder = <div className="placeholder-test" />
        containerRef = containerRef || React.createRef<HTMLDivElement>();

        const wrapper = mount(
            <div ref={containerRef}>
                <LazyLoader
                    rootMargin={rootMargin}
                    containerRef={containerRef}
                    loadingPlaceholder={placeholder}
                    children={({ setLoaded, isLoaded }) => {
                        if (isLoadedVal && isLoadedVal !== isLoaded) {
                            setLoaded(isLoadedVal);
                        }
                        return <div className={`data-loaded-${isLoaded}`} />
                    }}
                />
            </div>
        );

        return wrapper;
    }
});

interface IMountLazyLoaderProps {
    inView: boolean;
    isLoadedVal?: boolean;
    containerRef?: React.RefObject<HTMLDivElement>;
    rootMargin?: string;
}
