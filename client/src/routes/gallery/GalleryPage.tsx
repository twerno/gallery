import AnimatedLoader from 'components/AnimatedLoader';
import FullScreenContainer from 'components/FullScreenContainer';
import Alert from 'components/styled/Alert';
import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { IGalleryUrlQuery, Path } from 'routes/Path';

import { Gallery } from './components/Gallery';
import { GalleryHeader } from './components/Header';
import { LazyLoadMore } from './components/LazyLoadMore';
import { useLoadImagesController } from './controllers/useLoadImagesController';

export interface IGalleryPage {
    routeProps: RouteComponentProps<{ query?: string }>;
}

const perPageLimit = 10;

export const GalleryPage = (props: IGalleryPage) => {
    const searchParams = new URLSearchParams(props.routeProps.location.search);
    const query: IGalleryUrlQuery = { q: searchParams.get('q') || undefined };

    const { pages, hasMorePages, loadNextPageHandler, isLoading, errors, triggerRealoadManually, pageIdx } = useLoadImagesController(
        { perPageLimit, query }
    );

    const hasErrors = errors.length > 0;

    const history = useHistory();

    const searchSubmittedHandler = (submittedQuery: IGalleryUrlQuery) => {
        if (submittedQuery.q === query.q && hasErrors) {
            triggerRealoadManually();
        }
        history.push(Path.galleryUrl(submittedQuery));
    }

    return (
        <>
            <GalleryHeader query={query} onSearchSubmitted={searchSubmittedHandler} />
            {hasErrors && <Errors errors={errors} />}
            {!hasErrors && pages.length === 0 &&
                <LazyLoadMore
                    placeholder={<FullScreenContainer position='absolute'><AnimatedLoader /></FullScreenContainer>}
                    loadMoreCallback={loadNextPageHandler}
                    key={`load_next_page_${0}`}
                />
            }
            {!hasErrors && pages.length > 0 &&
                <Gallery
                    pages={pages}
                    loadNextPageCallback={loadNextPageHandler}
                    canLoadMorePages={!isLoading && hasMorePages}
                    query={query}
                />
            }
        </>
    );
};


const Errors: React.FC<{ errors: string[] }> = ({ errors }) => (
    <FullScreenContainer position='relative'>
        <Alert>{errors}</Alert>
    </FullScreenContainer>
);