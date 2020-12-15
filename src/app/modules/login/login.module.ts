import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterEnterpriseComponent } from './components/register-enterprise/register-enterprise.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalPasswordComponent } from './components/modal-password/modal-password.component';
@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterEnterpriseComponent, ModalPasswordComponent],
  entryComponents: [
    ModalPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RegisterEnterpriseComponent
  ]
})
export class LoginModule { }
