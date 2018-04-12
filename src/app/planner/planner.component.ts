import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { UniversityService } from "../shared/UTI.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LoaderService } from '../shared/loader.service';

declare let $: any;

@Component({
	selector: 'app-planner',
	templateUrl: './planner.component.html',
	styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit{
	userDetails: any;
	breadcrumb:boolean = false;
	constructor(public stogareService: StorageService,
		public utiService: UniversityService,
		public router: Router) {
		this.userDetails = this.stogareService.getData('userDetails');
		$(document).ready(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
	}

	ngOnInit(){
		this.stogareService.breadcrumb.asObservable().subscribe((val: boolean) => {
			this.breadcrumb = val;
	});
	}

	logout() {
		localStorage.clear();
	}

}	
