import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DictProvince } from 'src/_models/dictProvince';
import { Observable } from 'rxjs';

@Injectable()
export class DictProvinceHttpService {

  constructor(private http: HttpClient) { }

  linkHttp = `${environment.apiUrl}dictProvince`;

  getDictProvinces(): Observable<Array<DictProvince>> { // metoda zwracająca wszystkie slowniki dotyczace wojewodztw
    return this.http.get<Array<DictProvince>>(this.linkHttp);
  }

  addDictProvince(province: DictProvince): Observable<DictProvince> { // dodanie nowego maista
    return this.http.post<DictProvince>(this.linkHttp, province);
  }

  updateDictProvince(province: DictProvince): Observable<DictProvince> { // update miasta
    return this.http.put<DictProvince>(this.linkHttp, province);
  }

  deleteDictProvince(id: number) { // usuwanie miasta
    // const parm = new HttpParams().set('id', id + '');
    return this.http.delete<DictProvince>(this.linkHttp + '/' + id);
  }
}
