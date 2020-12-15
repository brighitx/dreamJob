import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { Enterprise } from 'src/app/shared/models/offer.model';
import { Municipality, Province } from 'src/app/shared/models/user.model';
import { DataSpainService } from 'src/app/shared/services/dataSpain/data-spain.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  idOfferGenerate: string;
  randomNumber: number;
  offerForm: FormGroup;
  provinces: Province[];
  municipalities: Municipality[];
  municipalitiesFilter: any[];
  enterprise: Enterprise;
  error_messages = {
    'title': [
      { type: 'required', message: 'Introduce un titulo para la oferta.' }
    ],
    'description': [
      { type: 'required', message: 'Introduce una descripción para la oferta.' }
    ],
    'employments': [
      { type: 'required', message: 'Introduce cuantos puestos ofrece.' }
    ],
    'province': [
      { type: 'required', message: 'Introduce la provincia del empleo.' }
    ],
    'ubication': [
      { type: 'required', message: 'Introduce la ubicación del empleo.' }
    ],
  }

  constructor(public database: IDatabase, public formBuilder: FormBuilder, public dataSpain: DataSpainService,
    public notification: NotificationService) {
    this.offerForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      employments: new FormControl('', Validators.compose([Validators.required])),
      province: new FormControl('', Validators.compose([Validators.required])),
      ubication: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void {
    this.getProvincesAndMunicipalities();
  }

  generateRandomId(): string {
    const d = new Date();
    this.randomNumber = Math.floor(Math.random() * 101);
    this.idOfferGenerate = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString()
      + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString()
      + this.randomNumber.toString();
    console.log(this.idOfferGenerate);
    return this.idOfferGenerate;
  }

  getProvincesAndMunicipalities() {
    this.dataSpain.getProvinces().subscribe(res => {
      this.provinces = res;
    });
    this.dataSpain.getMunicipalities().subscribe(res => {
      this.municipalities = res;
    });
  }

  changeMunicipality(id: string) {
    this.municipalitiesFilter = [];
    for (const municipality of this.municipalities) {
      if (municipality.id.substring(0, 2) === id) {
        this.municipalitiesFilter.push(municipality.nm);
      }
    }
  }

  async createOffer() {
    try {
      const d = new Date();
      const ubication = this.offerForm.value.ubication + ', ' + this.offerForm.value.province;
      const date = d.getFullYear().toString() + '/' + d.getMonth().toString() + '/' + d.getDate().toString();
      const userLogin = await this.database.getCurrentUser();
      const id = this.generateRandomId();
      this.database.getEnterprise(userLogin.uid).subscribe(res => {
        console.log(res);
        this.enterprise = res;
        this.database.createOffer(id, this.offerForm.value.title, this.enterprise,
          this.offerForm.value.description, ubication, date, this.offerForm.value.employments).then(res => {
            this.database.addOffer(id);
            this.notification.open('createOffer');
          });
      });
    } catch (error) {
      console.log(error);
    }
  }


}
