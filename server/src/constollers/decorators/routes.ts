import 'reflect-metadata';
import { Metadatakeys } from './MetadataKeys';
import { RequestHandler } from 'express';
import { Methods } from './Methods';

interface RequestHanlerDesciptor extends PropertyDescriptor {
    value?: RequestHandler
}
function routeBinder(method: string) {
    return function get(path: string) {
        return function (target: any, key: string, desc: RequestHanlerDesciptor) {
            Reflect.defineMetadata(Metadatakeys.path, path, target, key);
            Reflect.defineMetadata(Metadatakeys.method, method, target, key);
        }
    }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
