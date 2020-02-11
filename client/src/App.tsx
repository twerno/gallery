import { IImageQueryRespBody } from '@shared/';
import axios from 'axios';
import { Gallery } from 'gallery/Gallery';
import * as React from 'react';

export const App = () => {

    const [state, setState] = React.useState<IImageQueryRespBody | undefined>();

    React.useEffect(() => {
        axios.get<IImageQueryRespBody>('/api/images/query?q=cats')
            .then(val => setState(val.data));
    }, []);

    console.log(state);

    return <Gallery providers={state?.providers}></Gallery>;
}
