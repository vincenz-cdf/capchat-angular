import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppServiceService } from '../services/app-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private appService: AppServiceService) {}

  canActivate(): Promise<boolean> {
    return this.appService.isAuthenticated()
      .then((data) => {
        if (data.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
      .catch((error) => {
        this.router.navigate(['/login']);
        return false;
      });
  }
}