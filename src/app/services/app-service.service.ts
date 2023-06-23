import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CapchatCreateModalComponent } from '../admin/modal/capchat-create-modal/capchat-create-modal.component';
import { ThemeCreateModalComponent } from '../admin/modal/theme-create-modal/theme-create-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private api = "http://localhost:3000/";


  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private modalService: NgbModal,
    private config: NgbModalConfig,
  ) { }

  checkSelectedCapchat(id: any): Promise<any> {
    return this.http.post(this.api + 'capchat/check', id).toPromise();
  }

  reInitializeCapchat(id: any): Promise<any> {
    return this.http.post(this.api + 'capchat/newSet', id).toPromise();
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

  initializeThemes(): Promise<any> {
    return this.http.get(this.api + 'themes').toPromise();
  }

  openCrudModal(imageSet: any, user: any): Promise<any> {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    return new Promise((resolve, reject) => {
      const dlg = this.modalService.open(CapchatCreateModalComponent, this.config);
      dlg.componentInstance.params = {
        imageSet,
        user
      };
      dlg.result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }
  
  openThemeModal(): Promise<any> {
    this.config.backdrop = 'static';
    this.config.keyboard = false;
    return new Promise((resolve, reject) => {
      const dlg = this.modalService.open(ThemeCreateModalComponent, this.config);
      dlg.result.then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  getImagesFromServer(id: any): Promise<any> {
    return this.http.get(this.api + 'imageset/' + id + '/images').toPromise();
  }

  sendImagesToServer(data: any): Promise<any> {
    return this.http.post(this.api + 'imageset', data).toPromise();
  }

  isAuthenticated(): Promise<any> {
    return this.http.get(this.api + 'isAuthenticated', { withCredentials: true }).toPromise();
  }
  
  createTheme(name: any): Promise<any> {
    return this.http.post(this.api + 'theme', {"name": name}).toPromise();
  }
}
