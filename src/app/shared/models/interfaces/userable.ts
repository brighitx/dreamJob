import { Address } from './../user.model';
export interface Userable {
    id?: any;
    name: string;
    surname: string;
    dni: string;
    email: string;
    password?: string;
    phone: string;
    address: Address;
    image: string;
}
