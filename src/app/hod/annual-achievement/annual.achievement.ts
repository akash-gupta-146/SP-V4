import { Component } from '@angular/core';
import { HodService } from '../hod.service';

@Component({
  selector: 'annual-achievement',
  templateUrl: './annual.achievement.html',
  styleUrls: ['./annual.achievement.css', './../hod.component.css']
})
export class AnnualAchievement {
  organisationInfo: any;
  goalsCopy: any[];
  goals: any[];
  constructor(private utServ: HodService) {
    this.utServ.fetchOrganizationInfo().subscribe((response) => {
      this.organisationInfo = response;
    })
    this.getOpiResult();
  }
  getOpiResult() {
    this.utServ.getAllOpiResult().subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.utServ.goals.next(response);
        this.goalsCopy = response;
        this.getOpiResultByYear('2018');
      }
    });
  }

  getOpiResultByYear(year:any){
    this.utServ.getOpiResultByYearOnly(year).subscribe((response:any)=>{
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.utServ.goals.next(response);
        this.goalsCopy = response;
      }
    })
  }

}