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

  private httpOptionsGet = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: { id: this.user.id },
  };

  private httpOptionsPost = {
    //headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data;' }),
    params: { id: this.user.id },
  };

  constructor(private http: HttpClient) {}

  getOperas(): Observable<Nft[]> {
    return this.http.get<Nft[]>(this.operaManagementUrl, this.httpOptionsGet);
  }

  addOpera(opera: JSON, file: File): Observable<Nft> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('opera', JSON.stringify(opera));

    return this.http.post<Nft>(
      this.operaManagementUrl,
      formData,
      this.httpOptionsPost
    );
  }

  updateOpera(opera: Object): Observable<any> {
    return this.http.put(this.operaManagementUrl, opera, this.httpOptionsGet);
  }
}
