import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DictCityHttpService } from 'src/_services/http/dict-city-http.service';
import { DictProvinceHttpService } from 'src/_services/http/dict-province-http.service';
import { DictCity } from 'src/_models/dictCity';

@Component({
  selector: 'app-clinic-address',
  templateUrl: './clinic-address.component.html',
  styleUrls: ['./clinic-address.component.scss']
})
export class ClinicAddressComponent implements OnInit {

  // tworzenie conrolerow do formatek
  cityControl = new FormControl();
  provinceControl = new FormControl();
  postCodeControl = new FormControl();
  streetControl = new FormControl();

  // ZMIENNE ODPOWIEDZIALNE ZA STEPPER
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // #################################

  cities: string[] = []; // lista miast
  provincies: string[] = []; // lista wojewodztw
  filteredCities: Observable<string[]>; // filtrowanie miast
  filteredProvincies: Observable<string[]>; // filtrowanie wojewodztw

  constructor(private dictCityHttpService: DictCityHttpService, private dictProvinceHttpService: DictProvinceHttpService,
    private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<ClinicAddressComponent>,
    private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dictCityHttpService.getDictCities().subscribe(src => { // wczytywanie slownikow dotyczacych miast do aplikacji
      src.forEach(s => {
        this.cities.push(s.name);
      });
    });

    this.dictProvinceHttpService.getDictProvinces().subscribe(src => { // wczytywanie slownikow dotyczacych wojewodztw do aplikacji
      src.forEach(p => {
        this.provincies.push(p.name);
      });
    });

    this.setValuesToForm(); // przypisywanie wartosci do formatki

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.filteredCities = this.cityControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCity(value))
      );
  }

  setValuesToForm() {
    this.cityControl.setValue(this.data.ticket.city); // przypisywanie vartosci do formularza
    this.provinceControl.setValue(this.data.ticket.province); // przypisywanie wartosci do formularza
    this.streetControl.setValue(this.data.ticket.street); // przypisywanie wartosci do formularza
    this.postCodeControl.setValue(this.data.ticket.postCode); // przypisywanie wartosci do formularza
  }

  checkValidateFirstForm(): boolean { // sprawdzanie poprawnosci wprowadzonych danych
    if (this.provinceControl.valid === true && this.postCodeControl.valid === true) {
      return true;
    } else {
      return false;
    }
  }

  checkValidateSecondForm(): boolean { // sprawdzanie poprawnosci wprowadzonych danych
    if (this.cityControl.valid === true && this.streetControl.valid === true) {
      return true;
    } else {
      return false;
    }
  }

  getValuesToData() { // zwracanie wartosci do poprzedniego okienka
    this.data.ticket.city = this.cityControl.value;
    this.data.ticket.province = this.provinceControl.value;
    this.data.ticket.street = this.streetControl.value;
    this.data.ticket.postCode = this.postCodeControl.value;

    return this.dialogRef.close(this.data);
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterProvince(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.provincies.filter(option => option.toLowerCase().includes(filterValue));
  }
}
