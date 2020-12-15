import { Observable } from 'rxjs';
import { Enterprise } from '../models/offer.model';
import { User } from './../models/user.model';
export abstract class IDatabase {
    abstract signIn(email: string, password: string): Promise<any>;
    abstract logout();
    abstract getCurrentUser();
    abstract sendPasswordResetEmail(email: string);
    abstract updatePassword(password: string);
    abstract uploadImage(id, path);

    abstract signUpUser(name: string, surname: string, dni: string, email: string, password: string, phone: string, municipality: string, province: string): Promise<any>;
    abstract updateProfileUser(id: string, name: string, surname: string, dni: string, email: string, phone: string, municipality: string, province: string);
    abstract getCollectionUsers();
    abstract getUser(id: string);
    abstract addImage(id: string, url: string);

    abstract deleteUser(id: string): Promise<any>;
    abstract createOffer(id: string, title: string, enterprise: Enterprise, description: string, ubication: string, date: string, employments: number);
    abstract getOffer(id: string);
    abstract getCollectionOffers();
    abstract deleteOffer(id: string);
    abstract addCandidateOffer(id: string);

    abstract signUpEnterprise(name: string, cif: string, phone: string, province: string, description: string, email: string, password: string);
    abstract updateProfileEnterprise(id: string, name: string, cif: string, phone: string, province: string, description: string, email: string);
    abstract getCollectionEnterprises();
    abstract getEnterprise(id: string);
    abstract addOffer(idOffer: string);
    abstract removeOffer(idOffer: string);
}