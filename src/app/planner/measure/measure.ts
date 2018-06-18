import { Component, AfterViewInit,OnDestroy } from '@angular/core';
import { UniversityService } from "../../shared/UTI.service";
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from "@angular/forms";
import { StorageService } from "../../shared/storage.service";
import { TreeView } from "./tree-view";
import { Filters } from '../../shared/filters';
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { LoaderService } from '../../shared/loader.service';

declare let $: any;

@Component({
  selector: 'measure',
  templateUrl: './measure.html',
  styleUrls: ['./measure.scss', './../planner.component.css']
})
export class MeasureComponent extends Filters implements AfterViewInit, OnDestroy{
  selectedDepartment: any;
  departmentFormChanges: boolean;
  newDepartment: boolean;
  saving: boolean;
  departmentLoader: boolean;
  activeCycle: any[];
  allCycle: any[];
  newKpi: boolean = false;
  selectedYear: number = new Date().getFullYear();
  reloadBtn: boolean = false;
  selectedMeasure: any;
  selectedDepartmentIds: any[]=[];
  defaultCycle: any = {};
  frequencies: any[];
  objectives: any[] = [];
  initiatives: any[] = [];
  activities: any[] = [];
  departments: any[] = [];
  departmentsCopy: any[] = [];
  evidenceForms: any[] = [];
  isUpdating: boolean = true;
  emptySearchResult: any;
  cycles: any[] = [];
  prev: boolean = true;
  next: boolean = false;
  quarters: any[];
  measureForm: FormGroup;
  selectedQuarter: any = 0;
  selectedMeasureId: any;
  selectedDepartments: any[] = [];
  departmentForm: FormGroup;
  cycle: any[];
  noData:boolean = false;
  constructor(public orgService: UniversityService,
    public formBuilder: FormBuilder, public commonService: StorageService, private loaderService: LoaderService) {
    super();
  }
  
  ngOnInit() {
    this.loaderService.display(true);
    this.commonService.breadcrumb.next(true);    
    this.measureForm = this.setMeasure();
    this.getCycleWithChildren(false);
    this.getFrequencies();
    this.getEvidenceForms();
    this.getDepartments();
    // this.getQuarter();
  }

  ngAfterViewInit() {

  }

  getCycleWithChildren(flag: any) {  
    this.loaderService.display(true);      
    this.orgService.getCycleWithChildren(flag).subscribe((response: any) => {
      this.cycles = response;
      if (this.orgService.commonCycle) {
        this.defaultCycle = this.cycles.find((element: any) => {
          return this.orgService.commonCycle == element.cycleId;
        })
      } else {
        this.defaultCycle = this.cycles.find((element: any) => {
          return element.defaultCycle;
        });
      }
      this.objectives = this.defaultCycle.goals;
      this.getMeasure(); 
      this.measureForm = this.setMeasure();
    });
  }

  getObjective(cycleId: any) {
    // this.cycles.forEach(element => {
    //   if (element.cycleId == cycleId) {
    //     this.objectives = element.goals;
    //     return;
    //   }
    // });
    this.objectives = this.goals.filter(element=>{
      return !element.disable;
    });
  }


  getInitiative(objId: any) {
    console.log(objId);
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
    this.orgService.commonCycle = this.defaultCycle.cycleId;
    this.loaderService.display(true);
    this.objectives = this.initiatives = this.activities = [];
    this.orgService.getCycleByCycleId(this.defaultCycle.cycleId).subscribe((response: any) => {
      this.goals = response.goals;
      this.goalsCopy = JSON.parse(JSON.stringify(this.goals));
      this.selectedYear = new Date().getFullYear();
      this.getObjective(this.defaultCycle.cycleId);
      this.noData = (response.goals.length)?false:true;      
      this.loaderService.display(false);
    }, (error: any) => {
      this.loaderService.display(false);
    });
    this.initFilters(this.goals);
    this.getActiveCycles();
  }

  getActiveCycles(){
    this.allCycle = JSON.parse(JSON.stringify(this.cycles));
    this.activeCycle = this.cycles.filter(cycle=>{
      return !cycle.disable;
    })
  }

  getQuarter() {
    this.orgService.getQuarter().subscribe((res: any) => {
      this.quarters = res;
    })
  }
  getFrequencies() {
    this.orgService.getFrequencies().subscribe((response: any) => {
      this.frequencies = response;
    })
  }

  getDepartments() {
    this.orgService.getDepartments().subscribe((res: any) => {
      this.departments = res;
      this.departmentsCopy = res;
    })
  }


  /**for editing opi target levels */
  editDepartmentForm: FormGroup;
  viewDepartment(dept: any,e:any) {
    if(this.departmentFormChanges){
      e.stopPropagation();
      this.tellYesOrNo(e).then(()=>{
        this.fillFormData(dept);
      });
    } else {
      this.fillFormData(dept);
    }
  }

