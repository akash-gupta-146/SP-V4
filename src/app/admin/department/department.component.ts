import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "../admin.service";
import { StorageService } from "../../shared/storage.service";
import * as alertify from 'alertifyjs';
declare let $: any;

@Component({
  selector: 'department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DeparmtmentComponent {
  hierarchy: any[];
  university: any;
  departments: any[] = [];
  newDepartment: FormGroup;
  constructor(public formBuilder: FormBuilder,
    public adminService: AdminService,
    public cs: StorageService) {

  }

  ngOnInit() {
    this.adminService.getDepartments(false).subscribe(response => {
      this.departments = response;
    }, err => {
      this.departments = [];
    });
    this.adminService.getDepartments(true).subscribe(response => {
      this.hierarchy = response;
    }, err => {
      this.hierarchy = [];
    });
    this.adminService.getUniversity().subscribe(response => {
      if (!response.length) {
        this.university = [];
        alertify.alert("There is not university Entry yet.\nFirst Feed the entries of University").setHeader("Alert");
      } else {
        this.university = response;
      }
    }, err => {
      this.university = [];
      
    });

    this.newDepartment = this.formBuilder.group({
      "department": ['', [Validators.required]],
      "parentDepartmentId": [-1, [Validators.required]]
    });
  }

  onSubmit() {
    this.newDepartment.value['universityId'] = this.university.universityId;
    if (this.newDepartment.value['parentDepartmentId'] == -1) {
      delete this.newDepartment.value['parentDepartmentId'];
    }
    this.adminService.addDepartment(this.newDepartment.value).subscribe(res => {
      this.departments.push(res);
      $('#deptModal').modal('show');
      this.newDepartment.reset();
      
    }, err => {
      
    })
  }
}