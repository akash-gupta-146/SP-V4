import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HodService } from '../../../hod.service';
import { LoaderService } from '../../../../shared/loader.service';
import * as alertify from 'alertifyjs';

declare let $:any;

@Component({
 selector: 'community-learning',
 templateUrl: './community.learning.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class CommunityLearningForm {
 @Input() department: any;
 @Input() d: number;
 @Output() changeSelected: any = new EventEmitter();
 public communityLearningForm: FormGroup;
 public selectedQuarter:any;
 learningListView:boolean;
 constructor(private fb: FormBuilder,public utServ: HodService, public loaderService: LoaderService) {
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
  this.utServ.postQuarterWithCommunityLearning(this.selectedQuarter.id,this.communityLearningForm.value).subscribe((response:any)=>{
   this.selectedQuarter.communityLearnings.push(response.communityLearnings[0]);
   this.selectedQuarter.currentCost += response.currentCost;
   $("#myModal"+this.d).modal('hide');
  })
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
  this.communityLearningForm.patchValue(learning);
  this.learningListView = false;
 }

 resetForm(){
  this.communityLearningForm.reset();
 }

 selectLearning(learning:any){
  this.selectedQuarter.selectedForm = learning;
  this.changeSelected.emit(this.selectedQuarter);
 }

 
}