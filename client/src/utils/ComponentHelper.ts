export const useStyles = (...styles: any[]): string => {
    return (styles || [])
        .map(s => s.toString())
        .join(' ');
};
