import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { Clinic } from 'src/_models/Clinic';
import { PageEvent, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ClinicMoreInfoComponent } from './clinic-more-info/clinic-more-info.component';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  displayedColumns = ['id', 'name', 'cityId', 'provinceId', 'buttonMore'];
  clinicList: Array<Clinic> = new Array<Clinic>();
  dataSource = new MatTableDataSource<Clinic>(this.clinicList);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // PAGINATOR
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];

  // PROGRESSBAR
  isLoaded = false; // do sprawdzenia czy dane już są wczytane - wtedy progress bar znika

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private clinicHttpService: ClinicHttpService, public dialog: MatDialog) { }

  ngOnInit() {
    this.clinicHttpService.getClinics().subscribe(src => {
      Object.assign(this.clinicList, src);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    },
      error => {
        console.log(error);
      });

  }
  // Filtrowanie klinik
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Otwieranie okna wlasciwosci jak i tworzenia nowej kliniki
  openClinicMoreInfoModal(viewTable: any, viewTicket: Clinic, InEditMode: boolean, head: string) {
    let ticket = new Clinic();
    let isNewTicket = false;
    const isInEditMode = InEditMode;

    if (viewTicket) {
      Object.assign(ticket, viewTicket);
    } else {
      ticket = new Clinic();
      isNewTicket = true;
    }

    const detailsModalRef = this.dialog.open(ClinicMoreInfoComponent, { // otwieranie nowego okna i przekazywanie do niego parametrow
      data: { ticket: ticket, isInEditMode: InEditMode, header: head }
    });

    detailsModalRef.afterClosed().subscribe(result => {
      if (result) { // jezeli dane przeszły walidacje
        if (isNewTicket) {  // jezeli tworzymy nowa klinike
          this.clinicHttpService.addClinic(result.ticket).subscribe(src => { // dodawanie nowej kliniki do bazy danych
            viewTicket.copyValues(ticket);
            console.log(src);
          },
            error => {
              console.log(error);
            });
        } else {  // jezeli edytujemy klinike
          this.clinicHttpService.updateClinic(result.ticket).subscribe(src => {
            viewTicket.copyValues(ticket);
            console.log(src);
          }, error => {
            console.log(error);
          });
        }
        viewTable.renderRows();
      }
    });
  }
}
