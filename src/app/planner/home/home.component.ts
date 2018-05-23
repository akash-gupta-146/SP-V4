import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StorageService } from "../../shared/storage.service";
import { UniversityService } from "../../shared/UTI.service";
import { LoaderService } from '../../shared/loader.service';
import * as alertify from 'alertifyjs';

declare let $: any;

@Component({
  selector: 'planner-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public valueForm: FormGroup;
  public missionVisionForm: FormGroup;
  public missionVision: string;
  public organizationInfo: any;
  public selectedValue: any;

  constructor(public commonService: StorageService, public orgSer: UniversityService) {
    this.commonService.breadcrumb.next(false);    
    this.valueForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
    });
    this.missionVisionForm = new FormGroup({
      description: new FormControl('', Validators.required)
    });
    this.fetchOrganizationInfo();
  }

  ngOnInit() {
    this.commonService.breadcrumb.next(false);
  }

  public fetchOrganizationInfo() {
    this.orgSer.fetchOrganizationInfo().subscribe((res: any) => {
      this.commonService.storeData("org_info", res);
      this.organizationInfo = res;
    }, (err: any) => {

    });
  }

  onValueSubmit() {
    if (this.selectedValue) {
      this.orgSer.updateValue(this.valueForm.value, this.selectedValue.valueId)
        .subscribe((res: any) => {
          alertify.success("Value Successfully Updated..");
          this.valueForm.value["valueId"] = this.selectedValue.valueId;
          this.organizationInfo.values[this.selectedValueIndex] = this.valueForm.value;
          this.commonService.storeData('org_info', this.organizationInfo);
          $('#valueForm').modal('hide');
          this.valueForm.reset();

        }, (error: any) => {
          alertify.error("Something went wrong..");
        })
    } else {
      this.valueForm.value["universityId"] = this.organizationInfo.universityId;
      this.orgSer.addValue([this.valueForm.value]).subscribe((res: any) => {
        alertify.success("Successfully Value Saved..");
        this.organizationInfo.values.push(this.valueForm.value);
        $('#valueForm').modal('hide');
        this.valueForm.reset();
      }, (error: any) => {
        alertify.error("Something went wrong..");
      })
    }
  }

  deleteValue(val: any, index: any) {
    alertify.confirm("Please confirm that you want to delete selected Value?",(response:any)=>{
      this.orgSer.deleteValue(val.valueId).subscribe((res: any) => {
        alertify.success("Value has been deleted");
        this.organizationInfo.values.splice(index, 1);
      },(error:any)=>{
        alertify.error("Something went wrong");
      });
    }).setHeader("Confirmation")
    .setting({
      'closableByDimmer': false,
      'movable': false,
      'labels': { ok: 'Confirm', cancel: 'Cancel' },
      })
      .set({transition:'fade'})
      .show();

      // let btn = $('.ajs-ok');
      // if(btn[0].innerHTML == 'Delete'){
      //   btn.addClass('btn-danger btn-sp');
      //   btn.removeClass('ajs-button ajs-ok');
      // }
  }

  selectedValueIndex: any;
  onValueSelected(val: any, index: any) {
    this.valueForm.controls["title"].patchValue(val.title);
    this.valueForm.controls["description"].patchValue(val.description);
    this.selectedValue = val;
    this.selectedValueIndex = index;
  }

  editMisionVision(title: any, mvDesc: any) {
    this.missionVision = title;
    this.missionVisionForm.controls["description"].patchValue(mvDesc);
  }

  onMissionVisionSubmit() {
    var org_info: any = this.commonService.getData('org_info');
    var object: any = {};
    object[this.missionVision] = this.missionVisionForm.value['description'];
    this.orgSer.updateMisionVision(object).subscribe(res => {
      this.organizationInfo[this.missionVision] = this.missionVisionForm.value['description'];
      org_info[this.missionVision] = this.missionVisionForm.value['description'];
      this.commonService.storeData('org_info', org_info);
      $('#missionVisionForm').modal('hide');
    })
  }
}