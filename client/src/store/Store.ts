import { combineReducers, compose, createStore } from 'redux';
import { galleryReducer } from 'routes/gallery/redux/GalleryReducer';


const rootReducer = combineReducers({
    gallery: galleryReducer
})

export type RootState = ReturnType<typeof rootReducer>

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, {}, composeEnhancers());

// import { createStore } from 'redux';

// const store = createStore(todoApp)

// store.js
// import { createStore, setStore } from 'hooks-for-redux';

// export default setStore(createStore({}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
// import { RootAction, RootState, Services } from 'MyTypes';
// import { applyMiddleware, createStore } from 'redux';
// import { createEpicMiddleware } from 'redux-observable';

// import services from '../services';
// import rootEpic from './root-epic';
// import rootReducer from './root-reducer';
// import { composeEnhancers } from './utils';

// // browser history
// export const history = createBrowserHistory();

// export const epicMiddleware = createEpicMiddleware<
//     RootAction,
//     RootAction,
//     RootState,
//     Services
// >({
//     dependencies: services,
// });

// const routerMiddleware = createRouterMiddleware(history);

// // configure middlewares
// const middlewares = [epicMiddleware, routerMiddleware];
// // compose enhancers
// const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// // rehydrate state on app start
// const initialState = {};

// // create store
// const store = createStore(rootReducer(history), initialState, enhancer);

// epicMiddleware.run(rootEpic);

// // export store singleton instance
// export default store;