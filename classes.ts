class Vehicle {

    constructor(public color: string) { }

    protected honk(): void {
        console.log('beep')
    }

}

const vehicle = new Vehicle('white');
console.log(vehicle.color);

class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
        super(color);
    }
    private drive(): void {
        console.log('vroom vroom');
    }

    startDrivingProcess(): void {
        this.drive();
        this.honk();
        console.log(this.color);
    }
}

const car = new Car(4, 'red');

car.startDrivingProcess();
