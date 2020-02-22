import AnimatedLoader from 'main/components/AnimatedLoader';
import FullScreenContainer from 'main/components/FullScreenContainer';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { HomePage } from './home/HomePage';
import { Path } from './Path';


const LazyGalleryPage = React.lazy(() => import(/* webpackChunkName: "GalleryPage" */ './gallery/GalleryPage'));

export interface IAppRouterProps {

}

export const AppRouter: React.FC<IAppRouterProps> = (props) => {
    return (
        <React.Suspense fallback={
            <FullScreenContainer position='absolute'>
                <AnimatedLoader />
            </FullScreenContainer>
        }>
            <Switch>
                <Route
                    path={Path.galleryRoute}
                    render={(routeProps) => <LazyGalleryPage routeProps={routeProps} />}
                />
                <Route
                    path={Path.homeRoute}
                    exact={true}
                    render={() => <HomePage />}
                />
                <Route render={() => <div>404</div>} />
            </Switch>
        </React.Suspense>
    );
}