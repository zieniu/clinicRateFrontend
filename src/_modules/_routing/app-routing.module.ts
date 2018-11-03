import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages.routing.module';

export function getPagesRoutingChildren() { return PagesRoutingModule; }

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'pages', loadChildren: getPagesRoutingChildren },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
