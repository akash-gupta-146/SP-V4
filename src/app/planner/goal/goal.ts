import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UniversityService } from "../../shared/UTI.service";
import { FormBuilder, Validators, FormGroup, FormArray } from "@angular/forms";
import { StorageService } from "../../shared/storage.service";
import { Filters } from "../../shared/filters";
import * as _ from 'underscore'
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../shared/loader.service';
import { ActivatedRoute } from '@angular/router';

declare let $: any;

@Component({
  selector: 'strategic-goal',
  templateUrl: './goal.html',
  styleUrls: ['./goal.css', './../planner.component.css']
})
export class GoalComponent extends Filters implements AfterViewInit, OnInit{
  saving: boolean;
  noData: boolean;
  newGoal: boolean;
  public goalForm: FormGroup;
  public isUpdating: boolean = false;
  public cycles: any[] = [];
  emptySearchResult: any;
  check: any[] = [];

  constructor(public orgService: UniversityService,
    public formBuilder: FormBuilder,
    public commonService: StorageService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,) {
    super();
    this.loaderService.display(true);    
  }

  ngOnInit(){
    this.commonService.breadcrumb.next(true);
    this.getCycles(false);
    this.goalForm = this.initObjectiveForm();
  }


  ngAfterViewInit() {

  }

  getCycles(disable: boolean) {
    this.loaderService.display(true);

    this.orgService.getCycleWithChildren(disable).subscribe((response: any) => {
      this.cycles = response;
      const id = +this.route.snapshot.paramMap.get('cycleId');
      if (id) {
        this.cycles.forEach(element => {
          if (element.cycleId === id) {
            this.defaultCycle = element;
            this.getGoals(this.defaultCycle);
          }
        });
      } else {
        if (this.orgService.commonCycle) {
          this.defaultCycle = this.cycles.find((element: any) => {
            return this.orgService.commonCycle == element.cycleId;
          })
        } else {
          this.defaultCycle = this.cycles.find((element: any) => {
            return element.defaultCycle;
          });
        }
        this.getGoals(this.defaultCycle);
      }
    });
  }

  defaultCycle: any = {};
  getGoals(defaultCycle) {
    this.orgService.commonCycle = this.defaultCycle.cycleId;
    this.orgService.getCycleByCycleId(this.defaultCycle.cycleId).subscribe((response: any) => {
      this.noData = (response.goals.length)?false:true;
      this.loaderService.display(false);      
        this.goals = response.goals;
        this.goalsCopy = JSON.parse(JSON.stringify(response.goals));
    }, (error: any) => {
      this.loaderService.display(false);
    });
  }

  initObjectiveForm() {
    return this.formBuilder.group({
      "cycleId": [this.defaultCycle.cycleId, [Validators.required]],
      "goal": ['', [Validators.required]],
      // "totalCost": ['', [Validators.required]],
      // "spis": this.formBuilder.array([this.inItSpi()]),
    });
  }

  onSubmit() {
    if (!this.isUpdating) {
      this.saving = true;
      this.orgService.addObjective(this.goalForm.value).subscribe((response: any) => {
        this.saving = false;        
        alertify.success('You have successfully added a new Goal.', 'success', 5, function () {  });
        $("#add-plan").hide();
        $('#add-btn').show();
        this.goalForm.controls["goal"].reset();
        this.goals.push(response);
        this.getGoals(this.defaultCycle);
        //this.getAllCycles();
      }, (error: any) => {
        alertify.error("Something went wrong..");
      });
    }

    if (this.isUpdating) {
      alertify.confirm("Are you sure you want to update current Goal ?", () => {
        this.saving = true;
        this.orgService.updateObjective(this.selectedObjective.goalId, this.goalForm.value).subscribe((res: any) => {
          this.saving = false;
          alertify.success('Goal Successfully Updated.', 'success', 5, function () { });
          this.goalForm.value['goalId'] = this.selectedObjective.goalId;
          this.goalForm.value['disable'] = false;
          _.extend(this.selectedObjective,this.goalForm.value);
          this.getGoals(this.defaultCycle);
          //this.getAllCycles();          
          this.isUpdating = false;
          $("#add-plan").hide();
          $('#add-btn').show();
          this.goalForm = this.initObjectiveForm();
        }, (error: any) => {
          alertify.error("Something went wrong..");
        });
      }).setHeader("Confirmation");
    }

  }
  deleteGoal(goal: any, goals: any[], index: any) {
    alertify.confirm("Are you sure you want to delete this Goal?", () => {
      if(!goal.initiatives.length)
        this.orgService.deleteObjective(goal.goalId).subscribe((res: any) => {
          goals.splice(index, 1);
          alertify.success("Goal Successfully deleted");
        }, (error: any) => {
          alertify.error("Something went wrong..");
        });
      else{
        alertify.alert("You can not delete this goal because it has initiatives").setHeader("Alert");
      }

    }).setHeader("Confirmation");

  }
  selectedObjective: any;
  updateGoal(goal: any, highlight: any) {
    $('#add-btn').hide();
    $(".to-be-highlighted").removeClass("highlight");
    $(highlight).addClass("highlight");
    this.selectedObjective = goal;
    this.isUpdating = true;
    this.goalForm.patchValue({ goal: goal.goal, cycleId: this.defaultCycle.cycleId });
    $("#add-plan").show();
    $("#collapse1").collapse('show');
  }

  addNewGoal() {
    this.newGoal = true;
    $("#add-plan").show();
    $('#add-btn').hide();
    this.isUpdating = false;
    $("#collapse1").collapse('show');
    this.goalForm = this.initObjectiveForm()

  }

  disable(event: any, goalId: any) {
    if (!event.target.checked)
      alertify.confirm("Are you sure you want to deactivate selected goal ?", () => {
        this.orgService.disableGoal(goalId).subscribe((response: any) => {
          alertify.success("You disabled the Goal..");
          this.getGoals(this.defaultCycle);
        }, () => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong!")
        })
      }, () => {
        event.target.checked = !event.target.checked;
      }).setHeader("Confirmation");
  }

  closeForm() {
    this.newGoal = false;
    $(".to-be-highlighted").removeClass("highlight");
    $("#add-plan").hide();
    $('#add-btn').show();
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
