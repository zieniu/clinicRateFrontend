// ##################### MODULES #######################

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ################### COMPONENTS ######################
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from 'src/_modules/_routing/app-routing.module';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';

// ################### SERVICES #########################
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    ClinicHttpService,
  ],
  bootstrap: [AppComponent]
}) export class AppModule { }
