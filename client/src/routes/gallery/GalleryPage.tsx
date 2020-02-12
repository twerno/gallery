import AnimatedLoader from 'components/AnimatedLoader';
import RemainingSpaceContainer from 'components/RemainingSpaceContainer';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Gallery } from './components/Gallery';
import { GalleryHeader } from './components/Header';
import { LazyLoadMore } from './components/LazyLoadMore';
import { useLoadImagesController } from './controllers/useLoadImagesController';

export interface IGalleryPage {
    routeProps: RouteComponentProps<{ query?: string }>;
}

const perPageLimit = 10;

export const GalleryPage = (props: IGalleryPage) => {
    const query = props.routeProps.match.params.query || '';

    const { pages, hasMorePages, loadNextPageHandler, isLoading, pageIdx } = useLoadImagesController(
        { perPageLimit, query }
    );

    return (
        <>
            <GalleryHeader query={query} />
            {pages.length === 0 &&
                <LazyLoadMore
                    placeholder={<RemainingSpaceContainer><AnimatedLoader /></RemainingSpaceContainer>}
                    loadMoreCallback={loadNextPageHandler}
                    key={`load_next_page_${0}`}
                />
            }
            {pages.length > 0 &&
                <Gallery
                    pages={pages}
                    loadNextPageCallback={loadNextPageHandler}
                    hasMorePages={hasMorePages}
                    canLoadMorePages={!isLoading}
                />
            }
        </>
    );
};

