import { NextFunction } from 'express';
import { Params, ParamsDictionary, Request, RequestHandler, Response } from 'express-serve-static-core';

export interface AsyncHandler<P extends Params = ParamsDictionary, ResBody = any, ReqBody = any> {
    // tslint:disable-next-line callable-types (This is extended from and can't extend from a type alias in ts<2.2
    (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction): Promise<any>
}

export const asyncRequestHandler = <P extends Params = ParamsDictionary, ResBody = any, ReqBody = any>
    (asyncHandler: AsyncHandler<P, ResBody, ReqBody>): RequestHandler<P, ResBody, ReqBody> => {
    return (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) => {
        asyncHandler(req, res, next)
            .catch(next);
    };
}