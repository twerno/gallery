import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export interface ILazyLoaderProps {
    loadingPlaceholder: React.ReactElement;
    children: (props: {
        isLoaded: boolean,
        setLoaded: React.Dispatch<React.SetStateAction<boolean>>
    }) => React.ReactNode;
    rootMargin?: string;
    containerRef: React.RefObject<HTMLDivElement>;
}

export const LazyLoaderTrigger = (props: ILazyLoaderProps) => {

    const [isLoaded, setLoaded] = React.useState(false);

    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: props.rootMargin || '200px 0px',
    });

    React.useEffect(() => {
        ref(props.containerRef.current);
    }, [props.containerRef.current])

    return (
        <>
            {!isLoaded && props.loadingPlaceholder}
            {inView && props.children({ setLoaded, isLoaded })}
        </>
    )
};
