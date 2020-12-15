import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';

import { FormsModule } from '@angular/forms';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { AdapterDatabaseService } from 'src/app/shared/services/adapterDatabase/adapter-database.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    { provide: IDatabase, useClass: AdapterDatabaseService }
  ]
})
export class HomeModule { }
