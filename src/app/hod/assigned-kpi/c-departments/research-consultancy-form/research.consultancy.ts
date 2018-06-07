import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HodService } from '../../../hod.service';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { LoaderService } from '../../../../shared/loader.service';
import { StorageService } from '../../../../shared/storage.service';

declare let $:any;

@Component({
 selector:'research-consultancy',
 templateUrl:'research.consultancy.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class ResearchConsultancy implements OnInit{

  @Output() selectEvidence: any = new EventEmitter();
 role: any;
 selectedProgram: any;
 url: string;
 isUpdating: boolean;
 formId: any;
 selectedQuarter: any;
 programListView:boolean;

 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 @Input () set evidanceFormId(id:any){
  this.formId = id;
 }
 public researchConsultancyForm:FormGroup
 constructor(private fb: FormBuilder,
             public utServ: HodService, 
             public loaderService: LoaderService,
             public storage:StorageService) {

 }

 ngOnInit(){
  this.role = this.storage.getData('userDetails').roleInfo[0].role;
  this.researchConsultancyForm = this.fb.group({
   "currentCost":['',[Validators.required,Validators.min(0)]],
   "projectTitle":['',[Validators.required]],
   "interDisciplinaryProject":[false,[]],
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

 getMinDate(){
  return new Date().toISOString().split('T')[0];
} 

 submitForm(){
  if(!this.isUpdating)
   this.utServ.postQuarterWithResearchConsultancy(this.selectedQuarter.id,this.researchConsultancyForm.value).subscribe((response:any)=>{
    this.selectedQuarter.researchConsultancies.push(response);
    this.selectedQuarter.currentCost += response.currentCost;
    this.programListView = true;
    // $("#myModal"+this.d).modal('hide');
   });
  else{
   alertify.confirm("Do You want to update it?", (ok: any) => {
    this.utServ.updateForm(this.url, this.researchConsultancyForm.value).subscribe((response: any) => {
     
     _.extend(this.selectedProgram,response);
     this.programListView = true;
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

 delete(program:any,researchConsultancy:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   
   
   this.utServ.deleteResearchConsultancy(program.exchangeProgramId).subscribe((response:any)=>{
    researchConsultancy.splice(researchConsultancy.indexOf(program),1);
    
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 deleteEvidence(evidence:any,evidences:any[]){
  alertify.confirm("Are you sure you want to delete the Evidence File?",()=>{
   
   
   this.utServ.deleteEvidenceofResearchConsultancy(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 edit(program:any){
  this.isUpdating = true;
  this.selectedProgram = program;
  this.url = "/research-consultancy/"+ program.researchConsultancyId;
  this.researchConsultancyForm.patchValue(program);
  this.programListView = false;
 }

 resetForm(){ this.isUpdating = false;
  this.researchConsultancyForm.reset();
 }

 selectProgram(program:any){
  this.selectedQuarter.selectedForm = program;
  this.changeSelected.emit(this.selectedQuarter);
 }

 storeEvidence(ev:any){
  this.selectEvidence.emit(ev);
 }

 selectLevel(level){
  this.changeSelected.emit(level);
}
}