import {Component} from '@angular/core';
import { HodService } from '../hod.service';
import { Location } from '@angular/common';

@Component({
 selector:'by-goal',
 templateUrl:'by.goal.html',
 styleUrls: ['./../hod.component.scss']
})
export class ByGoal{
 goalsCopy: any[];
 goals: any[];
 opis:any[]=[];
 constructor(private utServ: HodService,private location: Location){
  this.getGoals();
 }

 getGoals(): any {
  this.utServ.getOpiResultByGoalMode().subscribe((response: any) => {
    if (response.status == 204) {
      this.goals = [];
      this.goalsCopy = []
    } else {
      this.goals = response;
      this.goalsCopy = response;
      console.log(response);
    }
  });
 }

 getKpiByGoal(goalId:any){
  // this.utServ.getOpiResultByGoal(goalId).subscribe((response:any)=>{
  //  this.opis = response;
  // })
  if(goalId!=0)
   this.goals = this.goalsCopy.filter((element:any)=>{
    return (element.goalId == goalId);
   });
  else
   this.goals = this.goalsCopy;
 }
}