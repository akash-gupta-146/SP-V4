import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HodService } from '../hod.service';
import { StorageService } from '../../shared/storage.service';
@Component({
 selector:'dept',
 templateUrl:'./departments.component.html',
 styleUrls: ['./../hod.component.css','./../../coordinator/home/home.component.css']
})
export class DepartmentsComponent{
  role: any;
  departments: any[]=[];
  departmentHeirarchyCopy:any[]=[];
 data:any;
 departmentModel:any=0;
 departmentInfo:any[]=[]
 departmentsCopy:any[]=[];
 constructor(public route:ActivatedRoute,public utServ: HodService,private storage: StorageService){
  this.role = this.storage.getData('userDetails').roleInfo[0].role;
  this.route.params.subscribe((params:any)=>{
   this.utServ.getDepartmentByOpiId(params['id']).subscribe((response:any)=>{
    this.data = response[0];
    this.departmentInfo = response[0].departmentInfo;
    this.departmentsCopy = JSON.parse(JSON.stringify(response[0].departmentInfo));
   })
  });
  this.getDepartments();
 }

 getAnnualTargetsByOpiDepartment(department:any){
  department.show = true;
  if(department.allAnnualTargets){
   department.opiAnnualTargets = department.allAnnualTargets;
   return;
  }
  this.utServ.getAnnualTargets(department.id).subscribe((response:any)=>{
    console.log(response);
    department.allAnnualTargets = response;
    department.currentAnnualTargets = department.opiAnnualTargets;
    department.opiAnnualTargets = response;
  });
 }

 getCurrentAnnualTargets(department:any){
  department.show = false;
  
  department.allAnnualTargets = department.opiAnnualTargets;
   department.opiAnnualTargets = department.currentAnnualTargets;
 }

 viewDepartment(event){
   if(event==0){
     this.departmentInfo = this.departmentsCopy;
   }else{
    this.departmentInfo = [];
    this.departmentInfo.push(event);
   }   
 }

 getDepartments() {
    this.utServ.getDepartments().subscribe((res: any) => {
      this.departments = res;
      this.departmentHeirarchyCopy = res;
    })
  }

  checkAssignDept(assignedDepartments: any[]) {
    this.departments = JSON.parse(JSON.stringify(this.departmentHeirarchyCopy));
    assignedDepartments.forEach(outerElement => {
      this.departments.forEach(innerElement => {
        this.searchDepartment(innerElement, outerElement);
      });
    });
  }

  searchDepartment(department: any, assigneddepartment: any) {
    if (!department) {
      return;
    } else {
      if (department.departmentId == assigneddepartment.departmentId) {
        department.my = true;
        department.disabled = !department.my;
        }else{
        department.disabled = !department.my;        
      } 
      if (department.reporteeDepartments&&department.reporteeDepartments.length)
        department.reporteeDepartments.forEach((element: any) => {
          this.searchDepartment(element, assigneddepartment);          
        });      
    }
  }

  public department(event: any) {    
    if(event.my){
      this.departmentsCopy.forEach((element:any,index:any) => {
        if(element.departmentId == event.departmentId)
          this.departmentInfo.push(element);
      });
    } else {
      this.departmentInfo = this.departmentInfo.filter((val) => val.departmentId !== event.departmentId);
    }
  }
}
