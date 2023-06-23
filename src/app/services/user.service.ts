import { HttpClient } from '@angular/common/http';
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



  getCurrentUser(): Promise<any> {
    return this.http.get(this.api + 'currentUser', { withCredentials: true }).toPromise();
  }

  getUsers(): Promise<any> {
    return this.http.get(this.api + 'users').toPromise();
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
}
