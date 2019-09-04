import faker from 'faker';
import { Mappable } from './CustomMap';


export class Company implements Mappable {
    companyName: string;
    catchPhrase: string;
    location: {
        lat: number;
        lng: number;
    }
    color: string = 'red';

    constructor() {
        this.companyName = faker.company.companyName();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
    }

    markerContent(): string {
        return `
        <div>
            <h3>Comapny Name : ${this.companyName}</h3>
            <h6>Catch Phrase : ${this.catchPhrase}</h6>
        </div>
        
        `
    }
}