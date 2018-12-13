import { Injectable } from '@angular/core';
import * as decode from 'jwt-decode';

@Injectable()
export class RoleGuardService {

  constructor() { }

  checkPermission(levelAccess: number) {
    let tokenPayload;

    const currentUser = localStorage.getItem('currentUser');
    tokenPayload = decode(currentUser);
    const role = parseInt(tokenPayload.role, 10);

    if (role < levelAccess) {
      return false;
    }
    return true;
  }
}
