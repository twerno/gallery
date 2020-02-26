import { Path } from 'main/routes/Path';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import HomeContainer from './components/styled/HomeContainer';
import HomePageSearchForm from './components/styled/HomePageSearchForm';
import { IGalleryUrlQuery, GalleryQueryHelper } from '../gallery/model/galleryQuery';

export interface IHomePageProps {
    initialQuery?: IGalleryUrlQuery;
}

export const HomePage = ({ initialQuery }: IHomePageProps) => {

    const history = useHistory();

    const onSubmit = async (values: IGalleryUrlQuery) => {
        const newPath = Path.galleryUrl({ q: values.q });
        history.push(newPath);
    }

    return (
        <HomeContainer>
            <h1>React Gallery</h1>
            <HomePageSearchForm
                initialValues={initialQuery || GalleryQueryHelper.buildEmpty()}
                onSubmit={onSubmit}
            />
        </HomeContainer>
    );
}