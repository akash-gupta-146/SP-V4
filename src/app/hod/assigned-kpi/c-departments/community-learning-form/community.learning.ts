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
   "currentCost": ['',[Validators.required,Validators.min(0)]],
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

 getMinDate(){
   return new Date().toISOString().split('T')[0];
 } 

 validateEndDate(){
   return new Date(this.communityLearningForm.controls['startDate'].value).toISOString().split('T')[0];
 }

 submitForm(){
  if(!this.isUpdating)
   this.utServ.postQuarterWithCommunityLearning(this.selectedQuarter.id,this.communityLearningForm.value).subscribe((response:any)=>{
    this.selectedQuarter.communityLearnings.push(response);
    this.selectedQuarter.currentCost += response.currentCost;
    this.learningListView = true;
    this.selectedQuarter.status = "inprogress";
    // $("#myModal"+this.d).modal('hide');
   });
  else {
   alertify.confirm("Do You want to update it?", (ok: any) => {
    this.utServ.updateForm(this.url, this.communityLearningForm.value).subscribe((response: any) => {
     _.extend(this.selectedLearning,response);
     this.learningListView = true;
    }, (error: any) => {
    });
   }).setHeader("Confirmation");
  }   
 }

 selectQuarter(level: any) {
  this.selectedQuarter = level;
  this.changeSelected.emit(level);
 }

 lockQuarterResult(quarter: any) {
  alertify.confirm("Are you sure, you want to submit your results, once submitted you will not be able to edit them ?", () => {
   
   
   this.utServ.lockQuarterResult(quarter.id, { 'status': 'locked' }).subscribe((response: any) => {  quarter.role = this.role;
    
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
   
   this.utServ.deleteCommunityLearningProgram(learning.communityLearningId).subscribe((response:any)=>{
    communityLearning.splice(communityLearning.indexOf(learning),1);
    
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 deleteEvidence(evidence:any,evidences:any[]){
  alertify.confirm("Are you sure you want to delete the Evidence File?",()=>{
   this.loaderService.setLoadingStatus("Deleting");
   
   this.utServ.deleteEvidenceofLearningProgram(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    
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
 
 selectLevel(level){
  this.changeSelected.emit(level);
}
 
}