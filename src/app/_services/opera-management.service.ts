import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nft } from '@model/Nft';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OperaManagementService {
  private operaManagementUrl = 'http://127.0.0.1:3100/nft/user'; // URL to web api
  private user = JSON.parse(localStorage.getItem('User') || '{}');

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: { id: this.user.id },
  };

  constructor(private http: HttpClient) {}

  getOperas(): Observable<Nft[]> {
    return this.http.get<Nft[]>(this.operaManagementUrl, this.httpOptions);
  }

  addOpera(opera: Object): Observable<Nft> {
    return this.http.post<Nft>(
      this.operaManagementUrl,
      opera,
      this.httpOptions
    );
  }
}
