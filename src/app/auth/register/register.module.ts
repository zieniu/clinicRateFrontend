// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';

// Components
import { RegisterComponent } from './register.component';
import { AppRoutingModule } from 'src/_modules/_routing/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
