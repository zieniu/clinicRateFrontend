import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-city-delete-dialog',
  templateUrl: './city-delete-dialog.component.html',
  styleUrls: ['./city-delete-dialog.component.scss']
})
export class CityDeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CityDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  content: string;

  ngOnInit() {
    this.content = 'Czy aby napewno chcesz usunąć etykietę?';
  }
}
