import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../shared/loader.service';
@Component({
 selector: 'employee',
 templateUrl: 'employee.component.html',
 styleUrls: ['./../department/department.component.css']
})
export class EmployeeComponent {
 employees: any[]=[];
 newEmployee: FormGroup;
 departments: any[] = [];
 roles: any[] = [];
 constructor(public formBuilder: FormBuilder,
             public adminService: AdminService,
             public loaderService:LoaderService) {

 }

 ngOnInit(){
  this.loaderService.display(true);
  this.adminService.getEmployee().subscribe((response:any)=>{
   this.employees = response;
   this.loaderService.display(false);
  })

  this.adminService.getDepartments(false).subscribe(response => {
   this.departments = response;
  }, err => {
   this.departments = [];
  });
  this.adminService.getRoles().subscribe(response => {
   if (!response.length) {
    this.roles = [];
    alertify.alert("There is not any Roles Entry yet.\nFirst Feed the entries of Roles").setHeader("Alert");
   } else {
    this.roles = response;
   }
  }, err => {
   this.roles = [];   
  });
  this.newEmployee = this.initForm();
 }
 initForm() {
  return this.formBuilder.group({
   "firstName": ['', [Validators.required]],
   "middleName": ['', []],
   "lastName": ['', [Validators.required]],
   "gender": ['', [Validators.required]],
   "email": ['', [Validators.required]],
   "password": ['', [Validators.required]],
   "contactNo": ['', [Validators.required]],
   "joiningDate": ['', [Validators.required]],
   "employeeRoles": this.formBuilder.array([this.initRoleDepartment()])
  });
 }
 initRoleDepartment() {
  return this.formBuilder.group({
   "roleId": ['', [Validators.required]],
   "departmentId": ['', [Validators.required]],
  });
 }
 onSubmit() {
  this.adminService.addEmployee(this.newEmployee.value).subscribe(response => {
   alertify.success("Employee Added");
   this.employees.push(response);
   this.newEmployee.reset();
  }, error => {
   alertify.error("Somthing went wrong"+error);
  });
 }
}