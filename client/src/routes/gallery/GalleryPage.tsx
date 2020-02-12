import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Gallery } from './components/Gallery';
import { GalleryHeader } from './components/Header';
import { useLoadImagesController } from './controllers/useLoadImagesController';

export interface IGalleryPage {
    routeProps: RouteComponentProps<{ query?: string }>;
}

const perPageLimit = 10;

export const GalleryPage = (props: IGalleryPage) => {
    const query = props.routeProps.match.params.query || '';

    const { pages, hasMorePages, loadNextPageHandler, isLoading } = useLoadImagesController({ perPageLimit, query });

    return (
        <>
            <GalleryHeader query={query} />
            <Gallery
                pages={pages}
                loadNextPageCallback={loadNextPageHandler}
                hasMorePages={hasMorePages}
                addMorePagesElement={!isLoading}
            />
        </>
    );
};

