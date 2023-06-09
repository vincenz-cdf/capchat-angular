import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      // token exists, user is authenticated
      return true;
    } else {
      // token doesn't exist, user is not authenticated
      this.router.navigate(['/login']); // redirect to login page
      return false;
    }
  }
}