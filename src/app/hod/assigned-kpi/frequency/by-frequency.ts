import {Component,AfterViewInit} from '@angular/core';
import { HodService } from '../../hod.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage.service';
@Component({
 selector:'by-frequency',
 templateUrl:'by-frequency.html',
 styleUrls: ['./../../hod.component.scss']
})
export class ByFrequency implements AfterViewInit{
  goalsCopy: any[];
  goals: any[];
  quarters:any[];
 role: any;
 year:any;
 frequencies: any;
 selectedFrequency:any;
 selectedQuarter:any;
 constructor(public utServ:HodService,public router:Router,private storage: StorageService){

  this.utServ.goals.asObservable().subscribe((val:any[])=>{
    this.goals = val;
    });

  
  this.utServ.getFrequencies().subscribe((response:any)=>{
   console.log(response);
   this.frequencies = response;
  })
 }

 ngAfterViewInit(){
   this.goalsCopy = this.goals;
 }

 goBack(){
  this.utServ.getKpiByQuarter(this.selectedQuarter,this.year).subscribe((response:any)=>{
    this.utServ.goals.asObservable().subscribe((val:any[])=>{
     this.utServ.goals.next(response);
     this.router.navigateByUrl(this.role + "/home");
     });
   });
 }
}