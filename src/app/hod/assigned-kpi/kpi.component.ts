import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Filters } from '../../shared/filters';
import { HodService } from '../hod.service';
import { StorageService } from '../../shared/storage.service';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { LoaderService } from '../../shared/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'assigned-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./../hod.component.scss']
})
export class KPIComponent extends Filters implements OnInit,OnDestroy,AfterViewInit{
  
  noData: boolean = false;
  departmentNames: string[]=[];
  departmentModel: number;
  departments: any[];
  departmentIds: any[] = [];
  selectedQuarter: string = "";
  defaultCycle: any;
  cycles: any[]=[];
  selectedLevel: any;
  selectedOpi: any;
  selectedDepartment: any;
  roles: any[] = ["coordinator", "hod", "dvc", "vc", "chanceller"];
  role: any;
  initiatives: any[] = [];
  activities: any[] = [];
  opis: any[] = [];
  frequencies: any[];
  quarters: any[];
  selectedYear: any = new Date().getFullYear();
  constructor(private utServ: HodService,
    private storage: StorageService,
    private loaderService: LoaderService,private route:ActivatedRoute,private router:Router) {
    super(); 
    this.loaderService.display(true);   
  }

  ngOnInit(){
    this.role = this.storage.getData('user_roleInfo')[0].role;
    this.departmentModel = 0;  
    this.utServ.goals.asObservable().subscribe((val: any[]) => {
      this.goals = val;
    });  
    this.storage.cycle.asObservable().subscribe(cycle=>{
      this.defaultCycle = cycle;
    });
    this.utServ.getCurrentQuarter().subscribe((quarter:any)=>{
      this.selectedQuarter = quarter.quarter;
      this.getDepartments();
      this.getCycles();
    }); 
  }

  ngAfterViewInit(){
    $(document).click(function(e) {
      if ($(e.target).is('tree-view')) {
        e.stopPropagation();   
      }else{
        $('.dept-list').collapse('hide');
      }
    });
    $('#termSheetPopup').on('click', function(e) {
      e.stopPropagation();
    });

   }

  getFrequencies() {
    this.utServ.getFrequencies().subscribe((response: any) => {
      this.frequencies = response;
    })
  }

  getCycles() {
    this.loaderService.display(true);
    this.utServ.getCycles().subscribe((response: any) => {
      if(!response.length){
        this.loaderService.display(false);
        this.noData=true;
        return;
      }
      this.cycles = response;
      this.route.params.subscribe((params: any) => {
        this.departmentIds=[]; this.departmentNames = [];
        if(params['cycleId'] && params['year'] && params['quarter'] && params['deptId']){
          this.cycles.forEach(element => {
            if (element.cycleId == params['cycleId']) {
              this.defaultCycle = element;
              this.departmentIds = params['deptId'].toString().split(",");            
              this.departmentModel = parseInt(params['deptId']);
              this.selectedYear = params['year'];
              this.selectedQuarter = params['quarter'];
              this.storage.cycle.next(element);
              if(this.departmentIds.length)
                this.getOpiResultByDepartmentAndAll();
              else
                this.getResultsByComination();
            }
          });
        }else if (params['cycleId'] && params['year'] && params['quarter']) {
          this.cycles.forEach(element => {
            if (element.cycleId == params['cycleId']) {
              this.defaultCycle = element;
              this.selectedYear = params['year'];
              this.selectedQuarter = params['quarter'];
              this.storage.cycle.next(element);
              if(this.departmentIds.length)
                this.getOpiResultByDepartmentAndAll();
              else
                this.getResultsByComination();
            }
          });
        } else if (params['cycleId'] && params['year']) {
          this.cycles.forEach(element => {
            if (element.cycleId == params['cycleId']) {
              this.defaultCycle = element;
              this.selectedYear = params['year'];
              this.storage.cycle.next(element);
              if(this.departmentModel)
                this.getOpiResultByDepartmentAndAll();
              else
                this.getResultsByComination();
            }
          });
        }else{
          this.cycles.forEach(element => {
            if (element.defaultCycle) {
              this.storage.cycle.next(element);
              this.defaultCycle = element;
                this.getResultsByComination();
                this.departmentIds=[]; this.departmentNames = [];
                this.getDepartments();
            }
          });
        }        
      });
    }, (error: any) => {
      this.loaderService.display(false);
      alertify.error("Something went wrong");
    });
  }

  getResultsByComination(){
    this.loaderService.display(true);   
    this.getDepartments(); 
    this.utServ.getOpiResultByCombination(this.defaultCycle.cycleId,this.selectedYear,this.selectedQuarter).subscribe(response=>{
      this.noData = (response.length)?false:true;
      this.loaderService.display(false);
      this.utServ.goals.next(response);
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
      this.loaderService.status.next(false);            
      this.initFilters(response);
    },(error:any)=>{
      this.loaderService.display(false);
      alertify.error("Something went wrong..");
    });
  }

