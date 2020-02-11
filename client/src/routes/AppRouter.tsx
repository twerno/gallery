import * as React from 'react';
import { Route, Switch } from 'react-router';

import { GalleryPage } from './gallery/GalleryPage';
import { HomePage } from './home/HomePage';
import { Path } from './Path';

export interface IAppRouterProps {

}

export const AppRouter: React.FC<IAppRouterProps> = (props) => {
    return (
        <Switch>
            <Route
                path={Path.galleryRoute}
                render={(routeProps) => <GalleryPage routeProps={routeProps} />}
            />
            <Route
                path={Path.homeRoute}
                exact={true}
                render={() => <HomePage />}
            />
            <Route render={() => <div>404</div>} />
        </Switch>
    );
}