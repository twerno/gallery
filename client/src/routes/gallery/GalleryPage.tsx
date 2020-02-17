import FullScreenContainer from 'components/FullScreenContainer';
import Alert from 'components/styled/Alert';
import * as React from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { IGalleryUrlQuery, Path } from 'routes/Path';

import { FullScreenPreview, IPreviewImage } from './components/FullScreenPreview';
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

    const { pages, hasMorePages, loadNextPageHandler, isLoading, errors, triggerRealoadManually } = useLoadImagesController(
        { perPageLimit, query }
    );

    const [preview, setPreview] = React.useState<IPreviewImage>(undefined);

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
            {!hasErrors && pages.length > 0 &&
                <GalleryContainer
                    pages={pages}
                    loadMoreCallback={loadNextPageHandler}
                    canLoadMore={!isLoading && hasMorePages}
                    query={query}
                    disable={!!preview}
                    setPreview={setPreview}
                />
            }
            {preview &&
                <FullScreenPreview preview={preview} setPreview={setPreview} />
            }
        </>
    );
};


const Errors: React.FC<{ errors: string[] }> = ({ errors }) => (
    <FullScreenContainer position='relative'>
        <Alert>{errors}</Alert>
    </FullScreenContainer>
);