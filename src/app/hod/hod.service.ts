import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { CustomHttpService } from "../shared/default.header.service";
import { StorageService } from "../shared/storage.service";


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HodService{
 baseUrl: string;

 public goals: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

 private parent = new RequestOptions({
  headers: new Headers({
    'parent': true
  })
 });

 private goalMode = new RequestOptions({
   headers: new Headers({
     'goalMode':true
   })
 });

 constructor(public http: CustomHttpService,private htttp:Http,
  public con: StorageService){
   this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
 }

 public fetchOrganizationInfo() {

  return this.http.get(this.baseUrl + "/university")
    .map(this.extractData)
    .catch(this.handleError);
}

 getOpiResult(){
  return this.http.get(this.baseUrl + "/result")
    .map(this.extractData)
    .catch(this.handleError);
 }

 getOpiResultByGoalMode(){
  return this.http.get(this.baseUrl + "/result",this.goalMode)
  .map(this.extractData)
  .catch(this.handleError);
 }

 getAllOpiResult(){
  return this.http.get(this.baseUrl + "/result?currentYear=false&currentQuarter=false")
  .map(this.extractData)
  .catch(this.handleError);
 }

 getOpiResultByGoal(goalId:any){
  return this.http.get(this.baseUrl + "/result?goalId="+goalId +"&currentYear=false&currentQuarter=false")
    .map(this.extractData)
    .catch(this.handleError);
 }

 getOpiResultByGoals(){
  return this.http.get(this.baseUrl + "/opis")
    .map(this.extractData)
    .catch(this.handleError);
 }

 getOpiByDepartmentId(deptId:any[]){
  return this.http.get(this.baseUrl + "/result?departmentIds="+deptId)
    .map(this.extractData)
    .catch(this.handleError);
 }

 getKpiByQuarter(quarterId:any,year:any){
  return this.http.get(this.baseUrl + "/result?quarter="+quarterId+"&currentYear=false&currentQuarter=false&year="+year)
  .map(this.extractData)
  .catch(this.handleError);
 }

 approve(levelId,data){
  return this.http.put(this.baseUrl + "/quarter/"+levelId+"/approve",data)
  .map(this.extractData)
  .catch(this.handleError);
 }

 reject(levelId,data){
  return this.http.put(this.baseUrl + "/quarter/"+levelId+"/reject",data)
  .map(this.extractData)
  .catch(this.handleError);
 }

 getAnnualTargets(opiDepartmentId:any){
  return this.http.get(this.baseUrl + "/opiDepartment/"+opiDepartmentId+"/annualTargets?currentYear=false&currentQuarter=false").map(this.extractData)
  .catch(this.handleError);
}

getDepartmentByOpiId(opiId:any){
  return this.http.get(this.baseUrl + "/opi/"+opiId+"/departments",this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

public getDepartments() {
  return this.http.get(this.baseUrl + "/department")
    .map(this.extractData)
    .catch(this.handleError);
}

public getOpiResultByCycleId(cycleId:number){
  return this.http.get(this.baseUrl +"/result?cycleId="+cycleId,this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

public getAllOpiResultByCycleId(cycleId:number){
  return this.http.get(this.baseUrl +"/result?cycleId="+cycleId+"&currentYear=false&currentQuarter=false",this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

public getOpiResultByYear(cycleId:any,year:any){
  return this.http.get(this.baseUrl +"/result?cycleId="+cycleId+"&year="+year,this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

public getOpiAllResultByYear(cycleId:any,year:any){
  return this.http.get(this.baseUrl +"/result?cycleId="+cycleId+"&year="+year+"&currentQuarter=false",this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}


public getOpiResultByQuarter(cycleId:any,year:any,quarter:any){
  return this.http.get(this.baseUrl +"/result?cycleId="+cycleId+"&year="+year+"&quarter="+quarter,this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

public saveQuarterResult(data:any){
  return this.http.post(this.baseUrl + "/result",data)
  .map(this.extractData)
  .catch(this.handleError);
}

public saveQuarterWithInternship(url:string,quarterId:any,data:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/level/"+quarterId+url,data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

public UploadFormsFile(url:string,quarterId:any,data:any,replace:boolean){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/level/"+quarterId+url+"?replace="+replace,data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

public editInternshipRecord(recordId:number,data:any){
  return this.http.put(this.baseUrl + "/internship/record/"+recordId,data)
  .map(this.extractData)
  .catch(this.handleError);
}

public editStudentPublicationRecord(recordId:number,data:any){
  return this.http.put(this.baseUrl + "/student-publication/record/"+recordId,data)
  .map(this.extractData)
  .catch(this.handleError);
}

public editProfessionalDevelopmentActivitiesRecord(recordId:number,data:any){
  return this.http.put(this.baseUrl + "/professional-development-activity/record/"+recordId,data)
  .map(this.extractData)
  .catch(this.handleError);
}

updateQuarterResult(quarterId:any,data:any){
  return this.http.put(this.baseUrl + "/level/"+quarterId+ "/result" ,data)
  .map(this.extractData)
  .catch(this.handleError);
}

lockQuarterResult(quarterId:any,data:any){
  return this.http.put(this.baseUrl + "/level/"+quarterId+"/lock",{})
  .map(this.extractData)
  .catch(this.handleError);
}

saveEvidence(url:string,data:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + url +"/evidance",data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

saveEvidenceForInternshipFile(data:any,id:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/internship/"+id+"/evidance",data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

deleteInternshipFile(url:string,internshipFileId:any){
  return this.http.delete(this.baseUrl + url+ internshipFileId)
  .map(this.extractData)
  .catch(this.handleError)
}

deleteInternshipEvidence(url:string,evidenceId:any){
  return this.http.delete(this.baseUrl + url + "/evidance/"+evidenceId)
  .map(this.extractData)
  .catch(this.handleError)
}

saveEvidenceForMou(data:any,id:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/mous/"+id+"/evidance",data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

deleteMou(mouResultId:any){
  return this.http.delete(this.baseUrl + "/mous/" + mouResultId)
  .map(this.extractData)
  .catch(this.handleError);
}

deleteMouEvidence(evidenceId:any){
  return this.http.delete(this.baseUrl + "/mous/evidance/"+evidenceId)
  .map(this.extractData)
  .catch(this.handleError);
}

deleteEvidence(evidenceId:any){
  return this.http.delete(this.baseUrl + "/evidance/"+evidenceId)
  .map(this.extractData)
  .catch(this.handleError);
}

saveQuarterResultWithMou(quarterId:any,data:any){
  return this.http.post(this.baseUrl + "/level/"+quarterId+"/mous",data)
  .map(this.extractData)
  .catch(this.handleError);
}

updateQuarterResultCurrentCost(quarterId:any,data:any){
  return this.http.put(this.baseUrl + "/level/"+quarterId+"/result",data)
  .map(this.extractData)
  .catch(this.handleError);
}

updateMou(mouId:any,mou:any){
  return this.http.put(this.baseUrl + "/mous/"+ mouId,mou)
  .map(this.extractData)
  .catch(this.handleError);
}

getActionStep(url:string){
  return this.http.get(this.baseUrl + url,this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

getAllActionSteps(){
  return this.http.get(this.baseUrl + "/action-step",this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

getAssignedActionStep(){
  return this.http.get(this.baseUrl + "/my-action-step",this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

getActionStepsWhenPlanMode(){
  return this.http.get(this.baseUrl + "/action-step?planMode=true",this.parent)
  .map(this.extractData)
  .catch(this.handleError);
}

getActionSteps(assignedId:any){
  return this.http.get(this.baseUrl + "/opiDepartment/"+assignedId+"/action-step")
  .map(this.extractData)
  .catch(this.handleError);
}

postActionSteps(assignedId:any,actionSteps:any[]){
  return this.http.post(this.baseUrl + "/opiDepartment/"+assignedId+"/action-step",actionSteps)
  .map(this.extractData)
  .catch(this.handleError);
}

updateActionStep(stepId:any,actionStep:any){
  return this.http.put(this.baseUrl + "/action-step/"+stepId,actionStep)
  .map(this.extractData)
  .catch(this.handleError);
}

approveActionStep(linkingId:any,data:any){
  return this.http.put(this.baseUrl + "/action-step/"+linkingId+"/approve",data)
  .map(this.extractData)
  .catch(this.handleError);
}

rejectActionStep(linkingId:any,data:any){
  return this.http.put(this.baseUrl + "/action-step/"+linkingId+"/reject",data)
  .map(this.extractData)
  .catch(this.handleError);
}

LinkActionStepToKPI(opiDepartmentId,stepIds:any){
  return this.http.post(this.baseUrl + "/opiDepartment/"+opiDepartmentId+"/link-action-step",stepIds).map(this.extractData)
  .catch(this.handleError);
}

getEmployees(){
  return this.http.get(this.baseUrl + "/employee")
  .map(this.extractData)
  .catch(this.handleError);
}

assignActionStep(linkingId:any,data:any){
  return this.http.post(this.baseUrl + "/assign/action-step-link/"+linkingId+"/employees",data).map(this.extractData)
  .catch(this.handleError);
}

setActionStepStatus(assignmentId:any,data:any){
  return this.http.post(this.baseUrl + "/action-step/assignment/"+assignmentId+"/status",data).map(this.extractData)
  .catch(this.handleError);
}

public getFrequencies() {
  return this.http.get("https://spdemo.ind-cloud.everdata.com/spv4/frequencies")
    .map(this.extractData)
    .catch(this.handleError);
}

public getCycles() {
  return this.http.get(this.baseUrl + "/cycles")
    .map(this.extractData)
    .catch(this.handleError);
}

public postQuarterWithCommunityLearning(quarterId,data){
  return this.http.post(this.baseUrl + "/level/"+ quarterId + "/community-learning",data)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteCommunityLearningProgram(id:any){
  return this.http.delete(this.baseUrl + "/community-learning/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteResearchConsultancy(id:any){
  return this.http.delete(this.baseUrl + "/research-consultancy/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteStudentResearch(id:any){
  return this.http.delete(this.baseUrl + "/student-research/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

saveEvidenceForLearningProgram(data:any,id:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/community-learning/"+id+"/evidance",data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

deleteEvidenceofLearningProgram(id:any){
  return this.http.delete(this.baseUrl + "/community-learning/evidance/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public postQuarterWithCurriculumReview(quarterId,data){
  return this.http.post(this.baseUrl + "/level/"+ quarterId + "/curriculum-review",data)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteCurriculumReviewProgram(id:any){
  return this.http.delete(this.baseUrl + "/curriculum-review/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

saveEvidenceofCurriculumReviewProgram(data:any,id:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/curriculum-review/"+id+"/evidance",data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

deleteEvidenceofCurriculumReviewProgram(id:any){
  return this.http.delete(this.baseUrl + "/curriculum-review/evidance/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public postQuarterWithExtraCurricularActivity(quarterId,data){
  return this.http.post(this.baseUrl + "/level/"+ quarterId + "/extra-curricular-activity",data)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteExtraCurricularActivity(id:any){
  return this.http.delete(this.baseUrl + "/extra-curricular-activity/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public saveEvidenceofExtraCurricularActivity(data:any,id:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/extra-curricular-activity/"+id+"/evidance",data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteEvidenceofExtraCurricularActivity(id:any){
  return this.http.delete(this.baseUrl + "/extra-curricular-activity/evidance/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}


public postQuarterWithExchangeProgram(quarterId,data){
  return this.http.post(this.baseUrl + "/level/"+ quarterId + "/exchange-program",data)
  .map(this.extractData)
  .catch(this.handleError);
}

public postQuarterWithResearchConsultancy(quarterId,data){
  return this.http.post(this.baseUrl + "/level/"+ quarterId + "/research-consultancy",data)
  .map(this.extractData)
  .catch(this.handleError);
}

public postQuarterWithStudentResearch(quarterId,data){
  return this.http.post(this.baseUrl + "/level/"+ quarterId + "/student-research",data)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteExchangeProgram(id:any){
  return this.http.delete(this.baseUrl + "/exchange-program/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

saveEvidenceofExchangeProgram(data:any,id:any){
  var options = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  });
  return this.htttp.post(this.baseUrl + "/exchange-program/"+id+"/evidance",data,options)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteEvidenceofExchangeProgram(id:any){
  return this.http.delete(this.baseUrl + "/exchange-program/evidance/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteEvidenceofResearchConsultancy(id:any){
  return this.http.delete(this.baseUrl + "/research-consultancy/evidance/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public deleteEvidenceofStudentResearch(id:any){
  return this.http.delete(this.baseUrl + "/student-research/evidance/"+id)
  .map(this.extractData)
  .catch(this.handleError);
}

public updateForm(url:string,data:any){
  return this.http.put(this.baseUrl + url,data)
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