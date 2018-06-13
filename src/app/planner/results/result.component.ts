import {Component, OnInit, AfterViewInit} from '@angular/core';
import { StorageService } from '../../shared/storage.service';
import { UniversityService } from '../../shared/UTI.service';
import { LoaderService } from '../../shared/loader.service';

declare let $:any;

@Component({
 selector:'result',
 templateUrl:'result.component.html',
 styleUrls:['result.component.css']
})
export class ResultComponent implements OnInit, AfterViewInit{
  noData: boolean = false;
 departments: any[]=[];
 goals: any[]=[];
 goalsCopy: any;
 cycles: any[]=[];
 defaultCycle: any;
 deptSelect:string;
 selectedYear:number = new Date().getFullYear();
 constructor(private utServ: UniversityService,private commonService: StorageService,private loaderService: LoaderService){
  this.commonService.breadcrumb.next(false);
  this.loaderService.display(true);  
 }

 ngOnInit(){
  this.deptSelect = "All Department";
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

 ngAfterViewInit(){
  $('result').click(function(e) {
    if (!$(e.target).is('.dropdown-st')) {
        $('.collapse').collapse('hide');	    
      }
  });
 }

 getResults() {
  this.utServ.getMeasuresByCycleId(this.defaultCycle.cycleId).subscribe((response: any) => {
    this.noData = (response.length)?false:true;
    this.goals = response;
    this.goalsCopy = JSON.parse(JSON.stringify(response));
    this.loaderService.display(false);
  }, (error: any) => {
    this.loaderService.display(false);
  });
}

getOpiResultByYear(cycleId: any, year: any) {
 this.utServ.getOpiResultByYear(cycleId, year).subscribe((response: any) => {
  this.goals = response;
  this.goalsCopy = JSON.parse(JSON.stringify(response));
   this.loaderService.display(false);
 }, (error: any) => {
  this.loaderService.display(false);
});
}

 isFuture(y:number){
  return (y > new Date().getFullYear());
 }

 getResultByDepartment(department:any,e:any){ 
  if(department.reporteeDepartments.length){
    e.stopPropagation();
    return;
  }
  this.deptSelect = department.department;
  this.loaderService.display(true);
  this.utServ.getOpiResultByDepartment(this.defaultCycle.cycleId,department.departmentId,this.selectedYear).subscribe((response: any) => {
    this.noData = (response.length)?false:true;
    this.goals = response;
    this.goalsCopy = JSON.parse(JSON.stringify(response));
    this.loaderService.display(false);
  }, (error: any) => {
   this.loaderService.display(false);
  });
 }

 getResultOfAllDepartment(){
  this.deptSelect = "All Department";
  this.getOpiResultByYear(this.defaultCycle.cycleId,this.selectedYear);
 }
}