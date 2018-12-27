import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delete'
})
export class DeletePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let deleted;
    if (value === 0) {
      deleted = 'Dostępny';
    } else {
      deleted = 'Usunięty';
    }
    return deleted;
  }

}