  fillFormData(dept:any){
    this.departmentFormChanges=false;
    if(this.selectedDepartment){
      this.selectedDepartment.edit = false;
      dept.edit = true;
      this.selectedDepartment = dept;
    }else{
      dept.edit = true;
      this.selectedDepartment = dept;
    }
    this.editDepartmentForm = this.formBuilder.group({
      "id": [dept.id],
      "baseline": [dept.baseline,[Validators.required, Validators.min(0)]],
      "opiAnnualTargets": this.formBuilder.array(this.getOpiAnnualTargets(dept.opiAnnualTargets))
    });
    this.editDepartmentForm.valueChanges.subscribe((changes:any)=>{
      this.departmentFormChanges = true;
    });
  }

  getOpiAnnualTargets(opiAnnualTargets: any[]) {
    const annualTargets: any[] = [];
    opiAnnualTargets.forEach(element => {
      annualTargets.push(this.formBuilder.group({
        "id": [element.id],
        "estimatedCost": [element.estimatedCost,[Validators.required, Validators.min(0)]],
        "levels": this.formBuilder.array(this.getLevels(element.levels))
      }))
    });
    return annualTargets;
  }

  getLevels(levelsArray) {
    const levels: any[] = [];
    if(this.selectedMeasure.measureUnitId == 4)
      levelsArray.forEach(element => {
        levels.push(this.formBuilder.group({
          "id": [element.id],
          "estimatedTargetLevel": [element.estimatedTargetLevel,[Validators.required, Validators.min(0),Validators.max(100)]]
        }))
      });
    else
      levelsArray.forEach(element => {
        levels.push(this.formBuilder.group({
          "id": [element.id],
          "estimatedTargetLevel": [element.estimatedTargetLevel,[Validators.required, Validators.min(0)]]
        }))
      });
      
    return levels;
  }

  removeAssignedDept(selectedMeasure: any, index: any) {
    const departmentInfo: any[] = selectedMeasure.departmentInfo;
    alertify.confirm("Do you really want to unassign department ?",()=>{
      this.orgService.deleteAssignedDepartment(selectedMeasure.departmentInfo[index].id).subscribe((response: any) => {
        departmentInfo.splice(index, 1);
        alertify.success("Successfully Unassigned");
      },(error)=>{
        alertify.error("Something went wrong.");
      });
    }).setHeader("Confirmation");
  }

  updateOpiTarget(selectedMeasure: any, dept: any) {
    alertify.confirm("You sure you want to update the targets?",()=>{
      this.orgService.updateTarget(selectedMeasure.opiId, [this.editDepartmentForm.value]).subscribe((response: any) => {
        dept.edit = false;
        this.departmentFormChanges=false;
        _.extend(dept , response[0]);
      });
    }).setHeader("Confirmation");      
  }

  viewDepartmentFilter(){
    this.selectedDepartmentIds = [];
  }

  filterDepartment(event){
    this.travers(event, event.my);
  }

  applyFilter(){
    if(this.selectedDepartmentIds.length)
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
    this.goals = this.goalsCopy;
    this.reloadBtn = false;
  }

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

