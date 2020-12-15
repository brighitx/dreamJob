import { ManagerOfferService } from './../managerOffer/manager-offer.service';
import { ManagerEnterpriseService } from './../managerEnterprise/manager-enterprise.service';
import { User } from './../../models/user.model';
import { ManagerUserService } from './../managerUser/manager-user.service';
import { Injectable } from '@angular/core';
import { IDatabase } from '../../interfaces/database-i';
import { Observable } from 'rxjs';
import { Enterprise } from '../../models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class AdapterDatabaseService implements IDatabase {

  constructor(private managerUser: ManagerUserService, private managerEnterprise: ManagerEnterpriseService, private managerOffer: ManagerOfferService) { }

  signIn(email: string, password: string): Promise<any> {
    return this.managerUser.signIn(email, password);
  }
  logout() {
    return this.managerUser.logout();
  }
  getCurrentUser() {
    return this.managerUser.getCurrentUser();
  }
  sendPasswordResetEmail(email: string) {
    return this.managerUser.sendPasswordResetEmail(email);
  }
  updatePassword(password: string) {
    return this.managerUser.updatePassword(password);
  }
  uploadImage(id: any, path: any) {
    return this.managerUser.uploadImage(id, path);
  }
  deleteUser(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  signUpUser(name: string, surname: string, dni: string, email: string, password: string, phone: string, municipality: string, province: string): Promise<any> {
    return this.managerUser.signUp(name, surname, dni, email, password, phone, municipality, province);
  }
  updateProfileUser(id: string, name: string, surname: string, dni: string, email: string, phone: string, municipality: string, province: string) {
    return this.managerUser.updateProfile(id, name, surname, dni, email, phone, municipality, province);
  }
  getCollectionUsers() {
    return this.managerUser.getCollectionUsers();
  }
  getUser(id) {
    return this.managerUser.getUser(id);
  }
  addImage(id: string, url: string) {
    return this.managerUser.addImage(id, url);
  }

  createOffer(id: string, title: string, enterprise: Enterprise, description: string, ubication: string, date: string, employments: number) {
    return this.managerOffer.createOffer(id, title, enterprise, description, ubication, date, employments);
  }
  getOffer(id: string) {
    return this.managerOffer.getOffer(id);
  }
  getCollectionOffers() {
    return this.managerOffer.getCollectionOffers();
  }
  deleteOffer(id: string) {
    return this.managerOffer.deleteOffer(id);
  }
  addCandidateOffer(id: string) {
    return this.managerOffer.addCandidateOffer(id);
  }

  signUpEnterprise(name: string, cif: string, phone: string, province: string, description: string, email: string, password: string) {
    return this.managerEnterprise.signUpEnterprise(name, cif, phone, province, description, email, password);
  }
  updateProfileEnterprise(id: string, name: string, cif: string, phone: string, province: string, description: string, email: string) {
    return this.managerEnterprise.updateProfile(id, name, cif, phone, province, description, email);
  }
  getCollectionEnterprises() {
    return this.managerEnterprise.getCollectionEnterprises();
  }
  getEnterprise(id: string) {
    return this.managerEnterprise.getEnterprise(id);
  }
  addOffer(idOffer: string) {
    return this.managerEnterprise.addOffer(idOffer);
  }
  removeOffer(idOffer: string) {
    return this.managerEnterprise.removeOffer(idOffer);
  }
}
