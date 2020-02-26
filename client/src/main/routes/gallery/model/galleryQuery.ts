export interface IGalleryUrlQuery {
    q: string | undefined;
}

export const GalleryQueryHelper = {

    buildEmpty,
    buildFromLocationSearch

}

function buildEmpty(): IGalleryUrlQuery {
    return { q: undefined };
}

function buildFromLocationSearch(search: string): IGalleryUrlQuery {
    const searchParams = new URLSearchParams(search);
    return {
        q: searchParams.get('q') || undefined
    };
}