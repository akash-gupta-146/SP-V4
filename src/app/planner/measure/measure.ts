import { Component, AfterViewInit } from '@angular/core';
import { UniversityService } from "../../shared/UTI.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import { StorageService } from "../../shared/storage.service";
import { TreeView } from "./tree-view";
import { Filters } from '../../shared/filters';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../shared/loader.service';

declare let $: any;

@Component({
  selector: 'measure',
  templateUrl: './measure.html',
  styleUrls: ['./measure.scss', './../planner.component.css']
})
export class MeasureComponent extends Filters implements AfterViewInit {
  selectedYear: number;
  reloadBtn: boolean = false;
  selectedDepartmentIds: any[]=[];
  defaultCycle: any = {};
  objectives: any[] = [];
  initiatives: any[] = [];
  activities: any[] = [];
  public departments: any[] = [];
  departmentsCopy: any[] = [];
  evidenceForms: any[] = [];
  public isUpdating: boolean = false;
  public cycles: any[] = [];

  public direction: any = {
    true: 'Upward',
    false: 'Downward'
  }

  prev: boolean = true;
  next: boolean = false;

  public quarter: any[] = ["Q1", "Q2", "Q3", "Q4"];
  public quarters: any[];
  public measureForm: FormGroup;
  selectedQuarter: any = 0;
  constructor(public orgService: UniversityService,
    public formBuilder: FormBuilder, public commonService: StorageService, private loaderService: LoaderService) {
    super();
  }

  ngOnInit() {
    this.commonService.breadcrumb.next(true);
    this.measureForm = this.setMeasure();
    this.loaderService.display(true);
    this.getCycleWithChildren(false);
    this.getQuarter();
    this.getFrequencies();
    this.getDepartments();
  }

  ngAfterViewInit() {

  }

  getCycleWithChildren(flag: any) {
    this.orgService.getCycleWithChildren(flag).subscribe((response: any) => {
      this.cycles = response;
      this.cycles.forEach(element => {
        if (element.defaultCycle){
          this.defaultCycle = element;
          this.objectives = element.goals;
        }
      });
      if (!flag) {
        this.getMeasure();
        this.getEvidenceForms();
      }
      this.measureForm = this.setMeasure();
    });
  }

  getObjective(cycleId: any) {
    this.cycles.forEach(element => {
      if (element.cycleId == cycleId) {
        this.objectives = element.goals;
        return;
      }
    });
  }

  emptySearchResult: any;

  getInitiative(objId: any) {
    if (objId) {
      this.objectives.forEach((element: any) => {
        if (element.goalId == objId) {
          this.initiatives = element.initiatives;
          return;
        }
      });
    } else {
      this.objectives = [];
    }
  }

  getActivities(initId: any) {
    if (initId) {
      this.initiatives.forEach((element: any) => {
        if (element.initiativeId == initId) {
          this.activities = element.activities;
          return;
        }
      });
    } else {
      this.objectives = [];
    }
  }

