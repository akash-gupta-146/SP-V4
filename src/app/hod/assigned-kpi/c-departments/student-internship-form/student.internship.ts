import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { HodService } from '../../../hod.service';
import { LoaderService } from '../../../../shared/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../shared/storage.service';
declare let $: any;

@Component({
  selector: 'student-internship',
  templateUrl: './student.internship.html',
  styleUrls: ['./../../../hod.component.scss'],
})
export class StudentInternshipForm implements OnInit {
   @Output() selectEvidence: any = new EventEmitter();
  role: any;
  facultyPublicationForm: FormGroup;
  professionalDevelopmentActivitiesForm: FormGroup;
  selectedQuarter:any={};
  selectedRecord: any;
  formId: any;
  url: string;
  listView: boolean = false;
  studentPublicationForm: FormGroup;
  recordForm: FormGroup;
  @Input() department: any;
  @Input() d: number;
  @Output() changeSelected = new EventEmitter();
  @Input() set evidanceFormId(id: any) {
    this.formId = id;
    switch (id) {
      case 1:
        this.url = "/internship/";
        break;
      case 9:
        this.url = "/professional-development-activity/";
        break;
      case 10:
        this.url = "/faculty-publication/";
        break;
      case 11:
        this.url = "/student-publication/";
        break;
      default:
        break;
    }
  }
  constructor(public utServ: HodService,
              public loaderService: LoaderService,
              public fb: FormBuilder,
              public storage:StorageService) {

  }

