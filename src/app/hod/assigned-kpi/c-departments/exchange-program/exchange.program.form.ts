import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HodService } from '../../../hod.service';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../../../shared/loader.service';

@Component({
 selector:'exchange-program',
 templateUrl:'exchange.program.form.html',
 styleUrls: ['./../../../hod.component.css'],
})
export class ExchangeProgram{

 selectedQuarter: any;

 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 public exchangeProgramForm:FormGroup
 constructor(private fb: FormBuilder,public utServ: HodService, public loaderService: LoaderService) {
  this.exchangeProgramForm = this.fb.group({
   currentCost:['',[Validators.required]],
   program:['',[Validators.required]],
   partnerOrganization:['',[Validators.required]],
   totalInsideParticipants:['',[Validators.required]],
   totalFemaleInsideParticipants:['',[Validators.required]],
   totalOutsideParticipants:['',[Validators.required]],
   totalNationalParticipants:['',[Validators.required]],
   duration:['',[Validators.required]],
   description:['',[Validators.required]]
  })
 }

 submitForm(){
  console.log(this.exchangeProgramForm.value);
  this.utServ.postQuarterWithExchangeProgram(this.selectedQuarter.id,this.exchangeProgramForm.value).subscribe((response:any)=>{
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

 delete(program:any,exchangeProgram:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   this.loaderService.setLoadingStatus("Deleting");
   this.loaderService.setTransactionLoader(true);
   this.utServ.deleteCommunityLearningProgram(program.exchangeProgramId).subscribe((response:any)=>{
    exchangeProgram.splice(exchangeProgram.indexOf(program),1);
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
   this.utServ.deleteEvidenceofExchangeProgram(evidence.id).subscribe((response:any)=>{
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