import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from 'src/app/pages';
import { HomeComponent } from 'src/app/pages/home';
import { HelpComponent } from 'src/app/pages/help';
import { NgModule } from '@angular/core';
import { ClinicComponent } from 'src/app/pages/clinic';
import { CityComponent } from 'src/app/pages/settings/city';
import { ProvinceComponent } from 'src/app/pages/settings/province';

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
          component: CityComponent
        },
        {
          path: 'province',
          component: ProvinceComponent
        },
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
