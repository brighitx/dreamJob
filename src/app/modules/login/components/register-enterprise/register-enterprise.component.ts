import { User } from './../../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { Router } from '@angular/router';
import { DataSpainService } from 'src/app/shared/services/dataSpain/data-spain.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-register-enterprise',
  templateUrl: './register-enterprise.component.html',
  styleUrls: ['./register-enterprise.component.css']
})
export class RegisterEnterpriseComponent implements OnInit {
  registerForm: FormGroup;
  province = 'Almería';
  provinces: Array<any>;
  
  error_messages = {
    'name': [
      { type: 'required', message: 'Introduce tu nombre.' },
      { type: 'pattern', message: 'Introduce un nombre correcto' }
    ],
    'cif': [
      { type: 'required', message: 'Introduce tu CIF.' },
      { type: 'pattern', message: 'Introduce un CIF correcto' }
    ],
    'phone': [
      { type: 'required', message: 'Introduce tu teléfono.' },
      { type: 'pattern', message: 'Introduce un teléfono correcto' }
    ],
    'province': [
      { type: 'required', message: 'Selecciona tu provincia.' },
    ],
    'description': [
      { type: 'required', message: 'Introduce una descripción.' },
    ],
    'email': [
      { type: 'required', message: 'Introduce tu correo electrónico.' },
      { type: 'pattern', message: 'Introduce un correo electrónico correcto' }
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
      cif: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[ABEH][0-9]{8}$')])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
      province: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
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
    this.getProvinces();
  }

  getProvinces() {
    this.dataSpain.getProvinces().subscribe(res => {
      this.provinces = res;
    });
  }

  async onSubmit() {
    try {
      const user = await this.database.signUpEnterprise(this.registerForm.value.name, this.registerForm.value.cif, this.registerForm.value.phone, this.province, this.registerForm.value.description, this.registerForm.value.email, this.registerForm.value.password);
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

}
