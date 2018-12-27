import { NgModule } from '@angular/core';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';
import { PagesComponent } from './index';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from 'src/_modules/_routing/app-routing.module';
import { HelpModule } from './help/help.module';
import { PagesRoutingModule } from 'src/_modules/_routing/pages.routing.module';
import { ClinicComponent } from './clinic/clinic.component';
import { ClinicModule } from './clinic/clinic.module';
import { CityModule } from './settings/city/city.module';
import { ProvinceModule } from './settings/province/province.module';
import { UserModule } from './settings/user/user.module';

@NgModule({
  imports: [
    HomeModule,
    HelpModule,
    CityModule,
    UserModule,
    ClinicModule,
    CommonModule,
    ProvinceModule,
    AngularMaterialModule,
    PagesRoutingModule,
  ],
  declarations: [
    PagesComponent,
    ToolbarComponent,
  ]
}) export class PagesModule { }
