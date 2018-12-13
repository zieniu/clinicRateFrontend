import { Component, OnInit, Inject } from '@angular/core';
import { ProvinceDeleteDialogComponent } from './province-delete-dialog/province-delete-dialog.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-province-more-info',
  templateUrl: './province-more-info.component.html',
  styleUrls: ['./province-more-info.component.scss']
})
export class ProvinceMoreInfoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProvinceMoreInfoComponent>, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  openConfirmationDialog(): void {  // okno zatwierdzania usuniecia badz przywrocenia etykiety
    let dialogRef;
    dialogRef = this.dialog.open(ProvinceDeleteDialogComponent, {
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
