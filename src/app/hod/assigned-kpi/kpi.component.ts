import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class KPIComponent extends Filters implements OnInit,OnDestroy{
  selectedQuarter: string = "";
  defaultCycle: any;
  cycles: any[];
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
    this.utServ.goals.asObservable().subscribe((val: any[]) => {
      this.goals = val;
    });  
    this.storage.cycle.asObservable().subscribe(cycle=>{
      this.defaultCycle = cycle;
    })  
    this.getCycles();
  }

  getFrequencies() {
    this.utServ.getFrequencies().subscribe((response: any) => {
      this.frequencies = response;
    })
  }

  getCycles() {
    this.loaderService.display(true);
    this.utServ.getCycles().subscribe((response: any) => {
      this.cycles = response;
      this.route.params.subscribe((params: any) => {
        if (params['cycleId'] && params['year'] && params['quarter']) {
          this.cycles.forEach(element => {
            if (element.cycleId == params['cycleId']) {
              this.defaultCycle = element;
              this.selectedYear = params['year'];
              this.selectedQuarter = params['quarter'];
              this.storage.cycle.next(element);
            }
          });
          this.getOpiResultByQuarter(params['quarter']);
        } else if (params['cycleId'] && params['year']) {
          this.cycles.forEach(element => {
            if (element.cycleId == params['cycleId']) {
              this.defaultCycle = element;
              this.selectedYear = params['year'];
              this.storage.cycle.next(element);
            }
          });
          this.getResult(params['cycleId'], params['year']);
        }
        else {
          this.cycles.forEach(element => {
            if (element.defaultCycle) {
              this.storage.cycle.next(element);
              this.defaultCycle = element;
              this.getResult(this.defaultCycle.cycleId, this.selectedYear);
            }
          });
        }
        
      });
    }, (error: any) => {
      this.loaderService.display(false);
      alertify.error("Something went wrong");
    });
  }

  getResult(cycleId,year){
    this.getOpiResultByYear(cycleId,year);
  }

  getOpi(): any {
    this.initiatives = this.activities = this.opis = [];
    this.utServ.getOpiResult().subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = JSON.parse(JSON.stringify(response));
        // this.utServ.goals.next(response);
        this.initFilters(response);
      }
    });
  }

  getOpiResult(cycle: any) {
    console.log(cycle);
    this.storage.cycle.next(cycle);
    this.loaderService.display(true);
    this.initiatives = this.activities = this.opis = [];
    this.utServ.getOpiResultByCycleId(cycle.cycleId).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = JSON.parse(JSON.stringify(response));
        // this.utServ.goals.next(response);
        this.initFilters(response);
      }
      this.loaderService.display(false);
    },(error:any)=>{
      this.loaderService.display(false);
      alertify.error("Something went wrong");
    });
  }

  getOpiResultByYear(cycleId: any, year: any) {
    this.loaderService.display(true);
    // this.selectedQuarter = "q1";
    this.initiatives = this.activities = this.opis = [];
    this.utServ.getOpiResultByYear(cycleId, year).subscribe((response: any) => {
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
      // this.utServ.goals.next(response);
      this.initFilters(response);
      this.loaderService.display(false);
      if(response.length)
      this.selectedQuarter = response[0].initiatives[0].activities[0].opis[0].departmentInfo[0].opiAnnualTargets[0].levels[0].quarter;
    },(error:any)=>{
      this.loaderService.display(false);
      alertify.error("Something went wrong");
    });
  }

  onCycleChange(cycleId: any, year: any,quarter:any){
    this.router.navigate(['/coordinator',{cycleId:cycleId,year:year,quarter:quarter}]);
  }

  setQuarterFeedback(data: any) {
    if (data.feedback == 'true')
      alertify.confirm("Do you realy want to Approve this ?", () => {
        this.utServ.approve(data.id, { comment: data.comment }).subscribe((reponse) => {
          alertify.notify("Audit has been Approved");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.notify("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");
    else
      alertify.confirm("Do you realy want to Reject this ?", () => {
        this.utServ.reject(data.id, { comment: data.comment }).subscribe((reponse) => {

          alertify.notify("Audit has been Rejected");
        }, (error: any) => {

          alertify.notify("Something went wrong");
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

  reloadOpis(){
    this.selectedYear = new Date().getFullYear();
    // this.selectedQuarter = "q1";
    // this.getOpiResultByQuarter(this.selectedQuarter);
    // this.getOpiResultByYear(this.defaultCycle.cycleId,this.selectedYear);
    this.router.navigate(["/coordinator"]);
  }

  isFuture(y:number){
    return (y > new Date().getFullYear());
  }

  ngOnDestroy(){
    this.loaderService.display(false);
  }

  showLoader(){
    this.loaderService.display(true);
  }
}