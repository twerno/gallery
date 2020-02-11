// tslint:disable-next-line:no-var-requires
require('module-alias/register');

import { initServer } from './app';

initServer()
    .then(({ app, port }) => {

        app.listen(port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`[${new Date().toISOString()}] server is listening on ${port}`);
        });

    });
