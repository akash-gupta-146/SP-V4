import { Component } from '@angular/core';
import { Filters } from '../shared/filters';
import { StorageService } from '../shared/storage.service';
import { HodService } from './hod.service';
import * as alertify from 'alertifyjs';

declare let $: any;

@Component({
  selector: 'hod',
  templateUrl: 'hod.component.html',
  styleUrls: ['hod.component.scss']
})
export class HodComponent{
  userDetails: any = {};

  constructor(private storage: StorageService) {
    this.userDetails = storage.getData('userDetails');
  }

  logout(){
    localStorage.clear();
  }
}