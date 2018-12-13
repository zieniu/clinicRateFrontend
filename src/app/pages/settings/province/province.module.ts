import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProvinceComponent,
  ProvinceMoreInfoComponent,
  ProvinceDeleteDialogComponent
} from './index';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule
  ],
  declarations: [
    ProvinceComponent,
    ProvinceMoreInfoComponent,
    ProvinceDeleteDialogComponent
  ],
  entryComponents: [
    ProvinceMoreInfoComponent,
    ProvinceDeleteDialogComponent
  ]
})
export class ProvinceModule { }
