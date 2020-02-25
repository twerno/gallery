import { ErrorRequestHandler } from "express";

export const defaultErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.sendStatus(500);
};

export const logErrors: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    next(err);
};
