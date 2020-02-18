import * as React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from 'routes/AppRouter';
import { store } from 'store/Store';

export const App = () => {

    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
