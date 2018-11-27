import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
