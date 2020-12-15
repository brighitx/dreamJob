import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Enterprise } from './../../../../shared/models/enterprise.model';
import { Component, OnInit } from '@angular/core';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { Municipality, Province, User } from 'src/app/shared/models/user.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataSpainService } from 'src/app/shared/services/dataSpain/data-spain.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isCheck: boolean = false;
  isCheckEnterprise: boolean = false;
  user: User;
  enterprise: Enterprise;
  registerForm: FormGroup;
  registerFormEnterprise: FormGroup;
  changePassword: FormGroup;

  provinces: Province[];
  municipalities: Municipality[];
  municipalitiesFilter: any[];

  image: String;
  pdf: String;

  url: Observable<any>;
  enableButtonUpload: boolean = false;
  enableButtonUploadPdf: boolean = false;
  id: string;

  error_messages = {
    'name': [
      { type: 'required', message: 'Introduce tu nombre.' },
      { type: 'pattern', message: 'Introduce un nombre correcto' }
    ],
    'surname': [
      { type: 'required', Bmessage: 'Introduce tu apellido.' },
      { type: 'pattern', message: 'Introduce un apellido correcto' }
    ],
    'dni': [
      { type: 'required', message: 'Introduce tu DNI/NIF.' },
      { type: 'pattern', message: 'Introduce un DNI/NIF correcto' }
    ],
    'email': [
      { type: 'required', message: 'Introduce tu correo electrónico.' },
      { type: 'pattern', message: 'Introduce un correo electrónico correcto' }
    ],
    'phone': [
      { type: 'required', message: 'Introduce tu teléfono.' },
      { type: 'pattern', message: 'Introduce un teléfono correcto' }
    ],
    'municipality': [
      { type: 'required', message: 'Introduce tu municipio.' },
    ],
    'province': [
      { type: 'required', message: 'Introduce tu provincia.' },
    ],
    'description': [
      { type: 'required', message: 'Introduce una descripción.' },
    ],
    'cif': [
      { type: 'required', message: 'Introduce tu CIF.' },
      { type: 'pattern', message: 'Introduce un CIF correcto' }
    ],
    'password': [{
      type: 'required',
      message: 'Introduce tu contraseña.'
    },
    {
      type: 'minlength',
      message: 'Longitud de contraseña incorrecto. Minimo 6 caracteres, Maximo 12 caracteres'
    },
    {
      type: 'maxlength',
      message: 'Longitud de contraseña incorrecto. Minimo 6 caracteres, Maximo 12 caracteres'
    }
    ],
    'confirmpassword': [{
      type: 'required',
      message: 'Introduce tu contraseña.'
    },
    {
      type: 'minlength',
      message: 'Longitud de contraseña incorrecto. Minimo 6 caracteres, Maximo 12 caracteres'
    },
    {
      type: 'maxlength',
      message: 'Longitud de contraseña incorrecto. Minimo 6 caracteres, Maximo 12 caracteres'
    }
    ],
  }

  constructor(public database: IDatabase, public formBuilder: FormBuilder, public dataSpain: DataSpainService, public firestorage: AngularFireStorage, public notification: NotificationService, public router: Router, private route: ActivatedRoute) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])),
      surname: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])),
      dni: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$')])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      municipality: new FormControl('', Validators.compose([Validators.required])),
      province: new FormControl('', Validators.compose([Validators.required])),
    });

    this.registerFormEnterprise = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])),
      cif: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[ABEH][0-9]{8}$')])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      province: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    });

    this.changePassword = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])),
    }, {
      validators: this.password.bind(this)
    });

    this.registerForm.disable();
    this.registerFormEnterprise.disable();
    this.changePassword.disable();
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  async ngOnInit() {
    this.checkedUser();
    this.getImage();
    this.getProvincesAndMunicipalities();
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

  async onSubmitUser() {
    try {
      const user = await this.database.updateProfileUser(this.user.id, this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.dni, this.registerForm.value.email, this.registerForm.value.phone, this.registerForm.value.municipality, this.registerForm.value.province);
    } catch (error) {
      console.log(error);
    }
  }

  async onSubmitEnterprise() {
    try {
      const user = await this.database.updateProfileEnterprise(this.enterprise.id, this.registerFormEnterprise.value.name, this.registerFormEnterprise.value.cif, this.registerFormEnterprise.value.phone, this.registerFormEnterprise.value.province, this.registerFormEnterprise.value.description, this.registerFormEnterprise.value.email);
    } catch (error) {
      console.log(error);
    }
  }

  async onSubmitPassword() {
    try {
      const user = await this.database.updatePassword(this.changePassword.value.password);
    } catch (error) {
      console.log(error);
    }
  }

  async checkedUser() {
    const userLogin = await this.database.getCurrentUser();
    this.id = userLogin.uid;
    this.database.getCollectionUsers().subscribe(res => {
      for (const user of res) {
        if (user.id === this.id) {
          this.isCheck = true;
          this.municipalitiesFilter = [];
          this.user = user;
          this.municipalitiesFilter.push(this.user.address.municipality);
          this.registerForm.controls['name'].setValue(this.user.name);
          this.registerForm.controls['surname'].setValue(this.user.surname);
          this.registerForm.controls['dni'].setValue(this.user.dni);
          this.registerForm.controls['email'].setValue(this.user.email);
          this.registerForm.controls['phone'].setValue(this.user.phone);
          this.registerForm.controls['municipality'].setValue(this.user.address.municipality);
          this.registerForm.controls['province'].setValue(this.user.address.province);
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
          this.registerFormEnterprise.controls['name'].setValue(this.enterprise.name);
          this.registerFormEnterprise.controls['cif'].setValue(this.enterprise.cif);
          this.registerFormEnterprise.controls['phone'].setValue(this.enterprise.phone);
          this.registerFormEnterprise.controls['province'].setValue(this.enterprise.address.province);
          this.registerFormEnterprise.controls['description'].setValue(this.enterprise.description);
          this.registerFormEnterprise.controls['email'].setValue(this.enterprise.email);
        }
      }
    });
  }

  activeForm() {
    this.registerForm.enable();
    this.registerFormEnterprise.enable();
  }
  activeChangePassword() {
    this.changePassword.enable();
  }

  upload($event) {
    console.log($event.target.files[0]);
    this.image = $event.target.files[0];
    this.enableButtonUpload = true;
  }
  uploadImage() {
    this.database.uploadImage(this.id, this.image).then(res => {
      this.ngOnInit();
    });
  }
  async getImage() {
    try {
      const userLogin = await this.database.getCurrentUser();
      const url = await this.firestorage.storage.ref('/' + userLogin.uid).getDownloadURL().then(res => {
        this.url = res;
        if (this.isCheck) {
          this.database.addImage(userLogin.uid, res);
        }
      });
    } catch (error) {
      const userLogin = await this.database.getCurrentUser();
      const url = await this.firestorage.storage.ref('/' + 'defaultimage.png').getDownloadURL().then(res => {
        this.url = res;
        if (this.isCheck) {
          this.database.addImage(userLogin.uid, 'https://firebasestorage.googleapis.com/v0/b/briapispotify.appspot.com/o/defaultimage.png?alt=media&token=1914d509-a553-452d-93c3-e4c0f01db454');
        }
      });
    }
  }

  goToCreateOffer() {
    this.router.navigate(['crearOferta'], { relativeTo: this.route });
  }
  goToViewOffer() {
    this.router.navigate(['verOfertas'], { relativeTo: this.route });
  }
}


