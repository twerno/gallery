import express, { Router } from 'express';

import { loadProperties } from './helpers/Properties';
import { ImagesApi } from './router/images/ImagesApi';
import { ImagesService } from './router/images/ImagesService';

const port = 3333;

export async function initServer(): Promise<{ app: express.Express, port: number }> {
    const app = express();

    // load properties
    const properties = loadProperties();

    // router
    const router = Router();
    app.use(router);

    const registerApi = (path: string, api: { router: Router }) => {
        router.use(path, api.router);
    }

    // services
    const imagesService = new ImagesService(properties);

    // API
    registerApi('/image', new ImagesApi(imagesService));

    // tick
    app.get("/", (req, res) => {
        res.send("Server is working");
    });

    return { app, port };
}
