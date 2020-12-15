import { AngularFireStorage } from '@angular/fire/storage';
import { Offerable } from './../../models/interfaces/offerable';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { NotificationService } from '../notification/notification.service';
import { map, first, take } from 'rxjs/operators';
import { Enterprise } from '../../models/offer.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ManagerOfferService {
  private offers: Observable<Offerable[]>;
  private offerColection: AngularFirestoreCollection<Offerable>;

  constructor(private firestore: AngularFirestore, private notification: NotificationService, public firebaseAuth: AngularFireAuth) { }

  async createOffer(id: string, titleIn: string, enterpriseIn: Enterprise, descriptionIn: string, ubicationIn: string, dateIn: string, employmentsIn: number) {
    try {
      this.offerColection = this.firestore.collection<Offerable>('offers');
      this.offerColection.doc(id).set({
        title: titleIn,
        enterprise: enterpriseIn,
        candidates: [],
        description: descriptionIn,
        ubication: ubicationIn,
        date: dateIn,
        employments: employmentsIn
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOffer(id: string) {
    try {
      this.offerColection = this.firestore.collection<Offerable>('offers');
      this.offerColection.doc(id).delete();
      this.notification.open('deleteOffer');
    } catch (error) {
      console.log(error);
    }
  }

  async addCandidateOffer(idOffer: string) {
    try {
      const result = await (await this.firebaseAuth.currentUser).uid;
      this.offerColection = this.firestore.collection<Offerable>('offers');
      let offer: Offerable;
      this.getOffer(idOffer).subscribe(res => {
        offer = res;
        offer.candidates.push(result);
        let candidatesWithoutDuplicate = offer.candidates;
        candidatesWithoutDuplicate = Array.from(new Set(candidatesWithoutDuplicate));
        this.offerColection.doc(idOffer).update({
          candidates: candidatesWithoutDuplicate
        });
        this.notification.open('addCandidate');
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getCollectionOffers() {
    this.offerColection = this.firestore.collection<Offerable>('offers');
    this.offers = this.offerColection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.offers;
  }

  getOffer(id: string) {
    this.offerColection = this.firestore.collection<Offerable>('offers');
    return this.offerColection.doc<Offerable>(id).valueChanges().pipe(
      take(1),
      map(offer => {
        offer.id = id;
        return offer;
      })
    );
  }
}
