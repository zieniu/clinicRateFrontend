import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {
  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000 ,
      panelClass: [className]
    });
  }
}
