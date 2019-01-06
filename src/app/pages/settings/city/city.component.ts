import { Component, OnInit, ViewChild } from '@angular/core';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';
import { DictCity } from 'src/_models/dictCity';
import { MatTableDataSource, MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { CityMoreInfoComponent } from './city-more-info/city-more-info.component';
import { SnackBarService } from 'src/_services/snack-bar.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  displayedColumns = ['id', 'name', 'buttonMore'];
  dictCities: DictCity[] = [];
  dataSource: MatTableDataSource<DictCity>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // PAGINATOR
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];

  // PROGRESSBAR
  isLoaded = false; // do sprawdzenia czy dane już są wczytane - wtedy progress bar znika

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private dictCityHttpService: DictCityHttpService, private dialog: MatDialog, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.dictCityHttpService.getDictCities().subscribe(src => { // Pobieranie spisu miast z bazy danych
      src.forEach(dict => {
        const city = new DictCity();
        city.dictCityId = dict.dictCityId;
        city.name = dict.name;
        this.dictCities.push(city);
      });
      this.dataSource = new MatTableDataSource(this.dictCities);
      this.dataSource.paginator = this.paginator;
      this.isLoaded = true;
    },
      error => {
        console.log(error);
      });
  }

  // Filtrowanie miast
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDetailsModal(viewTable: any, viewTicket: DictCity, InEditMode: boolean, head: string, createNew: boolean) {
    let ticket = new DictCity();
    let isNewTicket = false;
    let deleteDict: boolean; // zmienna okreslajaca usuniecie slownika
    const isInEditMode = InEditMode;
    const create = createNew; // jezeli tworzymy nowe radio to true
    deleteDict = false; // zmienna okreslająca usunięcie slownika

    if (viewTicket) {
      Object.assign(ticket, viewTicket);
    } else {
      ticket = new DictCity();
      isNewTicket = true;
    }

    const detailsModalRef = this.dialog.open(CityMoreInfoComponent, {
      data: { ticket: ticket, isInEditMode: InEditMode, header: head, create: createNew, deleted: deleteDict }
    });

    detailsModalRef.afterClosed().subscribe(result => {
      if (result !== undefined) { // jezeli result nie nie jest undefined
        if (!result.deleted) { // jezeli nie usuwamy slownika
          if (isNewTicket) {  // jezeli tworzymy nowe województwo
            this.dictCityHttpService.addDictCity(result.ticket).subscribe(src => {
              this.dictCities.push(result.ticket);
              this.dataSource.data = this.dictCities;
              viewTable.renderRows();
              this.snackBarService.openSnackBar('Operacja udana.', 'Potwierdzenie', 'snackBar-success');
            },
              error => {
                this.snackBarService.openSnackBar('Operacja niepowiodła się.', 'BŁĄD', 'snackBar-error');
              });
          } else {  // jezeli edytujemy województwo

            this.dictCityHttpService.updateDictCity(result.ticket).subscribe(src => {
              viewTicket.copyValues(ticket);
              this.snackBarService.openSnackBar('Operacja udana.', 'Potwierdzenie', 'snackBar-success');
            },
              error => {
                this.snackBarService.openSnackBar('Operacja niepowiodła się.', 'BŁĄD', 'snackBar-error');
              });
          }
          viewTable.renderRows();
        } else if (result.deleted) {  // usuwanie slownika z bazy danych
          this.dictCityHttpService.deleteDictCity(result.ticket.dictCityId).subscribe(src => {
            viewTable.renderRows();
            const index = this.dictCities.indexOf(viewTicket);
            if (index > -1) {
              this.dictCities.splice(index, 1);
              this.dataSource.data = this.dictCities;
              viewTable.renderRows();
            }
          },
            error => {
              this.snackBarService.openSnackBar('Operacja niepowiodła się.', 'BŁĄD', 'snackBar-error');
            });
        }
      }
    });
  }
}
