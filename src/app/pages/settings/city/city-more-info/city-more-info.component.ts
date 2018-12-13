import { Component, OnInit, Inject } from '@angular/core';
import { CityDeleteDialogComponent } from './city-delete-dialog/city-delete-dialog.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-city-more-info',
  templateUrl: './city-more-info.component.html',
  styleUrls: ['./city-more-info.component.scss']
})
export class CityMoreInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CityMoreInfoComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  openConfirmationDialog(): void {  // okno zatwierdzania usuniecia badz przywrocenia etykiety
    let dialogRef;
    dialogRef = this.dialog.open(CityDeleteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {  // jezeli tak to wtedy zapisz
        this.data.deleted = true; // przypisanie ze slownik ma byc usuniety
      } else {
        console.log('The dialog was closed');
      }
    });
  }
}
