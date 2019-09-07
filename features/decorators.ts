@classDecorator
class Boat {
    @testDecorator
    color: string = 'red';

    get formattedColor(): string {
        return `this boats color is ${this.color}`;
    }

    @logError('Oops, boat was sunk')
    pilot(@perameterDecorator speed: string, @perameterDecorator generateWake: boolean): void {
        if (speed === 'fast') {
            console.log('swish');
        } else {
            console.log('nothing');
        }

    }

}

function testDecorator(target: any, key: string) {
    console.log(key);
}

function perameterDecorator(target: any, key: string, index: number) {
    console.log(key, index);
}

function classDecorator(constroctor: typeof Boat) {
    console.log(constroctor);
}

function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const method = desc.value;
        desc.value = function () {
            try {
                method();
            } catch (e) {
                console.log(errorMessage);
            }
        }
    }
}
