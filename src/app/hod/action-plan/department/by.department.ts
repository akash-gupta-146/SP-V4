import { Component } from '@angular/core';
import { StorageService } from '../../../shared/storage.service';
import { HodService } from '../../hod.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as alertify from 'alertifyjs';

declare let $:any;

@Component({
 selector: 'by-department',
 templateUrl: './by.department.html',
 styleUrls: ['./../../hod.component.scss']
})
export class ActionPlanByDepartment {
 selectedStep: any;
 actionForm: FormGroup;
 actionSteps: any;
 departments: any[] = [];
 departmentIds: any[] = [];
 constructor(private storage: StorageService, private utServ: HodService, public fb: FormBuilder) {

  this.utServ.getActionStepsWhenPlanMode().subscribe((response: any) => {
   if(response.status === 204){
    this.actionSteps = [];
   }else{
    this.actionSteps = response;
   }
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