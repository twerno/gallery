import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export interface ILazyLoaderProps {
    loadingPlaceholder: React.ReactElement;
    rootMargin?: string;
    containerRef: React.RefObject<HTMLDivElement>;
    children: (props: {
        isLoaded: boolean,
        setLoaded: React.Dispatch<React.SetStateAction<boolean>>
    }) => React.ReactNode;
}

export const LazyLoader = (props: ILazyLoaderProps) => {

    const [isLoaded, setLoaded] = React.useState(false);

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: props.rootMargin || '0px 0px',
    });

    React.useEffect(() => {
        ref(props.containerRef.current);
    }, [props.containerRef.current]);

    return (
        <>
            {!isLoaded && props.loadingPlaceholder}
            {inView && props.children({ setLoaded, isLoaded })}
        </>
    )
};
