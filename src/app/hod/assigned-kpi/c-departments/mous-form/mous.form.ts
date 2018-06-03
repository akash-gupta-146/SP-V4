import { Component, Input, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { HodService } from '../../../hod.service';
import { LoaderService } from '../../../../shared/loader.service';
import { StorageService } from '../../../../shared/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let $: any;

@Component({
 selector: 'mous-form',
 templateUrl: './mous.form.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class MousForm implements OnInit{
  saving: boolean;
  selectedmou: any;
  mouListView: boolean;
  url: string;
  isUpdating: boolean;
  role: any;
  @Output() selectEvidence: any = new EventEmitter();
 formId: any;
 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 @Input () set evidanceFormId(id:any){
  this.formId = id;
 }
 constructor(public utServ: HodService, public loaderService: LoaderService,private storage:StorageService,private fb:FormBuilder) {

 }

 ngOnInit(){
  this.role = this.storage.getData('userDetails').roleInfo[0].role;
  this.mouForm = this.fb.group({
    mouType:['',[Validators.required]],
    organization:['',[Validators.required]],
    currentCost:['',[Validators.required]]
  });
 }

 saveQuarterResultWithMou(lev: any) {
  var object = {
   "currentCost": lev.currentCost,
   "mouType": lev.mouType,
   "organization": lev.organization
  }
  
  
  this.utServ.saveQuarterResultWithMou(lev.id, object).subscribe((response: any) => {
   lev.currentCost = response.currentCost;
   if (lev.mouDetails.length) {
    lev.mouDetails.push(response.mouDetails[0]);
    this.changeSelected.emit(lev);
   } else {
    lev.mouDetails = [];
    lev.mouDetails.push(response.mouDetails[0]);
    this.changeSelected.emit(lev);
   }
   lev.addMore = false;
   lev.mouType = '';
   lev.organization = '';
   
   alertify.success("Saved");
  });
 }

 updateMou(mou: any) {
  var object = {
   "mouType": mou.mouType,
   "organization": mou.organization
  }
  
  
  this.utServ.updateMou(mou.id, object).subscribe((response: any) => {
   
   alertify.success("Updated");
   mou.edit = false;
  })
 }

 updateCurrentCost(lev: any) {
  var object = {
   "currentCost": lev.currentCost
  }
  
  
  this.utServ.updateQuarterResultCurrentCost(lev.id, object).subscribe((response: any) => {
   lev.edit = false;
   setTimeout(() => {
    
    alertify.success("Updated");
   }, 1000);
  });
 }

 selectMou(mou: any, level: any) {
  level.selectedForm = mou;
  this.changeSelected.emit(level);
 }

//  deleteEvidence(evidences: any[], evidence: any, index: any) {
//   alertify.confirm("Are you sure you want to delete this evidence", () => {
//    this.utServ.deleteEvidence(evidence.id).subscribe((response: any) => {
//     evidences.splice(index, 1);
//     alertify.success("Success");
//    }, (error: any) => {
//     alertify.error("Something went wrong");
//    })
//   }).setHeader("Atert Message");
//  }

 collapseOff(element: any, level: any) {
  this.changeSelected.emit(level);
  if ($(element).hasClass('show')) {
   return;
  }
  $(element).addClass('show');
  $(".collapse-off").removeClass('show');
 }
 Q:any={};
 selectedQuarter:any={};
 selectQuarter(level: any) {
  this.selectedQuarter = level;
  this.changeSelected.emit(level);
 }

 storeEvidence(ev:any){
  this.selectEvidence.emit(ev);
 }

 deleteMou(mous: any[], mou: any, index: any) {
  alertify.confirm("Are you sure you want to delete Selected MOU", () => {
    this.utServ.deleteMou(mou.id).subscribe((response: any) => {
      mous.splice(index, 1);
      alertify.success("MOU Sucessfully removed");
    }, (error: any) => {
      alertify.error("Something went wrong");
    });
  }).setHeader("Confirmation");
}

lockQuarterResult(quarter: any) {
  alertify.confirm("Are you sure, you want to submit your results, once submitted you will not be able to edit them ?", () => {
   this.utServ.lockQuarterResult(quarter.id, { 'status': 'locked' }).subscribe((response: any) => {  quarter.role = this.role;
    
    quarter.disable = true;
    quarter.status = "locked";
    alertify.success("Successfully Locked");
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

  submitForm() {
    if (!this.isUpdating){
      this.saving = true;
      this.utServ.saveQuarterResultWithMou(this.selectedQuarter.id, this.mouForm.value).subscribe((response: any) => {
        this.saving = false;
        this.selectedQuarter.mouDetails.push(response);
        this.selectedQuarter.currentCost += response.currentCost;
        this.selectedQuarter.status = 'inprogress';
        this.changeSelected.emit(this.selectedQuarter);
        this.mouListView = true;
        alertify.success("MOU Successfully saved.");
        // $("#myModal"+this.d).modal('hide');
      }, (error: any) => {
        alertify.error("Something went wrong.");
      });
    }else {
      alertify.confirm("Do You want to update it?", (ok: any) => {
        this.saving = true;
        this.utServ.updateForm(this.url, this.mouForm.value).subscribe((response: any) => {
          this.saving = false;
          _.extend(this.selectedmou, response);
          this.mouListView = true;
        }, (error: any) => {
          alertify.error("Something went wrong.");
        });
      }).setHeader("Confirmation");
    }
  }


 delete(mou:any,mous:any[]){
  alertify.confirm("Are you sure you want to Delete it?",()=>{
   this.utServ.deleteMou(mou.id).subscribe((response:any)=>{
    mous.splice(mous.indexOf(mou),1);
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 deleteEvidence(evidence:any,evidences:any[]){
  alertify.confirm("Are you sure you want to delete the Evidence File?",()=>{
   this.utServ.deleteMouEvidence(evidence.id).subscribe((response:any)=>{
    evidences.splice(evidences.indexOf(evidence),1);
    
   }, (error: any) => {
    alertify.error("Something went wrong");
   });
  }).setHeader("Confirmation");
 }

 mouForm:FormGroup;

 edit(mou:any){
  this.isUpdating = true;
  this.selectedmou = mou;
  this.url = "/mous/"+ mou.id;  
  this.mouForm.patchValue(mou);
  this.mouListView = false;
 }

 resetForm(){ this.isUpdating = false;
  this.mouForm.reset();
 }

}