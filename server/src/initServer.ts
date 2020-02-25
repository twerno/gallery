import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

import { loadProperties } from './helpers/Properties';
import ImagesApi from './router/images/ImagesApi';
import { ImagesService } from './router/images/ImagesService';
import { defaultErrorHandler, logErrors } from './router/errorHandler';

const port = process.env.PORT && +process.env.PORT || 3333;

export async function initServer(): Promise<{ app: express.Express, port: number }> {
    const app = express();
    app.use(compression());

    // load properties
    const properties = loadProperties();

    // resources
    const resources: Router = Router();
    resources.use('/js', express.static('static/js'));
    resources.use('/', express.static('static'));
    app.use(resources);

    // api router
    const apiRouter = Router();
    app.use(apiRouter);

    // services
    const imagesService = new ImagesService(properties);

    // API
    new ImagesApi('/api/images', imagesService)
        .register(apiRouter);

    app.get('*', (req, res) => {
        res.sendFile(path.join(path.resolve('./static'), 'index.html'));
    });

    app.use(logErrors);
    app.use(defaultErrorHandler);

    return { app, port };
}
