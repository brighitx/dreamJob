import { Address } from './../enterprise.model';
export interface Enterpriserable {
    id?: any;
    name: string;
    cif: string;
    phone: string;
    description: string;
    email: string;
    password?: string;
    address: Address;
    offers: string[];
}
