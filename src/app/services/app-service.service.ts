import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private api = "http://localhost:3000/";


  constructor(private http: HttpClient) { }



  checkSelectedCapchat(id: any): Promise<any> {
    return this.http.post(this.api + 'capchat/check', id).toPromise();
  }

  reInitializeCapchat(): Promise<any> {
    return this.http.post(this.api + 'capchat/newSet', {}).toPromise();
  }
  
  initializeCapchat(id: any): Promise<any> {
    return this.http.get(this.api + 'capchat/' + id, {}).toPromise();
  }
  
  signIn(credentials: any): Promise<any> {
    return this.http.post(this.api + 'login', credentials, { withCredentials: true }).toPromise();
  }

  signUp(crendentials: any): Promise<any> {
    return this.http.post(this.api + 'register', crendentials).toPromise();
  }

  initializeCapchatList(): Promise<any> {
    return this.http.get(this.api + 'capchats', { withCredentials: true }).toPromise();
  }
}