  getOpiResultByDepartmentAndAll(){
    this.loaderService.display(true);
    this.getDepartments();
    this.utServ.getOpiResultByDepartment(this.defaultCycle.cycleId,this.selectedYear,this.selectedQuarter,this.departmentIds).subscribe(response=>{
      this.noData = (response.length)?false:true;
      this.loaderService.display(false);
      this.goals = response;
      this.utServ.goals.next(response);
      this.goalsCopy = JSON.parse(JSON.stringify(response));
      this.loaderService.status.next(false);            
      this.initFilters(response);
    },(error:any)=>{
      this.loaderService.display(false);
      alertify.error("Something went wrong..");
    });
  }

  onCycleChange(cycleId: any, year: any,quarter:any,deptId:any){
    if(this.departmentIds.length){
      this.router.navigate(['./',{cycleId:cycleId,year:year,quarter:quarter,deptId:this.departmentIds.slice(0)}]);
    } else
    this.router.navigate(['./',{cycleId:cycleId,year:year,quarter:quarter}]);

  }

  setQuarterFeedback(data: any) {
    if (data.feedback == 'true')
      alertify.confirm("Do you really want to Approve this ?", () => {
        this.utServ.approve(data.id, { comment: data.comment }).subscribe((reponse) => {
          alertify.success("KPI data has been Approved");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");
    else
      alertify.confirm("Do you really want to Reject this ?", () => {
        this.utServ.reject(data.id, { comment: data.comment }).subscribe((reponse) => {

          alertify.success("KPI data has been Rejected");
        }, (error: any) => {

          alertify.error("Something went wrong");
        });
      }).setHeader("Confirmation");
  }

  getOpiResultByQuarter(quarter: any) {
    this.loaderService.display(true);
    this.utServ.getOpiResultByQuarter(this.defaultCycle.cycleId,this.selectedYear,quarter).subscribe((response:any)=>{
      this.loaderService.display(false);
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
      // this.utServ.goals.next(response);
      this.loaderService.status.next(false);            
      this.initFilters(response);
    },(error:any)=>{
      this.loaderService.display(false);
      alertify.error("Something went wrong..");
    });
  }

  getCurrentQuarter(){
    this.utServ.getCurrentQuarter().subscribe((quarter:any)=>{
      this.selectedQuarter = quarter.quarter;
      this.onCycleChange(this.defaultCycle.cycleId,this.selectedYear,this.selectedQuarter,this.departmentIds);      
    }); 
  }

  reloadOpis(){
    this.selectedYear = new Date().getFullYear();
    this.departmentModel = 0;
    this.departmentIds=[]; this.departmentNames = [];
    this.getCurrentQuarter();
    if(this.departmentIds.length)
      this.getOpiResultByDepartmentAndAll();
    else
      this.getResultsByComination();
    // this.selectedQuarter = "q1";
    // this.getOpiResultByQuarter(this.selectedQuarter);
    // this.getOpiResultByYear(this.defaultCycle.cycleId,this.selectedYear);
    // this.getResultsByComination();
    // this.router.navigate(["/coordinator"]);
  }

  isFuture(y:number){
    return (y > new Date().getFullYear());
  }

  getDepartments() {
    this.utServ.getDepartments().subscribe((res: any) => {
      this.departments = res;
      this.checkDepartment(this.departments);
    });
  }

  department(event: any) {
    this.travers(event, event.my);
    // this.onCycleChange(this.defaultCycle.cycleId,this.selectedYear,this.selectedQuarter,this.departmentIds);
  }

  checkDepartment(departments:any[]): any {
    if(!departments.length)
      return;
    departments.forEach(department => {
      this.departmentIds.forEach(id => {
        if(id == department.departmentId){
          department.my = true;
          this.departmentNames.push(department.department);
        }
      });
      this.checkDepartment(department.reporteeDepartments);
    });
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
            if (this.departmentIds.indexOf(''+department.departmentId) === -1){
              this.departmentIds.push(''+department.departmentId);
              this.departmentNames.push(department.department);
            }
          }
        } else {
          department.my = false;
          this.departmentIds.splice(this.departmentIds.indexOf(''+department.departmentId),1);
          if(this.departmentNames.indexOf(department.department)!=-1)
            this.departmentNames.splice(this.departmentNames.indexOf(department.department), 1);
        }
      }
    }
  }

  viewDepartment(departmentId: any) {
    this.departmentIds=[]; this.departmentNames = [];
    if(departmentId!=0)
      this.departmentIds.push(departmentId);
    this.onCycleChange(this.defaultCycle.cycleId,this.selectedYear,this.selectedQuarter,this.departmentIds);
  }

  goBack() {
    this.loaderService.display(true);
    if (this.departmentIds.length)
      this.utServ.getOpiByDepartmentId(this.defaultCycle.cycleId,this.departmentIds).subscribe((response: any) => {
        this.utServ.goals.next(response);
        this.defaultCycle.departmentIds = this.departmentIds;
        this.storage.cycle.next(this.defaultCycle);
        this.loaderService.display(false);
      },(error:any)=>{
        this.loaderService.display(false);
                
      });

    //  this.router.navigateByUrl(this.role + "/home");
  }

  ngOnDestroy(){
    this.loaderService.display(false);
  }

  showLoader(){    
    this.loaderService.display(true);
  }

}