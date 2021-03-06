import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HodService } from '../../../hod.service';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { LoaderService } from '../../../../shared/loader.service';
import { StorageService } from '../../../../shared/storage.service';

declare let $:any;

@Component({
 selector:'exchange-program',
 templateUrl:'exchange.program.form.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class ExchangeProgram implements OnInit{

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
 public exchangeProgramForm:FormGroup
 constructor(private fb: FormBuilder,
             public utServ: HodService, 
             public loaderService: LoaderService,
             public storage:StorageService) {

 }

 ngOnInit(){
  this.role = this.storage.getData('userDetails').roleInfo[0].role;
  this.exchangeProgramForm = this.fb.group({
   currentCost:['',[Validators.required,Validators.min(0)]],
   program:['',[Validators.required]],
   partnerOrganization:['',[Validators.required]],
   totalInsideParticipants:['',[Validators.required]],
   totalFemaleInsideParticipants:['',[Validators.required]],
   totalOutsideParticipants:['',[Validators.required]],
   totalNationalParticipants:['',[Validators.required]],
   duration:['',[Validators.required]],
   description:['',[Validators.required]]
  });
 }

 submitForm(){
  if(!this.isUpdating) 
   this.utServ.postQuarterWithExchangeProgram(this.selectedQuarter.id,this.exchangeProgramForm.value).subscribe((response:any)=>{
    this.selectedQuarter.exchangePrograms.push(response);
    this.selectedQuarter.currentCost += response.currentCost;
    $("#myModal"+this.d).modal('hide');
   });
  else {
   alertify.confirm("Do You want to update it?", (ok: any) => {
    this.utServ.updateForm(this.url, this.exchangeProgramForm.value).subscribe((response: any) => {
     _.extend(this.selectedProgram, response);
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

 delete(program:any,exchangeProgram:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   
   
   this.utServ.deleteExchangeProgram(program.exchangeProgramId).subscribe((response:any)=>{
    exchangeProgram.splice(exchangeProgram.indexOf(program),1);
    
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 deleteEvidence(evidence:any,evidences:any[]){
  alertify.confirm("Are you sure you want to delete the Evidence File?",()=>{
   
   
   this.utServ.deleteEvidenceofExchangeProgram(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 edit(program:any){
  this.isUpdating = true;
  this.selectedProgram = program;
  this.url = "/exchange-program/"+ program.exchangeProgramId;  
  this.exchangeProgramForm.patchValue(program);
  this.programListView = false;
 }

 resetForm(){ this.isUpdating = false;
  this.exchangeProgramForm.reset();
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