export class Enterprise {
    _id: string;
    _name: string;
    _cif: string;
    _phone: string;
    _description: string;
    _email: string;
    _password: string;
    _address: Address;
    _offers: string[];

    constructor(id: string, name: string, cif: string, phone: string, description: string, email: string, password: string, address: Address, offers: string[]) {
        this._id = id;
        this._name = name;
        this._cif = cif;
        this._phone = phone;
        this._description = description;
        this._email = email;
        this._password = password;
        this._address = address;
        this._offers = offers;
    }
    public get id(): string {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get cif(): string {
        return this._cif;
    }
    public get phone(): string {
        return this._phone;
    }
    public get description(): string {
        return this._description;
    }
    public get email(): string {
        return this._email;
    }
    public get password(): string {
        return this._password;
    }
    public get address(): Address {
        return this._address;
    }
    public get offers(): string[] {
        return this._offers;
    }

    public set id(value: string) {
        this._id = value;
    }
    public set name(value: string) {
        this._name = value;
    }
    public set cif(value: string) {
        this._cif = value;
    }
    public set phone(value: string) {
        this._phone = value;
    }
    public set description(value: string) {
        this._description = value;
    }
    public set email(value: string) {
        this._email = value;
    }
    public set password(value: string) {
        this._password = value;
    }
    public set address(value: Address) {
        this._address = value;
    }
    public set offers(value: string[]) {
        this._offers = value;
    }
}
export class Address {
    province: string;
}
