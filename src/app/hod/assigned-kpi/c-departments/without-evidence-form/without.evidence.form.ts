import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../../../shared/loader.service';
import { HodService } from '../../../hod.service';

@Component({
 selector: 'without-evidence-form',
 templateUrl: './without.evidence.form.html',
 styleUrls: ['./../../../hod.component.css'],
})
export class WithoutEvidenceForm {
 @Output() changeSelected: any = new EventEmitter();
 @Input() department: any;
 @Input() d: number;

 constructor(public utServ: HodService, public loaderService: LoaderService) {

 }

 isUpdating: boolean = false;
 public saveQuarterResult(quarter: any) {
  if (!quarter.isUpdating) {
   var object = {
    'levelId': quarter.id,
    'currentCost': quarter.currentCost,
    'currentTargetLevel': quarter.currentTargetLevel,
   }
   this.loaderService.setLoadingStatus("Saving");
   this.loaderService.setTransactionLoader(true);
   this.utServ.saveQuarterResult(object).subscribe((response: any) => {
    this.loaderService.setTransactionLoader(false);
    quarter.isUpdating = false;
    quarter.status = 'inprogress';
   }, (error: any) => {
    this.loaderService.setTransactionLoader(false);
    alertify.error("Something went wrong..");
   });
  } else {
   let object = {
    'currentCost': quarter.currentCost,
    'currentTargetLevel': quarter.currentTargetLevel,
   }
   this.loaderService.setLoadingStatus("Updating");
   this.loaderService.setTransactionLoader(true);
   this.utServ.updateQuarterResult(quarter.id, object).subscribe((response: any) => {
    quarter.status = 'inprogress';
    quarter.isUpdating = false;
    this.loaderService.setTransactionLoader(false);
    alertify.success("Updated");
    console.log(response);
   }, (error: any) => {
    this.loaderService.setTransactionLoader(false);
    alertify.error("Something went wrong..");
   })
  }
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

 deleteEvidence(evidences: any[], evidence: any, index: any) {
  alertify.confirm("Are you sure you want to delete this evidence", () => {
   this.utServ.deleteEvidence(evidence.id).subscribe((response: any) => {
    evidences.splice(index, 1);
    alertify.success("Success");
   }, (error: any) => {
    alertify.error("Something went wrong");
   })
  }).setHeader("Atert Message");
 } s

 selectQuarter(level: any) {
  this.changeSelected.emit(level);
 }
}