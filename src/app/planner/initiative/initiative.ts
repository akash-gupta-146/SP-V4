import { Component, OnInit } from '@angular/core';
import { UniversityService } from "../../shared/UTI.service";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { StorageService } from "../../shared/storage.service";
import { Filters } from "../../shared/filters";
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../shared/loader.service';
import { ActivatedRoute } from '@angular/router';


declare let $: any;

@Component({
  selector: 'initiatives',
  templateUrl: './initiative.html',
  styleUrls: ['./initiative.css', './../planner.component.css']
})
export class InitiativeComponent extends Filters implements OnInit{
  saving: boolean;
  noData: boolean;
  newInitiative: boolean;
  allCycle: any[];
  activeCycle: any[];
  goalId: number;
  public cycles: any[] = [];
  public objectives: any[] = [];
  public initiativeForm: FormGroup;
  public isUpdating: boolean = false;
  public quarter: any[] = ["Q1", "Q2", "Q3", "Q4"];
  constructor(public orgService: UniversityService,
    public formBuilder: FormBuilder,
    public commonService: StorageService,
    private loaderService: LoaderService,
    private route:ActivatedRoute) {
    super();   
    this.loaderService.display(true);    
  }
  
  ngOnInit(){
    this.commonService.breadcrumb.next(true);
    this.getCycleWithChildren(false);
    this.initiativeForm = this.initForm();
  }
  
  getCycleWithChildren(flag: any) {
    this.loaderService.display(true);    
    this.orgService.getCycleWithChildren(flag).subscribe((response: any) => {
      this.cycles = response;
      const cycleId = +this.route.snapshot.paramMap.get('cycleId');
      if(cycleId){
        this.cycles.forEach(element => {
          if (element.cycleId === cycleId)
            this.defaultCycle = element;
        }); 
        this.getInitiative(this.defaultCycle);         
      }else{     
        if(this.orgService.commonCycle){
          this.defaultCycle = this.cycles.find((element:any)=>{
            return this.orgService.commonCycle == element.cycleId;
          })
        }else {
          this.defaultCycle = this.cycles.find((element:any)=>{
            return element.defaultCycle;
          });
        }   
        this.getInitiative(this.defaultCycle);
      }      
    });
  }

  getActiveCycles() {
    this.allCycle = JSON.parse(JSON.stringify(this.cycles));
    this.activeCycle = this.cycles.filter(cycle => {
      return !cycle.disable;
    })
  }

  getObjective(cycleId: any) {
    this.objectives = this.goals;
    console.log("adsf",this.objectives);
    // this.cycles.forEach(element => {
    //   if (element.cycleId == cycleId) {
    //     this.objectives = element.goals;
    //     return;
    //   }
    // });
  }

  defaultCycle: any = {};
  getInitiative(defaultCycle) {
    this.loaderService.display(true);        
    this.orgService.commonCycle = defaultCycle.cycleId;    
    this.objectives = [];
    this.goalId = +this.route.snapshot.paramMap.get('goalId');
    this.orgService.getCycleByCycleId(defaultCycle.cycleId).subscribe((response: any) => {
      if(this.goalId){
        this.goals = response.goals.filter((element:any)=>{
          return (element.goalId === this.goalId);
        });
      }
      else 
      this.goals = response.goals;
      this.noData = (response.goals.length)?false:true;
      this.goalsCopy = JSON.parse(JSON.stringify(this.goals));
      this.initFilters(this.goals);
      this.loaderService.display(false);
      this.getObjective(this.defaultCycle.cycleId);
    }, (error: any) => {
      this.loaderService.display(false);
    });
    // this.goals = this.defaultCycle.goals;
    if(this.goalId){
      this.goals = this.goals.filter((element:any)=>{
        return (element.goalId === this.goalId);
      });
    }

    this.goalsCopy = this.goals;
    this.initFilters(this.goals);
    this.getActiveCycles();
  }

  initForm() {
    return this.formBuilder.group({
      "cycleId": [this.defaultCycle.cycleId, [Validators.required]],
      "goalId": [this.goalId, [Validators.required]],
      "initiative": ['', [Validators.required]]
    });
  }

