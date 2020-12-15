import { Router } from '@angular/router';
import { User } from './../../../../shared/models/user.model';
import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { DataSpainService } from 'src/app/shared/services/dataSpain/data-spain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string;
  usersSize: any;
  enterprisesSize: any;
  offersSize: any;
  constructor(public database: IDatabase, public dataSpain: DataSpainService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.getEnterprises();
    this.getOffers();
  }

  getUsers() {
    this.database.getCollectionUsers().subscribe(res => {
      this.usersSize = res.length;
    });
  }
  getEnterprises() {
    this.database.getCollectionEnterprises().subscribe(res => {
      this.enterprisesSize = res.length;
    });
  }
  getOffers() {
    this.database.getCollectionOffers().subscribe(res => {
      this.offersSize = res.length;
    });
  }

  onSubmit() {
    console.log(this.name);
  }

  navegar() {
    this.router.navigate(['buscador', { palabra: this.name }]);
  }

}
