import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public responseCache = new Map();

  url = 'https://vast-shore-74260.herokuapp.com/banks?city=';

  public getBanksByCity(city: string): Observable<any> {
    console.log(this.responseCache);
    city = city.toUpperCase();
    const url = `${this.url}${city}`;
    const res = this.responseCache.get(url);
    console.log(res);
    if(res) {
      console.log('From Cache');
      return of(res);
    }
    const httpResponse = this.http.get(`${this.url}${city}`);
    httpResponse.subscribe(result => this.responseCache.set(url, result));
    console.log('From Request');
    return httpResponse;
  }

}
