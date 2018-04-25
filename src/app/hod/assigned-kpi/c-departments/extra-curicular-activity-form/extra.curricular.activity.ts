import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HodService } from '../../../hod.service';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { LoaderService } from '../../../../shared/loader.service';
import { StorageService } from '../../../../shared/storage.service';

@Component({
 selector: 'extra-curricular-activity',
 templateUrl: 'extra.curricular.activity.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class ExtraCurricularActivity implements OnInit{

 role: any;
 selectedProgram: any;
 url: string;
 isUpdating: boolean;
 formId: any;
 selectedQuarter: any;
 activityListView:boolean;

 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 @Input () set evidanceFormId(id:any){
  this.formId = id;
 }
 public extraCurricularActivityForm: FormGroup
 constructor(private fb: FormBuilder, 
             public utServ: HodService, 
             public loaderService: LoaderService,
             public storage:StorageService) {

 }

 ngOnInit(){
  this.role = this.storage.getData('userDetails').roleInfo[0].role;
  this.extraCurricularActivityForm = this.fb.group({
   title: ['', [Validators.required]],
   currentCost: ['', [Validators.required]],
   activityDate: ['', [Validators.required]],
   activityType: ['', [Validators.required]],
   internal: ['', [Validators.required]],
   scopeId: ['', [Validators.required]],
   totalInsideParticipants: ['', [Validators.required]],
   totalOutsideParticipants: ['', [Validators.required]],
  });
 }

 submitForm() {
  console.log(this.extraCurricularActivityForm.value);
  if(!this.isUpdating)
  this.utServ.postQuarterWithExtraCurricularActivity(this.selectedQuarter.id, this.extraCurricularActivityForm.value).subscribe((response: any) => {
   console.log(response);
  });
  else {
   alertify.confirm("Do You want to update it?", (ok: any) => {
    this.utServ.updateForm(this.url, this.extraCurricularActivityForm.value).subscribe((response: any) => {
     console.log(response);
     _.extend(this.selectedProgram,this.extraCurricularActivityForm.value);
     this.activityListView = true;
    }, (error: any) => {
     console.log(error);
    });
   });
  }
 }

 selectQuarter(level: any) {
  this.selectedQuarter = level;
  this.changeSelected.emit(level);
 }

 lockQuarterResult(quarter: any) {
  alertify.confirm("Are you sure you want to Lock you results", () => {
   this.loaderService.setLoadingStatus("Locking");
   this.loaderService.setTransactionLoader(true);
   this.utServ.lockQuarterResult(quarter.id, { 'status': 'locked' }).subscribe((response: any) => {
    this.loaderService.setTransactionLoader(false);
    console.log(response);
    quarter.disable = true;
    quarter.status = "locked";
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 delete(activity:any,extraCurricularActivity:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   this.loaderService.setLoadingStatus("Deleting");
   this.loaderService.setTransactionLoader(true);
   this.utServ.deleteExtraCurricularActivity(activity.extraCurricularActivityId).subscribe((response:any)=>{
    extraCurricularActivity.splice(extraCurricularActivity.indexOf(activity),1);
    this.loaderService.setTransactionLoader(false);
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 deleteEvidence(evidence:any,evidences:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   this.loaderService.setLoadingStatus("Deleting");
   this.loaderService.setTransactionLoader(true);
   this.utServ.deleteEvidenceofExtraCurricularActivity(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    this.loaderService.setTransactionLoader(false);
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 edit(program:any){
  this.isUpdating = true;
  this.selectedProgram = program;
  this.url = "/extra-curricular-activity/"+ program.extraCurricularActivityId;
  this.extraCurricularActivityForm.patchValue(program);
  this.activityListView = false;
 }

 resetForm(){ this.isUpdating = false;
  this.extraCurricularActivityForm.reset();
 }

 selectActivity(program:any){
  this.selectedQuarter.selectedForm = program;
  this.changeSelected.emit(this.selectedQuarter);
 }
}