import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { Clinic } from 'src/_models/Clinic';
import { MatTableDataSource, MatPaginator, MatSort, MatSortable } from '@angular/material';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-clinic-statistic',
  templateUrl: './clinic-statistic.component.html',
  styleUrls: ['./clinic-statistic.component.scss']
})
export class ClinicStatisticComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'name', 'cityId', 'average'];
  dataSource: MatTableDataSource<Clinic>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // PAGINATOR
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];

  // Ladowanie danych
  isLoadedMatSpinner = true; // zmienan odpowiedzialna za ukrywanie naglowka
  isLoaded = false; // do sprawdzenia czy dane już są wczytane

  private clinicList: Array<Clinic> = new Array<Clinic>(); // spis klinik wystepujacych w danym wojewodztwie w bazie danych
  private clinicListSub: Subscription; // zmienna odpowiedzialna za subskrybcje listy klinik

  constructor(private clinicHttpService: ClinicHttpService, private location: Location) { }

  ngOnInit() {
    this.actionMap();
    this.sort.sort(<MatSortable>({ id: 'average', start: 'desc' }));
  }

  ngOnDestroy(): void {
    if (this.clinicListSub !== undefined) {
      this.clinicListSub.unsubscribe();
    }
  }


  actionMap() { // przypisanie do danego fragmentu mapy dana akcje
    const map = Array.from(document.querySelectorAll('path'));
    map.forEach(province => {
      province.addEventListener('click', () => {
        this.isLoadedMatSpinner = false;
        this.getClinicListByProvince(province.id);
      });
    });
  }

  getClinicListByProvince(provinceId: string) { // pobieranie listy klinik z bazy danych
    this.clinicListSub = this.clinicHttpService.getClinicByProvince(provinceId).subscribe(src => {
      this.clinicList = src;
    },
      error => {
        console.log(error);
      },
      () => {
        this.dataSource = new MatTableDataSource(this.clinicList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator.firstPage();
        this.isLoaded = true;
      });
  }

  goBackLocation() { // poprzednia lokalizacja
    this.location.back();
  }
}
