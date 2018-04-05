import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as alertify from 'alertifyjs';
import { HodService } from '../../../hod.service';
import { LoaderService } from '../../../../shared/loader.service';
declare let $: any;

@Component({
 selector: 'student-internship',
 templateUrl: './student.internship.html',
 styleUrls: ['./../../../hod.component.scss'],
})
export class StudentInternshipForm {
  formId: any;
  url: string;
 @Input() department: any;
 @Input() d: number;
 @Output() changeSelected = new EventEmitter();
 @Input () set evidanceFormId(id:any){
  this.formId = id;
 }
 constructor(public utServ: HodService, public loaderService: LoaderService) {

 }

 getFile(lev: any, event) {
  console.log(event);
  lev.file = event.target.files["0"];
 }

 saveForm(lev: any) {
  var formData = new FormData();
  formData.append('file', lev.file);
  formData.append('currentCost', lev.currentCost);
  this.utServ.saveQuarterWithInternship(this.url, lev.id, formData).subscribe((response: any) => {
   lev.internshipDetails = response.internshipDetails;
   this.changeSelected.emit(lev);
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
    console.log(response);
  });
}

 deleteFile(files: any[], file: any, index: any) {
  alertify.confirm("Are you sure you want to delete this file", (response: any) => {
   this.utServ.deleteInternshipFile(this.url, file.id).subscribe((response: any) => {
    files.splice(index, 1);
   }, (error: any) => {
    alertify.error("Something went wrong ..");
   });
  }).setHeader("Confirmation");
 }

 deleteEvidence(evidences: any[], evidence: any, index: any) {
  alertify.confirm("Are you sure you want to delete this evidence", (response: any) => {
   this.utServ.deleteInternshipEvidence(this.url,evidence.id).subscribe((response: any) => {
    evidences.splice(index, 1);
    alertify.success("Success");
   }, (error: any) => {
    alertify.error("Error");
   });
  }).setHeader("Confirmation");
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

  collapseOff(element: any, level: any) {
    switch (level.evidanceFormId) {
      case 1:
        this.url = "/internship";
        break;
      case 9:
        this.url = "/professional-development-activity";
        break;
      case 10:
        this.url = "/faculty-publication";
        break;
      case 11:
        this.url = "/student-publication";
        break;
      default:
        break;
    }
    this.changeSelected.emit(level);
    if ($(element).hasClass('in')) {
      return;
    }
    $(element).addClass('in');
    $(".collapse-off").removeClass('in');
  }
}