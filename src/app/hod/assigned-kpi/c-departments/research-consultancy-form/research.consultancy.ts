import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HodService } from '../../../hod.service';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../../../shared/loader.service';

declare let $:any;

@Component({
 selector:'research-consultancy',
 templateUrl:'research.consultancy.html',
 styleUrls: ['./../../../hod.component.css'],
})
export class ResearchConsultancy{

 selectedQuarter: any;
 programListView:boolean;

 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 public researchConsultancyForm:FormGroup
 constructor(private fb: FormBuilder,public utServ: HodService, public loaderService: LoaderService) {
  this.researchConsultancyForm = this.fb.group({
   "currentCost":['',[Validators.required]],
   "projectTitle":['',[Validators.required]],
   "interDisciplinaryProject":[false,[Validators.required]],
   "description":['',[Validators.required]],
   "startDate":['',[Validators.required]],
   "estimatedTime":['',[Validators.required]],
   "externalPartners":['',[Validators.required]],
   "fundFromExternalPartners":['',[Validators.required]],
   "fundFromUniversity":['',[Validators.required]],
   "totalResearchersInvolved":['',[Validators.required]],
   "totalFacultyInvolved":['',[Validators.required]],
  });
 }

 submitForm(){
  console.log(this.researchConsultancyForm.value);
  this.utServ.postQuarterWithResearchConsultancy(this.selectedQuarter.id,this.researchConsultancyForm.value).subscribe((response:any)=>{
   this.selectedQuarter.researchConsultancies.push(response.researchConsultancies[0]);
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
   this.utServ.deleteResearchConsultancy(program.exchangeProgramId).subscribe((response:any)=>{
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
   this.utServ.deleteEvidenceofResearchConsultancy(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    this.loaderService.setTransactionLoader(false);
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 edit(program:any){
  this.researchConsultancyForm.patchValue(program);
  this.programListView = false;
 }

 resetForm(){
  this.researchConsultancyForm.reset();
 }

 selectProgram(program:any){
  this.selectedQuarter.selectedForm = program;
  this.changeSelected.emit(this.selectedQuarter);
 }
}