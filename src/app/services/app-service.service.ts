import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private api = "http://localhost:3000/";


  constructor(private http: HttpClient) { }

  initializeCapchat(): Promise<any> {
    return this.http.get(this.api + 'capchat').toPromise();
  }

  checkSelectedCapchat(id: any): Promise<any> {
    return this.http.post(this.api + 'check', id).toPromise();
  }

  reInitializeCapchat(): Promise<any> {
    return this.http.post(this.api + 'newSet', {}).toPromise();
  }
}
