import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CityComponent,
  CityMoreInfoComponent,
  CityDeleteDialogComponent
} from './index';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [
    CityComponent,
    CityMoreInfoComponent,
    CityDeleteDialogComponent
  ],
  entryComponents: [
    CityMoreInfoComponent,
    CityDeleteDialogComponent,
  ]
})
export class CityModule { }
