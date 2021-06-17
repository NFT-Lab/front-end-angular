import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nft } from '@model/Nft';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperaManagementService {
  private operaManagementUrl = environment.apiUrl + '/nft/user'; // URL to web api
  //private operaManagementUrl = environment.apiUrl + '/nft/user?__example=test';

  //API URL PER INTEGRAZIONE
  //private operaManagementUrl = environment.nftApiUrl + 'nft/user/' + this.user.id;

  private httpOptionsGet = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOperas(): Observable<Nft[]> {
    return this.http.get<Nft[]>(this.operaManagementUrl, this.httpOptionsGet);
  }

  addOpera(opera: JSON, file: File): Observable<Nft> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('opera', JSON.stringify(opera));

    return this.http.post<Nft>(this.operaManagementUrl, formData);
  }

  updateOpera(opera: Nft): Observable<Object> {
    return this.http.put(this.operaManagementUrl, opera, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { id: opera.id },
    });
  }
}
