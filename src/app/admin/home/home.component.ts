import {Component} from '@angular/core';
import { AdminService } from '../admin.service';
@Component({
  selector:'home',
  templateUrl:'./home.component.html'
})
export class HomeComponent{
  organisationInfo: {};
  constructor(private adminService:AdminService){

  }

  ngOnInit(){
    this.adminService.getUniversity().subscribe((response:any) => {
      if (response.status === 204) {
        this.organisationInfo = {};
      } else {
        this.organisationInfo = response;
      }
    }, err => {
      this.organisationInfo = {};
      console.log(err);
    });
  }
}