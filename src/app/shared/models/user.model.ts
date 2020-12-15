export class User {
    _id: string;
    _name: string;
    _surname: string;
    _dni: string;
    _email: string;
    _password: string;
    _phone: string;
    _address: Address;
    _image: string;

    constructor(id: string, name: string, surname: string, dni: string, email: string, password: string, phone: string, address: Address, image: string) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._dni = dni;
        this._email = email;
        this._password = password;
        this._phone = phone;
        this._address = address;
        this._image = image;
    }
    public get id(): string {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get surname(): string {
        return this._surname;
    }
    public get dni(): string {
        return this._dni;
    }
    public get email(): string {
        return this._email;
    }
    public get password(): string {
        return this._password;
    }
    public get phone(): string {
        return this._phone;
    }
    public get address(): Address {
        return this._address;
    }
    public get image(): string {
        return this._image;
    }

    public set id(value: string) {
        this._id = value;
    }
    public set name(value: string) {
        this._name = value;
    }
    public set surname(value: string) {
        this._surname = value;
    }
    public set dni(value: string) {
        this._dni = value;
    }
    public set email(value: string) {
        this._email = value;
    }
    public set password(value: string) {
        this._password = value;
    }
    public set phone(value: string) {
        this._phone = value;
    }
    public set address(value: Address) {
        this._address = value;
    }
    public set image(value: string) {
        this._image = value;
    }
}
export class Address {
    municipality: string;
    province: string;
}
export class Province {
    id: string;
    nm: string;
}

export class Municipality {
    id: string;
    nm: string;
}
