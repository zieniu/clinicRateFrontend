import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DictCity } from 'src/_models/dictCity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DictCityHttpService {


  constructor(private http: HttpClient) { }

  linkHttp = `${environment.apiUrl}dictCity`;

  getDictCities(): Observable<Array<DictCity>> { // metoda zwracająca wszystkie slowniki dotyczace miast
    return this.http.get<Array<DictCity>>(this.linkHttp);
  }
}
