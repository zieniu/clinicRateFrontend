import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { Clinic } from 'src/_models/Clinic';
import { PageEvent, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ClinicMoreInfoComponent } from './clinic-more-info/clinic-more-info.component';
import { DictProvince } from 'src/_models/dictProvince';
import { DictProvinceHttpService } from 'src/_services/http/dict-province-http.service';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';
import { DictCity } from 'src/_models/dictCity';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {

  displayedColumns = ['id', 'name', 'cityId', 'provinceId', 'buttonMore'];
  clinicList: Array<Clinic> = new Array<Clinic>(); // spis klinik dostepnych w bazie danych
  provincesList: Array<DictProvince> = new Array<DictProvince>(); // lista wojewodztw
  cityList: Array<DictCity> = new Array<DictCity>(); // lista miast
  dataSource: MatTableDataSource<Clinic>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // PAGINATOR
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];

  // PROGRESSBAR
  isLoaded = false; // do sprawdzenia czy dane już są wczytane - wtedy progress bar znika

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private clinicHttpService: ClinicHttpService, public dialog: MatDialog,
    private dictProvinceHttpService: DictProvinceHttpService, private dictCityHttpService: DictCityHttpService) { }

  ngOnInit() {
    this.clinicHttpService.getClinics().subscribe(src => { // pobieranie listy klinik z bazy danych
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
        this.clinicList.push(clinic);
      });
      this.dataSource = new MatTableDataSource(this.clinicList);
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
  openClinicMoreInfoModal(viewTable: any, viewTicket: Clinic, InEditMode: boolean, head: string, newClinic: boolean) {
    let ticket = new Clinic();
    let isNewTicket = false;
    let deleteClinic: boolean; // zmienna okreslajaca usuniecie danej kliniki
    const isInEditMode = InEditMode;
    const isNewClinic = newClinic;
    deleteClinic = false;

    if (viewTicket) {
      Object.assign(ticket, viewTicket);
    } else {
      ticket = new Clinic();
      isNewTicket = true;
    }

    const detailsModalRef = this.dialog.open(ClinicMoreInfoComponent, { // otwieranie nowego okna i przekazywanie do niego parametrow
      data: { ticket: ticket, isInEditMode: InEditMode, header: head, isNewClinic: newClinic, delete: deleteClinic }
    });

    detailsModalRef.afterClosed().subscribe(result => {
      if (result !== undefined) { // jezeli dane przeszły walidacje
        if (!result.delete) {
          if (isNewTicket) {  // jezeli tworzymy nowa klinike
            this.clinicHttpService.addClinic(result.ticket).subscribe(src => { // dodawanie nowej kliniki do bazy danych
              this.clinicList.push(result.ticket);
              this.dataSource.data = this.clinicList;
              viewTable.renderRows();
            },
              error => {
                console.log(error);
              });
          } else {  // jezeli edytujemy klinike
            this.clinicHttpService.updateClinic(result.ticket).subscribe(src => {
              viewTicket.copyValues(ticket);
              viewTable.renderRows();
              console.log(src);
            }, error => {
              console.log(error);
            });
          }
        } else if (result.delete) { // poprawic usuwanie nie odswieza tabeli
          this.clinicHttpService.deleteClinic(result.ticket.clinicId).subscribe(src => {
            const index = this.clinicList.indexOf(viewTicket);
            if (index > -1) {
              this.clinicList.splice(index, 1);
              this.dataSource.data = this.clinicList;
              viewTable.renderRows();
            }
            viewTable.renderRows();
          }, error => {
            console.log(error);
          });
        }
      }
    });
  }
}
