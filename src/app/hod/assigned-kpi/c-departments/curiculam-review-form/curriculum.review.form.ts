import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HodService } from '../../../hod.service';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../../../shared/loader.service';
@Component({
 selector: 'curriculum-review',
 templateUrl: 'curriculum.review.form.html',
 styleUrls: ['./../../../hod.component.css'],
})
export class CurriculumReviewForm {
 selectedQuarter: any;

 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 public curriculumReviewForm:FormGroup

 constructor(private fb: FormBuilder,public utServ: HodService, public loaderService: LoaderService) {
  this.curriculumReviewForm = this.fb.group({
   currentCost:['',[Validators.required]],
   program:['',[Validators.required]],
   reviewType:['',[Validators.required]],
   totalCollegeStaffInvolved:['',[Validators.required]],
   sentToCurriculamCommittee:['',[Validators.required]],
  })
 }

 submitForm(){
  console.log(this.curriculumReviewForm.value);
  this.utServ.postQuarterWithCurriculumReview(this.selectedQuarter.id,this.curriculumReviewForm.value).subscribe((response:any)=>{
   console.log(response);
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
    console.log(response);
    quarter.disable = true;
    quarter.status = "locked";
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 delete(review:any,curriculumReview:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   this.loaderService.setLoadingStatus("Deleting");
   this.loaderService.setTransactionLoader(true);
   this.utServ.deleteCurriculumReviewProgram(review.curriculamReviewId).subscribe((response:any)=>{
    curriculumReview.splice(curriculumReview.indexOf(review),1);
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
   this.utServ.deleteEvidenceofCurriculumReviewProgram(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    this.loaderService.setTransactionLoader(false);
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 selectProgram(program:any){
  this.selectedQuarter.selectedForm = program;
  this.changeSelected.emit(this.selectedQuarter);
 }
}