import AnimatedLoader from 'main/components/AnimatedLoader';
import { LazyLoader } from 'main/components/LazyLoader/LazyLoader';
import * as React from 'react';
import LazyLoadMoreStyles from './LazyLoadMoreStyles';

export interface ILazyLoadMoreTriggerProps {
    loadMoreCallback: () => void;
}

export const LazyLoadMoreTrigger = (props: ILazyLoadMoreTriggerProps) => {

    const [used, setUsed] = React.useState(false);

    const loadMoreTrigger = () => {
        if (!used) {
            setUsed(true);
            props.loadMoreCallback();
        }
        return null;
    }

    const containerRef = React.createRef<HTMLDivElement>();

    return (
        <LazyLoadMoreStyles.LoadMoreRow ref={containerRef}>
            <LazyLoader
                loadingPlaceholder={<AnimatedLoader />}
                containerRef={containerRef}
            >
                {loadMoreTrigger}
            </LazyLoader>
        </LazyLoadMoreStyles.LoadMoreRow>
    );
}
