import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../shared/storage.service';
import { HodService } from '../../hod.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../../shared/loader.service';

declare let $:any;

@Component({
 selector: 'by-department',
 templateUrl: './by.department.html',
 styleUrls: ['./../../hod.component.scss']
})
export class ActionPlanByDepartment implements OnInit{
 selectedStep: any;
 actionForm: FormGroup;
 actionSteps: any;
 departments: any[] = [];
 departmentIds: any[] = [];
 constructor(private storage: StorageService, 
  private utServ: HodService, 
  private fb: FormBuilder,
  private loaderService:LoaderService,
  private location: Location) {

 }

 ngOnInit(){
  this.loaderService.display(true);
  this.utServ.getActionStepsWhenPlanMode().subscribe((response: any) => {
   if(response.status === 204){
    this.actionSteps = [];
   }else{
    this.actionSteps = response;
   }
   this.loaderService.display(false);
  },(error:any)=>{
   this.loaderService.display(false);
  });

  this.actionForm = this.fb.group({
   "reason": ["", Validators.required],
   "description": ["", Validators.required],
   "resources": ["", Validators.required],
   "deadline": ["", Validators.required],
   "opiId": []
  });
 }

 editActionStep(step: any) {
  this.actionForm.patchValue(step);
  this.selectedStep = step;
 }

 onSubmit() {
  alertify.confirm("Do you want to update this action step?", (response: any) => {
   this.utServ.updateActionStep(this.selectedStep.stepId, this.actionForm.value).subscribe((response: any) => {
    $('#myModal').modal('hide');
    alertify.success("Updated");
    console.log(response);
   }, (error: any) => {
    alertify.error("Something went wrong");
   })
  }).setHeader("Confirmation");
 }

}