  submitInitiative() {
    delete this.initiativeForm.value["cycleId"];
    if (!this.isUpdating){
      this.saving = true;
      this.orgService.addInitiative(this.initiativeForm.value).subscribe((res: any) => {
        this.saving = false;
        // this.getInitiative(this.defaultCycle);
        $("#add-initiative").hide();
        alertify.success("Initiative Successfully Added.");
        $('#add-btn').show();
        this.initiativeForm.controls["initiative"].reset();
        this.selectedGoal.initiatives.push(res);
        //this.getAllCycles();
      }, err => {
        
      });
    }else
      alertify.confirm("Are you sure you want to update selected Initiative?", () => {
        this.saving = true;
        this.orgService.updateInitiative(this.selectedInitiative.initiativeId, this.initiativeForm.value).subscribe((res: any) => {
          this.saving = false;
          $("#add-initiative").hide();
          $('#add-btn').show();
          this.getInitiative(this.defaultCycle);
          alertify.success(" Initiative Successfully Updated.");
          this.isUpdating = false;
          //this.getAllCycles();          
        })
      }).setHeader("Confirmation");
  }

  deleteInitiative(initiative: any, initiatives: any[], index: any) {
    alertify.confirm("Are you sure you want to delete this Initiative?", () => {
      if(initiative.activities && !initiative.activities.length)
        this.orgService.deleteInitiative(initiative.initiativeId).subscribe((res: any) => {
          initiatives.splice(index, 1);
          alertify.success("Initiative deleted");
          this.getInitiative(this.defaultCycle);
        }, (error: any) => {
          alertify.error("Something went wrong..");
        });
      else
        alertify.alert("You can not delete this initiative because it has activities.").setHeader("Alert");
    }).setHeader("Confirmation");
  }

  selectedInitiative: any;
  updateInitiative(goalId: any, initiative: any, highlight: any) {
    $('#add-btn').hide();
    $(".to-be-highlighted").removeClass("highlight");
    $(highlight).addClass("highlight");
    this.isUpdating = true;
    // this.initiativeForm.controls["cycleId"].disable();
    this.initiativeForm.controls["goalId"].disable();
    this.selectedInitiative = initiative;
    this.initiativeForm.patchValue({
      cycleId: this.defaultCycle.cycleId,
      goalId: goalId,
      initiative: initiative.initiative
    });
    $("#add-initiative").show();
    $("#collapse1").collapse('show');
  }

  enableFields() {
    $(".to-be-highlighted").removeClass("highlight");
    // this.initiativeForm.controls["cycleId"].enable();
    this.initiativeForm.controls["goalId"].enable();
    this.initiativeForm = this.initForm();
  }

  closeForm() {
    this.newInitiative = false;
    $("#add-initiative").hide();
    $('#add-btn').show();
    this.enableFields();
    this.isUpdating = false;
    // this.getCycleWithChildren(false);
    this.cycles = JSON.parse(JSON.stringify(this.activeCycle));
    this.setDefaultCycle();
  }

  addNewInitiative() {
    if(this.goalId){
      this.selectedGoal = this.goals.find(element=>{
        return element.goalId == this.goalId;
      });
    }
    this.newInitiative = true;
    $("#add-initiative").show();
    $('#add-btn').hide();
    this.isUpdating = false;
    $("#collapse1").collapse('show');
    // this.getCycleWithChildren(true);
    this.cycles = JSON.parse(JSON.stringify(this.activeCycle));
    this.setDefaultCycle();
    this.initiativeForm = this.initForm();
  }

  addInitiative(goal:any) {
    this.selectedGoal = goal;
    this.newInitiative = true;
    $("#add-initiative").show();
    $('#add-btn').hide();
    this.isUpdating = false;
    $("#collapse1").collapse('show');
    this.goalId = goal.goalId;
    this.initiativeForm = this.initForm();
  }



  setDefaultCycle() {
    this.cycles.forEach((cycle: any) => {
      if (cycle.cycleId == this.defaultCycle.cycleId)
          this.defaultCycle = cycle;
    });
  }

  disable(event: any, initiativeId: any) {
    if (!event.target.checked)
      alertify.confirm("Are you sure you want to deactivate selected initiative ?", () => {
        this.orgService.disableInitiative(initiativeId).subscribe((response: any) => {
          alertify.success("You disabled the Initiative..");
          this.getInitiative(this.defaultCycle);
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong..")
        })
      }, () => {
        event.target.checked = !event.target.checked;
      }).setHeader("Confirmation");
    else
      alertify.confirm("Are you sure you want to Active this Initiative ?", () => {
        this.orgService.enableInitiative(initiativeId).subscribe((response: any) => {
          alertify.success("You enabled the Initiative..");
          this.getInitiative(this.defaultCycle);
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

  getAllCycles() {
    this.orgService.getAllCycle().subscribe((response: any) => {
      this.cycles = response;
    }, (error: any) => {
    });
  }

  shareCycle(){
    this.orgService.commonCycle = this.defaultCycle.cycleId;
  }

  ngOnDestroy(){
    this.loaderService.display(false);
  }
}