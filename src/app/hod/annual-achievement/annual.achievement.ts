import { Component, OnInit, OnDestroy } from '@angular/core';
import { HodService } from '../hod.service';
import { LoaderService } from '../../shared/loader.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'annual-achievement',
  templateUrl: './annual.achievement.html',
  styleUrls: ['./annual.achievement.css', './../hod.component.scss']
})
export class AnnualAchievement implements OnInit,OnDestroy{
  defaultCycle: any ={};
  selectedYear:any = new Date().getFullYear();
  cycles: any;
  organisationInfo: any;
  goalsCopy: any[];
  goals: any[];
  constructor(private utServ: HodService,
              private loaderSErvice:LoaderService) {
    this.loaderSErvice.display(true);
                
  }

  ngOnInit(){
    this.loaderSErvice.display(true);
    this.utServ.fetchOrganizationInfo().subscribe((response) => {
      this.organisationInfo = response;
      this.cycles = response.cycles;
      this.cycles.forEach(element => {
        if (element.defaultCycle){
          this.defaultCycle = element;
          // this.getOpiResult(element);
          this.getOpiResultByYear(this.defaultCycle.cycleId,this.selectedYear);
          }
      });
    });
  }
  // getOpiResult() {
  //   this.utServ.getAllOpiResult().subscribe((response: any) => {
  //     if (response.status == 204) {
  //       this.goals = [];
  //       this.goalsCopy = []
  //     } else {
  //       this.goals = response;
  //       this.utServ.goals.next(response);
  //       this.goalsCopy = response;
  //       this.getOpiResultByYear('2018');
  //     }
  //   });
  // }

  // getOpiResultByYear(year:any){
    // this.utServ.getOpiResultByYearOnly(year).subscribe((response:any)=>{
  //     if (response.status == 204) {
  //       this.goals = [];
  //       this.goalsCopy = []
  //     } else {
  //       this.goals = response;
  //       this.utServ.goals.next(response);
  //       this.goalsCopy = response;
  //     }
  //   })
  // }

  getOpiResult(cycle: any) {
    this.utServ.getAllOpiResultByCycleId(cycle.cycleId).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
      }
    });
  }

  getOpiResultByYear(cycleId: any, year: any) {
    this.utServ.getOpiAllResultByYear(cycleId, year).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
      }
      this.loaderSErvice.display(false);
    },(error:any)=>{      
      this.loaderSErvice.display(false);      
    });
  }
  isFuture(y:number){
    return (y > new Date().getFullYear());
  }

  ngOnDestroy(){
    this.loaderSErvice.display(false);
  }

}