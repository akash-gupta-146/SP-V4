import { Component, AfterViewInit } from '@angular/core';
import { HodService } from '../../hod.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage.service';
import { LoaderService } from '../../../shared/loader.service';
import { Location } from '@angular/common';
@Component({
  selector: 'by-frequency',
  templateUrl: 'by-frequency.html',
  styleUrls: ['./../../hod.component.scss']
})
export class ByFrequency implements AfterViewInit {
  goalsCopy: any[];
  goals: any[];
  quarters: any[];
  role: any;
  year: any;
  frequencies: any;
  selectedFrequency: any;
  selectedQuarter: any;
  cycle:any;
  constructor(public utServ: HodService,
    public router: Router,
    private storage: StorageService,
    public location: Location,
    private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.storage.cycle.asObservable().subscribe((element:any)=>{
      this.cycle = element;
    })
    this.utServ.goals.asObservable().subscribe((val: any[]) => {
      this.goals = val;
    });
    this.utServ.getFrequencies().subscribe((response: any) => {
      this.frequencies = response;
    });
  }

  ngAfterViewInit() {
    this.goalsCopy = this.goals;
  }

  goBack() {
    this.loaderService.display(true);
    this.utServ.getKpiByQuarter(this.selectedQuarter, this.year).subscribe((response: any) => {
      this.utServ.goals.next(response);
      this.loaderService.display(false);
    }, (error: any) => {
      this.loaderService.display(false);
    });
  }

  get(){
  }
}