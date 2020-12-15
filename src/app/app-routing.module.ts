import { SearchComponent } from './modules/search/components/search/search.component';
import { ProfileHeaderComponent } from './modules/profile/profile-header/profile-header.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { LoginComponent } from './modules/login/components/login/login.component';
import { RegisterComponent } from './modules/login/components/register/register.component';
import { RegisterEnterpriseComponent } from './modules/login/components/register-enterprise/register-enterprise.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'candidato', component: RegisterComponent },
  { path: 'empresa', component: RegisterEnterpriseComponent },
  { path: 'perfil', component: ProfileHeaderComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }, loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'buscador', component: SearchComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
