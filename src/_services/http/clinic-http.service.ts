import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clinic } from 'src/_models/Clinic';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClinicHttpService {

  linkHttp = `${environment.apiUrl}clinic`;

  constructor(private http: HttpClient) { }

  getClinics(): Observable<Array<Clinic>> {
    return this.http.get<Array<Clinic>>(this.linkHttp);
  }
}
