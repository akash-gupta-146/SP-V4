import { Component } from '@angular/core';
import { Filters } from '../shared/filters';
import { StorageService } from '../shared/storage.service';
import { HodService } from './hod.service';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';
import { LoaderService } from '../shared/loader.service';

declare let $: any;

@Component({
  selector: 'hod',
  templateUrl: 'hod.component.html',
  styleUrls: ['hod.component.scss']
})
export class HodComponent{
  role: any;
  userDetails: any = {};

  constructor(private storage: StorageService,private router:Router,private hs:HodService,private loaderService:LoaderService) {
    this.role = this.storage.getData('user_roleInfo')[0].role; 
    this.userDetails = storage.getData('userDetails');
  }

  ngOnInit(){
  }

  logout(){
    this.loaderService.display(true);
    this.hs.logout().subscribe((response:any)=>{
      localStorage.clear();
      this.loaderService.display(false);
				alertify.success(response);      
      this.router.navigate(['/login']);
    });
  }
}