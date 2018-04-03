import { Component, ChangeDetectionStrategy, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as alertify from 'alertifyjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import * as _ from 'underscore';
import { HodService } from '../../hod.service';
import { LoaderService } from '../../../shared/loader.service';
import { StorageService } from '../../../shared/storage.service';
import {Location} from '@angular/common';
declare let $: any;

@Component({
  selector: 'c-dept',
  templateUrl: './departments.component.html',
  styleUrls: ['./../../hod.component.scss'],
  //  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorDepartmentsComponent implements AfterViewInit {
  @Input() id: any;
  isEdit: boolean;
  selectedDepatrtmentId: any;
  employeesCopy: any;
  employees: any[] = [];
  actionSteps: any[] = [];
  actionForm: FormGroup;
  data: any;
  department: any = 0;
  departments: any[] = [];
  departmentInfo: any[] = []
  departmentsCopy: any[] = [];
  evidencForm: FormGroup;
  evidences: any[] = [];
  constructor(public route: ActivatedRoute, public utServ: HodService,
    public storage: StorageService, public loaderService: LoaderService,
    public fb: FormBuilder) {
    console.log(this.id);
    if (this.id) {

      this.utServ.getDepartmentByOpiId(this.id).subscribe((response: any) => {
        this.data = response[0];
        this.departmentInfo = response[0].departmentInfo;
        this.departmentsCopy = response[0].departmentInfo;
      });
    } else {
      this.route.params.subscribe((params: any) => {
        // this.loaderService.display(true);
        this.utServ.getDepartmentByOpiId(params['id']).subscribe((response: any) => {
          this.data = response[0];
          this.departmentInfo = response[0].departmentInfo;
          this.departmentsCopy = response[0].departmentInfo;
          // this.loaderService.display(false);
        });
      });
    }


    this.evidencForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      files: new FormControl('', [Validators.required])
    });
    this.getEmployees();
    this.actionForm = this.fb.group({
      "reason": ["", Validators.required],
      "description": ["", Validators.required],
      "resources": ["", Validators.required],
      "deadline": ["", Validators.required],
      "opiId": ['']
    });
  }

  ngAfterViewInit() {

  }



  getAnnualTargetsByOpiDepartment(department: any) {
    department.show = true;
    department.actionStepView = false;
    if (department.allAnnualTargets) {
      department.opiAnnualTargets = department.allAnnualTargets;
      return;
    }
    this.utServ.getAnnualTargets(department.id).subscribe((response: any) => {
      console.log(response);
      department.allAnnualTargets = response;
      department.currentAnnualTargets = department.opiAnnualTargets;
      department.opiAnnualTargets = response;
    });
  }

  getCurrentAnnualTargets(department: any) {
    department.show = false;
    department.actionStepView = false;
    department.allAnnualTargets = department.opiAnnualTargets;
    department.opiAnnualTargets = department.currentAnnualTargets;
  }

  viewDepartment(event) {
    if (event == 0) {
      this.departmentInfo = this.departmentsCopy;
    } else {
      this.departmentInfo = [];
      this.departmentInfo.push(event);
    }

  }

  // isUpdating: boolean = false;
  // public saveQuarterResult(quarter: any) {
  //   if (!quarter.isUpdating) {
  //     var object = {
  //       'levelId': quarter.id,
  //       'currentCost': quarter.currentCost,
  //       'currentTargetLevel': quarter.currentTargetLevel,
  //     }
  //     this.loaderService.setLoadingStatus("Saving");
  //     this.loaderService.setTransactionLoader(true);
  //     this.utServ.saveQuarterResult(object).subscribe((response: any) => {
  //       this.loaderService.setTransactionLoader(false);
  //       quarter.isUpdating = false;
  //       quarter.status = 'inprogress';
  //     }, (error: any) => {
  //       this.loaderService.setTransactionLoader(false);
  //       alertify.error("Something went wrong..");
  //     })
  //   } else {
  //     let object = {
  //       'currentCost': quarter.currentCost,
  //       'currentTargetLevel': quarter.currentTargetLevel,
  //     }
  //     this.loaderService.setLoadingStatus("Updating");
  //     this.loaderService.setTransactionLoader(true);
  //     this.utServ.updateQuarterResult(quarter.id, object).subscribe((response: any) => {
  //       quarter.status = 'inprogress';
  //       quarter.isUpdating = false;
  //       this.loaderService.setTransactionLoader(false);
  //       alertify.success("Updated");
  //       console.log(response);
  //     }, (error: any) => {
  //       this.loaderService.setTransactionLoader(false);
  //       alertify.error("Something went wrong..");
  //     })
  //   }
  // }

  // saveQuarterResultWithMou(lev: any) {
  //   var object = {
  //     "currentCost": lev.currentCost,
  //     "mouType": lev.mouType,
  //     "organization": lev.organization
  //   }
  //   this.loaderService.setLoadingStatus("Saving");
  //   this.loaderService.setTransactionLoader(true);
  //   this.utServ.saveQuarterResultWithMou(lev.id, object).subscribe((response: any) => {
  //     console.log(response);
  //     lev.currentCost = response.currentCost;
  //     if(lev.mouDetails.length){
  //       lev.mouDetails.push(response.mouDetails[0]);
  //     }else{
  //       lev.mouDetails = [];
  //       lev.mouDetails.push(response.mouDetails[0]);
  //     }
  //     // lev['mouDetails'] = response.mouDetails;
  //     this.loaderService.setTransactionLoader(false);
  //     alertify.success("Saved");
  //   });
  // }

  // updateCurrentCost(lev: any) {
  //   var object = {
  //     "currentCost": lev.currentCost
  //   }
  //   this.loaderService.setLoadingStatus("Updating");
  //   this.loaderService.setTransactionLoader(true);
  //   this.utServ.updateQuarterResultCurrentCost(lev.id, object).subscribe((response: any) => {
  //     lev.edit = false;
  //     setTimeout(() => {
  //       this.loaderService.setTransactionLoader(false);
  //       alertify.success("Updated");
  //     }, 1000);
  //     console.log(response);
  //   });
  // }

  // updateMou(mou: any) {
  //   var object = {
  //     "mouType": mou.mouType,
  //     "organization": mou.organization
  //   }
  //   this.loaderService.setLoadingStatus("Updating");
  //   this.loaderService.setTransactionLoader(true);
  //   this.utServ.updateMou(mou.id, object).subscribe((response: any) => {
  //     this.loaderService.setTransactionLoader(false);
  //     alertify.success("Updated");
  //     mou.edit = false;
  //   })
  // }

  deleteMou(mous: any[], mou: any, index: any) {
    alertify.confirm("Are you sure you want to delete this mou", () => {
      this.loaderService.setLoadingStatus("Updating");
      this.loaderService.setTransactionLoader(true);
      this.utServ.deleteMou(mou.id).subscribe((response: any) => {
        mous.splice(index, 1);
        this.loaderService.setTransactionLoader(false);
        alertify.success("Sucessfully removed");
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    }).setHeader("Confirmation");
  }

  // lockQuarterResult(quarter: any) {
  //   alertify.confirm("Are you sure you want to Lock you results", () => {
  //     this.loaderService.setLoadingStatus("Locking");
  //     this.loaderService.setTransactionLoader(true);
  //     this.utServ.lockQuarterResult(quarter.id, { 'status': 'locked' }).subscribe((response: any) => {
  //       this.loaderService.setTransactionLoader(false);
  //       console.log(response);
  //       quarter.disable = true;
  //       quarter.status = "locked";
  //     }, (error: any) => {
  //       alertify.error("Something went wrong");
  //     });
  //   }).setHeader("Confirmation");
  // }

  // deleteEvidence(evidences: any[], evidence: any, index: any) {
  //   alertify.confirm("Are you sure you want to delete this evidence", () => {
  //     this.utServ.deleteEvidence(evidence.id).subscribe((response: any) => {
  //       evidences.splice(index, 1);
  //       alertify.success("Success");
  //     }, (error: any) => {
  //       alertify.error("Something went wrong");
  //     })
  //   }).setHeader("Atert Message");
  // }

  // deleteInternshipEvidence(evidences: any[], evidence: any, index: any) {
  //   alertify.confirm("Are you sure you want to delete this evidence", (response: any) => {
  //     this.utServ.deleteInternshipEvidence(evidence.id).subscribe((response: any) => {
  //       evidences.splice(index, 1);
  //       alertify.success("Success");
  //     }, (error: any) => {
  //       alertify.error("Error");
  //     });
  //   }).setHeader("Confirmation");

  // }

  // getInternshipFile(lev: any, event) {
  //   console.log(event);
  //   lev.internshipFile = event.target.files["0"];
  // }

  file: any;
  getFile(event: any) {
    this.file = event.target.files[0];
  }
  selectedQuarter: any;
  public selectedInternshipFile: any;
  selectedForm: any;
  onEvidenceSubmit(evForm: any) {
    console.log(evForm);
    let formData = new FormData();
    formData.append('title', this.evidencForm.value['title']);
    formData.append('description', this.evidencForm.value['description']);
    formData.append('file', this.file);

    switch (evForm) {
      case null:
        this.utServ.saveEvidence(formData, this.selectedQuarter.id).subscribe((res: any) => {
          if (!this.selectedQuarter.evidance)
            this.selectedQuarter.evidance = [];
          this.selectedQuarter.evidance.push(res);
          alertify.success("Evidence Uploaded ..");
          $('#evidenceForm').modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $('#evidenceForm').modal('hide');
        });
        break;
      case 1:
        this.utServ.saveEvidenceForInternshipFile(formData, this.selectedInternshipFile.id).subscribe((response: any) => {
          this.selectedInternshipFile['evidance'].push(response);
          alertify.success("Evidence Uploaded ..");
          $('#evidenceForm').modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $('#evidenceForm').modal('hide');
        })
        break;
      case 2:
        this.utServ.saveEvidenceForMou(formData, this.selectedForm.id).subscribe((response: any) => {
          this.selectedForm.evidance.push(response);
          alertify.success("Evidence Uploaded ..");
          $('#evidenceForm').modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $('#evidenceForm').modal('hide');
        })
        break;
      case 3:
        this.utServ.saveEvidenceofExtraCurricularActivity(formData, this.selectedForm.extraCurricularActivityId).subscribe((response: any) => {
          this.selectedForm.evidance.push(response);
          alertify.success("Evidence Uploaded ..");
          $('#evidenceForm').modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $('#evidenceForm').modal('hide');
        })
        break;

      case 4:
        this.utServ.saveEvidenceofExchangeProgram(formData, this.selectedForm.exchangeProgramId).subscribe((response: any) => {
          this.selectedForm.evidance.push(response);
          alertify.success("Evidence Uploaded ..");
          $('#evidenceForm').modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $('#evidenceForm').modal('hide');
        });
        break;
      case 5:
        this.utServ.saveEvidenceForLearningProgram(formData, this.selectedForm.communityLearningId).subscribe((response: any) => {
          this.selectedForm.evidance.push(response);
          alertify.success("Evidence Uploaded ..");
          $('#evidenceForm').modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $('#evidenceForm').modal('hide');
        });
        break;
      case 6:
        this.utServ.saveEvidenceofCurriculumReviewProgram(formData, this.selectedForm.curriculamReviewId).subscribe((response: any) => {
          this.selectedForm.evidance.push(response);
          alertify.success("Evidence Uploaded ..");
          $('#evidenceForm').modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $('#evidenceForm').modal('hide');
        });
        break;
    }
  }

  passQuarter(event) {
    console.log(event);
    this.selectedQuarter = event;
    if (event.internshipDetails)
      this.selectedInternshipFile = event.internshipDetails[0];
    if (event.selectedForm)
      this.selectedForm = event.selectedForm;
    console.log(event.selectedForm);
  }

  // saveInternshipForm(lev: any) {
  //   var formData = new FormData();
  //   // formData.append('internshipEvidance',lev.internshipEvidance);
  //   formData.append('internshipFile', lev.internshipFile);
  //   formData.append('currentCost', lev.currentCost);

  //   console.log(formData);
  //   this.utServ.saveQuarterWithInternship(lev.id, formData).subscribe((response: any) => {
  //     lev.internshipDetails = response.internshipDetails;
  //   })
  // }

  // deleteInternshipFile(files: any[], file: any, index: any) {
  //   alertify.confirm("Are you sure you want to delete this file", (response: any) => {
  //     this.utServ.deleteInternshipFile(file.id).subscribe((response: any) => {
  //       files.splice(index, 1);
  //     }, (error: any) => {
  //       alertify.error("Something went wrong ..");
  //     });
  //   }).setHeader("Confirmation");
  // }

  getActionSteps(dept: any) {
    dept.actionStepView = true;
    this.selectedDepatrtmentId = dept.id;
    this.utServ.getActionSteps(dept.id).subscribe((response) => {
      if (response.status === 204)
        this.actionSteps = [];
      else
        this.actionSteps = response;
    });
  }
  isNew: boolean = false;
  addNewActionStep(dept: any) {
    dept.isNew = true;
    dept.isEdit = false;
    this.actionForm.controls['opiId'].patchValue(this.data.opiId);
  }

  onSubmit(dept, array: any[]) {
    var actionSteps = [];
    actionSteps.push(this.actionForm.value);
    console.log(this.actionForm.value);
    if (!dept.isEdit) {
      this.utServ.postActionSteps(dept.id, actionSteps).subscribe((response: any) => {
        response[0]['linked'] = true;
        array.push(response[0]);
        dept.isNew = false;
        alertify.success("Action Step added and linked");
      });
    } else {
      alertify.confirm("Do you want to update this action step?", (response: any) => {
        this.utServ.updateActionStep(this.selectedStep.stepId, this.actionForm.value).subscribe((response: any) => {
          _.extendOwn(this.selectedStep, this.actionForm.value);
          dept.isNew = false;
          dept.isEdit = false;
          alertify.success("Updated");
        });
      }).setHeader("Confirmation");

    }
  }

  selectedAction: any = {};
  setActionFeedback(data: any) {
    if (data.feedback == 'true')
      alertify.confirm("Do you realy want to Approve this??", () => {
        this.utServ.approveActionStep(data.linkingId, { comment: data.comment }).subscribe((reponse) => {
          console.log(reponse);
          alertify.notify("Approved");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          console.log(error);
          alertify.notify("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");
    else
      alertify.confirm("Do you realy want to Reject this??", () => {
        this.utServ.rejectActionStep(data.linkingId, { comment: data.comment }).subscribe((reponse) => {
          console.log(reponse);
          alertify.notify("Rejected");
        }, (error: any) => {
          console.log(error);
          alertify.notify("Something went wrong");
        });
      }).setHeader("Confirmation");
  }

  linkActionStep(event: any, assignedDepartmentId: any, step: any) {
    var object = {
      stepIds: []
    };
    object.stepIds.push(step.stepId);
    alertify.confirm("Do You Really Want To Link It?", () => {
      this.utServ.LinkActionStepToKPI(assignedDepartmentId, object).subscribe((response: any) => {
        step.linked = true;
        alertify.success("Linked");
      }, () => {
        alertify.error("Something went wrong..");
        event.target.checked = !event.target.checked;
      });
    }, () => {
      event.target.checked = !event.target.checked;
    }).setHeader("Confirmation");
  }

  getEmployees() {
    this.utServ.getEmployees().subscribe((response: any) => {
      this.employees = response;
      this.employeesCopy = response;
    })
  }

  assignEmployee() {
    alertify.confirm("Are  you sure to assign this action step?", (response: any) => {
      var ids = [];
      this.employeeIds.forEach(element => {
        ids.push(element.id)
      });
      var object = {
        employeeIds: ids
      }
      this.utServ.assignActionStep(this.selectedStep.linkingId, object).subscribe((response: any) => {
        this.employeeIds.forEach(element => {
          this.selectedStep.employeeAssigned.push(element);
        });
        alertify.success("Assigned");
        $('.emp-list').hide({ direction: "left" });
      }, (error: any) => {
        alertify.error("Something went wrong");
        $('.emp-list').hide({ direction: "left" });
      });
    }).setHeader("Confirmation");
  }

  selectedStep: any;
  employeeIds: any[] = [];
  showList(selectedStep: any) {
    this.selectedStep = selectedStep;
    this.employees = selectedStep.otherEmployees;
    $('.emp-list').show({ direction: "left" });
  }

  editActionStep(dept: any, step: any) {
    this.selectedStep = step;
    dept.isEdit = dept.isNew = true;
    this.actionForm.patchValue(step);
  }

  hideList() {
    $('.emp-list').hide({ direction: "left" });
  }

  collapseOff(element: any) {
    if ($(element).hasClass('in')) {
      return;
    }
    $(element).addClass('in');
    $(".collapse-off").removeClass('in');
  }
}