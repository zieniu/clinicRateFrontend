import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';
import { DictProvinceHttpService } from 'src/_services/http/dict-province-http.service';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SearchSelectModule } from '@oasisdigital/angular-material-search-select';
import {
  ClinicComponent,
  ClinicMoreInfoComponent,
  ClinicDeleteComponent,
  ClinicTMPListComponent,
  ClinicAddressComponent
} from './index';
import { OpinionHttpService } from 'src/_services/http/opinion-http.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SearchSelectModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
    ClinicComponent,
    ClinicMoreInfoComponent,
    ClinicDeleteComponent,
    ClinicAddressComponent,
    ClinicTMPListComponent,
  ],
  entryComponents: [
    ClinicMoreInfoComponent,
    ClinicDeleteComponent,
    ClinicAddressComponent
  ],
  providers: [
    DictCityHttpService,
    DictProvinceHttpService,
    OpinionHttpService
  ]
}) export class ClinicModule { }
