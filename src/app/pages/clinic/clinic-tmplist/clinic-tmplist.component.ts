import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { Clinic } from 'src/_models/Clinic';
import { ClinicMoreInfoComponent } from '../clinic-more-info/clinic-more-info.component';
import { SnackBarService } from 'src/_services/snack-bar.service';

@Component({
  selector: 'app-clinic-tmplist',
  templateUrl: './clinic-tmplist.component.html',
  styleUrls: ['./clinic-tmplist.component.scss']
})
export class ClinicTMPListComponent implements OnInit {

  displayedColumns = ['id', 'name', 'cityId', 'provinceId', 'buttonAccept', 'buttonRemove', 'buttonMore'];
  clinicListTMP: Array<Clinic> = new Array<Clinic>(); // spis klinik dostepnych w bazie danych
  dataSource: any;


  // PAGINATOR
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];

  // PROGRESSBAR
  isLoaded = false; // do sprawdzenia czy dane już są wczytane - wtedy progress bar znika

  constructor(private dialog: MatDialog, private clinicHttpService: ClinicHttpService, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.clinicHttpService.getClinicsTMP().subscribe(src => {
      src.forEach(s => {
        const clinic = new Clinic(); // przepisywanie klinik do nowych obiektow i dodawanie ich do listy
        clinic.city = s.city,
          clinic.clinicId = s.clinicId,
          clinic.clinicName = s.clinicName,
          clinic.latitude = s.latitude,
          clinic.longitude = s.longitude,
          clinic.phoneNumber = s.phoneNumber,
          clinic.postCode = s.postCode,
          clinic.province = s.province,
          clinic.street = s.street;
        this.clinicListTMP.push(clinic);
      });
      this.dataSource = new MatTableDataSource(this.clinicListTMP);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    },
      error => {
        this.snackBarService.openSnackBar('Nieudane pobranie klinik z bazy danych.', 'BŁĄD', 'snackBar-error');
      });
  }


  // Otwieranie okna wlasciwosci kliniki
  openClinicMoreInfoModal(viewTable: any, viewTicket: Clinic, InEditMode: boolean, head: string) {
    let ticket = new Clinic();
    let isNewTicket = false;
    let deleteClinic: boolean; // zmienna okreslajaca usuniecie danej kliniki
    deleteClinic = false;
    const clinicTMP = true; // okreslanie czy klinika jest tymczasowa czy nie

    if (viewTicket) {
      Object.assign(ticket, viewTicket);
    } else {
      ticket = new Clinic();
      isNewTicket = true;
    }

    const detailsModalRef = this.dialog.open(ClinicMoreInfoComponent, { // otwieranie nowego okna i przekazywanie do niego parametrow
      data: { ticket: ticket, isInEditMode: InEditMode, header: head, delete: deleteClinic, clinicTMP: clinicTMP }
    });

    detailsModalRef.afterClosed().subscribe(result => {
      if (result !== undefined) { // jezeli dane przeszły walidacje
        this.clinicHttpService.updateClinic(result.ticket).subscribe(src => {
          viewTicket.copyValues(ticket);
          viewTable.renderRows();
          console.log(src);
          // this.snackBarService.openSnackBar('Operacja udana.', 'Potwierdzenie', 'snackBar-success');
        }, error => {
          console.log(error);
          this.snackBarService.openSnackBar('Nieudane otwieranie okna właciwosci.', 'BŁĄD', 'snackBar-error');
        });
      }
    });
  }

  acceptClinic(table: any, clinic: Clinic) { // akceptowanie kliniki
    clinic.accepted = 1;
    this.clinicHttpService.updateClinic(clinic).subscribe(src => {
      const index = this.clinicListTMP.indexOf(clinic);
      if (index > -1) {
        this.clinicListTMP.splice(index, 1);
        this.dataSource.data = this.clinicListTMP;
        table.renderRows();
      }
      table.renderRows();
      this.snackBarService.openSnackBar('Zaakceprtowano klinikę.', 'Potwierdzenie', 'snackBar-success');     },
      error => {
        this.snackBarService.openSnackBar('Akceptowanie kliniki nie powiodło się.', 'BŁĄD', 'snackBar-error');

      });
  }

  removeClinic(table: any, clinic: Clinic) { // usuniecie kliniki
    this.clinicHttpService.deleteClinic(clinic.clinicId).subscribe(src => {
      const index = this.clinicListTMP.indexOf(clinic);
      if (index > -1) {
        this.clinicListTMP.splice(index, 1);
        this.dataSource.data = this.clinicListTMP;
        table.renderRows();
      }
      table.renderRows();
      this.snackBarService.openSnackBar('Usunięto klinikę.', 'Potwierdzenie', 'snackBar-success');
    },
      error => {
        this.snackBarService.openSnackBar('Usuwanie kliniki nie powiodło się.', 'BŁĄD', 'snackBar-error');

      });
  }
}
