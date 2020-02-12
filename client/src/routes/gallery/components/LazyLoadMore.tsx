import { LazyLoader } from 'components/LazyLoader';
import * as React from 'react';

export interface ILazyLoadModeProps {
    loadMoreCallback: () => void;
    placeholder: React.ReactElement;
    wrapper?: React.FC<{
        isLoaded: boolean,
        ref: (node?: Element | null | undefined) => void,
    }>;
}

export const LazyLoadMore = (props: ILazyLoadModeProps) => {

    const [used, setUsed] = React.useState(false);

    return (
        <LazyLoader
            placeholder={props.placeholder}
            wrapper={props.wrapper || DefaultWrapper}
            rootMargin="600px 0px"
        >
            {({ }) => {
                if (!used) {
                    setUsed(true);
                    props.loadMoreCallback();
                }
                return null;
            }}
        </LazyLoader>
    );
}

const DefaultWrapper: React.FC<{
    isLoaded: boolean,
    ref: (node?: Element | null | undefined) => void,
}> = ({ children, ref }) => (
    <div ref={ref}>
        {children}
    </div>
);