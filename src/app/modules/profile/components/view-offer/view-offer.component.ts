import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from './../../../../shared/models/offer.model';
import { Enterpriserable } from './../../../../shared/models/interfaces/enterpriserable';
import { Component, OnInit } from '@angular/core';
import { IDatabase } from 'src/app/shared/interfaces/database-i';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent implements OnInit {
  offers: Offer[];
  constructor(public database: IDatabase, private router: Router, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.offers = [];
    const userLogin = await this.database.getCurrentUser();
    let enterprise: Enterpriserable;
    this.database.getEnterprise(userLogin.uid).subscribe(res => {
      enterprise = res;
      for (const offer of enterprise.offers) {
        this.database.getOffer(offer).subscribe(res => {
          this.offers.push(res);
        });
      }
    });
  }

  viewCandidates(id) {
    this.router.navigate(['verCandidatos', id], { relativeTo: this.route });
  }

  deleteOffer(id: string) {
    this.database.deleteOffer(id);
    this.database.removeOffer(id);
  }
}
