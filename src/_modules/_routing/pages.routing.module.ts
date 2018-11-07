import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from 'src/app/pages';
import { HomeComponent } from 'src/app/pages/home';
import { HelpComponent } from 'src/app/pages/help';
import { NgModule } from '@angular/core';
import { ClinicComponent } from 'src/app/pages/clinic';

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
