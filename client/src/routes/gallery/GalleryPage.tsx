import FullScreenContainer from 'components/FullScreenContainer';
import Alert from 'components/styled/Alert';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import { IGalleryUrlQuery, Path } from 'routes/Path';
import { RootState } from 'store/Store';

import { FullScreenPreview } from './components/FullScreenPreview';
import { GalleryContainer } from './components/GalleryContainer';
import { GalleryHeader } from './components/GalleryHeader';
import { useLoadImagesController } from './controllers/useLoadImagesController';

export interface IGalleryPage {
    routeProps: RouteComponentProps<{ query?: string }>;
}

const perPageLimit = 10;

export const GalleryPage = (props: IGalleryPage) => {
    const searchParams = new URLSearchParams(props.routeProps.location.search);
    const query: IGalleryUrlQuery = { q: searchParams.get('q') || undefined };
    const history = useHistory();
    const previewIdx = useSelector<RootState, number | undefined>(rootState => rootState.galleryItems.previewIdx);

    const { images, isLoading, hasMorePages, errors, triggerRefreshManually } = useLoadImagesController(
        { perPageLimit, query }
    );

    const hasErrors = errors && errors.length > 0;

    const searchSubmittedHandler = (submittedQuery: IGalleryUrlQuery) => {
        if (submittedQuery.q === query.q && hasErrors) {
            triggerRefreshManually();
        }
        history.push(Path.galleryUrl(submittedQuery));
    }

    return (
        <>
            <GalleryHeader query={query} onSearchSubmitted={searchSubmittedHandler} />
            {hasErrors && <Errors errors={errors} />}
            {!hasErrors && images.length > 0 &&
                <GalleryContainer
                    images={images}
                    canLoadMore={!isLoading && hasMorePages}
                    query={query}
                    disable={previewIdx !== undefined}
                />
            }
            {previewIdx !== undefined &&
                <FullScreenPreview previewImg={images[previewIdx]} />
            }
        </>
    );
};


const Errors: React.FC<{ errors?: string[] }> = ({ errors }) => (
    <FullScreenContainer position='relative'>
        <Alert>{errors || 'Unknown error'}</Alert>
    </FullScreenContainer>
);