import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { Router } from '@angular/router';
import { DataSpainService } from 'src/app/shared/services/dataSpain/data-spain.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { Municipality, Province } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  province = '';
  municipality = '';
  provinces: Province[];
  municipalities: Municipality[];
  municipalitiesFilter: Municipality[];
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

  constructor(public formBuilder: FormBuilder, public database: IDatabase, public router: Router, public dataSpain: DataSpainService, private notification: NotificationService) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])),
      surname: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])),
      dni: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$')])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      municipality: new FormControl('', Validators.compose([Validators.required])),
      province: new FormControl('', Validators.compose([Validators.required])),
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
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  ngOnInit(): void {
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

  async onSubmit() {
    try {
      const user = await this.database.signUpUser(this.registerForm.value.name, this.registerForm.value.surname, this.registerForm.value.dni, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.phone, this.registerForm.value.municipality, this.registerForm.value.province);
      const userLogin = await this.database.getCurrentUser();
      if (userLogin) {
        this.router.navigate(['']);
      } else {
        this.notification.open('emailexist');
      }
    } catch (error) {
      console.log(error);
    }
  }

  changeMunicipality(id: string) {
    this.municipalitiesFilter = [];
    for (const municipality of this.municipalities) {
      if (municipality.id.substring(0, 2) === id) {
        this.municipalitiesFilter.push(municipality);
      }
    }
  }

}
