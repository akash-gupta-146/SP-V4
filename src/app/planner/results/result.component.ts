import {Component, OnInit} from '@angular/core';
import { StorageService } from '../../shared/storage.service';
import { UniversityService } from '../../shared/UTI.service';
import { LoaderService } from '../../shared/loader.service';

@Component({
 selector:'result',
 templateUrl:'result.component.html',
 styleUrls:['result.component.css']
})
export class ResultComponent implements OnInit{
 departments: any[]=[];
 goals: any;
 goalsCopy: any;
 cycles: any[]=[];
 defaultCycle: any;
 deptSelect:any={};
 selectedYear:number = new Date().getFullYear();
 constructor(private utServ: UniversityService,private commonService: StorageService,private loaderService: LoaderService){
  this.commonService.breadcrumb.next(false);
  this.loaderService.display(true);  
 }

 ngOnInit(){
  this.utServ.getDepartments().subscribe((response)=>{
    this.departments = response;
   });
  this.utServ.getCycles().subscribe((response)=>{
   this.cycles = response;
      this.cycles.forEach(element => {
        if (element.defaultCycle){
          this.defaultCycle = element;
          // this.getResults();
          this.getOpiResultByYear(this.defaultCycle.cycleId,this.selectedYear);
        }
      });
  })
 }

 getResults() {
  this.utServ.getMeasuresByCycleId(this.defaultCycle.cycleId).subscribe((response: any) => {
    if (response.status == 204) {
      this.goals = [];
      this.goalsCopy = [];
    } else {
      this.goals = response;
      this.goalsCopy = response;
    }
    this.loaderService.display(false);
  }, (error: any) => {
    this.loaderService.display(false);
  });
}

getOpiResultByYear(cycleId: any, year: any) {
 this.utServ.getOpiResultByYear(cycleId, year).subscribe((response: any) => {
   if (response.status == 204) {
     this.goals = [];
     this.goalsCopy = []
   } else {
     this.goals = response;
     this.goalsCopy = JSON.parse(JSON.stringify(response));
   }
   this.loaderService.display(false);
 }, (error: any) => {
  this.loaderService.display(false);
});
}

 isFuture(y:number){
  return (y > new Date().getFullYear());
 }

 getResultByDepartment(department:any,e:any){
  this.deptSelect = department;
  if(department.reporteeDepartments.length)
    e.stopPropagation();
  this.utServ.getOpiResultByDepartment(this.defaultCycle.cycleId,department.departmentId,this.selectedYear).subscribe((response: any) => {
    if (response.status == 204) {
      this.goals = [];
      this.goalsCopy = []
    } else {
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
    }
    this.loaderService.display(false);
  }, (error: any) => {
   this.loaderService.display(false);
  });
 }
}