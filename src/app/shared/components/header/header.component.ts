import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagerUserService } from '../../services/managerUser/manager-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLogged = false;
  public user$: Observable<any> = this.database.firebaseAuth.user;
  constructor(public database: ManagerUserService, public router: Router) { }

  async ngOnInit() { }

  async onLogout() {
    try {
      await this.database.logout();
      this.router.navigate(['']);
    } catch (error) { console.log(error); }
  }

}
