import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Opinion } from 'src/_models/opinion';

@Injectable()
export class OpinionHttpService {

  linkHttp = `${environment.apiUrl}opinion/`;

  constructor(private http: HttpClient) { }

  // Pobieranie opini przypisanych do danej kliniki
  getOpinionsByClinic(clinicId: number): Observable<Array<Opinion>> {
    return this.http.get<Array<Opinion>>(this.linkHttp + clinicId);
  }

  // Dodawanie nowej opini
  addOpinion(opinion: Opinion): Observable<Opinion> {
    return this.http.post<Opinion>(this.linkHttp, opinion);
  }

  // Usuwanie opini
  deleteOpinion(opinionId: number) {
    return this.http.delete<Opinion>(this.linkHttp + opinionId);
  }
}
