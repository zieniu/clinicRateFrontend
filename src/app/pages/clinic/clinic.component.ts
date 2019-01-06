import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { Clinic } from 'src/_models/Clinic';
import { PageEvent, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ClinicMoreInfoComponent } from './clinic-more-info/clinic-more-info.component';
import { DictProvince } from 'src/_models/dictProvince';
import { DictProvinceHttpService } from 'src/_services/http/dict-province-http.service';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';
import { DictCity } from 'src/_models/dictCity';
import { RoleGuardService } from 'src/_services/role-guard.service';
import { Role } from 'src/_models/users';
import { SnackBarService } from 'src/_services/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'cityId', 'provinceId', 'buttonMore'];
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

  // ROLE
  role = Role; // zmienna odpowiedzialna za okreslenie dostepu

  private clinicList: Array<Clinic> = new Array<Clinic>(); // spis klinik dostepnych w bazie danych
  private clinicSub: Subscription; // zmienna odpowiedzialna za subskrybcje
  private clinicAddSub: Subscription; // zmienna odpowiedzialna za subskrybcje
  private clinicUpdSub: Subscription; // zmienna odpowiedzialna za subskrybcje
  private clinicDelSub: Subscription; // zmienna odpowiedzialna za subskrybcje

  constructor(private clinicHttpService: ClinicHttpService, public dialog: MatDialog,
    public roleGuardService: RoleGuardService,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.clinicSub = this.clinicHttpService.getClinics().subscribe(src => { // pobieranie listy klinik z bazy danych
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
        this.snackBarService.openSnackBar('Pobieranie listy klinik nie powiodło się.', 'BŁĄD', 'snackBar-error');
      });
  }

  ngOnDestroy(): void {
    if (this.clinicSub !== undefined) {
      this.clinicSub.unsubscribe();
    }
    if (this.clinicDelSub !== undefined) {
      this.clinicDelSub.unsubscribe();
    }
    if (this.clinicUpdSub !== undefined) {
      this.clinicUpdSub.unsubscribe();
    }
    if (this.clinicAddSub !== undefined) {
      this.clinicAddSub.unsubscribe();
    }
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
            if (this.roleGuardService.checkPermission(1)) { // sprawdzanie czy dodajemy bezposredno do listy klinik czy do poczekalni
              this.clinicAddSub = this.clinicHttpService.addClinic(result.ticket) // dodawanie nowej kliniki do bazy danych
                .subscribe(src => {
                  this.clinicList.push(result.ticket);
                  this.dataSource.data = this.clinicList;
                  viewTable.renderRows();
                  this.snackBarService.openSnackBar('Dodano klinikę do poczekalni.', 'Potwierdzenie', 'snackBar-success');
                },
                  error => {
                    console.log(error);
                    this.snackBarService.openSnackBar('Dodawanie kliniki zakończyło się niepowodzeniem.', 'BŁĄD', 'snackBar-error');
                  });
            } else {
              result.ticket.accepted = 0;
              this.clinicAddSub = this.clinicHttpService.addClinic(result.ticket)
                .subscribe(src => { // dodawanie nowej kliniki do bazy danych

                  this.snackBarService.openSnackBar('Dodano klinikę do poczekalni.', 'Potwierdzenie', 'snackBar-success');
                },
                  error => {
                    console.log(error);
                    this.snackBarService.openSnackBar('Dodawanie kliniki zakończyło się niepowodzeniem', 'BŁĄD', 'snackBar-error');
                  });
            }
          } else {  // jezeli edytujemy klinike
            this.clinicUpdSub = this.clinicHttpService.updateClinic(result.ticket).subscribe(src => {
              viewTicket.copyValues(ticket);
              viewTable.renderRows();
              console.log(src);
              this.snackBarService.openSnackBar('Edycja kliniki powiodła się.', 'Potwierdzenie', 'snackBar-success');
            }, error => {
              console.log(error);
              this.snackBarService.openSnackBar('Edycja kliniki zakończyło się niepowodzeniem', 'BŁĄD', 'snackBar-error');
            });
          }
        } else if (result.delete) { // poprawic usuwanie nie odswieza tabeli
          this.clinicDelSub = this.clinicHttpService.deleteClinic(result.ticket.clinicId).subscribe(src => {
            const index = this.clinicList.indexOf(viewTicket);
            if (index > -1) {
              this.clinicList.splice(index, 1);
              this.dataSource.data = this.clinicList;
              viewTable.renderRows();
            }
            viewTable.renderRows();
            this.snackBarService.openSnackBar('Usuwanie kliniki powiodła się.', 'Potwierdzenie', 'snackBar-success');
          }, error => {
            console.log(error);
            this.snackBarService.openSnackBar('Usuwanie kliniki zakończyło się niepowodzeniem', 'BŁĄD', 'snackBar-error');
          });
        }
      }
    });
  }
}
