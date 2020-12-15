import { ProfileRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { ViewOfferComponent } from './components/view-offer/view-offer.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ViewCandidatesComponent } from './components/view-candidates/view-candidates.component';
import { LobbyViewComponent } from './components/lobby-view/lobby-view.component';

@NgModule({
  declarations: [ProfileComponent, CreateOfferComponent, ViewOfferComponent, ProfileHeaderComponent, ViewCandidatesComponent, LobbyViewComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
