import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@model/User';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginUrl = environment.apiUrl + '/login'; // URL to web api

  //API URL PER INTEGRAZIONE
  //private loginUrl = environment.userApiUrl + 'login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(data: Object): Observable<User> {
    return this.http.post<User>(this.loginUrl, data, this.httpOptions);
  }
}
