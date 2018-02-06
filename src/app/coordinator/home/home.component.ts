import { Component, AfterViewInit } from '@angular/core';
import { CoordinatorService } from "../coordinator.service";
import { StorageService } from "../../shared/storage.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Filters } from "../../shared/filters";
import { LoaderService } from '../../shared/loader.service';
import * as alertify from 'alertifyjs';
declare let $: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './../coordinator.component.css'],
  providers: [CoordinatorService]
})
export class HomeComponent extends Filters implements AfterViewInit {
  // goalsCopy: any[]=[];
  // goals: any[]=[];
  selectedOpi:any;
  selectedMeasure:any;
  roles: any[] = ["coordinator", "hod", "dvc", "vc", "chanceller"]
  constructor(private utServ: CoordinatorService,
    private storage: StorageService, private loaderService: LoaderService) {
    super();
    this.getOpi();
  }

  ngAfterViewInit() {

  }
  public getOpi() {
    this.loaderService.display(true);
    this.utServ.getOpiByDeptId(this.storage.getData('user_roleInfo')[0].departmentId).subscribe((response: any) => {
      if (response.status == 204) {
        this.goals = [];
        this.goalsCopy = []
      } else {
        this.goals = response;
        this.goalsCopy = response;

        this.initFilters(this.goalsCopy);
      }
      this.loaderService.display(false);
    }, (error: any) => {
      this.loaderService.display(false);
    })
  }

  public showOpi(goal: any, measure: any) {
    $("#first-section").show();
    $("#second-section").hide();
    $('#edit-section').collapse('show');
    console.log(goal);
  }

  get(e) {
    var promise = new Promise((resolve: any, reject: any) => { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
    return promise;
  }

  getRowSpan(row){
    return $('#'+row).nextAll().length + 1;
  }

}