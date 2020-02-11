import { IImageQueryRespBody } from '@shared/';
import axios from 'axios';
import * as React from 'react';

import style from './app.module.css';

export const App = () => {

    React.useEffect(() => {
        axios.get<IImageQueryRespBody>('/api/images/query?q=cats')
            .then(val => console.log(val.data.giphy));
    }, []);

    return <div className={style.red}>Hello world</div>;
}
