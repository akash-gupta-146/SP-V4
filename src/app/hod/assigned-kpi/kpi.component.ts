import {Component} from '@angular/core';
import { Filters } from '../../shared/filters';
import { HodService } from '../hod.service';
import { StorageService } from '../../shared/storage.service';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
declare let $:any;

@Component({
 selector:'assigned-kpi',
 templateUrl:'./kpi.component.html',
 styleUrls: ['./../hod.component.css']
})
export class KPIComponent extends Filters {
 selectedLevel:any;
 selectedOpi:any;
 selectedDepartment:any;
 roles: any[] = ["coordinator", "hod", "dvc", "vc", "chanceller"];
 role:any; 
 initiatives:any[]=[];
 activities:any[]=[];
 opis:any[]=[];
 quarters:any[];
 constructor(private utServ: HodService,
   private storage: StorageService) {
   
   super();
   this.role = this.storage.getData('user_roleInfo')[0].role;
   this.getOpi();
   this.getFrequencies();
   this.utServ.goals.asObservable().subscribe((val:any[])=>{
    this.goals = val;
    });
 }

 frequencies: any[];
 getFrequencies() {
   this.utServ.getFrequencies().subscribe((response: any) => {
     console.log("frequencies :", response);
     this.frequencies = response;
   })
 }

 getOpi(): any {
   this.utServ.getOpiResult().subscribe((response: any) => {
     if (response.status == 204) {
       this.goals = [];
       this.goalsCopy = []
     } else {
       this.goals = response;
       this.goalsCopy = response;
       this.utServ.goals.next(response);
       this.initFilters(response);
     }
   })
 }

 setQuarterFeedback(data:any){
   console.log(data.feedback);
   if(data.feedback == 'true')
     alertify.confirm("Do you realy want to Approve this??",()=>{
       this.utServ.approve(data.id,{comment:data.comment}).subscribe((reponse)=>{
         console.log(reponse);
         alertify.notify("Audit has been Approved");
         $("#feedbackModal").modal('hide');
       },(error:any)=>{
         console.log(error); 
         alertify.notify("Something went wrong");          
         $("#feedbackModal").modal('hide');                 
       });
     }).setHeader("Confirmation");
   else
     alertify.confirm("Do you realy want to Reject this??", ()=>{
       this.utServ.reject(data.id,{comment:data.comment}).subscribe((reponse)=>{
         console.log(reponse);
         alertify.notify("Audit has been Rejected");
       },(error:any)=>{
         console.log(error);        
         alertify.notify("Something went wrong");
       });
     }).setHeader("Confirmation");     
 }
}