import { AngularFireStorage } from '@angular/fire/storage';
import { Enterprise } from './../../../../shared/models/enterprise.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from './../../../../shared/models/offer.model';
import { Component, OnInit } from '@angular/core';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  url = '';
  term = '';
  offers: Offer[];
  isCheck: boolean = false;
  isCheckEnterprise: boolean = false;
  user: User;
  enterprise: Enterprise;

  id: string;
  constructor(public database: IDatabase, private router: Router, private route: ActivatedRoute, public firestorage: AngularFireStorage) {
    this.term = this.route.snapshot.paramMap.get('palabra');
  }

  async ngOnInit() {
    this.database.getCollectionOffers().subscribe(res => {
      this.offers = res;
    });
    this.checkedUser();
  }

  inscribe(id: string) {
    console.log(id);
    this.database.addCandidateOffer(id);
  }

  async checkedUser() {
    const userLogin = await this.database.getCurrentUser();
    this.id = userLogin.uid;
    this.database.getCollectionUsers().subscribe(res => {
      for (const user of res) {
        if (user.id === this.id) {
          this.isCheck = true;
          this.user = user;
        }
      }
      if (!this.isCheck) {
        this.isEnterprise();
      }
    });
  }

  async isEnterprise() {
    this.database.getCollectionEnterprises().subscribe(res => {
      for (const enterprise of res) {
        if (enterprise.id === this.id) {
          this.isCheckEnterprise = true;
          this.enterprise = enterprise;
        }
      }
    });
  }

}
