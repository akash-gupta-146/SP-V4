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
  saving: boolean;
  deptId: string;
  @Input() id: any;
  selectedEvidence: any;
  tempUrl: string = "";
  departmentHeirarchyCopy: any;
  role: any;
  isEdit: boolean;
  selectedDepatrtmentId: any;
  selectedLevel:any = {};
  employeesCopy: any;
  employees: any[] = [];
  actionSteps: any[] = [];
  actionForm: FormGroup;
  data: any = {};
  departmentModel: any = 0;
  departments: any[] = [];
  departmentInfo: any[] = []
  departmentsCopy: any[] = [];
  evidencForm: FormGroup;
  evidences: any[] = [];
  selectedQuarter: any;
  file: any;
  selectedInternshipFile: any;
  selectedForm: any;
  isNew: boolean = false;
  constructor(private route: ActivatedRoute, 
              private utServ: HodService,
              private storage: StorageService, 
              private loaderService: LoaderService,
              private fb: FormBuilder,
              private location:Location) {

  }

  ngOnInit(){  
    this.deptId = this.route.snapshot.paramMap.get('deptId');  
    this.role = this.storage.getData('userDetails').roleInfo[0].role;
    this.loaderService.display(true);
      this.route.params.subscribe((params: any) => {  
        if(params['quarter']&&parseInt(params['deptId'])){
          this.utServ.getDepartmentByQuarterAndDepartment(params['id'],params['quarter'],params['deptId']).subscribe((response: any) => {
            console.log(response);
            this.loaderService.display(false);
            this.data = response[0]; console.log(this.data);
            this.getTemplateUrl(this.data.evidanceFormId);
            this.getDepartments();
              this.departmentInfo = response[0].departmentInfo;
              this.departmentsCopy = response[0].departmentInfo;
          });
        }else if(params['quarter']){
          this.utServ.getDepartmentByOpiIdAndQuarter(params['id'],params['quarter']).subscribe((response: any) => {
            this.loaderService.display(false);
            this.data = response[0]; console.log(this.data);
            this.getTemplateUrl(this.data.evidanceFormId);
            this.getDepartments();
            if(parseInt(params['deptId'])){
              console.log("came");
              const deptId = parseInt(this.deptId);
              this.departmentInfo = this.data.departmentInfo.filter(element=>{
                return element.departmentId === deptId;
              });
            }else{
              this.departmentInfo = response[0].departmentInfo;
              this.departmentsCopy = response[0].departmentInfo;
            }
          });
        }else{
          this.utServ.getDepartmentByOpiId(params['id']).subscribe((response: any) => {
            this.loaderService.display(false);
            this.data = response[0]; console.log(this.data);
            this.getTemplateUrl(this.data.evidanceFormId);
            this.getDepartments();
            if(params['deptId']){
              const deptId = parseInt(this.deptId);
              this.departmentInfo = this.data.departmentInfo.filter(element=>{
                return element.departmentId === deptId;
              })
            }else{
              this.departmentInfo = response[0].departmentInfo;
              this.departmentsCopy = response[0].departmentInfo;
            }
          });
        }

      }); 


    this.evidencForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      files: new FormControl('', [Validators.required])
    });
    this.getEmployees();
    this.actionForm = this.fb.group({
      "reason": ["", [Validators.required]],
      "description": ["", [Validators.required]],
      "resources": ["", [Validators.required]],
      "deadline": ["", [Validators.required]],
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

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  passQuarter(event) {
    this.selectedLevel = event;
    // if (event.internshipDetails)
    //   this.selectedInternshipFile = event.internshipDetails[0];
    // if (event.selectedForm)
    //   this.selectedForm = event.selectedForm;
  }

  getActionSteps(dept: any) {
    dept.actionStepView = true;
    this.selectedDepatrtmentId = dept.id;
    this.utServ.getActionSteps(dept.id).subscribe((response) => {
      this.actionSteps = response;
    });
  }

  addNewActionStep(dept: any) {
    dept.isNew = true;
    dept.isEdit = false;
    this.actionForm.reset();
    this.actionForm.controls['opiId'].patchValue(this.data.opiId);
  }

  onSubmit(dept, array: any[]) {
    var actionSteps = [];
    actionSteps.push(this.actionForm.value);
    if (!dept.isEdit) {
      this.saving = true;
      this.utServ.postActionSteps(dept.id, actionSteps).subscribe((response: any) => {
        this.saving = false;
        response[0]['linked'] = true;
        array.push(response[0]);
        dept.isNew = false;
        alertify.success("Action Step added and linked");
      });
    } else {
      alertify.confirm("Do you want to update this action step?", (response: any) => {
        this.saving = true;
        this.utServ.updateActionStep(this.selectedStep.stepId, this.actionForm.value).subscribe((response: any) => {
          this.saving = false;
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
      alertify.confirm("Do you really want to Approve this ?", () => {
        this.utServ.approveActionStep(data.linkingId, { comment: data.comment }).subscribe((reponse) => {
          alertify.success("Approved");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");
    else
      alertify.confirm("Do you really want to Reject this ?", () => {
        this.utServ.rejectActionStep(data.linkingId, { comment: data.comment }).subscribe((reponse) => {
          alertify.success("Rejected");
        }, (error: any) => {
          alertify.error("Something went wrong");
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
    alertify.confirm("Are you sure, you want to assign selected employees to this Action step?", (response: any) => {
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

        response.forEach(element => {
          this.selectedStep.otherEmployees = this.selectedStep.otherEmployees.filter(employee=>{     
           return !(employee.id == element.employeeId);
          }); 
         });
         
        alertify.success("Assigned");
        $('#assignModal').modal('hide');
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
    if (data.feedback == 'true')
      alertify.confirm("Do you really want to Approve this ?", () => {
        this.utServ.approve(data.id, { comment: data.comment }).subscribe((reponse) => {
          data.status = 'Approved';
          data.disable = true;
          data.role = this.role;
          this.passQuarter(data);
          alertify.success("KPI data has been Approved");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");
    else
      alertify.confirm("Do you really want to Reject this ?", () => {
        this.utServ.reject(data.id, { comment: data.comment }).subscribe((reponse) => {
          data.status = 'Rejected';
          data.disable = 'true';
          alertify.success("KPI data has been Rejected");
          $("#feedbackModal").modal('hide');
        }, (error: any) => {
          alertify.error("Something went wrong");
          $("#feedbackModal").modal('hide');
        });
      }).setHeader("Confirmation");

  }

  getTemplateUrl(evidanceFormId:number){
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
    this.selectedEvidence = evidence;
  }
}