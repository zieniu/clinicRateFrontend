// ##################### MODULES #######################

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';

// ################### COMPONENTS ######################
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from 'src/_modules/_routing/app-routing.module';
import { AngularMaterialModule } from 'src/_modules/_angular-material/angular-material.module';

// ################### SERVICES #########################
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { RoleGuardService } from 'src/_services/role-guard.service';
import { AuthenticationService } from 'src/_services/authentication.service';
import { UserHttpService } from 'src/_services/http/user-http.service';

// ################### HELPERS #########################
import { JwtInterceptor } from 'src/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/_helpers/error.interceptor';

// ################### GUARDS #########################
import { RoleGuard } from 'src/_guards/role.guard';
import { AuthGuard } from 'src/_guards/auth.guard';
import { SnackBarService } from 'src/_services/snack-bar.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PagesModule,
    LoginModule,
    RegisterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    RoleGuard,
    AuthGuard,
    UserHttpService,
    RoleGuardService,
    AuthenticationService,
    ClinicHttpService,
    SnackBarService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
}) export class AppModule { }
