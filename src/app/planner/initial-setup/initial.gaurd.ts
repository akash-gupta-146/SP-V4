import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from '../../shared/storage.service';
@Injectable()
export class InitialGuard implements CanActivate {

 role: any;
 organisationInfo: any;
  constructor(private router: Router, private storageService:StorageService) {
    this.role = this.storageService.getData('role');
    this.organisationInfo = this.storageService.getData('org_info');
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!(this.organisationInfo.mission==null&&this.organisationInfo.vision==null)) {
      return true;
    }
    this.router.navigate(['planner/initial-setup']);
    return false;
  }

}