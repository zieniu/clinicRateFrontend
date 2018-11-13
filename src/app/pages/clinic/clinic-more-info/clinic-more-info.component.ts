import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DictCity } from 'src/_models/dictCity';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';

@Component({
  selector: 'app-clinic-more-info',
  templateUrl: './clinic-more-info.component.html',
  styleUrls: ['./clinic-more-info.component.scss']
})
export class ClinicMoreInfoComponent implements OnInit {

  mapGoogle = '/assets/capture.png';
  cities: any; // zmienna odpowiadająca za przechowywanie slowników dotyczących nazw miast

  constructor(private dictCityHttpService: DictCityHttpService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  cityControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.dictCityHttpService.getDictCities().subscribe(src => {
      this.cities = src;
    });
  }

  // Filtrowanie klinik
  applyFilter(filterValue: string) {
    this.cities.filter = filterValue.trim().toLowerCase();
  }

}
