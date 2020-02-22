import { configureStore } from '@reduxjs/toolkit';
import rootReducers from './RootReducer';

export function createStore() {

    const store = configureStore({
        reducer: rootReducers
    });

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./RootReducer', () => store.replaceReducer(rootReducers))
    }

    return store;
}

export const store = createStore();