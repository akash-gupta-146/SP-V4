import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HodService } from '../../../hod.service';
import { LoaderService } from '../../../../shared/loader.service';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { StorageService } from '../../../../shared/storage.service';
declare let $:any;

@Component({
 selector: 'community-learning',
 templateUrl: './community.learning.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class CommunityLearningForm implements OnInit{
  @Output() selectEvidence: any = new EventEmitter();
 role: any;
 selectedLearning: any;
 url: any;
 formId: any;
 @Input() department: any;
 @Input() d: number;
 @Output() changeSelected: any = new EventEmitter();
 @Input () set evidanceFormId(id:any){
  this.formId = id;
 }
 communityLearningForm: FormGroup;
 selectedQuarter:any;
 learningListView:boolean;
 isUpdating:boolean = false;
 constructor(private fb: FormBuilder,
             public utServ: HodService, 
             public loaderService: LoaderService,
             public storage:StorageService) {
  
 }

 ngOnInit(){
  this.role = this.storage.getData('userDetails').roleInfo[0].role;
  this.communityLearningForm = this.fb.group({
   "currentCost": ['',[Validators.required]],
   "title": ['',[Validators.required]],
   "learningType": ['',[Validators.required]],
   // "scopeId": ['',[Validators.required]],
   "startDate": [new Date(),[Validators.required]],
   "endDate": ['',[Validators.required]],
   "totalInsideParticipants": ['',[Validators.required]],
   "totalOutsideParticipants": ['',[Validators.required]],
   "sponsors": ['',[Validators.required]]
  });
 }

 submitForm(){
  console.log(this.communityLearningForm.value);
  if(!this.isUpdating)
   this.utServ.postQuarterWithCommunityLearning(this.selectedQuarter.id,this.communityLearningForm.value).subscribe((response:any)=>{
    this.selectedQuarter.communityLearnings.push(response.communityLearnings[0]);
    this.selectedQuarter.currentCost += response.currentCost;
    $("#myModal"+this.d).modal('hide');
   });
  else {
   alertify.confirm("Do You want to update it?", (ok: any) => {
    this.utServ.updateForm(this.url, this.communityLearningForm.value).subscribe((response: any) => {
     console.log(response);
     _.extend(this.selectedLearning,this.communityLearningForm.value);
     this.learningListView = true;
    }, (error: any) => {
     console.log(error);
    });
   }).setHeader("Confirmation");
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
    quarter.disable = true;
    quarter.status = "locked";
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 delete(learning:any,communityLearning:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   this.loaderService.setLoadingStatus("Deleting");
   this.loaderService.setTransactionLoader(true);
   this.utServ.deleteCommunityLearningProgram(learning.communityLearningId).subscribe((response:any)=>{
    communityLearning.splice(communityLearning.indexOf(learning),1);
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
   this.utServ.deleteEvidenceofLearningProgram(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    this.loaderService.setTransactionLoader(false);
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 edit(learning:any){
  this.selectedLearning = learning;
  this.isUpdating = true;
  this.communityLearningForm.patchValue(learning);
  this.learningListView = false;
  this.url = "/community-learning/"+ learning.communityLearningId;
 }

 resetForm(){ this.isUpdating = false;
  this.communityLearningForm.reset();
 }

 selectLearning(learning:any){
  this.selectedQuarter.selectedForm = learning;
  this.changeSelected.emit(this.selectedQuarter);
 }

 storeEvidence(ev:any){
  this.selectEvidence.emit(ev);
 }

 
}