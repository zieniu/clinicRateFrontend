import { Pipe, PipeTransform } from '@angular/core';
import { Role } from 'src/_models/users';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  role = Role;
  roles: any;

  transform(value: number, args?: any): any {
    for (const key in this.role) {
      if (this.role.hasOwnProperty(key)) {
        if (key === value.toString()) {
          const element = this.role[key];
          return element;
        }
      }
    }
  }

}
