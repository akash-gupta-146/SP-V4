import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class StorageService {
  // private url:string = "http://localhost:8080/strategyPlanningV3";
  // public baseUrl: string = "https://strategic-plannning.cloud.cms500.com/apiv2/";
  // public baseUrl: string = "http://localhost:8080/spv4/";
  // public baseUrl: string = "https://testing.ind-cloud.everdata.com/spv4/";
  public breadcrumb: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public cycle : BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
  public baseUrl: string = environment.api;
  public hasRole: boolean;
  constructor() {
  }

  public storeData(field_name: any, data: any) {
    if (field_name === "access_token")
      localStorage.setItem(field_name, data);
    else {
      localStorage.setItem(field_name, JSON.stringify(data));
    }
  }

  public getData(field_name: any) {
    let data = JSON.parse(localStorage.getItem(field_name));
    if (data) {
      return data;
    }
  }
}