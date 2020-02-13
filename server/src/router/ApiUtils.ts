import { NextFunction } from 'express';
import { Params, ParamsDictionary, Request, RequestHandler, Response } from 'express-serve-static-core';
import httpCodes from 'http-status-codes';

export interface AsyncHandler<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any> {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
    (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction): Promise<any>
}

export function requestHandlerWraper<P extends Params, ResBody, ReqBody>(handler: AsyncHandler<P, ResBody, ReqBody>) {

    const wraper: RequestHandler<P, ResBody, ReqBody> =
        (req, res, next) => {
            handler(req, res, next)
                .catch(e => {
                    console.log(e);
                    if (typeof e.message === 'string' && typeof e.response.status === 'number') {
                        res.status(e.response.status).send(e.message);
                    }
                    else if (typeof e.status === 'number' && typeof e.statusText === 'string') {
                        res.status(e.status).json(e.statusText).send();
                    }
                    else {
                        res.sendStatus(httpCodes.INTERNAL_SERVER_ERROR);
                    }
                });
        };

    return wraper;
}