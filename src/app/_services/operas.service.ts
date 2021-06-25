import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nft } from '@model/Nft';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperasService {
  //private operasUrl = environment.apiUrl + '/nft'; // URL to web api
  //private operasUrl = environment.apiUrl + '/nft?__example=test1';

  //API URL PER INTEGRAZIONE
  private operasUrl = environment.nftApiUrl + 'nft';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Nft[]> {
    return this.http.get<Nft[]>(this.operasUrl, this.httpOptions);
  }
}
