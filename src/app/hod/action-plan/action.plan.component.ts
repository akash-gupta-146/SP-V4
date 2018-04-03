import { Component } from '@angular/core';
import { HodService } from '../hod.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
declare let $: any;

@Component({
 selector: 'action-plan',
 templateUrl: './action.plan.component.html',
 styleUrls: ['./../hod.component.scss']
})
export class ActionPlan {
 [x: string]: any;
 my: boolean = false;
 selectedStep: any;
 actionForm: FormGroup;
 statusForm: FormGroup;
 actionSteps: any[] = [];
 employeeIds: any[] = [];
 constructor(public utServ: HodService, public fb: FormBuilder, public router: Router) {
  this.actionForm = this.fb.group({
   "reason": ["", Validators.required],
   "description": ["", Validators.required],
   "resources": ["", Validators.required],
   "deadline": ["", Validators.required],
   "opiId": []
  });
  this.statusForm = this.fb.group({
   "status": ['', Validators.required],
   "comment": ['', Validators.required]
  });
  if (this.router.url.includes("my-action-step")) {
   this.my = true;
  }
  this.getAllActionPlan();
 }

 getAllActionPlan() {
  var url = "";
  if(this.my)
   url = "/my-action-step";
  else
   url="/action-step";

  this.utServ.getActionStep(url).subscribe((response: any) => {
   if (response.status === 204) {
    this.actionSteps = [];
   } else {
    this.actionSteps = response;
   }
  })
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

 assignEmployee() {
  alertify.confirm("Are  you sure to assign this action step?", (response: any) => {
   var ids = [];
   this.employeeIds.forEach(element => {
    ids.push(element.id)
   });
   var object = {
    employeeIds: ids
   }
   console.log(object);
   this.utServ.assignActionStep(this.selectedStep.linkingId, object).subscribe((response: any) => {
    this.employeeIds.forEach(element => {
     this.selectedStep.employeeAssigned.push(element);
    });
    alertify.success("Assigned");
    $('.emp-list').hide({ direction: "left" });
   }, (error: any) => {
    alertify.error("Something went wrong");
    $('.emp-list').hide({ direction: "left" });
   });
  }).setHeader("Confirmation");
 }

 onStatusSubmit() {
  this.utServ.setActionStepStatus(this.selectedStep.assignmentId, this.statusForm.value).subscribe((response: any) => {
   this.selectedStep['statusLogs']=[];
   this.selectedStep.statusLogs.push(response);
   $('#postActionModal').modal('hide');
   alertify.success("Success");
  });
 }

 employees: any[] = [];
 showList(selectedStep: any) {
  this.selectedStep = selectedStep;
  this.employees = selectedStep.otherEmployees;
  $('.emp-list').show({ direction: "left" });
 }
 hideList() {
  $('.emp-list').hide({ direction: "left" });
 }
}