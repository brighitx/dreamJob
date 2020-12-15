import { ModalPasswordComponent } from './../modal-password/modal-password.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  exist: boolean;
  constructor(public router: Router, public database: IDatabase, private matDialog: MatDialog, private notification: NotificationService) { }

  ngOnInit(): void { }

  createDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '550px';
    return dialogConfig;
  }

  resetPassword() {
    this.matDialog.open(ModalPasswordComponent, this.createDialogConfig());
  }

  async onSubmit() {
    try {
      const user = await this.database.signIn(this.user.email, this.user.password);
      if (user) {
        this.router.navigate(['']);
      }
    } catch (error) { }
  }
}
