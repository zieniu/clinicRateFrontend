import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';
import { ClinicComponent } from './clinic.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  declarations: [
    ClinicComponent
  ],
  entryComponents: [

  ],
}) export class ClinicModule { }