  checkAssignDept(msr: any) {
    this.selectedMeasure = msr;
    this.next=false;this.prev=true;
    this.selectedDepartmentIds = [];
    this.selectedDepartments = [];
    this.departments = JSON.parse(JSON.stringify(this.departmentsCopy));
    msr.departmentInfo.forEach(outerElement => {
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

  assignDepartment() {
    console.log(this.selectedMeasure);
    this.prev=false;this.next=true;
    this.cycles.forEach(element => {
      if (this.defaultCycle.cycleId == element.cycleId)
        this.cycle = element.cycle;
    });
    this.departmentForm = this.formBuilder.group({
      departmentsArray: this.formBuilder.array(this.getDepartmentFormArray())
    });
    if(this.selectedMeasure.measureUnitId == 4){
      const departmentsArray = <FormArray>this.departmentForm.controls["departmentsArray"];
      departmentsArray.controls.forEach((element:FormGroup) => {
        const opiAnnualTargets = <FormArray>element.controls.opiAnnualTargets;
        opiAnnualTargets.controls.forEach((element:FormGroup) => {
          const levels = <FormArray>element.controls.levels;
          levels.controls.forEach((element:FormGroup) => {
            element.controls.estimatedTargetLevel.setValidators([Validators.required, Validators.min(0),Validators.max(100)]);
          });
        });
      });
    }else{
      const departmentsArray = <FormArray>this.departmentForm.controls["departmentsArray"];
      departmentsArray.controls.forEach((element:FormGroup) => {
        const opiAnnualTargets = <FormArray>element.controls.opiAnnualTargets;
        opiAnnualTargets.controls.forEach((element:FormGroup) => {
          const levels = <FormArray>element.controls.levels;
          levels.controls.forEach((element:FormGroup) => {
            element.controls.estimatedTargetLevel.setValidators([Validators.required, Validators.min(0)]);
          });
        });
      });
    }
  }

  assign() {
    const departmentsArray: any[] = this.departmentForm.controls["departmentsArray"].value;
    alertify.confirm("Are you sure you want to assign selected department(s) to KPI", () => {
      this.saving = true;
      this.orgService.assignOpi(this.selectedMeasure.opiId, departmentsArray).subscribe((response: any) => {
        this.saving = false;
        this.selectedMeasure.departmentInfo = this.selectedMeasure.departmentInfo.concat(response);
        this.checkAssignDept(this.selectedMeasure);
        this.selectedDepartments = [];
        this.selectedDepartmentIds = [];
        alertify.success("Successfully assigned");
        this.newDepartment = false;
        this.prev = true;this.next = false;
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
        baseline: [0,[Validators.required, Validators.min(0)]],
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
      "estimatedCost": [0, [Validators.required, Validators.min(0)]]
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
      "cycleId": [this.defaultCycle.cycleId, [Validators.required]],
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
      this.saving = true;
      this.orgService.saveMeasure(this.measureForm.value).subscribe((response: any) => {
        this.saving = false;
        response['departmentInfo']=[];
        this.selectedActivity.opis.push(response);
        this.selectedMeasure = response;
        console.log(this.selectedMeasure);
        this.newDepartment = true;
        $('#myModal').modal('show');
        alertify.success("You have successfully added a new KPI.");
        // this.getMeasure();
        this.measureForm.reset({
          opi: '',
          measureUnitId: '', frequencyId: 1, baseline: '', direction: '', remarks: '', helpText: '', approvalRequired: ''
        });
        $('#add-opi').hide();
        $('#add-btn').show();
        this.checkAssignDept(response);
      }, error => {
        
      });
    } else {
      Object.keys(this.measureForm.value).forEach((key: any) => {
        if (this.selectedMeasure[key] != this.measureForm.value[key]) {
          formChanges[key] = this.measureForm.value[key];
          msg += "\n" + key + " = " + formChanges[key] + ",";
        }
      });
      alertify.confirm("Are you sure you want to update current KPI", () => {
      this.saving = true;        
        delete this.measureForm.value["activityId"];
        this.orgService.updateMeasure(this.selectedMeasure.opiId, formChanges).subscribe((response: any) => {
          alertify.success("Successfully updated");
          this.saving = false;
          this.measureForm = this.setMeasure();
          this.getMeasure();
          $('#add-opi').hide();
          $('#add-btn').show();
        },error=>{
          this.saving = false;
          $('#add-opi').hide();
          $('#add-btn').show();
          alertify.error("Something went wrong "+error);
        });
      }).setHeader("Confirmation");
    }
  }

  updateMeasure(objective: any, initiative: any, activity: any, measure: any, highlight: any) {
    this.getEvidenceForms();
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
      measureUnitId: measure.measureUnitId,
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

  deleteMeasure(kpi: any, measures: any[], index: any) {
    alertify.confirm("Please confirm that you want to delete selected KPI?",()=>{
      if(!kpi.departmentInfo.length){
        this.orgService.deleteMeasure(kpi.opiId).subscribe((res: any) => {
          alertify.success("KPI Deleted");
          // this.getMeasure();
          measures.splice(measures.indexOf(kpi),1);
        },(error:any)=>{
          alertify.error("Something went wrong");
        });
      }else{
        alertify.alert("You can not delete selected KPI because it has been assigned to Other Departments").setHeader("Alert");
      }
    }).setHeader("Confirmation").setting({
      'closableByDimmer': false,
      'movable': false,
      'labels': { ok: 'Confirm', cancel: 'Cancel' },
      })
      .set({transition:'fade'})
      .show();
      
  }

  getEvidenceForms() {
    this.orgService.getEvidenceForms().subscribe((response: any) => {
      this.evidenceForms = response;
    })
  }

  closeForm() {
    this.newKpi = false;
    $('#add-btn').show();
    this.enableFields();
    this.isUpdating = false;
    this.cycles = JSON.parse(JSON.stringify(this.allCycle));
    this.setDefaultCycle();
  }

  addNewMeasure() {
    this.newKpi = true;
    this.enableFields();
    this.isUpdating = false;
    $('#add-opi').show();
    $('#add-btn').hide();
    $("#collapse1").collapse('show');
    this.getObjective(this.defaultCycle.cycleId);
    this.initiatives = [];
    this.activities = [];
    // this.getCycleWithChildren(true);
    this.cycles = JSON.parse(JSON.stringify(this.activeCycle));
    this.setDefaultCycle();
  }

  addMeasure(goal:any,initiative:any,activity:any) {
    this.getObjective(this.defaultCycle.cycleId);
    this.getInitiative(goal.goalId);
    this.getActivities(initiative.initiativeId);
    this.selectedActivity = activity;
    this.newKpi = true;
    this.enableFields();
    this.isUpdating = false;
    $('#add-opi').show();
    $('#add-btn').hide();
    $("#collapse1").collapse('show');
    this.measureForm.patchValue({
      cycleId:this.defaultCycle.cycleId,
      objectiveId: goal.goalId,
      initiativeId: initiative.initiativeId,
      activityId: activity.activityId,
    });
  }

  getSelectedActivity(activityId:any){
    this.selectedActivity = this.activities.find(element=>{
      return element.activityId == activityId;
    })
  }
  setDefaultCycle() {
    this.cycles.forEach((cycle: any) => {
      if (cycle.cycleId == this.defaultCycle.cycleId)
          this.defaultCycle = cycle;
    });
  }

  disable(event: any, opi: any) {
    if (!event.target.checked){
      alertify.confirm("Are you sure you want to inactivate this KPI ?", () => {
        this.orgService.disableKPI(opi.opiId).subscribe((response: any) => {
          alertify.success("Deactivated selected KPI");
          opi.disable = true;
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong..")
        });
      }, () => {
        event.target.checked = !event.target.checked;
      }).setHeader("Confirmation");
    }
    else
      alertify.confirm("Are you sure you want to activate this KPI ?", () => {
        this.orgService.enableKPI(opi.opiId).subscribe((response: any) => {
          opi.disable = false;
          alertify.success("Activated the KPI..");
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong..")
        })
      }, () => {
        event.target.checked = !event.target.checked;
      }).setHeader("Confirmation");
  }

  getOpiResultByYear(cycleId: any, year: any) {
    this.orgService.getOpiResultByYear(cycleId, year).subscribe((response: any) => {
      this.goals = response;
      this.goalsCopy = JSON.parse(JSON.stringify(response));
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

  toShowOrNot(goal){
    var flag= 1;
    goal.initiatives.forEach(element => {
      if(element.activities.length){
        flag = 0;
        return;}
        
    });
    return !flag;
  }

  getInitiativesLength(initiatives:any[]){
    var len = 0;
    initiatives.forEach(element => {
      if(element.activities.length)
        len ++;
    });
    return len;
  }

  getDepartmentWithData(opi:any){
    this.checkAssignDept(opi);
    this.selectedMeasure = opi;
    this.departmentLoader = true;
    this.orgService.getAssignedDepartmentWithData(opi.opiId).subscribe((response:any)=>{
      this.selectedMeasure.departmentInfo = response;
      this.departmentLoader = false;
    })
  }

  check(e){
    e.stopPropagation();
    if(this.departmentFormChanges){
      alertify.confirm("Do you want to save changes ?",(yes)=>{
        this.orgService.updateTarget(this.selectedMeasure.opiId, [this.editDepartmentForm.value]).subscribe((response: any) => {
          this.selectedDepartment.edit = false;
          _.extend(this.selectedDepartment , response[0]);
        });
        this.departmentFormChanges=false;
      },(no)=>{
        $('#myModal').modal('hide');
        this.departmentFormChanges=false;      
      }).setHeader("Confirmation").setting({
        'closableByDimmer': false,
        'movable': false,
        'labels': { ok: 'Yes', cancel: 'No' },
        })
        .set({transition:'fade'})
        .show();
    }else{
      $('#myModal').modal('hide');
    }
  }

  tellYesOrNo(e){
    return new Promise((resolve:any,reject:any)=>{
      alertify.confirm("Do you want to save changes ?",(yes)=>{
        this.orgService.updateTarget(this.selectedMeasure.opiId, [this.editDepartmentForm.value]).subscribe((response: any) => {
          this.selectedDepartment.edit = false;
          _.extend(this.selectedDepartment , response[0]);
          resolve();
        });
        this.departmentFormChanges=false;
      },(no)=>{
        // $('#myModal').modal('hide');
        this.departmentFormChanges=false;     
        resolve(); 
      }).setHeader("Confirmation").setting({
        'closableByDimmer': false,
        'movable': false,
        'labels': { ok: 'Yes', cancel: 'No' },
        })
        .set({transition:'fade'})
        .show();
    });
  }

  ngOnDestroy(){
    this.loaderService.display(false);
  }
}