  ngOnInit() {
    this.role = this.storage.getData('userDetails').roleInfo[0].role;
    this.recordForm = this.fb.group({
      college: ['', Validators.required],
      department: ['', Validators.required],
      externalSupervisor: ['', Validators.required],
      externalSupervisorEmail: ['', Validators.required],
      externalSupervisorMobile: ['', Validators.required],
      internalSupervisor: ['', Validators.required],
      internshipDomain: ['', Validators.required],
      organization: ['', Validators.required],
      organizationAddress: ['', Validators.required],
      organizationAddressType: ['', Validators.required],
      studentName: ['', Validators.required],
    });
    this.studentPublicationForm = this.fb.group({
      degreeLevel: ['', Validators.required],
      journalTitle: ['', Validators.required],
      journalTypeId: ['', Validators.required],
      publicationDate: ['', Validators.required],
      publicationTitle: ['', Validators.required],
      studentName: ['', Validators.required],
    });
    this.professionalDevelopmentActivitiesForm = this.fb.group({
      faculty: ['',Validators.required],
      national: ['',Validators.required],
      scopeId: ['',Validators.required],
      title: ['',Validators.required],
      type: ['',Validators.required],
    });
    this.facultyPublicationForm = this.fb.group({
      faculty:['',Validators.required],
      facultyRank:['',Validators.required],
      journalTitle:['',Validators.required],
      journalTypeId:['',Validators.required],
      publicationDate:['',Validators.required],
      publicationTitle:['',Validators.required],
    });
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

      // switch (lev.evidanceFormId) {
      //   case 9:
      //     lev.professionalDevelopmentActivities.push(response.professionalDevelopmentActivities[0]);
      //     break;
      //   case 10:
      //     lev.facultyPublications.push(response.facultyPublications[0]);
      //     break;
      //   case 11:
      //     lev.studentPublications.push(response.studentPublications[0]);
      //     break;
      //   default:
      //     lev.internshipDetails.push(response.internshipDetails[0]);
      //     break;
      // }
      Object.keys(response).forEach((key:any)=>{
        lev[key]=response[key];
      });
      lev.status = "inprogress";
      this.changeSelected.emit(lev);
    })
  }

  updateCurrentCost(lev: any) {
    var object = {
      "currentCost": lev.currentCost
    }
    this.utServ.updateQuarterResultCurrentCost(lev.id, object).subscribe((response: any) => {
      alertify.success("Updated");
      lev.isUpdating = false;
      lev.status = "inprogress";
    });
  }

  deleteFile(files: any[], file: any, index: any) {
    alertify.confirm("Are you sure you want to delete this file", (response: any) => {
      this.utServ.deleteInternshipFile(this.url, file.id).subscribe((response: any) => {
        files.splice(index, 1);
        alertify.success("File Deleted");
      }, (error: any) => {
        alertify.error("Something went wrong ..");
      });
    }).setHeader("Confirmation");
  }

  deleteEvidence(evidences: any[], evidence: any, index: any) {
    alertify.confirm("Are you sure you want to delete this evidence", (response: any) => {
      this.utServ.deleteInternshipEvidence("", evidence.id).subscribe((response: any) => {
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

  editInternshipRecord(record: any) {
    this.selectedRecord = record;
    this.listView = false;
    this.recordForm.patchValue(record);
  }

  editStudentPublicationRecord(record: any) {
    this.selectedRecord = record;
    this.listView = false;
    this.studentPublicationForm.patchValue(record);
  }
  
  editFacultyPublicationRecord(record: any) {
    this.selectedRecord = record;
    this.listView = false;
    this.facultyPublicationForm.patchValue(record);
  }

  editProfessionalDevelopmentActivitiesRecord(record: any){
    this.selectedRecord = record;
    this.listView = false;
    this.professionalDevelopmentActivitiesForm.patchValue(record);
  }

  updateInternshipRecord() {
    alertify.confirm("Do you want to update internship record?", (ok) => {
      this.utServ.editInternshipRecord(this.selectedRecord.recordId, this.recordForm.value).subscribe((response: any) => {
        _.extend(this.selectedRecord,this.recordForm.value);
        alertify.success("Successfully updated");
        this.listView = true;
      }, (error: any) => {
        alertify.error("Something went wrong");
      })
    }).setHeader("Confirmation");
  }

  updateStudentPublicationRecord() {
    alertify.confirm("Do you want to update Student Publication record?", (ok) => {
      this.utServ.editStudentPublicationRecord(this.selectedRecord.recordId, this.studentPublicationForm.value).subscribe((response: any) => {
        _.extend(this.selectedRecord,this.studentPublicationForm.value);        
        alertify.success("Successfully updated");
        this.listView = true;
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    }).setHeader("Confirmation");
  }

  updateProfessionalDevelopmentActivityRecord() {
    alertify.confirm("Do you want to update professional development activity record?", (ok) => {
      this.utServ.editProfessionalDevelopmentActivitiesRecord(this.selectedRecord.recordId, this.professionalDevelopmentActivitiesForm.value).subscribe((response: any) => {
        _.extend(this.selectedRecord,this.professionalDevelopmentActivitiesForm.value);        
        alertify.success("Successfully updated");
        this.listView = true;
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    }).setHeader("Confirmation");
  }

  updateFacultyPublicationRecord(){
    alertify.confirm("Do you want to update Faculty Publication record?", (ok) => {
      this.utServ.editFacultyPublicationRecord(this.selectedRecord.recordId, this.facultyPublicationForm.value).subscribe((response: any) => {
        _.extend(this.selectedRecord,this.facultyPublicationForm.value);
        alertify.success("Successfully updated");
        this.listView = true;
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    }).setHeader("Confirmation");
  }

  uploadFile(lev:any){
    this.selectedQuarter.submitButton = true;
    var formData = new FormData();
    var replace = true;
    if(!lev.replace) replace = false;
    formData.append('file', lev.file);
    this.utServ.UploadFormsFile(this.url,lev.id,formData,replace).subscribe((response:any)=>{
      Object.keys(response).forEach((key:any)=>{
        lev[key]=response[key];
      });
      alertify.success("File Uploaded ..");
      $('#fileUploadModal').modal('hide');
      this.selectedQuarter.submitButton = false;
    },(error:any)=>{
      alertify.error("Something went wrong");
      $('#fileUploadModal').modal('hide');
    })
  }

  selectLevel(lev:any){
  this.changeSelected.emit(lev);
  }

  collapseOff(element: any, level: any) {
    switch (level.evidanceFormId) {
      case 1:
        this.url = "/internship/";
        break;
      case 9:
        this.url = "/professional-development-activity/";
        break;
      case 10:
        this.url = "/faculty-publication/";
        break;
      case 11:
        this.url = "/student-publication/";
        break;
      default:
        break;
    }
    this.changeSelected.emit(level);
    if ($(element).hasClass('show')) {
      return;
    }
    $(element).addClass('show');
    $(".collapse-off").removeClass('show');
  }

  storeEvidence(ev:any){
    this.selectEvidence.emit(ev);
   }
}