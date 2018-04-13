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
  selectedCycle: any;
  isUpdating: boolean;
  title: string = "Strategic Plan";
  cycleForm: FormGroup;
  cycles: any[] = [];
  status: any[] = [];
  constructor(public ss: StorageService, public orgService: UniversityService, private loaderService: LoaderService) {
    
  }

  ngOnInit(){
    this.loaderService.display(true);
    this.cycleForm = this.initForm();
    this.getCycles();
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
    this.orgService.getAllCycle().subscribe((response: any) => {
      if (response.status == 204) {
        this.cycles = [];
      } else {
        this.cycles = response;
      }
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
    if (!this.isUpdating)
      this.orgService.saveCycle(this.cycleForm.value).subscribe((response: any) => {
        alertify.success('You added New Strategic plan.');
        $("#add-plan").hide();
        $('#add-btn').show();
        this.isUpdating = false;
        this.getCycles();
        this.cycleForm = this.initForm();
      });
    else {
      var data = {};
      data['description'] = this.cycleForm.value["description"];
      data['endYear'] = this.cycleForm.value["endYear"];
      this.orgService.updateCycle(this.selectedCycle.cycleId, data).subscribe((response: any) => {
        alertify.success('You updated Strategic plan.');
        $("#add-plan").hide();
        $('#add-btn').show();
        this.isUpdating = false;
        this.getCycles();
        this.cycleForm = this.initForm();
      })
    }
  }

  changeStatus(event: any, c: any) {
    if(c.defaultCycle){
      alertify.alert("Default plan cannot be deactivated");
      event.target.checked = !event.target.checked;
    }else
    alertify.confirm("Are you sure you want to do this?", () => {
      if (!event.target.checked)
        this.orgService.disableCycle(c.cycleId).subscribe((response: any) => {
          alertify.success('Cycle deactivated.');
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

  deleteCycle(cycleId: any) {
    
    alertify.confirm("Are you sure you want to Delete this plan ?", () => {
      this.orgService.deleteCycle(cycleId).subscribe((response: any) => {
        this.getCycles();
      }, (error: any) => {
        alertify.alert("You Can not Delete this plan ?");
      })
    }).setHeader('Delete plan')
  }

  defaultCycle(event: any, cycleId: any) {
    if (!event.target.checked) {
      alertify.alert("Atleast one plan should be selected as default").setHeader("Alert Message")
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
    console.log(event);
  }

  reset() {
    
    $("#add-plan").hide();
    this.isUpdating = false;
    this.cycleForm.reset();
    $('#add-btn').show();
  }
}