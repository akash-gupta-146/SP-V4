import { Component, Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as alertify from 'alertifyjs';
import { HodService } from '../../../hod.service';
import { LoaderService } from '../../../../shared/loader.service';
declare let $: any;

@Component({
 selector: 'mous-form',
 templateUrl: './mous.form.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class MousForm {
 formId: any;
 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;
 @Input () set evidanceFormId(id:any){
  this.formId = id;
 }
 constructor(public utServ: HodService, public loaderService: LoaderService) {

 }

 saveQuarterResultWithMou(lev: any) {
  var object = {
   "currentCost": lev.currentCost,
   "mouType": lev.mouType,
   "organization": lev.organization
  }
  this.loaderService.setLoadingStatus("Saving");
  this.loaderService.setTransactionLoader(true);
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
   this.loaderService.setTransactionLoader(false);
   alertify.success("Saved");
  });
 }

 updateMou(mou: any) {
  var object = {
   "mouType": mou.mouType,
   "organization": mou.organization
  }
  this.loaderService.setLoadingStatus("Updating");
  this.loaderService.setTransactionLoader(true);
  this.utServ.updateMou(mou.id, object).subscribe((response: any) => {
   this.loaderService.setTransactionLoader(false);
   alertify.success("Updated");
   mou.edit = false;
  })
 }

 updateCurrentCost(lev: any) {
  var object = {
   "currentCost": lev.currentCost
  }
  this.loaderService.setLoadingStatus("Updating");
  this.loaderService.setTransactionLoader(true);
  this.utServ.updateQuarterResultCurrentCost(lev.id, object).subscribe((response: any) => {
   lev.edit = false;
   setTimeout(() => {
    this.loaderService.setTransactionLoader(false);
    alertify.success("Updated");
   }, 1000);
  });
 }

 selectMou(mou: any, level: any) {
  level.selectedForm = mou;
  this.changeSelected.emit(level);
 }

 deleteEvidence(evidences: any[], evidence: any, index: any) {
  alertify.confirm("Are you sure you want to delete this evidence", () => {
   this.utServ.deleteEvidence(evidence.id).subscribe((response: any) => {
    evidences.splice(index, 1);
    alertify.success("Success");
   }, (error: any) => {
    alertify.error("Something went wrong");
   })
  }).setHeader("Atert Message");
 }

 collapseOff(element: any, level: any) {
  this.changeSelected.emit(level);
  if ($(element).hasClass('in')) {
   return;
  }
  $(element).addClass('in');
  $(".collapse-off").removeClass('in');
 }
 Q:any={};
 selectedQuarter:any={};
 selectQuarter(level: any) {
  this.selectedQuarter = level;
  this.changeSelected.emit(level);
 }
}