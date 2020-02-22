import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export interface ILazyLoaderProps {
    loadingPlaceholder: React.ReactElement;
    wrapper: React.FC<{
        isLoaded: boolean,
        ref: (node?: Element | null | undefined) => void,
    }>;
    children: (props: {
        isLoaded: boolean,
        setLoaded: React.Dispatch<React.SetStateAction<boolean>>
    }) => React.ReactNode;
    rootMargin?: string;
}

export const LazyLoader = (props: ILazyLoaderProps) => {

    const [isLoaded, setLoaded] = React.useState(false);

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: props.rootMargin || '200px 0px',
    });

    return props.wrapper(
        {
            ref,
            isLoaded,
            children: (
                <>
                    {!isLoaded && props.loadingPlaceholder}
                    {inView && props.children({ setLoaded, isLoaded })}
                </>
            )
        }
    );
};
