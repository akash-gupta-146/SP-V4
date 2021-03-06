import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UniversityService } from "../../shared/UTI.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StorageService } from "../../shared/storage.service";
import { Filters } from "../../shared/filters";
import * as alertify from 'alertifyjs';
import * as _ from 'underscore';
import { LoaderService } from '../../shared/loader.service';
import { ActivatedRoute } from '@angular/router';


declare let $: any;

@Component({
  selector: 'activities',
  templateUrl: './activity.html',
  styleUrls: ['./activity.css', './../planner.component.css']
})
export class ActivityComponent extends Filters implements OnInit, AfterViewInit {
  saving: boolean;
  noData: boolean = false;
  goalId: any;
  initiativeId: number;
  newActivity: boolean;
  cycles: any[] = [];
  activeCycle: any[] = [];
  allCycle: any[] = [];
  activityForm: FormGroup;
  quarter: any[] = ["Q1", "Q2", "Q3", "Q4"];
  objectives: any[]=[];
  objectiveIndex: any[] = [];
  initiatives: any[]=[];
  isUpdating: boolean = false;
  defaultCycle: any = {};

  constructor(public orgService: UniversityService,
    public formBuilder: FormBuilder,
    public commonService: StorageService,
    private loaderService: LoaderService,
    private route: ActivatedRoute) {
    super();
    this.loaderService.display(true);
  }

