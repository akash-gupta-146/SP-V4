import { Component, OnInit } from '@angular/core';
import { HodService } from '../../hod.service';
import { StorageService } from '../../../shared/storage.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../shared/loader.service';
import { Location } from '@angular/common';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'by-department',
  templateUrl: './by.department.html',
  styleUrls: ['./../../hod.component.scss']
})
export class ByDepartment implements OnInit{
  role: any;
  departments: any;
  departmentIds: any[] = [];
  defaultCycle:any;
  constructor(public utServ: HodService, 
              private storage: StorageService, 
              private router: Router,
              public location: Location,
              private loaderService:LoaderService) {
    this.role = this.storage.getData('user_roleInfo')[0].role;
    this.getDepartments();
  }

  ngOnInit(){
    this.storage.cycle.asObservable().subscribe((cycle)=>{
      console.log(cycle);
      this.defaultCycle = cycle;
    })
  }

  getDepartments() {
    this.utServ.getDepartments().subscribe((res: any) => {
      this.departments = res;
    })
  }

  department(event: any) {
    this.travers(event, event.my);
  }

  travers(department: any, checked: boolean) {
    if (!department) {
      return;
    } else {
      if (department.reporteeDepartments && department.reporteeDepartments.length) {
        if (checked)
          department.my = true;
        else
          department.my = false;
        department.reporteeDepartments.forEach((element: any) => {
          this.travers(element, checked);
        });
      } else {
        if (checked) {
          if (!department.disabled) {
            department.my = true;
            if (this.departmentIds.indexOf(department.departmentId) === -1)
              this.departmentIds.push(department.departmentId);
          }
        } else {
          if (!department.disabled) {
            department.my = false;
            this.departmentIds.splice(this.departmentIds.indexOf(department.departmentId), 1);
          }
        }
      }
    }
  }

  viewDepartment(departmentId: any) {
    this.departmentIds = [];
    this.departmentIds.push(departmentId);
  }

  goBack() {
    this.loaderService.display(true);
    if (this.departmentIds.length)
      this.utServ.getOpiByDepartmentId(this.defaultCycle.cycleId,this.departmentIds).subscribe((response: any) => {
        if (response.status === 204) {
          this.utServ.goals.next([]);
        } else {
          this.utServ.goals.next(response);
        }
        this.loaderService.display(false);
      },(error:any)=>{
        this.loaderService.display(false);
                
      })
    //  this.router.navigateByUrl(this.role + "/home");
  }
}