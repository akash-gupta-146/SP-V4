import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HodService } from '../../../hod.service';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../../../shared/loader.service';

declare let $:any;

@Component({
 selector:'student-research',
 templateUrl:'student.research.form.html',
 styleUrls: ['./../../../hod.component.css'],
})
export class StudentResearch{

 formId: any;
 selectedQuarter: any;
 programListView:boolean;

 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 @Input () set evidanceFormId(id:any){
  this.formId = id;
 }
 public studentResearchForm:FormGroup
 constructor(private fb: FormBuilder,public utServ: HodService, public loaderService: LoaderService) {
  this.studentResearchForm = this.fb.group({
   "currentCost":['',[Validators.required]],
   "eventTitle":['',[Validators.required]],
   "organizedBy":['',[Validators.required]],
   "startAt":['',[Validators.required]],
   "endAt":['',[Validators.required]],
   "location":['',[Validators.required]],
   "totalStudentAttendedFromOurCollege":['',[Validators.required]],
   "scopeId":['',[Validators.required]],
   "eventType":['',[Validators.required]],
  });
 }

 submitForm(){
  console.log(this.studentResearchForm.value);
  this.utServ.postQuarterWithStudentResearch(this.selectedQuarter.id,this.studentResearchForm.value).subscribe((response:any)=>{
   this.selectedQuarter.studentResearches.push(response.studentResearches[0]);
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
    console.log(response);
    quarter.disable = true;
    quarter.status = "locked";
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 delete(program:any,researchConsultancy:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   this.loaderService.setLoadingStatus("Deleting");
   this.loaderService.setTransactionLoader(true);
   this.utServ.deleteStudentResearch(program.exchangeProgramId).subscribe((response:any)=>{
    researchConsultancy.splice(researchConsultancy.indexOf(program),1);
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
   this.utServ.deleteEvidenceofStudentResearch(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    this.loaderService.setTransactionLoader(false);
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 edit(program:any){
  this.studentResearchForm.patchValue(program);
  this.programListView = false;
 }

 resetForm(){
  this.studentResearchForm.reset();
 }

 selectProgram(program:any){
  this.selectedQuarter.selectedForm = program;
  this.changeSelected.emit(this.selectedQuarter);
 }
}