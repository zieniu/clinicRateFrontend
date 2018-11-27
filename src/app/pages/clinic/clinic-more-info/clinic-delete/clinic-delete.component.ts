import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-clinic-delete',
  templateUrl: './clinic-delete.component.html'
})
export class ClinicDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClinicDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  content: string;

  ngOnInit() {
    this.content = 'Czy aby napewno chcesz usunąć klinikę?';
  }

}
