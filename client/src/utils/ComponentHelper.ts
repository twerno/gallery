export const useStyles = (...styles: any[]): string => {
    return (styles || [])
        .filter(s => typeof s === 'string')
        .join(' ');
};
