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
    const _isMounted = React.useRef<boolean>(true);

    React.useEffect(() => {
        _isMounted.current = true;
        return () => { _isMounted.current = false; }
    }, []);

    return { isMounted: () => _isMounted.current };
}