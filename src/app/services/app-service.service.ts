import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private api = "http://localhost:3000/";


  constructor(private http: HttpClient) { }

  initializeCapchat(): Promise<any> {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    
    return this.http.post(this.api + 'capchat', { headers }).toPromise();
  }

  checkSelectedCapchat(id: any): Promise<any> {
    return this.http.post(this.api + 'capchat/check', id).toPromise();
  }

  reInitializeCapchat(): Promise<any> {
    return this.http.post(this.api + 'capchat/newSet', {}).toPromise();
  }
  
  signIn(crendentials: any): Promise<any> {
    return this.http.post(this.api + 'login', crendentials).toPromise();
  }

  signUp(crendentials: any): Promise<any> {
    return this.http.post(this.api + 'register', crendentials).toPromise();
  }
}
