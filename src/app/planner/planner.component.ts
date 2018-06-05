import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { UniversityService } from "../shared/UTI.service";
import { Router } from "@angular/router";
import { LoaderService } from '../shared/loader.service';
import * as alertify from 'alertifyjs';
declare let $: any;

@Component({
	selector: 'app-planner',
	templateUrl: './planner.component.html',
	styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
	userDetails: any;
	breadcrumb: boolean = false;
	initialInfo: boolean = false;
	constructor(public storageService: StorageService,
		public utiService: UniversityService,
		public router: Router,
		private loaderService: LoaderService) {
		this.loaderService.display(false);
		this.userDetails = this.storageService.getData('userDetails');
		$(document).ready(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
	}

	ngOnInit() {
		this.storageService.breadcrumb.next(true);
		this.storageService.breadcrumb.asObservable().subscribe((val: boolean) => {
			this.breadcrumb = val;
		});
	}

	logout() {
		this.loaderService.display(true);
		this.utiService.logout().subscribe((response: any) => {
			localStorage.clear();
			this.loaderService.display(false);
			this.router.navigate(['login']);
			alertify.success(response);
		});
	}

}	
