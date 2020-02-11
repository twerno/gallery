import { IImageQueryRespBody } from '@shared/';
import axios from 'axios';
import { Gallery } from 'gallery/Gallery';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface IGalleryPage {
    routeProps: RouteComponentProps<{ query?: string }>;
}

export const GalleryPage = (props: IGalleryPage) => {
    const query = props.routeProps.match.params.query;

    const [state, setState] = React.useState<IImageQueryRespBody>({ providers: [] });

    React.useEffect(() => {
        axios.get<IImageQueryRespBody>(`/api/images/query?q=${query}`)
            .then(val => setState(val.data));
    }, [query]);


    return <Gallery providers={state?.providers}></Gallery>;
};
