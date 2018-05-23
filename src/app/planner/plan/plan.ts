import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StorageService } from "../../shared/storage.service";
import { UniversityService } from "../../shared/UTI.service";
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../shared/loader.service';

declare let $: any;

@Component({
  selector: 'strategic-plan',
  templateUrl: './plan.html',
  styleUrls: ['./../planner.component.css']
})
export class PlanComponent implements OnInit {
  saving: boolean;
  selectedCycle: any;
  isUpdating: boolean;
  title: string = "Strategic Plan";
  cycleForm: FormGroup;
  cycles: any[] = [];
  status: any[] = [];
  constructor(public ss: StorageService, public orgService: UniversityService, private loaderService: LoaderService) {
    
  }

  ngOnInit(){
    this.ss.breadcrumb.next(true);
    this.loaderService.display(true);
    this.cycleForm = this.initForm();
    this.getCycles();
  }

  shareCycle(cycle){
    this.orgService.commonCycle = cycle.cycleId;
  }

  initForm() {
    return new FormGroup({
      "universityId": new FormControl(this.ss.getData('org_info').universityId),
      "title":new FormControl('',[Validators.required]),
      "description": new FormControl('', [Validators.required]),
      "planYear": new FormControl(new Date().getFullYear(), [Validators.required]),
      "startYear": new FormControl('', [Validators.required]),
      "endYear": new FormControl('', [Validators.required])
    });
  }

  addNewPlan() {
    this.cycleForm = this.initForm();
    $("#add-plan").show();
    $('#add-btn').hide();
    $("#collapse1").collapse('show');
  }
  getCycles() {
    this.loaderService.display(true);
    this.orgService.getAllCycle().subscribe((response: any) => {
      this.cycles = response;
      this.loaderService.display(false);
    }, (error: any) => {
      this.loaderService.display(false);
    });
  }

  editCycle(c: any) {
    $("#add-plan").show();
    $('#add-btn').hide();
    $("#collapse1").collapse('show');
    this.isUpdating = true;
    this.selectedCycle = c;
    this.cycleForm.patchValue(c);
  }

  onSubmit() {
    if (!this.isUpdating){
      this.saving = true;
      this.orgService.saveCycle(this.cycleForm.value).subscribe((response: any) => {
        this.saving = false;
        alertify.success('You added New Strategic plan.');
        $("#add-plan").hide();
        $('#add-btn').show();
        this.isUpdating = false;
        // this.getCycles();
        this.cycles.push(response);
        this.orgService.getAllCycle().subscribe((response: any) => {
          this.cycles = response;
          this.loaderService.display(false);
        }, (error: any) => {
          this.loaderService.display(false);
        });
        this.cycleForm = this.initForm();
      });
    }else {
      var data = {};
      data['description'] = this.cycleForm.value["description"];
      data['title'] = this.cycleForm.value["title"];
      data['endYear'] = this.cycleForm.value["endYear"];
      alertify.confirm("Please Confirm that you want to update this plan ?",()=>{
        this.saving = true;
        this.orgService.updateCycle(this.selectedCycle.cycleId, data).subscribe((response: any) => {
          this.saving = false;
          alertify.success('Strategic plan Updated.');
          $("#add-plan").hide();
          $('#add-btn').show();
          this.isUpdating = false;
          this.orgService.getAllCycle().subscribe((response: any) => {
            this.cycles = response;
            this.loaderService.display(false);
          }, (error: any) => {
            this.loaderService.display(false);
          });
          this.cycleForm = this.initForm();
        });
      }).setHeader("Confirmation").setting({
        'closableByDimmer': false,
        'movable': false,
        'labels': { ok: 'Confirm', cancel: 'Cancel' },
        })
        .set({transition:'fade'})
        .show();;
    }
  }

  changeStatus(event: any, c: any) {
    if(c.defaultCycle){
      alertify.alert("Default plan cannot be deactivated").setHeader("Alert");
      event.target.checked = !event.target.checked;
    }else
    alertify.confirm("Are you sure you want to do this?", () => {
      if (!event.target.checked)
        this.orgService.disableCycle(c.cycleId).subscribe((response: any) => {
          alertify.success('Plan deactivated.');
          this.getCycles();
        }, (error: any) => {
          alertify.error("Something went wrong");
        });
      else
        this.orgService.enableCycle(c.cycleId).subscribe((response: any) => {
          alertify.success('Plan activated.');
          this.getCycles();
        }, (error: any) => {
          alertify.error("Something went wrong");
        });
    }, () => {
      event.target.checked = !event.target.checked;
    }).setHeader('Confirmation');
  }

  deleteCycle(cycle: any) {   
    alertify.confirm("Are you sure you want to delete selected plan ?", () => {
      // if(!cycle.goals.length){
        this.orgService.deleteCycle(cycle.cycleId).subscribe((response: any) => {
          this.getCycles();
          alertify.success("Plan Deleted");
        }, (error: any) => {
          if(error.status === 401)
            alertify.error((error.json()).message);
          else
            alertify.error("Something went wrong..");
        });
      // }else{
      //   alertify.alert("This plan cannot be deleted as it has data in initiative and activities. It can only be deleted if all data is deleted first. You may choose to disable it instead.").setHeader("Alert");
      // }
    }).setHeader('Delete plan')
  }

  defaultCycle(event: any, cycleId: any) {
    if (!event.target.checked) {
      alertify.alert("Atleast one plan should be selected as default").setHeader("Alert")
      event.target.checked = !event.target.checked;
    } else {
      alertify.confirm("Are you sure you want to make current plan as default plan ?", () => {
        this.orgService.defaultCycle(cycleId).subscribe((response: any) => {
          this.getCycles();
          alertify.success("Cycle has been marked as default")
        }, (error: any) => {
          event.target.checked = !event.target.checked;
          alertify.error("Something went wrong!")
        })
      }, () => {
        event.target.checked = !event.target.checked;
      }).setHeader("Confirmation");
    }
  }

  click(event: any) {
  }

  reset() {
    $("#add-plan").hide();
    this.isUpdating = false;
    this.cycleForm.reset();
    $('#add-btn').show();
  }

  ngOnDestroy(){
    this.loaderService.display(false);
  }
}