import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DictCity } from 'src/_models/dictCity';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';
import { ClinicDeleteComponent } from './clinic-delete/clinic-delete.component';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { ClinicAddressComponent } from './clinic-address/clinic-address.component';
import { Clinic } from 'src/_models/Clinic';

@Component({
  selector: 'app-clinic-more-info',
  templateUrl: './clinic-more-info.component.html',
  styleUrls: ['./clinic-more-info.component.scss']
})
export class ClinicMoreInfoComponent implements OnInit {
  mapGoogle = '/assets/capture.png';

  cities: any; // zmienna odpowiadająca za przechowywanie slowników dotyczących nazw miast

  constructor(public dialogRef: MatDialogRef<ClinicMoreInfoComponent>,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  applyFilter(filterValue: string) { // Filtrowanie klinik
    this.cities.filter = filterValue.trim().toLowerCase();
  }

  openDeleteDialog() { // metoda otwierajaca okno z potwierdzeniem usuniecia kliniki
    let dialogRef;
    dialogRef = this.dialog.open(ClinicDeleteComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === null) {
        this.data.delete = true; // ustawianie wartosci na true jezeli klinika ma byc usunięta
      } else {
        console.log('The dialog was closed');
      }
    });
  }

  openAddressDialog(viewTicket: Clinic) { // wprowadzanie badz edycja adresu kliniki
    let ticket = new Clinic();

    if (viewTicket) {
      Object.assign(ticket, viewTicket);
    } else {
      ticket = new Clinic();
    }

    let dialogRef;
    dialogRef = this.dialog.open(ClinicAddressComponent, {
      data: { ticket: ticket },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => { // zmiana adresu i zwrocenie danych
      this.data.ticket.city = result.ticket.city;
      this.data.ticket.province = result.ticket.province;
      this.data.ticket.street = result.ticket.street;
      this.data.ticket.postCode = result.ticket.postCode;
    });
  }

}
