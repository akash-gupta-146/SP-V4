webpackJsonp(["home.module.0"],{

/***/ "../../../../../src/app/coordinator/coordinator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoordinatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__ = __webpack_require__("../../../../../src/app/shared/default.header.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CoordinatorService = (function () {
    function CoordinatorService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.baseUrl = "";
        this.parent = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'parent': true
            })
        });
        this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
    }
    CoordinatorService.prototype.getOpiByDeptId = function (deptId) {
        return this.http.get(this.baseUrl + "/result")
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterResult = function (data) {
        return this.http.post(this.baseUrl + "/result", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterWithInternship = function (quarterId, data) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/quarter/" + quarterId + "/studentInternshipForm", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateQuarterResult = function (quarterId, data) {
        return this.http.put(this.baseUrl + "/quarter/" + quarterId + "/lock", {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidence = function (data, quarterId) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/quarter/" + quarterId + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidenceForInternshipFile = function (data, id) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/internship/" + id + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteInternshipFile = function (internshipFileId) {
        return this.http.delete(this.baseUrl + "/internship/" + internshipFileId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteInternshipEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/internship/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidenceForMou = function (data, id) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/mous/" + id + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteMou = function (mouResultId) {
        return this.http.delete(this.baseUrl + "/mous/" + mouResultId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteMouEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/mous/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterResultWithMou = function (quarterId, data) {
        return this.http.post(this.baseUrl + "/quarter/" + quarterId + "/mous", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateQuarterResultCurrentCost = function (quarterId, data) {
        return this.http.put(this.baseUrl + "/quarter/" + quarterId + "/result", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateMou = function (mouId, mou) {
        return this.http.put(this.baseUrl + "/mous/" + mouId, mou)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.getAnnualTargets = function (opiDepartmentId) {
        return this.http.get(this.baseUrl + "/opiDepartment/" + opiDepartmentId + "/annualTargets?currentYear=false&currentQuarter=false").map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.getDepartmentByOpiId = function (opiId) {
        return this.http.get(this.baseUrl + "/opi/" + opiId + "/departments", this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    CoordinatorService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            if (error.status === 0) {
                errMsg = error.status + " - \"Something is wrong..\"";
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw(errMsg);
    };
    return CoordinatorService;
}());
CoordinatorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__["a" /* CustomHttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__["a" /* CustomHttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], CoordinatorService);

var _a, _b, _c;
//# sourceMappingURL=coordinator.service.js.map

/***/ }),

/***/ "../../../../../src/app/coordinator/departments/departments.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n <!-- new code -->\r\n <div class=\"panel\" *ngIf=\"data\" style=\"margin-top:50px;\" id=\"first-section\">\r\n  <div class=\"panel-heading\">\r\n   <h4 class=\"panel-title \">\r\n    <!-- <button type=\"button\" class=\"close\" (click)=\"closeForm();\">\r\n     <span aria-hidden=\"true\">&times;</span>\r\n    </button> -->\r\n    <a data-toggle=\"collapse\" href=\"#edit-section\">KPI DETAILS</a>\r\n   </h4>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <h5>\r\n      <strong>STRATEGIC GOAL</strong>\r\n     </h5>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     <h5>{{data.goal}}</h5>\r\n    </div>\r\n   </div>\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <h5>\r\n      <strong>INITIATIVE</strong>\r\n     </h5>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     <h5>{{data.initiative}}</h5>\r\n    </div>\r\n   </div>\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <h5>\r\n      <strong>ACTIVITY</strong>\r\n     </h5>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     <h5>{{data.activity}}</h5>\r\n    </div>\r\n   </div>\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <h5>\r\n      <strong>OPI</strong>\r\n     </h5>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     <h5> {{data.opi}}</h5>\r\n    </div>\r\n   </div>\r\n   <div class=\"row mini\">\r\n    <div class=\"col-sm-4\">\r\n     <h5>\r\n      <strong>FREQUENCY</strong>\r\n     </h5>\r\n     <h5>{{data.frequency}}</h5>\r\n    </div>\r\n    <div class=\"col-sm-4\">\r\n     <h5>\r\n      <strong>MEASURE UNIT</strong>\r\n     </h5>\r\n     <h5>{{data.measureUnit}}</h5>\r\n    </div>\r\n    <div class=\"col-sm-4\">\r\n     <h5>\r\n      <strong>EVIDENCE FORM TYPE</strong>\r\n     </h5>\r\n     <h5> {{data.evidanceForm}}\r\n      <p *ngIf=\"!data.evidanceForm\">None</p>\r\n     </h5>\r\n    </div>\r\n   </div>\r\n\r\n   <br>\r\n   <div class=\"form-group\">\r\n    <label class=\"col-sm-3\">Corresponding Departments : </label>\r\n    <div class=\"col-sm-9\">\r\n     <select class=\"form-control\" (ngModelChange)=\"viewDepartment($event)\" [(ngModel)]=\"department\">\r\n      <option value=\"0\">All Departments</option>\r\n      <option *ngFor=\"let dept of data.departmentInfo;let d = index;\" [ngValue]=\"dept\">{{dept.department}}</option>\r\n     </select>\r\n    </div>\r\n   </div>\r\n   <br>\r\n   <div id=\"\">\r\n    <fieldset class=\"the-fieldset panel\" *ngFor=\"let dept of departmentInfo;let d = index;\">\r\n     <legend class=\"the-legend\" data-parent=\"#accordion\" [attr.data-target]=\"'#demo' + dept.departmentId\" data-toggle=\"collapse\">{{d+1}}. {{dept.department}}</legend>\r\n     \r\n     <div [attr.id]=\"'demo' + dept.departmentId\" class=\"collapse\" [ngClass]=\"d?'':'in'\" style=\"position: relative;\">\r\n       <a class=\"btn btn-default\" style=\"position: absolute;top: 0;right: 10px;\" (click)=\"getAnnualTargetsByOpiDepartment(dept)\"\r\n       *ngIf=\"!dept.show; else currentBtn\">View All Quarters</a>\r\n      <ng-template #currentBtn>\r\n       <a class=\"btn btn-default\" style=\"position: absolute;top: 0;right: 10px;\" (click)=\"getCurrentAnnualTargets(dept)\">View Current Quarter</a>\r\n      </ng-template>\r\n      <!-- without evidenceformId -->\r\n      <div class=\"row\" *ngIf=\"!data.evidanceFormId\" style=\"padding:15px;\">\r\n       <table id=\"accordion\" class=\"table table-hover table-bordered table-edit\">\r\n        <caption>\r\n         <strong>BASE LINE : </strong>{{dept.baseline}}\r\n        </caption>\r\n        <thead>\r\n         <tr>\r\n          <th>Year</th>\r\n          <th>Estimated Cost</th>\r\n          <th>Quarter</th>\r\n          <th>EstimatedTargetLevel</th>\r\n          <th>Current Cost</th>\r\n          <th>CurrentTargetLevel</th>\r\n          <th>End Date</th>\r\n          <th></th>\r\n         </tr>\r\n        </thead>\r\n        <tbody *ngFor=\"let tdl of dept.opiAnnualTargets;let at=index;\">\r\n         <tr>\r\n          <td [attr.rowspan]=\"tdl.levels.length + 2\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n          <td [attr.rowspan]=\"tdl.levels.length + 2\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n         </tr>\r\n         <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n          <tr [style.background]=\"lev.disable?'lightgray':null\">\r\n           <td>{{lev.quarter}}</td>\r\n           <td>{{lev.estimatedTargetLevel}}</td>\r\n           <td>\r\n            <input type=\"number\" [(ngModel)]=\"lev.currentCost\" *ngIf=\"lev.status=='unsubmitted'\" [disabled]=\"lev.disable\">\r\n            <span *ngIf=\"lev.status!='unsubmitted'\">{{lev.currentCost}}</span>\r\n           </td>\r\n           <td>\r\n            <input type=\"number\" [(ngModel)]=\"lev.currentTargetLevel\" *ngIf=\"lev.status=='unsubmitted'\" [disabled]=\"lev.disable\">\r\n            <span *ngIf=\"lev.status!='unsubmitted'\">{{lev.currentTargetLevel}}</span>\r\n           </td>\r\n           <td>{{lev.endDate + tdl.year}}</td>\r\n           <td>\r\n            <div *ngIf=\"!lev.disable\" style=\"float:left;\">\r\n             <button *ngIf=\"lev.status=='unsubmitted'\" [disabled]=\"!(lev.currentTargetLevel&&lev.currentCost)\" (click)=\"lev.isUpdating=false;saveQuarterResult(lev)\"\r\n              [disabled]=\"lev.disable\"> Save</button>\r\n             <button *ngIf=\"lev.status=='inprogress'\" data-toggle=\"modal\" data-target=\"#evidenceForm\" (click)=\"selectedQuarter=lev;evForm=0\"\r\n              [disabled]=\"lev.disable\">Upload Evidence</button>\r\n             <button *ngIf=\"lev.status=='inprogress'\" (click)=\"lev.status='unsubmitted';lev.isUpdating=true;\" [disabled]=\"lev.disable\">Edit</button>\r\n             <button *ngIf=\"lev.isUpdating\" (click)=\"lev.status='inprogress';lev.isUpdating=false;\"> Cancel</button>\r\n             <button *ngIf=\"lev.evidance.length&&!isUpdating\" (click)=\"lockQuarterResult(lev)\" [disabled]=\"lev.disable\">Lock</button>\r\n            </div>\r\n            <button type=\"button\" class=\"close\" data-toggle=\"collapse\" [attr.href]=\"'#row-collapse'+at+in+e\" *ngIf=\"lev.evidance.length\"\r\n             (click)=\"evidences=lev.evidance;collapseOff('#row-collapse'+at+in+e)\" style=\"cursor:pointer;\">\r\n             <span class=\"glyphicon glyphicon-chevron-down\" aria-hidden=\"true\"></span>\r\n            </button>\r\n           </td>\r\n          </tr>\r\n          <tr [attr.id]=\"'row-collapse'+at+in+e\" class=\"collapse collapse-off\">\r\n           <td colspan=\"6\">\r\n            <div class=\"heading-details\">Evidences</div>\r\n            <br>\r\n            <div class=\"row\">\r\n             <div class=\"col-lg-4\" *ngFor=\"let ev of evidences;let e = index;\">\r\n              <div class=\"box\">\r\n               <span>\r\n                <i class=\"glyphicon glyphicon-file file\"></i>\r\n               </span>\r\n               <a [attr.href]=\"ev.url\">evidance {{e+1}}</a>\r\n               <button type=\"button\" class=\"close\" (click)=\"deleteEvidence(evidences,ev,e)\">\r\n                <span aria-hidden=\"true\">&times;</span>\r\n                <span class=\"sr-only\">Close</span>\r\n               </button>\r\n              </div>\r\n             </div>\r\n            </div>\r\n           </td>\r\n          </tr>\r\n         </ng-template>\r\n        </tbody>\r\n       </table>\r\n      </div>\r\n      <!--with student internship form-->\r\n      <div class=\"row\" *ngIf=\"data.evidanceFormId==1\" style=\"padding:15px;\">\r\n       <table id=\"accordion\" class=\"table  table-bordered table-edit\">\r\n        <colgroup>\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"50%\">\r\n        </colgroup>\r\n        <thead>\r\n         <tr>\r\n          <th>Year</th>\r\n          <th>Estimated Cost</th>\r\n          <th>Quarter</th>\r\n          <th>EstimatedTargetLevel</th>\r\n          <th>End Date</th>\r\n          <!-- <th></th> -->\r\n         </tr>\r\n        </thead>\r\n        <tbody *ngFor=\"let tdl of dept.opiAnnualTargets;let at=index;\">\r\n         <tr>\r\n          <td [attr.rowspan]=\"tdl.levels.length + 5\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n          <td [attr.rowspan]=\"tdl.levels.length + 5\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n         </tr>\r\n         <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n          <tr [style.background]=\"lev.disable?'lightgray':null\" data-toggle=\"collapse\" [attr.href]=\"'#row-collapse'+at+'q'+in\" (click)=\"selectedQuarter=lev;evForm=1;collapseOff('#row-collapse'+at+'q'+in)\"\r\n           style=\"cursor:pointer;\">\r\n           <td>{{lev.quarter}}</td>\r\n           <td>{{lev.estimatedTargetLevel}}</td>\r\n           <td>{{lev.endDate + tdl.year}}</td>\r\n           <!-- <td style=\"text-align:center;\">View</td> -->\r\n          </tr>\r\n          <ng-container>\r\n           <tr [attr.id]=\"'row-collapse'+at+'q'+in\" class=\"collapse collapse-off\">\r\n            <td colspan=\"6\">\r\n             <table class=\"table table-bordered\">\r\n              <caption align=\"top\" *ngIf=\"lev.internshipDetails.length\">\r\n               <div class=\"input-group\">\r\n                <div class=\"input-group-addon bg-color\">Current Cost</div>\r\n                <input class=\"form-control\" [(ngModel)]=\"lev.currentCost\" style=\"width:25%\" [disabled]=\"!lev.edit\" autofocus>\r\n                <div class=\"pull-left\" *ngIf=\"!lev.edit;else savebtn\" [hidden]=\"lev.disable\">\r\n                 <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit=true;lev.currentCostCopy=lev.currentCost;\">\r\n                  <i class=\"glyphicon glyphicon-pencil\"></i>\r\n                 </button>\r\n                </div>\r\n\r\n                <ng-template #savebtn>\r\n                 <button type=\"button\" class=\"btn btn-link\" (click)=\"updateCurrentCost(lev);\">\r\n                  <i class=\"glyphicon glyphicon-floppy-saved\"></i>\r\n                 </button>\r\n                 <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit = false;lev.currentCost=lev.currentCostCopy;\">\r\n                  <i class=\"glyphicon glyphicon-remove\"></i>\r\n                 </button>\r\n                </ng-template>\r\n\r\n                <div class=\"pull-right\">\r\n                 <button type=\"button\" class=\"btn btn-primary btn-save\" (click)=\"lockQuarterResult(lev)\" *ngIf=\"lev.internshipDetails.length\"\r\n                  [disabled]=\"lev.status=='locked'\" [disabled]=\"lev.disable\">Lock</button>\r\n                </div>\r\n               </div>\r\n              </caption>\r\n              <thead>\r\n               <tr>\r\n                <th>Internship Detail</th>\r\n                <th *ngIf=\"lev.internshipDetails.length\">Evidennce\r\n                 <button class=\"pull-right btn-save\" data-toggle=\"modal\" data-target=\"#evidenceForm\" (click)=\"selectedInternshipFile = file;\"\r\n                  *ngIf=\"lev.status!='locked'\" [disabled]=\"lev.disable\">Add</button>\r\n                </th>\r\n               </tr>\r\n              </thead>\r\n              <tbody *ngFor=\"let file of lev.internshipDetails;let f=index;\">\r\n               <tr>\r\n                <td>\r\n                 <a [attr.href]=\"file.internshipFileUrl\">File 1</a>\r\n                 <button type=\"button\" class=\"close\" (click)=\"deleteInternshipFile(lev.internshipDetails,file,f)\" [disabled]=\"lev.disable\">\r\n                  <span aria-hidden=\"true\">&times;</span>\r\n                 </button>\r\n                </td>\r\n                <td>\r\n                 <ul style=\"list-style: none;padding: 0;\">\r\n                  <li *ngFor=\"let ev of file.evidance;let e=index;\">\r\n                   <a [attr.href]=\"ev.url\">evidence {{e+1}}</a>\r\n                   <button type=\"button\" class=\"close\" (click)=\"deleteInternshipEvidence(file.evidance,ev,e)\" [disabled]=\"lev.disable || lev.status=='locked'\">\r\n                    <span aria-hidden=\"true\">&times;</span>\r\n                   </button>\r\n                  </li>\r\n                  <li *ngIf=\"!file.evidance.length;\" style=\"color:red\">No evidence added yet.</li>\r\n                 </ul>\r\n                </td>\r\n               </tr>\r\n              </tbody>\r\n              <tfoot *ngIf=\"!lev.internshipDetails.length\">\r\n               <tr>\r\n                <td colspan=\"2\">\r\n                 <div class=\"row\">\r\n                  <div class=\"col-sm-6\">\r\n                   <div class=\"form-group\">\r\n                    <label>Current Cost :</label>\r\n                    <input class=\"form-control\" type=\"number\" [(ngModel)]=\"lev.currentCost\" [disabled]=\"lev.disable\" style=\"width:25%\">\r\n                   </div>\r\n                  </div>\r\n                  <div class=\"col-sm-6\">\r\n                   <div class=\"form-group\">\r\n                    <label for=\"exampleInputFile\">Student Internship File :</label>\r\n                    <input type=\"file\" class=\"form-control-file\" id=\"exampleInputFile\" accept=\".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel\"\r\n                     aria-describedby=\"fileHelp\" (change)=\"getInternshipFile(lev,$event)\" [disabled]=\"lev.disable\">\r\n                    <small id=\"fileHelp\" class=\"form-text text-muted\">Accept only .xls, .csv or excel sheets</small>\r\n                   </div>\r\n                  </div>\r\n                 </div>\r\n                 <div class=\"form-group\">\r\n                  <button type=\"button\" (click)=\"saveInternshipForm(lev)\" [disabled]=\"lev.disable\" [disabled]=\"!(lev.currentCost&&lev.internshipFile)\">Save</button>\r\n                 </div>\r\n                </td>\r\n               </tr>\r\n              </tfoot>\r\n             </table>\r\n            </td>\r\n           </tr>\r\n          </ng-container>\r\n         </ng-template>\r\n        </tbody>\r\n       </table>\r\n      </div>\r\n      <!--with mous forms-->\r\n      <div class=\"row\" *ngIf=\"data.evidanceFormId==2\" style=\"padding:15px;\">\r\n       <table id=\"accordion\" class=\"table table-hover table-bordered table-edit\">\r\n        <colgroup>\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"10%\">\r\n         <col width=\"50%\">\r\n        </colgroup>\r\n        <thead>\r\n         <tr>\r\n          <th>Year</th>\r\n          <th>Estimated Cost</th>\r\n          <th>Quarter</th>\r\n          <th>EstimatedTargetLevel</th>\r\n          <th>End Date</th>\r\n          <!-- <th></th> -->\r\n         </tr>\r\n        </thead>\r\n        <tbody *ngFor=\"let tdl of dept.opiAnnualTargets;let at=index;\">\r\n         <tr>\r\n          <td [attr.rowspan]=\"tdl.levels.length+4\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n          <td [attr.rowspan]=\"tdl.levels.length+4\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n         </tr>\r\n         <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n          <tr data-toggle=\"collapse\" [attr.href]=\"'#row-collapse'+at+'lev'+in\" (click)=\"selectedQuarter=lev;collapseOff('#row-collapse'+at+'lev'+in)\"\r\n           [style.background]=\"lev.disable?'lightgray':null\" style=\"cursor:pointer;\">\r\n           <td>{{lev.quarter}}</td>\r\n           <td>{{lev.estimatedTargetLevel}}</td>\r\n           <td>{{lev.endDate + tdl.year}}</td>\r\n           <!-- <td style=\"text-align:center;\">View</td> -->\r\n          </tr>\r\n          <ng-container>\r\n           <tr [attr.id]=\"'row-collapse'+at+'lev'+in\" class=\"collapse collapse-off\">\r\n            <td colspan=\"5\">\r\n             <table class=\"table table-bordered\" *ngIf=\"lev.mouDetails.length\">\r\n              <caption align=\"top\">\r\n               <div class=\"input-group\">\r\n                <div class=\"input-group-addon\">Current Cost</div>\r\n                <input class=\"form-control\" [(ngModel)]=\"lev.currentCost\" style=\"width:25%\" [disabled]=\"!lev.edit\" autofocus>\r\n                <div class=\"pull-left\" *ngIf=\"!lev.edit;else savebtn\" [hidden]=\"lev.disable\">\r\n                 <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit=true;lev.currentCostCopy=lev.currentCost;\">\r\n                  <i class=\"glyphicon glyphicon-pencil\"></i>\r\n                 </button>\r\n                </div>\r\n\r\n                <ng-template #savebtn>\r\n                 <button type=\"button\" class=\"btn btn-link\" (click)=\"updateCurrentCost(lev);\">\r\n                  <i class=\"glyphicon glyphicon-floppy-saved\"></i>\r\n                 </button>\r\n                 <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit = false;lev.currentCost=lev.currentCostCopy;\">\r\n                  <i class=\"glyphicon glyphicon-remove\"></i>\r\n                 </button>\r\n                </ng-template>\r\n\r\n                <div class=\"pull-right\">\r\n                 <button class=\"btn\" (click)=\"lockQuarterResult(lev)\" *ngIf=\"lev.mouDetails.length\" [disabled]=\"lev.status=='locked'\" [disabled]=\"lev.disable\">Lock </button>\r\n                </div>\r\n               </div>\r\n              </caption>\r\n              <colgroup>\r\n               <col style=\"width:10%\">\r\n               <col style=\"width:30%\">\r\n               <col style=\"width:30%\">\r\n               <col style=\"width:30%\" [hidden]=\"lev.disable\">\r\n              </colgroup>\r\n              <thead>\r\n               <tr>\r\n                <th>*</th>\r\n                <th>Mou Type</th>\r\n                <th>Organisation</th>\r\n                <th [hidden]=\"lev.disable\">\r\n                 <button class=\"btn\" type=\"button\" *ngIf=\"lev.mouDetails.length\" (click)=\"lev.addMore=true;\">Add More</button>\r\n                </th>\r\n               </tr>\r\n              </thead>\r\n              <tbody *ngFor=\"let detail of lev.mouDetails;let d = index;\">\r\n               <tr *ngIf=\"!detail.edit\">\r\n                <td rowspan=\"2\">{{d+1}}</td>\r\n                <td>\r\n                 <div class=\"form-control\">{{detail.mouType}}</div>\r\n                </td>\r\n                <td>\r\n                 <div class=\"form-control\">{{detail.organization}}</div>\r\n                </td>\r\n                <td [hidden]=\"lev.disable\">\r\n                 <button type=\"button\" (click)=\"detail.edit=true;detail.mouTypeCopy=detail.mouType;detail.organizationCopy=detail.organization;\">\r\n                  Edit</button>\r\n                 <button (click)=\"evForm=2;selectedMou=detail;\" data-toggle=\"modal\" data-target=\"#evidenceForm\">Upload Evidence</button>\r\n                </td>\r\n               </tr>\r\n               <tr *ngIf=\"detail.edit\">\r\n                <td rowspan=\"2\">{{d+1}}</td>\r\n                <td>\r\n                 <input class=\"form-control\" [(ngModel)]=\"detail.mouType\">\r\n                </td>\r\n                <td>\r\n                 <input class=\"form-control\" [(ngModel)]=\"detail.organization\">\r\n                </td>\r\n                <td>\r\n                 <button type=\"button\" (click)=\"updateMou(detail)\">save </button>\r\n                 <button type=\"button\" (click)=\"detail.edit=false;detail.mouType=detail.mouTypeCopy;detail.organization=detail.organizationCopy;\">Cancel </button>\r\n                </td>\r\n               </tr>\r\n               <tr *ngIf=\"detail.evidance.length\">\r\n                <!-- <td></td> -->\r\n                <td colspan=\"3\">\r\n                 <b>Evidences :</b>\r\n                 <span *ngFor=\"let evidence of detail.evidance;let e = index;\">\r\n                  <a [attr.href]=\"evidence.url\">File {{e+1}}</a>,</span>\r\n                </td>\r\n               </tr>\r\n              </tbody>\r\n              <tfoot *ngIf=\"lev.addMore\">\r\n               <tr>\r\n                <td></td>\r\n                <td>\r\n                 <input class=\"form-control\" [(ngModel)]=\"lev.mouType\">\r\n                </td>\r\n                <td>\r\n                 <input class=\"form-control\" [(ngModel)]=\"lev.organization\">\r\n                </td>\r\n                <td>\r\n                 <button type=\"button\" (click)=\"saveQuarterResultWithMou(lev)\">save </button>\r\n                 <button type=\"button\" *ngIf=\"lev.addMore\" (click)=\"lev.addMore=false;\">Cancel </button>\r\n                </td>\r\n               </tr>\r\n              </tfoot>\r\n             </table>\r\n             <div class=\"row\" *ngIf=\"!lev.mouDetails.length\">\r\n              <div class=\"col-sm-3\">\r\n               <div class=\"input-group\">\r\n                <div class=\"input-group-addon bg-color\">Current Cost</div>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"lev.currentCost\" [disabled]=\"lev.disable\">\r\n               </div>\r\n              </div>\r\n              <div class=\"col-sm-3\">\r\n               <div class=\"input-group\">\r\n                <div class=\"input-group-addon bg-color\">Mou type</div>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"lev.mouType\" [disabled]=\"lev.disable\">\r\n               </div>\r\n              </div>\r\n              <div class=\"col-sm-3\">\r\n               <div class=\"input-group\">\r\n                <div class=\"input-group-addon bg-color\">Organization</div>\r\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"lev.organization\" [disabled]=\"lev.disable\">\r\n               </div>\r\n              </div>\r\n              <div class=\"col-sm-3\">\r\n               <div class=\"form-group\">\r\n                <button class=\"btn pull-right btn-save\" type=\"button\" (click)=\"saveQuarterResultWithMou(lev)\" [disabled]=\"lev.disable\"> Save</button>\r\n               </div>\r\n              </div>\r\n             </div>\r\n            </td>\r\n           </tr>\r\n          </ng-container>\r\n         </ng-template>\r\n        </tbody>\r\n       </table>\r\n      </div>\r\n     </div>\r\n    </fieldset>\r\n   </div>\r\n  </div>\r\n\r\n </div>\r\n</div>\r\n\r\n<!--Evidence Form-->\r\n<div class=\"modal fade\" id=\"evidenceForm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n <div class=\"modal-dialog\">\r\n  <div class=\"modal-content\" *ngIf=\"data\">\r\n   <!-- Modal Header -->\r\n   <div class=\"modal-header\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n     <span aria-hidden=\"true\">&times;</span>\r\n    </button>\r\n    <h4 class=\"modal-title\" id=\"myModalLabel\">Attach Evidence</h4>\r\n   </div>\r\n   <!-- Modal Body -->\r\n   <form [formGroup]=\"evidencForm\" (submit)=\"onEvidenceSubmit(evForm)\">\r\n    <div class=\"modal-body\">\r\n     <div class=\"form-group\">\r\n      <label for=\"title\">Title</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"title\" formControlName=\"title\" />\r\n     </div>\r\n     <div class=\"form-group\">\r\n      <label for=\"description\">Description</label>\r\n      <textarea type=\"text\" class=\"form-control\" id=\"description\" formControlName=\"description\"></textarea>\r\n     </div>\r\n     <div class=\"form-group\">\r\n      <label for=\"exampleInputFile\">Attachment</label>\r\n      <input type=\"file\" class=\"form-control-file\" id=\"exampleInputFile\" formControlName=\"files\" (change)=\"getFile($event)\" aria-describedby=\"fileHelp\">\r\n     </div>\r\n    </div>\r\n    <!-- Modal Footer -->\r\n    <div class=\"modal-footer\">\r\n     <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n     <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n    </div>\r\n   </form>\r\n  </div>\r\n </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/coordinator/departments/departments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coordinator_service__ = __webpack_require__("../../../../../src/app/coordinator/coordinator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_alertifyjs__ = __webpack_require__("../../../../alertifyjs/build/alertify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_alertifyjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_alertifyjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__ = __webpack_require__("../../../../../src/app/shared/loader.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DepartmentsComponent = (function () {
    function DepartmentsComponent(route, utServ, storage, loaderService) {
        var _this = this;
        this.route = route;
        this.utServ = utServ;
        this.storage = storage;
        this.loaderService = loaderService;
        this.department = 0;
        this.departmentInfo = [];
        this.departmentsCopy = [];
        this.evidences = [];
        this.isUpdating = false;
        this.route.params.subscribe(function (params) {
            _this.loaderService.display(true);
            _this.utServ.getDepartmentByOpiId(params['id']).subscribe(function (response) {
                _this.data = response[0];
                _this.departmentInfo = response[0].departmentInfo;
                _this.departmentsCopy = response[0].departmentInfo;
                _this.loaderService.display(false);
            });
        });
        this.evidencForm = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormGroup */]({
            title: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required]),
            description: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required),
            files: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["f" /* Validators */].required])
        });
    }
    DepartmentsComponent.prototype.getAnnualTargetsByOpiDepartment = function (department) {
        department.show = true;
        if (department.allAnnualTargets) {
            department.opiAnnualTargets = department.allAnnualTargets;
            return;
        }
        this.utServ.getAnnualTargets(department.id).subscribe(function (response) {
            console.log(response);
            department.allAnnualTargets = response;
            department.currentAnnualTargets = department.opiAnnualTargets;
            department.opiAnnualTargets = response;
        });
    };
    DepartmentsComponent.prototype.getCurrentAnnualTargets = function (department) {
        department.show = false;
        department.allAnnualTargets = department.opiAnnualTargets;
        department.opiAnnualTargets = department.currentAnnualTargets;
    };
    DepartmentsComponent.prototype.viewDepartment = function (event) {
        if (event == 0) {
            this.departmentInfo = this.departmentsCopy;
        }
        else {
            this.departmentInfo = [];
            this.departmentInfo.push(event);
        }
    };
    DepartmentsComponent.prototype.saveQuarterResult = function (quarter) {
        var _this = this;
        if (!quarter.isUpdating) {
            var object = {
                'levelId': quarter.id,
                'currentCost': quarter.currentCost,
                'currentTargetLevel': quarter.currentTargetLevel,
            };
            this.loaderService.setLoadingStatus("Saving");
            this.loaderService.setTransactionLoader(true);
            this.utServ.saveQuarterResult(object).subscribe(function (response) {
                _this.loaderService.setTransactionLoader(false);
                quarter.status = 'inprogress';
            });
        }
        else {
            var object_1 = {
                'currentCost': quarter.currentCost,
                'currentTargetLevel': quarter.currentTargetLevel,
            };
            this.loaderService.setLoadingStatus("Updating");
            this.loaderService.setTransactionLoader(true);
            this.utServ.updateQuarterResult(quarter.id, object_1).subscribe(function (response) {
                _this.loaderService.setTransactionLoader(false);
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["success"]("Updated");
                console.log(response);
            });
        }
    };
    DepartmentsComponent.prototype.saveQuarterResultWithMou = function (lev) {
        var _this = this;
        var object = {
            "currentCost": lev.currentCost,
            "mouType": lev.mouType,
            "organization": lev.organization
        };
        this.loaderService.setLoadingStatus("Saving");
        this.loaderService.setTransactionLoader(true);
        this.utServ.saveQuarterResultWithMou(lev.id, object).subscribe(function (response) {
            console.log(response);
            lev.currentCost = response.currentCost;
            lev['mouDetails'] = response.mouDetails;
            _this.loaderService.setTransactionLoader(false);
            __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["success"]("Saved");
        });
    };
    DepartmentsComponent.prototype.updateCurrentCost = function (lev) {
        var _this = this;
        var object = {
            "currentCost": lev.currentCost
        };
        this.loaderService.setLoadingStatus("Updating");
        this.loaderService.setTransactionLoader(true);
        this.utServ.updateQuarterResultCurrentCost(lev.id, object).subscribe(function (response) {
            lev.edit = false;
            setTimeout(function () {
                _this.loaderService.setTransactionLoader(false);
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["success"]("Updated");
            }, 1000);
            console.log(response);
        });
    };
    DepartmentsComponent.prototype.updateMou = function (mou) {
        var _this = this;
        var object = {
            "mouType": mou.mouType,
            "organization": mou.organization
        };
        this.loaderService.setLoadingStatus("Updating");
        this.loaderService.setTransactionLoader(true);
        this.utServ.updateMou(mou.id, object).subscribe(function (response) {
            _this.loaderService.setTransactionLoader(false);
            __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["success"]("Updated");
            mou.edit = false;
        });
    };
    DepartmentsComponent.prototype.deleteMou = function (mous, mou, index) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["confirm"]("Are you sure you want to delete this mou", function () {
            _this.loaderService.setLoadingStatus("Updating");
            _this.loaderService.setTransactionLoader(true);
            _this.utServ.deleteMou(mou.id).subscribe(function (response) {
                mous.splice(index, 1);
                _this.loaderService.setTransactionLoader(false);
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["success"]("Sucessfully removed");
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["error"]("Something went wrong");
            });
        }).setHeader("Confirmation");
    };
    DepartmentsComponent.prototype.lockQuarterResult = function (quarter) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["confirm"]("Are you sure you want to Lock you results", function () {
            _this.loaderService.setLoadingStatus("Locking");
            _this.loaderService.setTransactionLoader(true);
            _this.utServ.updateQuarterResult(quarter.id, { 'status': 'locked' }).subscribe(function (response) {
                _this.loaderService.setTransactionLoader(false);
                console.log(response);
                quarter.disable = true;
                quarter.status = "locked";
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["error"]("Something went wrong");
            });
        }).setHeader("Confirmation");
    };
    DepartmentsComponent.prototype.deleteEvidence = function (evidences, evidence, index) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["confirm"]("Are you sure you want to delete this evidence", function () {
            _this.utServ.deleteEvidence(evidence.id).subscribe(function (response) {
                evidences.splice(index, 1);
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["success"]("Success");
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["error"]("Something went wrong");
            });
        }).setHeader("Atert Message");
    };
    DepartmentsComponent.prototype.deleteInternshipEvidence = function (evidences, evidence, index) {
        if (confirm("Are you sure you want to delete this evidence"))
            this.utServ.deleteInternshipEvidence(evidence.id).subscribe(function (response) {
                evidences.splice(index, 1);
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["success"]("Success");
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_3_alertifyjs__["error"]("Error");
            });
    };
    DepartmentsComponent.prototype.getInternshipFile = function (lev, event) {
        console.log(event);
        lev.internshipFile = event.target.files["0"];
    };
    DepartmentsComponent.prototype.getFile = function (event) {
        this.file = event.srcElement.files[0];
    };
    DepartmentsComponent.prototype.onEvidenceSubmit = function (evForm) {
        var _this = this;
        var formData = new FormData();
        formData.append('title', this.evidencForm.value['title']);
        formData.append('description', this.evidencForm.value['description']);
        formData.append('file', this.file);
        switch (evForm) {
            case 0:
                this.utServ.saveEvidence(formData, this.selectedQuarter.id).subscribe(function (res) {
                    if (!_this.selectedQuarter.evidance)
                        _this.selectedQuarter.evidance = [];
                    _this.selectedQuarter.evidance.push(res);
                    $('#evidenceForm').modal('hide');
                });
                break;
            case 1:
                this.utServ.saveEvidenceForInternshipFile(formData, this.selectedInternshipFile.id).subscribe(function (response) {
                    _this.selectedInternshipFile['evidance'].push(response);
                    $('#evidenceForm').modal('hide');
                });
                break;
            case 2:
                this.utServ.saveEvidenceForMou(formData, this.selectedMou.id).subscribe(function (response) {
                    _this.selectedMou.evidance.push(response);
                    $('#evidenceForm').modal('hide');
                });
                break;
        }
    };
    DepartmentsComponent.prototype.saveInternshipForm = function (lev) {
        var formData = new FormData();
        // formData.append('internshipEvidance',lev.internshipEvidance);
        formData.append('internshipFile', lev.internshipFile);
        formData.append('currentCost', lev.currentCost);
        console.log(formData);
        this.utServ.saveQuarterWithInternship(lev.id, formData).subscribe(function (response) {
            lev.internshipDetails = response.internshipDetails;
        });
    };
    DepartmentsComponent.prototype.deleteInternshipFile = function (files, file, index) {
        if (confirm("Are you sure you want to delete this file"))
            this.utServ.deleteInternshipFile(file.id).subscribe(function (response) {
                files.splice(index, 1);
            });
    };
    DepartmentsComponent.prototype.closeForm = function () {
        $("#first-section").hide();
        $("#second-section").show();
    };
    DepartmentsComponent.prototype.collapseOff = function (element) {
        if ($(element).hasClass('in')) {
            return;
        }
        $(element).addClass('in');
        $(".collapse-off").removeClass('in');
    };
    return DepartmentsComponent;
}());
DepartmentsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: '',
        template: __webpack_require__("../../../../../src/app/coordinator/departments/departments.component.html"),
        styles: [__webpack_require__("../../../../../src/app/coordinator/home/home.component.css"), __webpack_require__("../../../../../src/app/coordinator/coordinator.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__coordinator_service__["a" /* CoordinatorService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__coordinator_service__["a" /* CoordinatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__coordinator_service__["a" /* CoordinatorService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */]) === "function" && _d || Object])
], DepartmentsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=departments.component.js.map

/***/ }),

/***/ "../../../../../src/app/coordinator/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <!--opi List-->\r\n\r\n  <div class=\"card table-card\" style=\"margin-top:50px;\" id=\"second-section\">\r\n    <table class=\"table table-bordered table1 text-center\">\r\n      <colgroup>\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:16%\">\r\n        <col style=\"width:8.8%\">\r\n        <col style=\"width:9.9%\">\r\n        <col style=\"width:5.19%\">\r\n      </colgroup>\r\n      <thead class=\"header-background\" *ngIf=\"goalsCopy.length\">\r\n        <tr>\r\n          <th>\r\n            <span class=\"hide-text\">GOAL</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchGoal($event)\" placeholder=\"GOAL\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">INITIATIVE</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchInitiative($event)\" placeholder=\"INITIATIVE\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">ACTIVITY</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchActivity($event)\" placeholder=\"ACTIVITY\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">KPI</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchOpi($event)\" placeholder=\"KPI\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <!-- <th>Frequency</th> -->\r\n          <th>Departments</th>\r\n          <th>Status</th>\r\n          <th>View</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let goal of goals;let i = index;\">\r\n          <td>{{goal.goal}}</td>\r\n          <td colspan=\"6\" style=\"padding:0px;border:none;\" #element [style.height]=\"get(element)\">\r\n            <table class=\"table table-bordered\" style=\"height: inherit;border:none;\">\r\n              <colgroup>\r\n                <col style=\"width:25%\">\r\n                <col style=\"width:75%\">\r\n              </colgroup>\r\n              <tr *ngFor=\"let initiate of goal.initiatives;let j=index;\">\r\n                <td>{{initiate.initiative}}</td>\r\n                <td colspan=\"5\" style=\"padding:0px;\" #element1 [style.height]=\"get(element1)\">\r\n                  <table class=\"table table-bordered\" style=\"height:inherit;border:none;\">\r\n                    <colgroup>\r\n                      <col style=\"width:33.33%\">\r\n                      <col style=\"width:66.67%\">\r\n                    </colgroup>\r\n                    <tr *ngFor=\"let activit of initiate.activities;let k=index;\">\r\n                      <td [style.border-top]=\"k?'1px solid #ddd':'none'\">{{activit.activity}}</td>\r\n                      <td colspan=\"4\" style=\"padding:0px;\" #element2 [style.height]=\"get(element2)\">\r\n                        <table class=\"table table-bordered\" style=\"height: inherit;border:none;\">\r\n                          <colgroup>\r\n                            <col style=\"width:40%\">\r\n                            <col style=\"width:22%\">\r\n                            <col style=\"width:25%\">\r\n                            <col style=\"width:13%\">\r\n                          </colgroup>\r\n                          <tr *ngFor=\"let msr of activit.opis;let l=index\">\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">{{msr.opi}}</td>\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                              <!-- {{msr.frequency}} -->\r\n                              <ul style=\"list-style:none;padding:0px;\" class=\"table-list\">\r\n                                <li *ngIf=\"!msr.departmentInfo.length\">None</li>\r\n                                <li *ngFor=\"let dept of msr.departmentInfo;let d = index\">{{dept.department}}, </li>\r\n                              </ul>\r\n                            </td>\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                              <p *ngIf=\"msr.quarterStatus\">\r\n                                <a data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"selectedMeasure=msr;\" style=\"text-transform:uppercase\">{{msr.quarterStatus.status}}\r\n                                  <br>\r\n                                  <span style=\"text-transform: uppercase\">({{msr.quarterStatus.role}})</span>\r\n                                </a>\r\n                              </p>\r\n                            </td>\r\n                            <!-- <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                              <a style=\"cursor:pointer;\" data-target=\"#edit-section\" (click)=\"selectedOpi=goal;selectedInitiative=initiate;selectedActivity=activit;selectedMeasure=msr;showOpi(goal,msr)\">view</a>\r\n                            </td> -->\r\n                            <a [routerLink]=\"'kpis/'+msr.opiId\">view</a>\r\n                          </tr>\r\n                        </table>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n      <tfoot *ngIf=\"!goals.length\">\r\n        <tr>\r\n          <td colspan=\"7\" class=\"text-center\">No Data to Display .,.</td>\r\n        </tr>\r\n      </tfoot>\r\n    </table>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-lg bar\">\r\n    <!-- Modal content-->\r\n    <div class=\"modal-content\" *ngIf=\"selectedMeasure\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\" style=\"text-transform: capitalize\">{{selectedMeasure.opi}}</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div customBox>\r\n          <div line [class]=\"selectedMeasure.quarterStatus[role]\" *ngFor=\"let role of roles;\">\r\n            <h4>{{role}}</h4>\r\n          </div>\r\n        </div>\r\n        <div id=\"statu-legend\">\r\n          <ul>\r\n            <li class=\"white\">None</li>\r\n            <li class=\"cyan\">Locked</li>\r\n            <li class=\"green\">Approved</li>\r\n            <li class=\"red\">Rejected</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/coordinator/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coordinator_service__ = __webpack_require__("../../../../../src/app/coordinator/coordinator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_filters__ = __webpack_require__("../../../../../src/app/shared/filters.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_loader_service__ = __webpack_require__("../../../../../src/app/shared/loader.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(utServ, storage, loaderService) {
        var _this = _super.call(this) || this;
        _this.utServ = utServ;
        _this.storage = storage;
        _this.loaderService = loaderService;
        _this.roles = ["coordinator", "hod", "dvc", "vc", "chanceller"];
        _this.getOpi();
        return _this;
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
    };
    HomeComponent.prototype.getOpi = function () {
        var _this = this;
        this.loaderService.display(true);
        this.utServ.getOpiByDeptId(this.storage.getData('user_roleInfo')[0].departmentId).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.initFilters(_this.goalsCopy);
            }
            _this.loaderService.display(false);
        }, function (error) {
            _this.loaderService.display(false);
        });
    };
    HomeComponent.prototype.showOpi = function (goal, measure) {
        $("#first-section").show();
        $("#second-section").hide();
        $('#edit-section').collapse('show');
        console.log(goal);
    };
    HomeComponent.prototype.get = function (e) {
        var promise = new Promise(function (resolve, reject) { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
        return promise;
    };
    return HomeComponent;
}(__WEBPACK_IMPORTED_MODULE_3__shared_filters__["a" /* Filters */]));
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'home',
        template: __webpack_require__("../../../../../src/app/coordinator/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/coordinator/home/home.component.css"), __webpack_require__("../../../../../src/app/coordinator/coordinator.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__coordinator_service__["a" /* CoordinatorService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__coordinator_service__["a" /* CoordinatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__coordinator_service__["a" /* CoordinatorService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_loader_service__["a" /* LoaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_loader_service__["a" /* LoaderService */]) === "function" && _c || Object])
], HomeComponent);

var _a, _b, _c;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/coordinator/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_component__ = __webpack_require__("../../../../../src/app/coordinator/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__departments_departments_component__ = __webpack_require__("../../../../../src/app/coordinator/departments/departments.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild([
                {
                    path: '',
                    component: __WEBPACK_IMPORTED_MODULE_1__home_component__["a" /* HomeComponent */],
                },
                {
                    path: 'kpis/:id',
                    component: __WEBPACK_IMPORTED_MODULE_4__departments_departments_component__["a" /* DepartmentsComponent */]
                }
            ])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__home_component__["a" /* HomeComponent */], __WEBPACK_IMPORTED_MODULE_4__departments_departments_component__["a" /* DepartmentsComponent */]],
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ })

});
//# sourceMappingURL=home.module.0.chunk.js.map