import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-modal-password',
  templateUrl: './modal-password.component.html',
  styleUrls: ['./modal-password.component.css']
})
export class ModalPasswordComponent implements OnInit {
  resetPassword: FormGroup;

  error_messages = {
    'email': [
      { type: 'required', message: 'Introduce tu correo electrónico.' },
      { type: 'pattern', message: 'Introduce un correo electrónico válido' }
    ],
  }

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<ModalPasswordComponent>, private database: IDatabase) {
    this.resetPassword = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]))
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.database.sendPasswordResetEmail(this.resetPassword.value.email);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
