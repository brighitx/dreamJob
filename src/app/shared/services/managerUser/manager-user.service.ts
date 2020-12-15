import { Userable } from './../../models/interfaces/userable';
import { User } from './../../models/user.model';
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
export class ManagerUserService {
  private users: Observable<Userable[]>;
  private userColection: AngularFirestoreCollection<Userable>;

  constructor(private firestore: AngularFirestore, public firebaseAuth: AngularFireAuth, public firestorage: AngularFireStorage, private notification: NotificationService) { }

  async signIn(email: string, password: string) {
    try {
      const result = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        this.notification.open('passworderror');
      }
      if (error.code === 'auth/user-not-found') {
        this.notification.open('accountnoexist');
      }
    }
  }

  async getCurrentUser() {
    return this.firebaseAuth.authState.pipe(first()).toPromise();
  }

  async sendPasswordResetEmail(email: string) {
    try {
      const result = await this.firebaseAuth.sendPasswordResetEmail(email).then(res => {
        this.notification.open('sendPasswordResetEmail');
      });
      return result;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        this.notification.open('accountnoexist');
      }
    }
  }

  async updatePassword(password: string) {
    try {
      const result = await (await this.firebaseAuth.currentUser).updatePassword(password).then(res => {
        this.notification.open('updatePassword');
      });
      return result;
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        this.notification.open('loginagain');
      }
    }
  }

  async logout() {
    try {
      await this.firebaseAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async uploadImage(id, path) {
    try {
      const result = await this.firestorage.upload('/' + id, path).then(res => {
        this.notification.open('uploadImage');
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(nameIn: string, surnameIn: string, dniIn: string, emailIn: string, passwordIn: string, phoneIn: string, municipalityIn: string, provinceIn: string) {
    try {
      const result = await this.firebaseAuth.createUserWithEmailAndPassword(emailIn, passwordIn).then(res => {
        this.userColection = this.firestore.collection<Userable>('users');
        this.userColection.doc(res.user.uid).set({
          name: nameIn,
          surname: surnameIn,
          dni: dniIn,
          email: emailIn,
          phone: phoneIn,
          address: {
            municipality: municipalityIn,
            province: provinceIn
          },
          image: ''
        });
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getCollectionUsers() {
    this.userColection = this.firestore.collection<Userable>('users');
    this.users = this.userColection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.users;
  }

  async updateProfile(id: string, nameIn: string, surnameIn: string, dniIn: string, emailIn: string, phoneIn: string, municipalityIn: string, provinceIn: string) {
    try {
      const result = await (await this.firebaseAuth.currentUser).updateEmail(emailIn).then(res => {
        this.userColection = this.firestore.collection<Userable>('users');
        this.userColection.doc(id).update({
          name: nameIn,
          surname: surnameIn,
          dni: dniIn,
          email: emailIn,
          phone: phoneIn,
          address: {
            municipality: municipalityIn,
            province: provinceIn
          }
        });
        this.notification.open('updateProfile');
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getUser(id: string) {
    this.userColection = this.firestore.collection<Userable>('users');
    return this.userColection.doc<Userable>(id).valueChanges().pipe(
      take(1), map(user => {
        user.id = id;
        return user;
      })
    );
  }


  addImage(id, url) {
    try {
      this.userColection = this.firestore.collection<Userable>('users');
      this.userColection.doc(id).update({
        image: url
      });
    } catch (error) {
      console.log(error);
    }
  }
}
