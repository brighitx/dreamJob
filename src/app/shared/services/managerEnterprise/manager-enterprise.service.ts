import { Enterpriserable } from './../../models/interfaces/enterpriserable';
import { Enterprise } from './../../models/enterprise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, first, take } from 'rxjs/operators';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerEnterpriseService {
  private enterprises: Observable<Enterpriserable[]>;
  private enterpriseColection: AngularFirestoreCollection<Enterpriserable>;
  constructor(private firestore: AngularFirestore, public firebaseAuth: AngularFireAuth, private firestorage: AngularFireStorage, private notification: NotificationService) {
  }

  async signUpEnterprise(nameIn: string, cifIn: string, phoneIn: string, provinceIn: string, descriptionIn: string, emailIn: string, passwordIn: string) {
    try {
      const result = await this.firebaseAuth.createUserWithEmailAndPassword(emailIn, passwordIn).then(res => {
        this.enterpriseColection = this.firestore.collection<Enterpriserable>('enterprises');
        this.enterpriseColection.doc(res.user.uid).set({
          name: nameIn,
          cif: cifIn,
          phone: phoneIn,
          description: descriptionIn,
          email: emailIn,
          address: {
            province: provinceIn
          },
          offers: []
        });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getCollectionEnterprises() {
    this.enterpriseColection = this.firestore.collection<Enterpriserable>('enterprises');
    this.enterprises = this.enterpriseColection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.enterprises;
  }

  async updateProfile(id: string, nameIn: string, cifIn: string, phoneIn: string, provinceIn: string, descriptionIn: string, emailIn: string) {
    try {
      const result = await (await this.firebaseAuth.currentUser).updateEmail(emailIn).then(res => {
        this.enterpriseColection = this.firestore.collection<Enterpriserable>('enterprises');
        this.enterpriseColection.doc(id).update({
          name: nameIn,
          cif: cifIn,
          phone: phoneIn,
          description: descriptionIn,
          email: emailIn,
          address: {
            province: provinceIn
          }
        });
        this.notification.open('updateProfile');
      });
      return result;
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        this.notification.open('loginagain');
      }
    }
  }

  async addOffer(idOffer: string) {
    try {
      const result = await (await this.firebaseAuth.currentUser).uid;
      this.enterpriseColection = this.firestore.collection<Enterpriserable>('enterprises');
      let enterprise: Enterpriserable;
      this.getEnterprise(result).subscribe(res => {
        enterprise = res;
        enterprise.offers.push(idOffer);
        this.enterpriseColection.doc(result).update({
          offers: enterprise.offers
        });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async removeOffer(idOffer: string) {
    try {
      const result = await (await this.firebaseAuth.currentUser).uid;
      this.enterpriseColection = this.firestore.collection<Enterpriserable>('enterprises');
      let enterprise: Enterpriserable;
      this.getEnterprise(result).subscribe(res => {
        enterprise = res;
        const index = enterprise.offers.indexOf(idOffer);
        if (index > -1) {
          enterprise.offers.splice(index, 1);
        }
        this.enterpriseColection.doc(result).update({
          offers: enterprise.offers
        });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getEnterprise(id: string) {
    this.enterpriseColection = this.firestore.collection<Enterpriserable>('enterprises');
    return this.enterpriseColection.doc<Enterpriserable>(id).valueChanges().pipe(
      take(1), map(enterprise => {
        enterprise.id = id;
        return enterprise;
      })
    );
  }

}
