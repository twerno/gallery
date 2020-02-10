import { initServer } from './app';

require('module-alias/register');

initServer()
    .then(({ app, port }) => {

        app.listen(port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`server is listening on ${port}`);
        });

    });
