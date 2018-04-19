import { Component, Input, Output, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import * as alertify from 'alertifyjs';
import { HodService } from '../../../hod.service';
import { LoaderService } from '../../../../shared/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'student-internship',
  templateUrl: './student.internship.html',
  styleUrls: ['./../../../hod.component.scss'],
})
export class StudentInternshipForm implements OnInit {
  facultyPublicationForm: FormGroup;
  professionalDevelopmentActivitiesForm: FormGroup;
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
  }
  constructor(public utServ: HodService,
    public loaderService: LoaderService,
    public fb: FormBuilder) {

  }

  ngOnInit() {
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
      switch (lev.evidanceFormId) {
        case 9:
          lev.professionalDevelopmentActivities.push(response.professionalDevelopmentActivities[0]);
          break;
        case 10:
          lev.facultyPublications.push(response.facultyPublications[0]);
          break;
        case 11:
          lev.studentPublications.push(response.studentPublications[0]);
          break;
        default:
          lev.internshipDetails.push(response.internshipDetails[0]);
          break;
      }

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
      this.utServ.deleteInternshipEvidence(this.url, evidence.id).subscribe((response: any) => {
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
        alertify.success("Successfully updated");
      }, (error: any) => {
        alertify.error("Something went wrong");
      })
    });
  }

  updateStudentPublicationRecord() {
    alertify.confirm("Do you want to update Student Publication record?", (ok) => {
      this.utServ.editStudentPublicationRecord(this.selectedRecord.recordId, this.studentPublicationForm.value).subscribe((response: any) => {
        alertify.success("Successfully updated");
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    });
  }

  updateProfessionalDevelopmentActivityRecord() {
    alertify.confirm("Do you want to update professional development activity record?", (ok) => {
      this.utServ.editProfessionalDevelopmentActivitiesRecord(this.selectedRecord.recordId, this.professionalDevelopmentActivitiesForm.value).subscribe((response: any) => {
        alertify.success("Successfully updated");
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    });
  }

  updateFacultyPublicationRecord(){
    alertify.confirm("Do you want to update Faculty Publication record?", (ok) => {
      this.utServ.editStudentPublicationRecord(this.selectedRecord.recordId, this.facultyPublicationForm.value).subscribe((response: any) => {
        alertify.success("Successfully updated");
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    });
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
}