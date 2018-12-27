import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from 'src/app/pages';
import { HomeComponent } from 'src/app/pages/home';
import { HelpComponent } from 'src/app/pages/help';
import { NgModule } from '@angular/core';
import { ClinicComponent, ClinicTMPListComponent } from 'src/app/pages/clinic';
import { CityComponent } from 'src/app/pages/settings/city';
import { ProvinceComponent } from 'src/app/pages/settings/province';
import { RoleGuard } from 'src/_guards/role.guard';
import { Role } from 'src/_models/users';
import { UserListComponent } from 'src/app/pages/settings/user';

const pagesRoutes: Routes = [{
  path: 'pages', component: PagesComponent, children: [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'clinic',
      component: ClinicComponent
    },
    {
      path: 'settings',
      children: [
        {
          path: 'city',
          component: CityComponent,
          canActivate: [RoleGuard],
          data: {
            expectedRole: Role.Moderator
          }
        },
        {
          path: 'province',
          component: ProvinceComponent,
          canActivate: [RoleGuard],
          data: {
            expectedRole: Role.Moderator
          }
        },
        {
          path: 'clinicTMP',
          component: ClinicTMPListComponent,
          canActivate: [RoleGuard],
          data: {
            expectedRole: Role.Moderator
          }
        },
        {
          path: 'users',
          component: UserListComponent,
          canActivate: [RoleGuard],
          data: {
            expectedRole: Role.Moderator
          }
        }
      ]
    },
    {
      path: 'help',
      component: HelpComponent
    }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(pagesRoutes)
  ],
  exports: [RouterModule]
}) export class PagesRoutingModule { }
