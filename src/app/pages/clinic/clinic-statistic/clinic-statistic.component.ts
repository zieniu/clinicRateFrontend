import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { Clinic } from 'src/_models/Clinic';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Location } from '@angular/common';


@Component({
  selector: 'app-clinic-statistic',
  templateUrl: './clinic-statistic.component.html',
  styleUrls: ['./clinic-statistic.component.scss']
})
export class ClinicStatisticComponent implements OnInit {

  displayedColumns = ['id', 'name', 'cityId', 'average'];
  clinicList: Array<Clinic> = new Array<Clinic>(); // spis klinik wystepujacych w danym wojewodztwie w bazie danych
  dataSource: MatTableDataSource<Clinic>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // PAGINATOR
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];

  // Ladowanie danych
  isLoaded = false; // do sprawdzenia czy dane już są wczytane

  constructor(private clinicHttpService: ClinicHttpService, private location: Location) { }

  ngOnInit() {
    this.actionMap();
  }

  actionMap() { // przypisanie do danego fragmentu mapy dana akcje
    const map = document.querySelectorAll('path');
    map.forEach(province => {
      province.addEventListener('click', () => {
        this.getClinicListByProvince(province.id);
      });
    });
  }

  getClinicListByProvince(provinceId: string) { // pobieranie listy klinik z bazy danych
    this.clinicHttpService.getClinicByProvince(provinceId).subscribe(src => {
      this.clinicList = src;
    },
      error => {
        console.log(error);
      },
      () => {
        this.dataSource = new MatTableDataSource(this.clinicList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoaded = true;
      });
  }

  goBackLocation() { // poprzednia lokalizacja
    this.location.back();
  }
}
