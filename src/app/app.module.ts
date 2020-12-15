import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { SETTINGS, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { IDatabase } from './shared/interfaces/database-i';
import { AdapterDatabaseService } from './shared/services/adapterDatabase/adapter-database.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SearchModule } from './modules/search/search.module';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFireAuthModule,
    LoginModule,
    HomeModule,
    ProfileModule,
    SearchModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AngularFirestore,
    AngularFireAuthModule,
    { provide: SETTINGS, useValue: {} },
    { provide: IDatabase, useClass: AdapterDatabaseService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
