import {Component, Input} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { HodService } from '../../../hod.service';
@Component({
 selector:'evidence-form',
 templateUrl:'evidence.form.html'
})
export class EvidenceForm{

 formId: any;
 url: string;
 evidencForm: FormGroup;
 @Input() selectedQuarter: any;
 @Input() selectedForm: any;
 @Input() set evidanceFormId(id: any) {
  this.formId = id;
  switch (id) {
   case 1:
    this.url = "/internship/" + this.selectedForm.id;
    break;
   case 2:
    this.url = "/mous/"+ this.selectedForm.id;
    break;
   case 3:
    this.url = "/extra-curricular-activity/"+ this.selectedForm.extraCurricularActivityId;
    break;
   case 4:
    this.url = "/exchange-program/"+ this.selectedForm.exchangeProgramId;
    break;
   case 5:
    this.url = "/community-learning/"+ this.selectedForm.communityLearningId;
    break;
   case 6:
    this.url = "/curriculum-review/"+ this.selectedForm.curriculamReviewId;
    break;
   case 7:
    this.url = "/research-consultancy/"+ this.selectedForm.researchConsultancyId;
    break;
   case 8:
    this.url = "/student-research/"+ this.selectedForm.studentResearchId;
    break;
   case 9:
    this.url = "/professional-development-activity/"+this.selectedForm.id;
    break;
   case 10:
    this.url = "/faculty-publication/"+this.selectedForm.id;
    break;
   case 11:
    this.url = "/student-publication/"+this.selectedForm.id;
    break;
   default:
    this.url = "/level/" + this.selectedQuarter.id;
    break;
  }
 };
 constructor(public utServ: HodService){
  this.evidencForm = new FormGroup({
   title: new FormControl('', [Validators.required]),
   description: new FormControl('', Validators.required),
   files: new FormControl('', [Validators.required])
 });
 }

 file: any;
 getFile(event: any) {
   this.file = event.target.files[0];
 }

 public selectedInternshipFile: any;
 onEvidenceSubmit(evForm: any) {
   let formData = new FormData();
   formData.append('title', this.evidencForm.value['title']);
   formData.append('description', this.evidencForm.value['description']);
   formData.append('file', this.file);
   this.utServ.saveEvidence(this.url,formData).subscribe((res: any) => {
    if(this.selectedQuarter){
      if (!this.selectedQuarter.evidance)
        this.selectedQuarter.evidance = [];
      this.selectedQuarter.evidance.push(res);
    }else{
      if (!this.selectedForm.evidance)
        this.selectedForm.evidance = [];
      this.selectedForm.evidance.push(res);
    }
    alertify.success("Evidence Uploaded ..");
    $('#evidenceForm'+this.formId).modal('hide');
  }, (error: any) => {
    alertify.error("Something went wrong");
    $('#evidenceForm'+this.formId).modal('hide');
  });
 }
}