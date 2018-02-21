import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { HodService } from '../../hod.service';
import { StorageService } from '../../../shared/storage.service';

declare let $: any;

@Component({
  selector: 'dept',
  templateUrl: './departments.component.html',
  styleUrls: ['./../../hod.component.css']
})
export class DepartmentsComponent {
  selectedDepatrtmentId: any;
  employees: any;
  employeesCopy: any;
  role: any;
  departments: any[] = [];
  departmentHeirarchyCopy: any[] = [];
  data: any;
  departmentModel: any = 0;
  departmentInfo: any[] = []
  departmentsCopy: any[] = [];
  actionSteps: any[] = [];
  actionForm: FormGroup;
  selectedLevel: any;
  selectedMeasure: any;
  constructor(public route: ActivatedRoute, public utServ: HodService, private storage: StorageService, public fb: FormBuilder) {
    console.log("asdfds");
    this.role = this.storage.getData('userDetails').roleInfo[0].role;
    this.route.params.subscribe((params: any) => {
      this.utServ.getDepartmentByOpiId(params['id']).subscribe((response: any) => {
        this.data = response[0];
        this.checkAssignDept(response[0].departmentInfo)
        this.departmentInfo = response[0].departmentInfo;
        this.departmentsCopy = JSON.parse(JSON.stringify(response[0].departmentInfo));
      })
    });
    this.getDepartments();
    this.actionForm = this.fb.group({
      "reason":["",Validators.required],
      "description":["",Validators.required],
      "resources":["",Validators.required],
      "deadline":["",Validators.required],
      "opiId":[]
    });
  }

  getAnnualTargetsByOpiDepartment(department: any) {
    department.show = true;
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

  getDepartments() {
    this.utServ.getDepartments().subscribe((res: any) => {
      this.departments = res;
      this.departmentHeirarchyCopy = res;
    })
  }

  checkAssignDept(assignedDepartments: any[]) {
    this.departments = JSON.parse(JSON.stringify(this.departmentHeirarchyCopy));
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

  public department(event: any) {
    if (event.my) {
      this.departmentsCopy.forEach((element: any, index: any) => {
        if (element.departmentId == event.departmentId)
          this.departmentInfo.push(element);
      });
    } else {
      this.departmentInfo = this.departmentInfo.filter((val) => val.departmentId !== event.departmentId);
    }
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
  addNewActionStep(dept) {
    dept.isNew = true;
    dept.isEdit = false;
    this.actionForm.reset();
    this.actionForm.controls['opiId'] = this.data.opiId
  }

  onSubmit(dept, array: any[]) {
    var actionSteps = [];
    actionSteps.push(this.actionForm.value);
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
          alertify.notify("Approved");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.notify("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");
    else
      alertify.confirm("Do you realy want to Reject this??", () => {
        this.utServ.rejectActionStep(data.linkingId, { comment: data.comment }).subscribe((reponse) => {
          alertify.notify("Rejected");
        }, (error: any) => {
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

  setQuarterFeedback(data: any) {
    console.log(data.feedback);
    if (data.feedback == 'true')
      alertify.confirm("Do you realy want to Approve this??", () => {
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
      alertify.confirm("Do you realy want to Reject this??", () => {
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
}
