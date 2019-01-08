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
  ClinicAddressComponent,
  ClinicStatisticComponent
} from './index';
import { OpinionHttpService } from 'src/_services/http/opinion-http.service';
import { PagesRoutingModule } from 'src/_modules/_routing/pages.routing.module';
import {RatingModule} from 'primeng/rating';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    FormsModule,
    RatingModule,
    CommonModule,
    SearchSelectModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxMatSelectSearchModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiZCkqQJH4zYU5K4hdahJ32T7mpUrG0e0'
    })
  ],
  declarations: [
    ClinicComponent,
    ClinicMoreInfoComponent,
    ClinicDeleteComponent,
    ClinicAddressComponent,
    ClinicTMPListComponent,
    ClinicStatisticComponent,
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
