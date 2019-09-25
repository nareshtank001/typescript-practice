import 'reflect-metadata';
import { Metadatakeys } from './MetadataKeys';
import { RequestHandler } from 'express';

export function use(middleware: RequestHandler) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(Metadatakeys.middleware, target, key) || [];

        Reflect.defineMetadata(Metadatakeys.middleware, [...middlewares, middleware], target, key);
    }
}