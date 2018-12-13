import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import * as decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let tokenPayload;
    const expectedRole = route.data.expectedRole;

    const currentUser = localStorage.getItem('currentUser');
    tokenPayload = decode(currentUser);
    const role = parseInt(tokenPayload.role, 10);

    if (role < expectedRole) {
      return false;
    }
    return true;
  }
}
