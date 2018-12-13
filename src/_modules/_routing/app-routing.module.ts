import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages.routing.module';
import { LoginComponent } from 'src/app/auth/login';
import { RegisterComponent } from 'src/app/auth/register';

export function getPagesRoutingChildren() { return PagesRoutingModule; }

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
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
