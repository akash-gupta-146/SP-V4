import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { StorageService } from '../../shared/storage.service';
import { UniversityService } from '../../shared/UTI.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'initial-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class InitialSetup implements OnInit {
  orgnizationInfo: any;
  public setupForm: FormGroup;
  constructor(public fb: FormBuilder,
    public st: StorageService,
    public utiService: UniversityService,
    public router:Router,
    public location:Location,
    private route:ActivatedRoute) {
    this.setupForm = this.initForm();
  }
  
  ngOnInit() {
    this.fetchOrganizationInfo();
    this.st.initialSetup.next(true);
    this.st.breadcrumb.next(false);
  }

  initForm() {
    return this.fb.group({
      "mission": ['', [Validators.required]],
      "vision": ['', [Validators.required]],
      "universityId": ['', []],
      "values": this.fb.array([this.fb.group({
        "title": ['', [Validators.required]],
        "description": ['', [Validators.required]]
      })])
    });
  }

  public fetchOrganizationInfo() {
    this.utiService.fetchOrganizationInfo().subscribe((res: any) => {
      this.orgnizationInfo = res;
      this.st.storeData("org_info", res);      
    }, (err: any) => {

    });
  }

  onSubmit() {
    this.setupForm.controls["universityId"].patchValue(this.orgnizationInfo.universityId);
    this.utiService.saveInitialSetup(this.setupForm.value).subscribe((response: any) => {
      this.st.storeData("org_info", response);
      this.router.navigate(['planner/home']);
      alertify.success("Successfully Saved");
    },error=>{
      alertify.error("Something went wrong.");
    });
  }
  inItValue() {
    return this.fb.group({
      "title": ['', [Validators.required]],
      "description": ['', [Validators.required]]
    });
  }
  removeValue(index: any) {
    const control = <FormArray>this.setupForm.controls['values'];
    control.removeAt(index);
  }

  addValue() {
    const control = <FormArray>this.setupForm.controls['values'];
    control.push(this.inItValue());
  }
}