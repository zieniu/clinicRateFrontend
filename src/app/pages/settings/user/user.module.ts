// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesRoutingModule } from 'src/_modules/_routing/pages.routing.module';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';

// Components
import { UserListComponent, UserMoreInfoComponent, UserDeleteDialogComponent } from '.';
import { SharedModule } from 'src/_shared/shared.module';
@NgModule({
  declarations: [
    UserListComponent,
    UserMoreInfoComponent,
    UserDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    AngularMaterialModule
  ],
  entryComponents: [
    UserMoreInfoComponent,
    UserDeleteDialogComponent,
  ]
})

export class UserModule { }
