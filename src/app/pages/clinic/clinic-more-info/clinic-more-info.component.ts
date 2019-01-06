import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ClinicDeleteComponent } from './clinic-delete/clinic-delete.component';
import { ClinicAddressComponent } from './clinic-address/clinic-address.component';
import { Clinic } from 'src/_models/Clinic';
import { RoleGuardService } from 'src/_services/role-guard.service';
import { Role } from 'src/_models/users';
import { Opinion } from 'src/_models/opinion';
import { OpinionHttpService } from 'src/_services/http/opinion-http.service';
import { reduce } from 'rxjs/operators';

interface Sort {
  value?: string;
  viewValue?: string;
}

@Component({
  selector: 'app-clinic-more-info',
  templateUrl: './clinic-more-info.component.html',
  styleUrls: ['./clinic-more-info.component.scss']
})
export class ClinicMoreInfoComponent implements OnInit {
  mapGoogle = '/assets/capture.png';
  role = Role;

  sorts: Sort[] = [
    { value: 'Opinia1', viewValue: 'Najnizsze oceny' },
    { value: 'Opinia2', viewValue: 'Najnizsze oceny' },
    { value: 'Data1', viewValue: 'Najnowsze' },
    { value: 'Data2', viewValue: 'Najstarsze' }
  ];

  cities: any; // zmienna odpowiadająca za przechowywanie slowników dotyczących nazw miast
  opinions: Array<Opinion> = new Array<Opinion>(); // lista opinii
  newOpinion: Opinion = new Opinion(); // dodawanie nowej opinii
  average: number; // srednia ocen
  rate: number;

  constructor(public dialogRef: MatDialogRef<ClinicMoreInfoComponent>, public roleGuardService: RoleGuardService,
    private opinionHttpService: OpinionHttpService,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.opinionHttpService.getOpinionsByClinic(this.data.ticket.clinicId).subscribe(src => {
      this.opinions = src;
      this.averageRate(src);
    });

    this.checkLogin(); // sprawdzanie loginu aktualnie zalogowanego uzytkownika
  }

  applyFilter(filterValue: string) { // Filtrowanie klinik
    this.cities.filter = filterValue.trim().toLowerCase();
  }

  checkLogin(): boolean { // funkcja sprawdzajaca login uzytkownika
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.newOpinion.username = currentUser.login;
      return true;
    }
    return false;
  }

  averageRate(opinions: Opinion[]) { // obliczanie sredniej opinii
    const sum = opinions.reduce((acc, curr) => acc + curr.rate, 0);
    this.average = Math.round(sum / opinions.length);
  }

  addOpinion() { // dodawanie nowej opinii
    this.newOpinion.rate = this.rate;
    this.newOpinion.clinicId = this.data.ticket.clinicId;
    this.opinionHttpService.addOpinion(this.newOpinion).subscribe(src => {
      this.opinions.push(this.newOpinion);
      this.newOpinion = new Opinion();
    });
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
