import FullScreenContainer from 'main/components/FullScreenContainer';
import Alert from 'main/components/styled/StyledAlert';
import { Path } from 'main/routes/Path';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { RouteComponentProps } from 'react-router';
import { FullScreenPreview } from './components/FullScreenPreview';
import { GalleryHeader } from './components/GalleryHeader';
import { useLoadImagesController } from './controllers/useLoadImagesController';
import { usePreviewController } from './controllers/usePreviewController';
import { GalleryQueryHelper, IGalleryUrlQuery } from './model/galleryQuery';
import { GalleryContainer } from './components/gallery/GalleryStyles';
import { Gallery } from './components/gallery/Gallery';

export interface IGalleryPage {
    routeProps: RouteComponentProps<{ query?: string }>;
}

const perPageLimit = 10;

const GalleryPage = (props: IGalleryPage) => {
    const query = GalleryQueryHelper.buildFrom(props.routeProps.location.search);

    const { images, errors, isLoading, hasMorePages, triggerRefreshManually } = useLoadImagesController(
        { perPageLimit, query }
    );
    const { previewIdx, previewNextHandler, previewPrevHandler } = usePreviewController({ perPageLimit });

    const hasErrors = errors && errors.length > 0;

    const searchSubmittedHandler = (submittedQuery: IGalleryUrlQuery) => {
        if (submittedQuery.q === query.q && hasErrors) {
            triggerRefreshManually();
        }
        props.routeProps.history.push(Path.galleryUrl(submittedQuery));
    }

    return (
        <>
            <GalleryHeader query={query} onSearchSubmitted={searchSubmittedHandler} />
            {hasErrors && <Errors errors={errors} />}
            {!hasErrors && images.length > 0 &&
                <Gallery
                    images={images}
                    // canLoadMore={!isLoading && hasMorePages}
                    // query={query}
                    disabled={previewIdx !== undefined}
                />
            }
            {previewIdx !== undefined &&
                <FullScreenPreview
                    previewImg={images[previewIdx]}
                    previewNextHandler={previewNextHandler}
                    previewPrevHandler={previewPrevHandler}
                />
            }
        </>
    );
};

export default hot(GalleryPage);


const Errors: React.FC<{ errors?: string[] }> = ({ errors }) => (
    <FullScreenContainer position='relative'>
        <Alert>{errors || 'Unknown error'}</Alert>
    </FullScreenContainer>
);
