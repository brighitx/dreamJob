import { Address } from './enterprise.model';
export class Offer {
    _id: string;
    _title: string;
    _enterprise: Enterprise;
    _candidates: string[];
    _description: string;
    _ubication: string;
    _date: string;
    _employments: number;
    
    constructor(id: string, title: string, enterprise: Enterprise, candidates: string[], description: string, ubication: string, date: string, employments: number) {
        this._id = id;
        this._title = title;
        this._enterprise = enterprise;
        this._candidates = candidates;
        this._description = description;
        this._ubication = ubication;
        this._date = date;
        this._employments = employments;
    }
    public get id(): string {
        return this._id;
    }
    public get title(): string {
        return this._title;
    }
    public get enterprise(): Enterprise {
        return this._enterprise;
    }
    public get candidates(): string[] {
        return this._candidates;
    }
    public get description(): string {
        return this._description;
    }
    public get ubication(): string {
        return this._ubication;
    }
    public get date(): string {
        return this._date;
    }
    public get employments(): number {
        return this._employments;
    }

    public set id(value: string) {
        this._id = value;
    }
    public set title(value: string) {
        this._title = value;
    }
    public set enterprise(value: Enterprise) {
        this._enterprise = value;
    }
    public set candidates(value: string[]) {
        this._candidates = value;
    }
    public set description(value: string) {
        this._description = value;
    }
    public set ubication(value: string) {
        this._ubication = value;
    }
    public set date(value: string) {
        this._date = value;
    }
    public set employments(value: number) {
        this._employments = value;
    }
}

export class Enterprise {
    id: string;
    name: string;
    cif: string;
    phone: string;
    description: string;
    email: string;
    address: Address;
    offers: string[];
}