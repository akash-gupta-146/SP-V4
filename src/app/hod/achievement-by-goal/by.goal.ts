import { Component, OnInit } from '@angular/core';
import { HodService } from '../hod.service';
import { Location } from '@angular/common';
import { LoaderService } from '../../shared/loader.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'by-goal',
  templateUrl: 'by.goal.html',
  styleUrls: ['./../hod.component.scss']
})
export class ByGoal implements OnInit {
  cycles: any;
  selectedYear(arg0: any, arg1: any, arg2: any): any {
    throw new Error("Method not implemented.");
  }
  defaultCycle: any = {};
  goalsCopy: any[];
  goals: any[];
  opis: any[] = [];
  selectedGoal: any;
  constructor(private utServ: HodService,
    private location: Location,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.getCycles();
  }

  getCycles() {
    this.loaderService.display(true);
    this.utServ.getCycles().subscribe((response: any) => {
      this.cycles = response;
      this.cycles.forEach(element => {
        if (element.defaultCycle) {
          this.defaultCycle = element;
          this.getGoals(element);
        }
      });
    }, (error: any) => {
      this.loaderService.display(false);
      alertify.error("Something went wrong");
    });
  }

  getGoals(cycle): any {
    this.selectedGoal = 0;
    this.loaderService.display(true);
    this.utServ.getOpiResultByGoalMode(cycle.cycleId).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = response;
        console.log(response);
      }
      this.loaderService.display(false);
    });
  }

  getKpiByGoal(goalId: any) {
    // this.utServ.getOpiResultByGoal(goalId).subscribe((response:any)=>{
    //  this.opis = response;
    // })
    if (goalId != 0)
      this.goals = this.goalsCopy.filter((element: any) => {
        return (element.goalId == goalId);
      });
    else
      this.goals = this.goalsCopy;
  }

  getOpiResultByYear() {
    this.loaderService.display(true);
    this.utServ.getOpiResultByYear(this.defaultCycle.cycleId, this.selectedYear).subscribe((response: any) => {
      this.loaderService.display(false);
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
      this.utServ.goals.next(response);
      this.loaderService.status.next(false);
    }, (error: any) => {
      this.loaderService.display(false);
      alertify.error("Something went wrong..");
    });
  }
}