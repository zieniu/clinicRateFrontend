import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-province-delete-dialog',
  templateUrl: './province-delete-dialog.component.html',
  styleUrls: ['./province-delete-dialog.component.scss']
})
export class ProvinceDeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProvinceDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  content: string;

  ngOnInit() {
    this.content = 'Czy aby napewno chcesz usunąć etykietę?';
  }
}
