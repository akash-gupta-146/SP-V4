import { Component, ChangeDetectionStrategy, AfterViewInit, Input, OnInit } from '@angular/core';
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
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatorDepartmentsComponent implements OnInit {
  selectedEvidence: any;
  tempUrl: string = "";
  departmentHeirarchyCopy: any;
  role: any;
  @Input() id: any;
  isEdit: boolean;
  selectedDepatrtmentId: any;
  selectedLevel:any = {};
  employeesCopy: any;
  employees: any[] = [];
  actionSteps: any[] = [];
  actionForm: FormGroup;
  data: any={};
  departmentModel: any = 0;
  departments: any[] = [];
  departmentInfo: any[] = []
  departmentsCopy: any[] = [];
  evidencForm: FormGroup;
  evidences: any[] = [];
  constructor(private route: ActivatedRoute, 
              private utServ: HodService,
              private storage: StorageService, 
              private loaderService: LoaderService,
              private fb: FormBuilder,
              private location:Location) {

  }

  ngOnInit(){
    this.role = this.storage.getData('userDetails').roleInfo[0].role;
    this.loaderService.display(true);
    // if (this.id) {
    //   console.log("asdf");
    //   this.utServ.getDepartmentByOpiId(this.id).subscribe((response: any) => {
    //     this.data = response[0];
    //     this.checkAssignDept(response[0].departmentInfo);
    //     this.departmentInfo = response[0].departmentInfo;
    //     this.departmentsCopy = response[0].departmentInfo;
    //   });
    // } else {
      this.route.params.subscribe((params: any) => {
        this.utServ.getDepartmentByOpiId(params['id']).subscribe((response: any) => {
          this.loaderService.display(false);
          this.data = response[0];
          this.getTemplateUrl(this.data.evidanceFormId);
          this.getDepartments();
          this.departmentInfo = response[0].departmentInfo;
          this.departmentsCopy = response[0].departmentInfo;
        });
      });
    // }


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

  department(event: any) {
    if (event.my) {
      this.departmentsCopy.forEach((element: any, index: any) => {
        if (element.departmentId == event.departmentId)
          this.departmentInfo.push(element);
      });
    } else {
      this.departmentInfo = this.departmentInfo.filter((val) => val.departmentId !== event.departmentId);
    }
  }

  getDepartments() {
    this.utServ.getDepartments().subscribe((res: any) => {
      this.departments = res;
      this.departmentHeirarchyCopy = res;
      this.checkAssignDept(this.data.departmentInfo);
    })
  }

  checkAssignDept(assignedDepartments: any[]) {
    this.departments = this.departmentHeirarchyCopy;
    if(assignedDepartments.length)
    assignedDepartments.forEach(outerElement => {
      this.departments.forEach(innerElement => {
        this.searchDepartment(innerElement, outerElement);
      });
    });
  }

  searchDepartment(department: any, assigneddepartment: any) {
    if (!department) {
      return;
    } else {
      if (department.departmentId == assigneddepartment.departmentId) {
        department.my = true;
        department.disabled = !department.my;
      } else {
        department.disabled = !department.my;
      }
      if (department.reporteeDepartments && department.reporteeDepartments.length)
        department.reporteeDepartments.forEach((element: any) => {
          this.searchDepartment(element, assigneddepartment);
        });
    }
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

  file: any;
  getFile(event: any) {
    this.file = event.target.files[0];
  }
  selectedQuarter: any;
  public selectedInternshipFile: any;
  selectedForm: any;
  passQuarter(event) {
    this.selectedLevel = event;
    // if (event.internshipDetails)
    //   this.selectedInternshipFile = event.internshipDetails[0];
    // if (event.selectedForm)
    //   this.selectedForm = event.selectedForm;
    // console.log(event.selectedForm);
  }

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
      alertify.confirm("Do you realy want to Approve this ?", () => {
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
      alertify.confirm("Do you realy want to Reject this ?", () => {
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
    alertify.confirm("Are you sure you Want To Link It?", () => {
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

  assignEmployee(e:any) {    
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
    event.stopPropagation();
  }

  selectedStep: any;
  employeeIds: any[] = [];
  showList(selectedStep: any) {
    this.employeeIds = [];
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
    if ($(element).hasClass('show')) {
      return;
    }
    $(element).addClass('show');
    $(".collapse-off").removeClass('show');
  }

  setQuarterFeedback(data: any) {
    console.log(data.feedback);
    if (data.feedback == 'true')
      alertify.confirm("Do you realy want to Approve this ?", () => {
        this.utServ.approve(data.id, { comment: data.comment }).subscribe((reponse) => {
          data.status = 'Approved'
          alertify.notify("Audit has been Approved");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.notify("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");
    else
      alertify.confirm("Do you realy want to Reject this ?", () => {
        this.utServ.reject(data.id, { comment: data.comment }).subscribe((reponse) => {
          data.status = 'Rejected'
          alertify.notify("Audit has been Rejected");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.notify("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");

  }

  getTemplateUrl(evidanceFormId:number){
    console.log("asdf");
    switch (evidanceFormId) {
      case 1:
        this.tempUrl = "https://www.googleapis.com/download/storage/v1/b/spv4/o/-8134238128587521432StudentInternship.xlsx?generation=1524033803030861&alt=media";
        break;
      case 9:
        this.tempUrl = "https://www.googleapis.com/download/storage/v1/b/spv4/o/-1624318121912940995ProfessionalDevlopmentActivity.xlsx?generation=1524033865327179&alt=media";
        break;
      case 10:
        this.tempUrl =  "https://www.googleapis.com/download/storage/v1/b/spv4/o/5291564852172375383Faculty%20Publications.xlsx?generation=1524127909547947&alt=media";
        break;
      case 11:
        this.tempUrl = "https://www.googleapis.com/download/storage/v1/b/spv4/o/-1062272352555349828StudentPublications.xlsx?generation=1524033899774926&alt=media";
        break;
      default:
        break;
    }
    return this.tempUrl;
  }

  getEvidence(evidence:any){
    console.log(evidence);
    this.selectedEvidence = evidence;
  }
}