import 'reflect-metadata';
import { AppRouter } from '../../AppRouters';
import { Methods } from './Methods';
import { Metadatakeys } from './MetadataKeys';
import { Request, Response, NextFunction, RequestHandler } from 'express';


function bodyValidators(keys: string): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('Bad request');
            return;
        }

        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send('Bad request');
                return;
            }
        }
        next();
    }
}


export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();
        for (let key in target.prototype) {
            const routeHandler = target.prototype[key];

            const path = Reflect.getMetadata(Metadatakeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(Metadatakeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(Metadatakeys.middleware, target.prototype, key) || [];

            const requireBodyProps = Reflect.getMetadata(Metadatakeys.validator, target.prototype, key) || [];
            const validator = bodyValidators(requireBodyProps)
            if (path) {
                router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler)
            }
        }
    }
}