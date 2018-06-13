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
  noData: boolean = false;
  defaultCycle: any ={};
  selectedYear:any = new Date().getFullYear();
  cycles: any;
  organisationInfo: any;
  goalsCopy: any[]=[];
  goals: any[]=[];
  constructor(private utServ: HodService,
              private loaderService:LoaderService) {               
  }

  ngOnInit(){
    this.loaderService.display(true);
    this.utServ.fetchOrganizationInfo().subscribe((response) => {
      this.organisationInfo = response;
      this.cycles = response.cycles;
      this.cycles.forEach(element => {
        if (element.defaultCycle){
          this.defaultCycle = element;
          this.getOpiResultByYear(this.defaultCycle.cycleId,this.selectedYear);
          }
      });
    });
  }

  getOpiResult(cycle: any) {
    this.utServ.getAllOpiResultByCycleId(cycle.cycleId).subscribe((response: any) => {
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
    });
  }

  getOpiResultByYear(cycleId: any, year: any) {
    this.loaderService.display(true);
    this.utServ.getOpiAllResultByYear(cycleId, year).subscribe((response: any) => {
      this.noData = (response.length)?false:true;
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
      this.loaderService.display(false);
    },(error:any)=>{      
      this.loaderService.display(false);      
    });
  }
  isFuture(y:number){
    return (y > new Date().getFullYear());
  }

  ngOnDestroy(){
    this.loaderService.display(false);
  }

}