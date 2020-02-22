import * as React from 'react';
import { setConfig } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import { AppRouter } from 'main/routes/AppRouter';
import { GlobalStyle } from 'main/globalStyles';
import { Provider } from 'react-redux';
import { store } from 'main/store/Store';

setConfig({
    reloadHooks: false,
});

const App = () => {

    return (
        <Provider store={store}>
            <GlobalStyle />
            <AppRouter />
        </Provider>
    );
}

export default hot(App);