  ngOnInit() {
    this.commonService.breadcrumb.next(true);
    this.loaderService.display(true);
    this.getCycleWithChildren(false);
    this.activityForm = this.setActivity();
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  getCycleWithChildren(flag: any) {
    this.loaderService.display(true);
    const cycleId = +this.route.snapshot.paramMap.get('cycleId');
    this.orgService.getCycleWithChildren(flag).subscribe((response: any) => {
      this.cycles = response;
      if (cycleId) {
        this.cycles.forEach((element: any) => {
          if (element.cycleId === cycleId)
            this.defaultCycle = element;
        });
      } else{     
        if(this.orgService.commonCycle){
          this.defaultCycle = this.cycles.find((element:any)=>{
            return this.orgService.commonCycle == element.cycleId;
          })
        }else {
          this.defaultCycle = this.cycles.find((element:any)=>{
            return element.defaultCycle;
          });
        }   
      }
      if (!flag) {
        console.log("cccc");
        this.getActivities(this.defaultCycle);
      }
    });

  }

  getObjective(cycleId: any) {
    this.objectives = this.goals.filter(element=>{
      return !element.disable;
    });
    // this.cycles.forEach(element => {
    //   if (element.cycleId == cycleId) {
    //     this.objectives = element.goals;
    //     return;
    //   }
    // });
  }
  getActivities(defaultCycle: any) {
    this.loaderService.display(true);
    this.orgService.commonCycle = this.defaultCycle.cycleId;    
    this.objectives = this.initiatives = [];
    this.initiativeId = +this.route.snapshot.paramMap.get('initiativeId');
    console.log("dddd");
    this.orgService.getCycleByCycleId(this.defaultCycle.cycleId).subscribe((response: any) => {
      console.log("eeee : ",response);
      this.goals = response.goals;
      this.noData = (response.goals.length)?false:true; 
      if (this.initiativeId) {
        this.goals = this.goals.filter((element: any) => {
          element.initiatives = element.initiatives.filter((initiative: any) => {
            return initiative.initiativeId === this.initiativeId;
          });
          return (element.initiatives.length) ? true : false;
        });
      }
      this.goalsCopy = JSON.parse(JSON.stringify(this.goals));
      this.initFilters(this.goals);
      this.getObjective(this.defaultCycle.cycleId);
      this.loaderService.display(false);
    }, (error: any) => {
      this.loaderService.display(false);
    });
    // this.goals = this.defaultCycle.goals;
    if (this.initiativeId) {
      this.goals = this.goals.filter((element: any) => {
        element.initiatives = element.initiatives.filter((initiative: any) => {
          return initiative.initiativeId === this.initiativeId;
        });
        return (element.initiatives.length) ? true : false;
      });
    }
    this.goalsCopy = this.goals;
    this.initFilters(this.goals);
    this.getActiveCycles();
  }

  getActiveCycles() {
    this.allCycle = JSON.parse(JSON.stringify(this.cycles));
    this.activeCycle = this.cycles.filter(cycle => {
      return !cycle.disable;
    })
  }


  getInitiative(objId: any) {
    if (objId) {
      this.objectives.forEach((element: any) => {
        if (element.goalId == objId) {
          this.initiatives = element.initiatives;
          return;
        }
      });
    } else {
      this.initiatives = [];
    }
  }

  setActivity() {
    return this.formBuilder.group({
      "cycleId": [this.defaultCycle.cycleId, [Validators.required]],
      "objectiveId": [this.goalId, [Validators.required]],
      "initiativeId": [this.initiativeId, [Validators.required]],
      "activity": ['', [Validators.required]],
    });
  }

  submitActivity() {
    delete this.activityForm.value["cycleId"];
    delete this.activityForm.value["objectiveId"];
    if (!this.isUpdating) {
      this.saving = true;
      this.orgService.saveActivity(this.activityForm.value)
        .subscribe(response => {
          $("#add-activity").hide();
          $('#add-btn').show();
          this.saving = false;
          alertify.success("Saved successfully .,.");
          this.selectedInitiative.activities.push(response);
          this.activityForm.controls["activity"].reset();
          //this.getAllCycles();
        })
    } else {
      alertify.confirm("Are you sure you want to Update this Activity?", () => {
        delete this.activityForm.value["initiativeId"];
        this.saving = true
        this.orgService.updateActivity(this.selectedActivity.activityId, this.activityForm.value).subscribe((response: any) => {
          this.saving = false;
          $("#add-activity").hide();
          $('#add-btn').show();
          this.selectedActivity.activity = this.activityForm.controls['activity'].value;
          alertify.success("Activity Successfully Updated!");
          this.isUpdating = false;
          this.activityForm = this.setActivity();
          // this.getAllCycles();
        });
      }).setHeader("Confirmation");
    }
  }

  deleteActivity(activity: any, activities: any[], index: any) {
    if (!activity.opis.length)
      alertify.confirm("Are you sure you want to delete this Activity?", () => {
        this.orgService.deleteActivity(activity.activityId).subscribe((res: any) => {
          activities.splice(index, 1);
          alertify.success("Deleted successfully!");
        });
      }).setHeader("Confirmation");
    else
      alertify.alert("You can not delete this activity because it has OPIs.").setHeader("Alert");
  }
  selectedActivity: any;
  updateActivity(objective: any, initiative: any, activity: any, highlight: any) {
    $('#add-btn').hide();
    $(".to-be-highlighted").removeClass("highlight");
    $(highlight).addClass("highlight");
    $("#add-activity").show();
    $("#collapse1").collapse('show');
    this.isUpdating = true;
    this.selectedActivity = activity;
    this.activityForm.controls["cycleId"].disable();
    this.activityForm.controls["objectiveId"].disable();
    this.activityForm.controls["initiativeId"].disable();
    this.activityForm.patchValue({
      cycleId: this.defaultCycle.cycleId,
      objectiveId: objective.goalId,
      initiativeId: initiative.initiativeId,
      activity: activity.activity
    });
  }

  closeForm() {
    this.newActivity = false;
    $('#add-btn').show();
    this.enableFields();
    this.isUpdating = false;
    // this.getCycleWithChildren(false);
    this.cycles = JSON.parse(JSON.stringify(this.allCycle));
    this.cycles.forEach((element: any) => {
      if (element.cycleId == this.defaultCycle.cycleId)
        this.defaultCycle = element;
    });
  }

  enableFields() {
    // this.activityForm.controls["cycleId"].enable();
    this.activityForm.controls["objectiveId"].enable();
    this.activityForm.controls["initiativeId"].enable();
    this.activityForm = this.setActivity();
    $("#add-activity").hide();
    $(".to-be-highlighted").removeClass("highlight");
  }

  addNewActivity() {
    if(this.initiativeId){
      this.goals.forEach(goal => {
        this.selectedInitiative = goal.initiatives.find(initiative=>{
          return initiative.initiativeId == this.initiativeId;
        });
      });
    }
    this.newActivity = true;
    this.enableFields();
    this.isUpdating = false;
    $("#add-activity").show();
    $('#add-btn').hide();
    $("#collapse1").collapse('show');
    // this.getCycleWithChildren(true);
    this.cycles = JSON.parse(JSON.stringify(this.activeCycle));
    this.getFormData();
    this.activityForm = this.setActivity();

  }

  addActivity(goal:any,initiative:any){
    this.selectedInitiative = initiative;
    this.newActivity = true;
    this.enableFields();
    this.isUpdating = false;
    $("#add-activity").show();
    $('#add-btn').hide();
    $("#collapse1").collapse('show');
    this.goalId = goal.goalId;
    this.getInitiative(this.goalId);
    this.initiativeId = initiative.initiativeId;
    this.activityForm = this.setActivity();
  }

  getFormData() {
    this.cycles.forEach((cycle: any) => {
      if (cycle.cycleId == this.defaultCycle.cycleId)
          this.defaultCycle = cycle;
      });
      this.goals.forEach(goal => {        
        goal.initiatives.forEach((initiative: any) => {
          if (initiative.initiativeId === this.initiativeId) {
            this.goalId = goal.goalId;
            this.getInitiative(this.goalId);
          }
        });
      });
  }

  disable(event: any, activityId: any) {
    if (!event.target.checked)
      alertify.confirm("Are you sure you want to inactivate this Activity ?", () => {
        this.orgService.disableActivity(activityId).subscribe((response: any) => {
          alertify.success("Inactivated the Activity..");
          this.getActivities(this.defaultCycle);
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong..")
        })
      }, () => {
        event.target.checked = !event.target.checked;
      }).setHeader("Confirmation");
    else
      alertify.confirm("Are you sure you want to activate this Activity ?", () => {
        this.orgService.enableActivity(activityId).subscribe((response: any) => {
          alertify.success("activated the Activity..");
          this.getActivities(this.defaultCycle);
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong..")
        })
      }, () => {
        event.target.checked = !event.target.checked;
      }).setHeader("Confirmation");
  }

  get(e) {
    var promise = new Promise((resolve: any, reject: any) => { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
    return promise;
  }
  shareCycle(){
    this.orgService.commonCycle = this.defaultCycle.cycleId;
  }

  getAllCycles() {
    this.orgService.getAllCycle().subscribe((response: any) => {
      this.cycles = response;
    }, (error: any) => {
    });
  }

  ngOnDestroy(){
    this.loaderService.display(false);
  }
}