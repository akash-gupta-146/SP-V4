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
      this.organisationInfo = response;
    }, err => {
      this.organisationInfo = {};      
    });
  }
}