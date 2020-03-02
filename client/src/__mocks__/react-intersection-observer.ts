export const useInViewMockMeta = {
    returnAsInView: true as boolean,
    returnAsRef: null as jest.Mock | null,
    params: null as any | null
}

export const useInView = (params: any) => {
    useInViewMockMeta.params = params;
    useInViewMockMeta.returnAsRef = jest.fn();
    return [useInViewMockMeta.returnAsRef, useInViewMockMeta.returnAsInView];
};
