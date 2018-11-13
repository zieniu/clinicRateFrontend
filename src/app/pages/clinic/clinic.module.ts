import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';
import { ClinicComponent } from './clinic.component';
import { ClinicMoreInfoComponent } from './clinic-more-info/clinic-more-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ClinicComponent,
    ClinicMoreInfoComponent
  ],
  entryComponents: [
    ClinicMoreInfoComponent
  ],
  providers: [
    DictCityHttpService
  ]
}) export class ClinicModule { }
