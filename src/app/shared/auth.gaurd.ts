import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
    
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('access_token') && route.data['role']==JSON.parse(localStorage.getItem('role'))) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}