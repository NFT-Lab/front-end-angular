import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Psw } from '@model/Psw';
import { User } from '@model/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private userManagementUrl = environment.apiUrl + '/user'; // URL to web api

  //API URL PER INTEGRAZIONE
  //private userManagementUrl = environment.userApiUrl + 'user';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  updateUserInfo(user: User, id: String): Observable<Object> {
    return this.http.put(
      this.userManagementUrl + '/' + id,
      user,
      this.httpOptions
    );
  }

  updatePsw(psw: Psw): Observable<Object> {
    return this.http.put(
      this.userManagementUrl + '/password',
      psw,
      this.httpOptions
    );
  }
}
