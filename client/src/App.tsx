import axios from 'axios';
import * as React from 'react';

import { IImageQueryRespBody } from '../../shared/src/ImagesParams';

export const App = () => {

    React.useEffect(() => {
        axios.get<IImageQueryRespBody>('/api/images/query?q=cats')
            .then(val => console.log(val.data.giphy));
    }, []);

    return <>Hello world</>;
}
