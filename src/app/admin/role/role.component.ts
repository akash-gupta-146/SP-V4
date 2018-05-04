import {Component} from '@angular/core';
import { AdminService } from '../admin.service';
import { LoaderService } from '../../shared/loader.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as alertify from 'alertifyjs';
@Component({
 selector:'role',
 templateUrl:'./role.component.html',
 styleUrls: ['./../department/department.component.css']
})
export class RoleComponent{
 addRole: FormGroup;
 roles: any[]=[];
 constructor(public formBuilder: FormBuilder,
             private adminService:AdminService,
             private loaderService:LoaderService){

 }

 ngOnInit(){
  this.loaderService.display(true);
  this.adminService.getRoles().subscribe((response:any)=>{
   this.roles = response;
   this.loaderService.display(false);
  });

  this.addRole = this.formBuilder.group({
   "role": ['', [Validators.required]]
 });
 }

 onSubmit(){
  this.adminService.addRole(this.addRole.value).subscribe(res =>{
    alertify.success("Role Added");
    this.addRole.reset();
  }, err =>{
    alertify.error("Something went wrong");
  })
}
}