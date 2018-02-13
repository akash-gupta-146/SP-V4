import { Component } from '@angular/core';
import { Filters } from '../shared/filters';
import { StorageService } from '../shared/storage.service';
import { HodService } from './hod.service';
import * as alertify from 'alertifyjs';

declare let $: any;

@Component({
  selector: 'hod',
  templateUrl: 'hod.component.html',
  styleUrls: ['hod.component.css']
})
export class HodComponent{
  userDetails: any = {};

  selectedLevel:any;
  selectedOpi:any;
  roles: any[] = ["coordinator", "hod", "dvc", "vc", "chanceller"];

  constructor(private storage: StorageService) {
    this.userDetails = storage.getData('userDetails');
  }

  logout(){
    localStorage.clear();
  }
}