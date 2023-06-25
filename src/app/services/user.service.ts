import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from '../admin/modal/user/user.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = "http://localhost:3000/";

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private config: NgbModalConfig,
  ) { }



  getCurrentUser() {
    let token = localStorage.getItem('authToken'); // get the token from localStorage
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // set the token in the header

    return this.http.get<any>('http://localhost:3000/currentUser', { headers }).toPromise();
  }

  getUsers(id: any): Promise<any> {
    return this.http.post(this.api + 'users', {"id": id}).toPromise();
  }

  updateUser(id: any, data: any): Promise<any> {
    return this.http.post(this.api + 'users/' + id, data).toPromise();
  }

  openUserModal(user: any): Promise<any> {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    return new Promise((resolve, reject) => {
      const dlg = this.modalService.open(UserComponent, this.config);
      dlg.componentInstance.params = {
        user,
      };
      dlg.result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
