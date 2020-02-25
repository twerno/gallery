import { IGalleryUrlQuery, Path } from 'main/routes/Path';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import HomeContainer from './components/styled/HomeContainer';
import HomePageSearchForm from './components/styled/HomePageSearchForm';

export interface IHomePageProps {
}

export const HomePage = (props: IHomePageProps) => {

    const history = useHistory();

    const searchParams = new URLSearchParams(history.location.search);
    const query: IGalleryUrlQuery = { q: searchParams.get('q') || '' };

    const onSubmit = async (values: IGalleryUrlQuery) => {
        const newPath = Path.galleryUrl({ q: values.q });
        history.push(newPath);
    }

    return (
        <HomeContainer>
            <h1>React Gallery</h1>
            <HomePageSearchForm initialValues={query} onSubmit={onSubmit} />
        </HomeContainer>
    );
}