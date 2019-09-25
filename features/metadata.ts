import 'reflect-metadata';

/* const plane = {
    color: 'red'
}

Reflect.defineMetadata('note', 'this is note', plane);
Reflect.defineMetadata('height', 10, plane);


console.log(plane);
console.log(Reflect.getMetadata('note', plane));
console.log(Reflect.getMetadata('height', plane));

Reflect.defineMetadata('note', 'this is note', plane, 'color');
const note = Reflect.getMetadata('note', plane, 'color');
console.log(note); */

class Plane {
    color: string = 'red';

    @get('/get')
    fly(): void {
        console.log('vrrrrrrrr');
    }
}

function get(path: string) {
    return function (target: Plane, key: string) {
        Reflect.defineMetadata('path', path, target, key);
    }
}


function controller(target: typeof Plane) {
    for (let key in target.prototype) {
        const path = Reflect.getOwnMetadata('path', Plane.prototype, key);
        const middleware = Reflect.getMetadata('middleware', target.prototype, key);
        router.get(path, middleware, target.prototype[key]);
    }

}

