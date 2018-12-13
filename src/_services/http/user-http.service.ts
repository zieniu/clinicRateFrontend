import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from '../../_models/users';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserHttpService {

  constructor(private http: HttpClient) { }

  linkHttp = `${environment.apiUrl}user`;

  getAll() {
    return this.http.get<Users[]>(this.linkHttp);
  }

  getById(id: number) {
    return this.http.get(this.linkHttp + '/' + id);
  }

  register(user: Users) {
    return this.http.post(this.linkHttp + '/register', user);
  }

  update(user: Users) {
    return this.http.put(this.linkHttp + '/' + user.userId, user);
  }

  delete(id: number) {
    return this.http.delete(this.linkHttp + '/' + id);
  }
}
