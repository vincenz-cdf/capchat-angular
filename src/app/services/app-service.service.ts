import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private api = "http://localhost:3000/";


  constructor(private http: HttpClient) { }

  getData(): Promise<any> {
    return this.http.get(this.api + 'api/data').toPromise();
  }
}
