import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StorageService } from '../../shared/storage.service';
import { UniversityService } from '../../shared/UTI.service';
@Injectable()
export class InitialGuard implements CanActivate {

 role: any;
 organisationInfo: any ={};
  constructor(private router: Router, 
    private storageService:StorageService,private utiService:UniversityService) {
    this.role = this.storageService.getData('role');
  }
  
  canActivate(route: ActivatedRouteSnapshot) {
    this.organisationInfo = this.storageService.getData('org_info');
    if (this.organisationInfo.mission != null) {
      return true;
    }
    this.router.navigate(['planner/initial-setup']);
    return false;
  }

}