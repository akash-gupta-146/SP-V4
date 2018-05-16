import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { StorageService } from './storage.service';
import { CustomHttpService } from './default.header.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {of} from 'rxjs/observable/of';

@Injectable()
export class UniversityService {

  activeCycles: any[]=[];
  commonCycle:number;
  private baseUrl: string = "";
  private allCycles:any[]=[];
  private child = new RequestOptions({
    headers: new Headers({
      'child': true
    })
  });

  private parent = new RequestOptions({
    headers: new Headers({
      'parent': true
    })
  });

  private both = new RequestOptions({
    headers: new Headers({
      'parent': true,
      'child': true
    })
  });

  constructor(public http: CustomHttpService,
    public htttp: Http,
    public con: StorageService) {
    this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
  }

  public saveInitialSetup(data: any) {
    return this.http.post(this.baseUrl + "/initialSetup", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveCycle(cycle: any) {
    return this.http.post(this.baseUrl + "/cycle", cycle)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateCycle(cycleId: any, data: any) {
    return this.http.put(this.baseUrl + "/cycle/" + cycleId, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public disableCycle(cycleId: any) {
    return this.http.put(this.baseUrl + "/cycle/" + cycleId + "/disable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public enableCycle(cycleId: any) {
    return this.http.put(this.baseUrl + "/cycle/" + cycleId + "/enable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public defaultCycle(cycleId: any) {
    return this.http.put(this.baseUrl + "/cycle/" + cycleId + "/default", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addValue(val: any[]) {

    return this.http.post(this.baseUrl + "/values", val)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateValue(val: any, id: any) {

    return this.http.put(this.baseUrl + "/values/" + id, val)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteValue(id: any) {

    return this.http.delete(this.baseUrl + "/values/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getUniversities() {

    return this.http.get(this.baseUrl + "/university")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchOrganizationInfo() {

    return this.http.get(this.baseUrl + "/university")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAllCycle() {
    this.allCycles = [];
    this.activeCycles = [];
    return this.http.get(this.baseUrl + "/cycles?hideDisable=false",this.child)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCycles() {
    return this.http.get(this.baseUrl + "/cycles")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCycleWithChildren(disable: any) {
    if(!disable&&this.allCycles.length)
      return of(this.allCycles);
    else if(disable&&this.activeCycles.length)
      return of(this.activeCycles);

    return this.http.get(this.baseUrl + "/cycles?hideDisable=" + disable, this.child)
      .map((response:any)=>{
        if(!disable)
          this.allCycles = response.json();
        else
          this.activeCycles = response.json();
        return this.extractData(response);
      })
      // .map(this.extractData)
      .catch(this.handleError);
  }
  

  public deleteCycle(cycleId: any) {
    return this.http.delete(this.baseUrl + "/cycle/" + cycleId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchObjectives(cycleId: any) {

    return this.http.get(this.baseUrl + "/cycle/" + cycleId + "/objective")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getObjectives() {
    return this.http.get(this.baseUrl + "/goals", this.child)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getObjectivesByCycleId(cycleId: any) {
    return this.http.get(this.baseUrl + "/goals?cycleId=" + cycleId + "&hideDisable=false", this.child)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getObjectivesWithHierarchy() {
    return this.http.get(this.baseUrl + "/objectives/all")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getInitiatives() {
    return this.http.get(this.baseUrl + "/initiatives", this.parent)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getInitiativesByCycleId(cycleId: any) {
    return this.http.get(this.baseUrl + "/initiatives?cycleId=" + cycleId + "&hideDisable=false", this.both)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getActivities() {
    return this.http.get(this.baseUrl + "/activities", this.parent)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getActivitiesByCycleId(cycleId: any) {
    return this.http.get(this.baseUrl + "/activities?cycleId=" + cycleId + "&hideDisable=false", this.both)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMeasures() {
    return this.http.get(this.baseUrl + "/opis", this.parent)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMeasuresByCycleId(cycleId: any) {
    return this.http.get(this.baseUrl + "/opis?cycleId=" + cycleId + "&hideDisable=false", this.both)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addObjective(objective: any) {

    return this.http.post(this.baseUrl + "/goal", objective)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteObjective(id: any) {
    return this.http.delete(this.baseUrl + "/goal/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateObjective(id: any, object: any) {
    return this.http.put(this.baseUrl + "/goal/" + id, object)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public disableGoal(goalId: any) {
    return this.http.put(this.baseUrl + "/goal/" + goalId + "/disable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public enableGoal(goalId: any) {
    return this.http.put(this.baseUrl + "/goal/" + goalId + "/enable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addInitiative(initiative: any) {

    return this.http.post(this.baseUrl + "/initiative", initiative)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteInitiative(id: any) {
    return this.http.delete(this.baseUrl + "/initiative/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateInitiative(id: any, object: any) {
    return this.http.put(this.baseUrl + "/initiative/" + id, object)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchInitiative(goalId: any) {
    return this.http.get(this.baseUrl + "/objective/" + goalId + "/initiative")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public disableInitiative(initiativeId: any) {
    return this.http.put(this.baseUrl + "/initiative/" + initiativeId + "/disable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public enableInitiative(initiativeId: any) {
    return this.http.put(this.baseUrl + "/initiative/" + initiativeId + "/enable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }


  public fetchActivities(initId: any) {
    return this.http.get(this.baseUrl + "/initiative/" + initId + "/activity")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteActivity(id: any) {
    return this.http.delete(this.baseUrl + "/activity/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateActivity(id: any, object: any) {
    return this.http.put(this.baseUrl + "/activity/" + id, object)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchAssignedActivity(departmentIds: any[]) {
    return this.http.get(this.baseUrl + "/department/" + departmentIds + "/result")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public disableActivity(activityId: any) {
    return this.http.put(this.baseUrl + "/activity/" + activityId + "/disable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public enableActivity(activityId: any) {
    return this.http.put(this.baseUrl + "/activity/" + activityId + "/enable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveQuarteResult(data: any, quarterId: any) {
    return this.http.post(this.baseUrl + "/result", data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateQuarteResult(data: any, resultId: any) {
    return this.http.put(this.baseUrl + "/result/" + resultId, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public disableKPI(opiId: any) {
    return this.http.put(this.baseUrl + "/opi/" + opiId + "/disable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public enableKPI(opiId: any) {
    return this.http.put(this.baseUrl + "/opi/" + opiId + "/enable", {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public lockResult(resultId: any) {
    return this.http.put(this.baseUrl + "/result/" + resultId, { status: "locked" })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveEvidence(data: any, resultId: any) {
    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });
    return this.htttp.post(this.baseUrl + "/result/" + resultId + "/evidance", data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveComment(resultId: any, comment: any) {
    return this.http.post(this.baseUrl + "/result/" + resultId + "/discussion", comment)
      .map(this.extractData)
      .catch(this.handleError);
  }


  public fetchDepartments() {
    return this.http.get(this.baseUrl + "/university/1/department")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public assignActivity(actId: any, departments: any) {
    return this.http.post(this.baseUrl + "/assign/activity/" + actId + "/departments", { 'departments': departments })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveActivity(activity: any) {
    return this.http.post(this.baseUrl + "/activity", activity)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getSpis() {
    return this.http.get(this.baseUrl + "/spis", this.parent)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveSpi(spi: any) {
    return this.http.post(this.baseUrl + "/spi", spi)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteSpi(spiId: any) {
    return this.http.delete(this.baseUrl + "/spi/" + spiId)
  }

  public saveMeasure(measure: any) {
    return this.http.post(this.baseUrl + "/opi", measure)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteMeasure(measureId: any) {
    return this.http.delete(this.baseUrl + "/opi/" + measureId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateMeasure(measureId: any, object: any) {
    return this.http.put(this.baseUrl + "/opi/" + measureId, object)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateMisionVision(object: any) {
    return this.http.put(this.baseUrl + "/university/" + this.con.getData('org_info').universityId, object)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getQuarter() {
    return this.http.get(this.baseUrl + "/quarters")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getFrequencies() {
    return this.http.get("https://spdemo.ind-cloud.everdata.com/spv4/frequencies")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getDepartments() {
    return this.http.get(this.baseUrl + "/department")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public assignMeasure(measureId: any, departments: any[]) {
    return this.http.post(this.baseUrl + "/assign/opi/" + measureId + "/departments", { 'departments': departments })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public assignOpi(opiId: any, departments: any) {
    return this.http.post(this.baseUrl + "/assign/opi/" + opiId + "/departments", departments)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getEvidenceForms() {
    return this.http.get(this.baseUrl + "/evidenceForms")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deleteAssignedDepartment(assignedId: any) {
    return this.http.delete(this.baseUrl + "/assign/opiDepartment/" + assignedId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateTarget(opiId: any, department: any) {
    return this.http.put(this.baseUrl + "/assign/opi/" + opiId + "/departments", department)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getOpiResultByYear(cycleId:any,year:any){
    return this.http.get(this.baseUrl +"/opis?cycleId="+cycleId+"&year="+year+"&hideDisable=false",this.both)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public getOpiResultByDepartment(cycleId:any,departmentId,year:any){
    return this.http.get(this.baseUrl +"/opis?cycleId="+cycleId+"&year="+year+"&hideDisable=false&departmentId="+departmentId,this.both)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getAssignedDepartmentWithData(opiId:any){
    return this.http.get(this.baseUrl + "/opi/"+opiId+"/departments?currentYear=false&currentQuarter=false")
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "Something went wrong!"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}