  getMeasure() {
    this.orgService.getMeasuresByCycleId(this.defaultCycle.cycleId).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = [];
      } else {
        this.goals = response;
        this.goalsCopy = response;
        this.filteredActivities = response;
        this.filteredGoals = response;
        this.filteredInitiatives = response;
        this.filteredOpis = response;
        this.selectedYear = new Date().getFullYear();
      }
      this.loaderService.display(false);
    }, (error: any) => {
      this.loaderService.display(false);
    });
  }

  getQuarter() {
    this.orgService.getQuarter().subscribe((res: any) => {
      this.quarters = res;
    })
  }
  frequencies: any[];
  getFrequencies() {
    this.orgService.getFrequencies().subscribe((response: any) => {
      console.log("frequencies :", response);
      this.frequencies = response;
    })
  }

  getDepartments() {
    // this.departmentIds = [];
    this.orgService.getDepartments().subscribe((res: any) => {
      this.departments = res;
      this.departmentsCopy = res;
    })
  }
  public selectedMeasureId: any;

  /**for editing opi target levels */
  editDepartmentForm: FormGroup;
  viewDepartment(dept: any) {
    dept.edit = true;
    this.editDepartmentForm = this.formBuilder.group({
      "id": [dept.id],
      "baseline": [dept.baseline],
      "opiAnnualTargets": this.formBuilder.array(this.getOpiAnnualTargets(dept.opiAnnualTargets))
    });
  }

  getOpiAnnualTargets(opiAnnualTargets: any[]) {
    const annualTargets: any[] = [];
    opiAnnualTargets.forEach(element => {
      annualTargets.push(this.formBuilder.group({
        "id": [element.id],
        "estimatedCost": [element.estimatedCost],
        "levels": this.formBuilder.array(this.getLevels(element.levels))
      }))
    });
    return annualTargets;
  }

  getLevels(levelsArray) {
    const levels: any[] = [];
    levelsArray.forEach(element => {
      levels.push(this.formBuilder.group({
        "id": element.id,
        "estimatedTargetLevel": element.estimatedTargetLevel
      }))
    });
    return levels;
  }

  removeAssignedDept(selectedMeasure: any, index: any) {
    const departmentInfo: any[] = selectedMeasure.departmentInfo;
    if (confirm("Do you realy want to unassign department ?"))
      this.orgService.deleteAssignedDepartment(selectedMeasure.departmentInfo[index].id).subscribe((response: any) => {
        departmentInfo.splice(index, 1);
      })
  }

  updateOpiTarget(selectedMeasure: any, index: any) {
    if (confirm("Do you realy want to update targets ?"))
      this.orgService.updateTarget(selectedMeasure.opiId, [this.editDepartmentForm.value]).subscribe((response: any) => {
        selectedMeasure.departmentInfo[index] = response[0];
      });
  }

  viewDepartmentFilter(){
    this.selectedDepartmentIds = [];
  }

  filterDepartment(event){
    this.travers(event, event.my);
  }

  applyFilter(){
    console.log(this.selectedDepartmentIds);
    this.goals = this.goalsCopy.filter((element:any)=>{
      element.initiatives = element.initiatives.filter((initiative:any)=>{
        initiative.activities = initiative.activities.filter((activity:any)=>{
          activity.opis = activity.opis.filter((opi:any)=>{
            opi.departmentInfo = opi.departmentInfo.filter(dept => {
              if(this.selectedDepartmentIds.indexOf(dept.departmentId) != -1){
                this.reloadBtn = true;
                return true;
              }
            });
            return opi.departmentInfo.length;
          });
          return activity.opis.length;
        });
        return initiative.activities.length;
      });
      return element.initiatives.length;
    });
    return true;
  }

  getOpi(){
    this.getMeasure();
    this.reloadBtn = false;
  }

  public selectedDepartments: any[] = [];
  public department(event: any) {
    this.travers(event, event.my);
  }

  travers(department: any, checked: boolean) {
    if (!department) {
      return;
    } else {
      if (department.reporteeDepartments&&department.reporteeDepartments.length){
        if(checked)
          department.my = true;
        else
          department.my = false;
        department.reporteeDepartments.forEach((element: any) => {
          this.travers(element, checked);
        });
      }else{
        if (checked) {
          if (!department.disabled) {
            department.my = true;
            if (this.selectedDepartments.indexOf(department) === -1){
              this.selectedDepartmentIds.push(department.departmentId)
              this.selectedDepartments.push(department);
            }  
          }
        } else {
          if (!department.disabled) {
            department.my = false;
            this.selectedDepartments.splice(this.selectedDepartments.indexOf(department), 1);
            this.selectedDepartmentIds.splice(this.selectedDepartments.indexOf(department), 1);
          }
        }
      }
    }
  }

  checkAssignDept(departmentInfo: any[]) {
    setTimeout(function(){ $('#myModal').modal('show') }, 500);
    $('#detailModal').modal('hide');    
    this.selectedDepartmentIds = [];
    this.selectedDepartments = [];
    this.departments = JSON.parse(JSON.stringify(this.departmentsCopy));
    departmentInfo.forEach(outerElement => {
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
        department.baseline = assigneddepartment.baseline;
        department.opiAnnualTargets = assigneddepartment.opiAnnualTargets;
        department.my = true;
        department.disabled = true;
        department.isUpdating = true;
        // this.selectedDepartments.push(department);
      } else {
        if (department.reporteeDepartments)
          department.reporteeDepartments.forEach((element: any) => {
            this.searchDepartment(element, assigneddepartment);
          });
      }
    }
  }

  departmentForm: FormGroup;
  cycle: any[];
  assignDepartment() {
    this.cycles.forEach(element => {
      if (this.defaultCycle.cycleId == element.cycleId)
        this.cycle = element.cycle;
    });
    this.departmentForm = this.formBuilder.group({
      departmentsArray: this.formBuilder.array(this.getDepartmentFormArray())
    });
    if(this.selectedMeasure.measureUnitId == 3 || this.selectedMeasure.measureUnitId == 4){
      const departmentsArray = <FormArray>this.departmentForm.controls["departmentsArray"];
      departmentsArray.controls.forEach((element:FormGroup) => {
        const opiAnnualTargets = <FormArray>element.controls.opiAnnualTargets;
        opiAnnualTargets.controls.forEach((element:FormGroup) => {
          const levels = <FormArray>element.controls.levels;
          levels.controls.forEach((element:FormGroup) => {
            element.controls.estimatedTargetLevel.setValidators([Validators.required, Validators.min(0),Validators.max(100)]);
            element.controls.estimatedTargetLevel.setValue(0,{'max':100});
          });
        });
      });
    }
  }

  assign() {
    const departmentsArray: any[] = this.departmentForm.controls["departmentsArray"].value;
    alertify.confirm("Are you sure you want to assign this OPI", () => {
      this.orgService.assignOpi(this.selectedMeasure.opiId, departmentsArray).subscribe((response: any) => {
        this.selectedMeasure.departmentInfo = this.selectedMeasure.departmentInfo.concat(response);
        alertify.notify("Successfully assigned");
        $('#detailModal').modal('show');
        $('#myModal').modal('hide');
      }, (error: any) => {
        alertify.error("Something went wrong");
      })
    }).setHeader("Confirmation");
  }

  getDepartmentFormArray() {
    const departmentsFormArray: any[] = [];
    const departmentsArrayForEdit: any[] = [];
    this.selectedDepartments.forEach(element => {
      departmentsFormArray.push(this.formBuilder.group({
        baseline: [0],
        departmentId: [element.departmentId],
        departmentName: [element.department],
        opiAnnualTargets: this.formBuilder.array(this.setAnnualTarget(element.opiAnnualTargets))
      }))
    });
    return departmentsFormArray;
  }
  setAnnualTarget(opiAnnualTargets: any) {
    const annualTarget: any[] = [];
    if (opiAnnualTargets)
      opiAnnualTargets.forEach((element: any) => {
        annualTarget.push(this.inItTargetWithLevels(element))
      });
    else
      this.cycle.forEach((element: any) => {
        annualTarget.push(this.inItTargetIn(element));
      });
    return annualTarget;
  }

  inItTargetIn(year: any) {
    return this.formBuilder.group({
      "year": [year, [Validators.required]],
      "levels": this.formBuilder.array(this.setLevels(this.selectedMeasure.frequencyId)),
      "estimatedCost": [0, [Validators.required]]
    });
  }

  inItTargetWithLevels(annualTarget: any) {
    return this.formBuilder.group({
      "year": [annualTarget.year, [Validators.required]],
      "levels": this.formBuilder.array(this.setLevelsWithValue(annualTarget.levels)),
      "estimatedCost": [annualTarget.estimatedCost, [Validators.required]]
    });
  }

  setLevelsWithValue(levels: any[]) {
    const quarterLevel: any[] = [];
    levels.forEach(element => {
      quarterLevel.push(this.formBuilder.group({
        quarterName:[ element.quarter,],
        quarterId:[ element.quarterId,],
        estimatedTargetLevel:[ element.estimatedTargetLevel,[Validators.required,Validators.min(0)]],
      }))
    });
    return quarterLevel;
  }

  setLevels(count: any) {
    this.quarters = this.frequencies[count - 1].quarters;
    const levels: any[] = [];
    //if (count == 3) count++;
    for (var i = 0; i < this.quarters.length; i++) {
      levels.push(this.getLevel(i));
    }
    return levels;
  }

  getLevel(q: any) {
    return this.formBuilder.group({
      quarterName: this.quarters[q].quarter,
      quarterId: this.quarters[q].id,
      estimatedTargetLevel: [0,[Validators.required,Validators.min(0)]]
    });
  }

  setMeasure() {
    return this.formBuilder.group({
      "cycleId": [{ value: this.defaultCycle.cycleId, disabled: true }, [Validators.required]],
      "objectiveId": [{ value: '', disabled: false }, [Validators.required]],
      "initiativeId": [{ value: '', disabled: false }, [Validators.required]],
      "activityId": [{ value: '', disabled: false }, [Validators.required]],
      "opi": ['', [Validators.required]],
      "frequencyId": [1, [Validators.required]],
      "measureUnitId": ['percentage', [Validators.required]],
      "evidanceFormId": [null, []],
      "direction": [true, [Validators.required]],
      "approvalRequired": [false, [Validators.required]],
      "remarks": [''],
      "helpText": ['']
    });
  }

  submitMeasure() {
    var formChanges: any = {};
    var msg: string = "";
    delete this.measureForm.value["cycleId"]
    delete this.measureForm.value["objectiveId"];
    delete this.measureForm.value["initiativeId"];
    if (!this.isUpdating) {
      this.orgService.saveMeasure(this.measureForm.value).subscribe((response: any) => {
        this.getMeasure();
        alertify.notify("You have successfully added a new OPI.");
        this.measureForm.reset({
          opi: '',
          measureUnitId: '', frequencyId: 1, baseline: '', direction: '', remarks: '', helpText: '', approvalRequired: ''
        });
        $('#add-opi').hide();
        $('#add-btn').show();
      }, error => {
        console.log(error);
      });
    } else {
      Object.keys(this.measureForm.value).forEach((key: any) => {
        if (this.selectedMeasure[key] != this.measureForm.value[key]) {
          formChanges[key] = this.measureForm.value[key];
          msg += "\n" + key + " = " + formChanges[key] + ",";
        }
      });
      alertify.confirm("Are you sure you want to update this OPI", () => {
        delete this.measureForm.value["activityId"];
        this.orgService.updateMeasure(this.selectedMeasure.opiId, formChanges).subscribe((response: any) => {
          this.measureForm = this.setMeasure();
          this.getMeasure();
        });
      }).setHeader("Confirmation");
      $('#add-opi').hide();
      $('#add-btn').show();
    }
  }

  selectedMeasure: any;
  updateMeasure(objective: any, initiative: any, activity: any, measure: any, highlight: any) {
    $('#add-btn').hide();
    $(".to-be-highlighted").removeClass("highlight");
    $(highlight).addClass("highlight");
    // this.measureForm.controls["cycleId"].disable();
    this.measureForm.controls["objectiveId"].disable();
    this.measureForm.controls["initiativeId"].disable();
    this.measureForm.controls["activityId"].disable();
    this.isUpdating = true;
    this.selectedMeasure = measure;
    this.measureForm.patchValue({
      cycleId: this.defaultCycle.cycleId,
      objectiveId: objective.goalId,
      initiativeId: initiative.initiativeId,
      activityId: activity.activityId,
      opi: measure.opi,
      measureUnitId: measure.measureUnit,
      frequencyId: measure.frequencyId,
      baseline: measure.baselineOfOpi,
      evidanceFormId: measure.evidanceFormId,
      direction: measure.direction,
      remarks: measure.remarks,
      helpText: measure.helpText,
      approvalRequired: measure.approvalRequired
    });
    $('#add-opi').show();
    $("#collapse1").collapse('show');
    // this.measureForm.controls["annualTarget"].patchValue(measure.annualTarget);
  }

  enableFields() {
    $('#add-opi').hide();
    $(".to-be-highlighted").removeClass("highlight");
    // this.measureForm.controls["cycleId"].enable();
    this.measureForm.controls["objectiveId"].enable();
    this.measureForm.controls["initiativeId"].enable();
    this.measureForm.controls["activityId"].enable();
    this.measureForm = this.setMeasure();
  }

  deleteMeasure(measureId: any, measures: any[], index: any) {
    if (confirm("Are you sure you want to delete this Measure?"))
      this.orgService.deleteMeasure(measureId).subscribe((res: any) => {
        console.log(res);
        // measures.splice(index, 1);
        this.getMeasure();
      })
  }

  getEvidenceForms() {
    this.orgService.getEvidenceForms().subscribe((response: any) => {
      this.evidenceForms = response;
    })
  }

  closeForm() {
    $('#add-btn').show();
    this.enableFields();
    this.isUpdating = false;
    this.getCycleWithChildren(false);
  }

  addNewMeasure() {
    this.enableFields();
    this.isUpdating = false;
    $('#add-opi').show();
    $('#add-btn').hide();
    $("#collapse1").collapse('show');

    this.initiatives = [];
    this.activities = [];
    this.getCycleWithChildren(true);
  }

  disable(event: any, opiId: any) {
    if (!event.target.checked)
      alertify.confirm("Are you sure you want to deactivate selected KPI ?", () => {
        this.orgService.disableKPI(opiId).subscribe((response: any) => {
          alertify.success("Inactivated the KPI..");
          this.getMeasure();
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong..")
        })
      }, () => {
        event.target.checked = !event.target.checked;
        alertify.error("Action was not performed")
      }).setHeader("Confirmation");
    else
      alertify.confirm("Are you sure you want to activate this KPI ?", () => {
        this.orgService.enableKPI(opiId).subscribe((response: any) => {
          alertify.success("Activated the KPI..");
          this.getMeasure();
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong..")
        })
      }, () => {
        event.target.checked = !event.target.checked;
        alertify.error("Action was not performed")
      }).setHeader("Confirmation");
  }

  getOpiResultByYear(cycleId: any, year: any) {
    this.orgService.getOpiResultByYear(cycleId, year).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = JSON.parse(JSON.stringify(response));
      }
    });
  }

  get(e) {
    var promise = new Promise((resolve: any, reject: any) => { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
    return promise;
  }

  sameForAll(departmentArray:FormArray){
    departmentArray.controls.forEach((element:any,index:number) => {
      if(index){
        let department = <FormGroup>departmentArray.controls[0];
        element.controls.opiAnnualTargets.patchValue(department.controls.opiAnnualTargets.value);
        element.controls.baseline.patchValue(department.controls.baseline.value);
      }
    });
  }

  isFuture(y:number){
    return (y > new Date().getFullYear());
  }
}