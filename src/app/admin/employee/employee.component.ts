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

  this.adminService.getDepartments().subscribe(response => {
   if (response.status === 204) {
    this.departments = [];
    alert("There is not Department Entry yet.\nFirst Feed the entries of Department");
   } else {
    this.departments = response;
   }
  }, err => {
   this.departments = [];
   console.log(err);
  });
  this.adminService.getRoles().subscribe(response => {
   if (response.status === 204) {
    this.roles = [];
    alert("There is not Roles Entry yet.\nFirst Feed the entries of Roles");
   } else {
    this.roles = response;
   }
  }, err => {
   this.roles = [];
   console.log(err);
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
  console.log(this.newEmployee.value);
  this.adminService.addEmployee(this.newEmployee.value).subscribe(response => {
   alertify.success("Employee Added");
   this.employees.push(response);
   this.newEmployee.reset();
  }, error => {
   alertify.error("Somthing went wrong"+error);
  });
 }
}