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
        console.log('useRefresh');
    };

    return refresh;
};