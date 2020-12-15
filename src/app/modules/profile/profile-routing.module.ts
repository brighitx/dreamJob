import { LobbyViewComponent } from './components/lobby-view/lobby-view.component';
import { ViewCandidatesComponent } from './components/view-candidates/view-candidates.component';
import { ViewOfferComponent } from './components/view-offer/view-offer.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'perfil', pathMatch: 'full' },
  {
    path: 'perfil', component: ProfileHeaderComponent, children: [
      { path: '', component: ProfileComponent },
      { path: 'crearOferta', component: CreateOfferComponent },
      {
        path: 'verOfertas', component: LobbyViewComponent, children: [
          { path: '', component: ViewOfferComponent },
          { path: 'verCandidatos/:id', component: ViewCandidatesComponent }
        ]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
