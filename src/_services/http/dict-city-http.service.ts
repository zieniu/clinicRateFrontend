import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DictCity } from 'src/_models/dictCity';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DictCityHttpService {


  constructor(private http: HttpClient) { }

  linkHttp = `${environment.apiUrl}dictCity/`;

  getDictCities(): Observable<Array<DictCity>> { // metoda zwracająca wszystkie slowniki dotyczace miast
    return this.http.get<Array<DictCity>>(this.linkHttp);
  }

  addDictCity(city: DictCity): Observable<DictCity> { // dodanie nowego maista
    return this.http.post<DictCity>(this.linkHttp, city);
  }

  updateDictCity(city: DictCity): Observable<DictCity> { // update miasta
    return this.http.put<DictCity>(this.linkHttp, city);
  }

  deleteDictCity(dictCityId: number) { // usuwanie miasta
    return this.http.delete<DictCity>(this.linkHttp + dictCityId);
  }
}
