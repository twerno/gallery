import express, { Router } from 'express';
import compression from 'compression';

import { loadProperties } from './helpers/Properties';
import { ImagesApi } from './router/images/ImagesApi';
import { ImagesService } from './router/images/ImagesService';

const port = process.env.PORT && +process.env.PORT || 3333;

export async function initServer(): Promise<{ app: express.Express, port: number }> {
    const app = express();
    app.use(compression());

    // load properties
    const properties = loadProperties();

    // router
    const router = Router();
    app.use(router);
    const resources: Router = Router();
    resources.use('/js', express.static('static/js'));
    resources.use('/', express.static('static'));
    app.use(resources);

    const registerApi = (path: string, api: { router: Router }) => {
        router.use(path, api.router);
    }

    // services
    const imagesService = new ImagesService(properties);

    // API
    registerApi('/api/images', new ImagesApi(imagesService));

    return { app, port };
}
