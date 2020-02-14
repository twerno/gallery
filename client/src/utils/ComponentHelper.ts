import * as React from 'react';

export const useStyles = (...styles: any[]): string => {
    return (styles || [])
        .filter(s => typeof s === 'string')
        .join(' ');
};

export const useRefresh = () => {
    const [, setCounter] = React.useState<number>(0);

    const refresh = () => {
        setCounter(Math.random());
    };

    return refresh;
};

export const useIsMounted = () => {
    const ref = React.useRef<{ isMounted: boolean }>({ isMounted: true });

    React.useEffect(() => {
        ref.current.isMounted = true;
        return () => { ref.current.isMounted = false; }
    }, []);

    return { isMounted: () => ref.current.isMounted };
}