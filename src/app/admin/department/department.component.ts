import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from "../admin.service";
import { StorageService } from "../../shared/storage.service";

declare let $: any;

@Component({
  selector: 'department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DeparmtmentComponent {
  university: any;
  departments: any[] = [];
  newDepartment: FormGroup;
  constructor(public formBuilder: FormBuilder,
    public adminService: AdminService,
    public cs: StorageService) {

  }

  ngOnInit() {
    this.adminService.getDepartments().subscribe(response => {
      if (response.status === 204) {
        this.departments = [];
        // alert("There is not Departments Entry yet.\nYou are going to create Parent Department");
      } else {
        this.departments = response;
      }
    }, err => {
      this.departments = [];
    });
    this.adminService.getUniversity().subscribe(response => {
      if (response.status === 204) {
        this.university = [];
        alert("There is not university Entry yet.\nFirst Feed the entries of University");
      } else {
        this.university = response;
      }
    }, err => {
      this.university = [];
      console.log(err);
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
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
}