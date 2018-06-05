import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredentialService } from './login.service';
// import { CommonService } from '../../providers/common.service';
import { StorageService } from "../shared/storage.service";
import { LoaderService } from '../shared/loader.service';
// import { OrganizationService2 } from '../../providers/organization.service2';
declare let $:any;

@Component({
  selector:'login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;
  role:string;
  loginStart: boolean = false;
  error:boolean = false;
  constructor(public formBuilder: FormBuilder,
              public router:Router,
              private commonService: StorageService,
              private credentialService: CredentialService){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    if (localStorage.getItem('user_roleInfo')) {
      this.router.navigateByUrl("/"+this.commonService.getData('user_roleInfo')[0].role);
    }
    this.fetchOrganizationInfo({});
  }
  ngAfterViewChecked() {
    $("#login-button").click(function(event:any) {
      event.preventDefault();
      $('form').fadeOut(500);
      $('.wrapper').addClass('form-success');
    });
  }
  public onSubmit() {
    this.loginStart = true;
    this.credentialService.verifyUser(this.loginForm.value).subscribe((res) => {
      this.commonService.storeData("access_token", res.access_token);
      this.commonService.storeData("role", res.userDetails.roleInfo[0].role);
      this.commonService.storeData("userDetails",res.userDetails)
      this.commonService.storeData("user_roleInfo", res.userDetails.roleInfo);   
      this.role = res.userDetails.roleInfo[0].role;
      // if(this.role == "planner"||this.role == "admin"){
      //   this.fetchOrganizationInfo(res);
      // } else {
      //   this.onSuccess();
      // }  
      this.onSuccess();      
    }, (err) => {
      this.onError();
    });
  }
  
  public fetchOrganizationInfo(user_info:any) {
    this.credentialService.fetchOrganizationInfo().subscribe((res:any) => {
      this.commonService.storeData("org_info", res);     
      // this.onSuccess();    
    }, (err:any) => {
      // this.onError();
    });
  }

  public onSuccess() {
    this.router.navigateByUrl("/"+this.role);
    this.loginStart = false;
  }  

  public onError() {
    this.error = true;
    this.loginStart = false;
  }
}