// ##################### MODULES #######################

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ################### COMPONENTS ######################
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from 'src/_modules/_routing/app-routing.module';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
}) export class AppModule { }
