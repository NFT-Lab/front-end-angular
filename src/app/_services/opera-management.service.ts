import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nft } from '@model/Nft';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperaManagementService {
  //private operaManagementUrl = environment.apiUrl + '/nft/user'; // URL to web api
  private operaManagementUrl = environment.apiUrl + '/nft/user?__example=test1';

  private httpOptionsGet = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOperas(): Observable<Nft[]> {
    //API URL PER INTEGRAZIONE
    //let operaManagementUrl = environment.nftApiUrl + 'nft/user/' + JSON.parse(localStorage.getItem('User') as string).id;
    return this.http.get<Nft[]>(this.operaManagementUrl, this.httpOptionsGet);
  }

  addOpera(opera: JSON, file: File): Observable<Nft> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('opera', JSON.stringify(opera));

    //API URL PER INTEGRAZIONE
    //let operaManagementUrl = environment.nftApiUrl + 'nft/user/' + JSON.parse(localStorage.getItem('User') as string).id;
    return this.http.post<Nft>(this.operaManagementUrl, formData);
  }

  updateOpera(opera: Nft): Observable<Object> {
    //API URL PER INTEGRAZIONE
    //let operaManagementUrl = environment.nftApiUrl + 'nft/user/' + JSON.parse(localStorage.getItem('User') as string).id;
    return this.http.put(this.operaManagementUrl, opera, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: { id: opera.id },
    });
  }
}
