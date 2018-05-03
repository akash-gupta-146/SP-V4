import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filters } from '../../shared/filters';
import { HodService } from '../hod.service';
import { StorageService } from '../../shared/storage.service';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { LoaderService } from '../../shared/loader.service';
declare let $: any;

@Component({
  selector: 'assigned-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./../hod.component.scss']
})
export class KPIComponent extends Filters implements OnInit,OnDestroy{
  selectedQuarter: string = "q1";
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
  quarters: any[];
  selectedYear: any = new Date().getFullYear();
  constructor(private utServ: HodService,
    private storage: StorageService,
    private loaderService: LoaderService) {
    super(); 
    this.loaderService.display(true);   
  }

  ngOnInit(){
    this.role = this.storage.getData('user_roleInfo')[0].role;
    // this.getOpi();
    this.getCycles();
    this.getFrequencies();
    this.utServ.goals.asObservable().subscribe((val: any[]) => {
      this.goals = val;
    });
  }

  frequencies: any[];
  getFrequencies() {
    this.utServ.getFrequencies().subscribe((response: any) => {
      this.frequencies = response;
    })
  }

  getCycles() {
    this.loaderService.display(true);
    this.utServ.getCycles().subscribe((response: any) => {
      if (response.status === 204)
        this.cycles = [];
      else
        this.cycles = response;
      this.cycles.forEach(element => {
        if (element.defaultCycle){
          this.defaultCycle = element;
          this.getOpiResultByQuarter(this.selectedQuarter);
          }
      });
    });
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
        this.utServ.goals.next(response);
        this.initFilters(response);
      }
    });
  }

  getOpiResult(cycle: any) {
    this.loaderService.display(true);
    this.initiatives = this.activities = this.opis = [];
    this.utServ.getOpiResultByCycleId(cycle.cycleId).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = JSON.parse(JSON.stringify(response));
        this.utServ.goals.next(response);
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
    this.selectedQuarter = "q1";
    this.initiatives = this.activities = this.opis = [];
    this.utServ.getOpiResultByYear(cycleId, year).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = JSON.parse(JSON.stringify(response));
        this.utServ.goals.next(response);
        this.initFilters(response);
      }
      this.loaderService.display(false);
    },(error:any)=>{
      this.loaderService.display(false);
      alertify.error("Something went wrong");
    });
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
      this.utServ.goals.next(response);
      this.loaderService.status.next(false);            
      this.initFilters(response);
    },(error:any)=>{
      this.loaderService.display(false);
      alertify.error("Something went wrong..");
    });
  }

  reloadOpis(){
    this.selectedYear = new Date().getFullYear();
    this.selectedQuarter = "q1";
    this.getOpiResultByQuarter(this.selectedQuarter);
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