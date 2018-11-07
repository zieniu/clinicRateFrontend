import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicHttpService } from 'src/_services/http/clinic-http.service';
import { Clinic } from 'src/_models/Clinic';
import { PageEvent, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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
  @ViewChild(MatSort) sort: MatSort;

  // PAGINATOR
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 100];


  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private clinicHttpService: ClinicHttpService) { }

  ngOnInit() {
    this.clinicHttpService.getClinics().subscribe(src => {
      Object.assign(this.clinicList, src);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error);
      });
      this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
