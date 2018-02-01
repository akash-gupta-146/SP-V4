webpackJsonp(["hod.module"],{

/***/ "../../../../../src/app/hod/assigned-kpi/kpi.component.html":
/***/ (function(module, exports) {

module.exports = "<hod></hod>\r\n<div class=\"container-fluid\">\r\n <div class=\"card table-card\" style=\"margin-top:50px;\">\r\n  <table class=\"table table-bordered table1 text-center\">\r\n   <colgroup>\r\n    <col style=\"width:20%\">\r\n    <col style=\"width:20%\">\r\n    <col style=\"width:20%\">\r\n    <col style=\"width:16%\">\r\n    <col style=\"width:8.8%\">\r\n    <col style=\"width:9.9%\">\r\n    <col style=\"width:5.19%\">\r\n   </colgroup>\r\n   <thead class=\"header-background\" *ngIf=\"goalsCopy.length\">\r\n    <tr>\r\n     <th>\r\n      <span class=\"hide-text\">GOAL</span>\r\n      <form action=\"\" class=\"search-form\">\r\n       <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n        <label for=\"search\" class=\"sr-only\">Search</label>\r\n        <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchGoal($event)\" placeholder=\"GOAL\">\r\n        <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n       </div>\r\n      </form>\r\n     </th>\r\n     <th>\r\n      <span class=\"hide-text\">INITIATIVE</span>\r\n      <form action=\"\" class=\"search-form\">\r\n       <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n        <label for=\"search\" class=\"sr-only\">Search</label>\r\n        <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchInitiative($event)\" placeholder=\"INITIATIVE\">\r\n        <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n       </div>\r\n      </form>\r\n     </th>\r\n     <th>\r\n      <span class=\"hide-text\">ACTIVITY</span>\r\n      <form action=\"\" class=\"search-form\">\r\n       <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n        <label for=\"search\" class=\"sr-only\">Search</label>\r\n        <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchActivity($event)\" placeholder=\"ACTIVITY\">\r\n        <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n       </div>\r\n      </form>\r\n     </th>\r\n     <th>\r\n      <span class=\"hide-text\">KPI</span>\r\n      <form action=\"\" class=\"search-form\">\r\n       <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n        <label for=\"search\" class=\"sr-only\">Search</label>\r\n        <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchOpi($event)\" placeholder=\"KPI\">\r\n        <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n       </div>\r\n      </form>\r\n     </th>\r\n     <!-- <th>Frequency</th> -->\r\n     <th>Departments</th>\r\n     <th>Status</th>\r\n     <th>View</th>\r\n    </tr>\r\n   </thead>\r\n   <tbody>\r\n    <tr *ngFor=\"let goal of goals;let i = index;\">\r\n     <td>{{goal.goal}}</td>\r\n     <td colspan=\"6\" style=\"padding:0px;border:none;\" #element [style.height]=\"get(element)\">\r\n      <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n       <colgroup>\r\n        <col style=\"width:25%\">\r\n        <col style=\"width:75%\">\r\n       </colgroup>\r\n       <tr *ngFor=\"let initiate of goal.initiatives;let j=index;\">\r\n        <td>{{initiate.initiative}}</td>\r\n        <td colspan=\"4\" style=\"padding:0px;\" #element1 [style.height]=\"get(element1)\">\r\n         <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n          <colgroup>\r\n           <col style=\"width:33.33%\">\r\n           <col style=\"width:66.67%\">\r\n          </colgroup>\r\n          <tr *ngFor=\"let activit of initiate.activities;let k=index;\">\r\n           <td [style.border-top]=\"k?'1px solid #ddd':'none'\">{{activit.activity}}</td>\r\n           <td colspan=\"4\" style=\"padding:0px;\" #element2 [style.height]=\"get(element2) + ' !important'\">\r\n            <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n             <colgroup>\r\n              <col style=\"width:40%\">\r\n              <col style=\"width:22%\">\r\n              <col style=\"width:25%\">\r\n              <col style=\"width:13%\">\r\n             </colgroup>\r\n             <tr *ngFor=\"let msr of activit.opis;let l=index\">\r\n              <td [style.border-top]=\"l?'1px solid #ddd':'none'\">{{msr.opi}}</td>\r\n              <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n               <!-- {{msr.frequency}} -->\r\n               <ul style=\"list-style:none;padding:0px;\" class=\"table-list\">\r\n                 <li *ngIf=\"!msr.departmentInfo.length\">None</li>\r\n                 <li *ngFor=\"let dept of msr.departmentInfo;let d = index\">{{dept.department}}, </li>\r\n               </ul>\r\n              </td>\r\n              <td style=\"text-transform: capitalize;\">\r\n               <p *ngIf=\"msr.quarterStatus\">\r\n                <a data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"selectedMeasure=msr;\" style=\"text-transform:uppercase\">{{msr.quarterStatus.status}}\r\n                 <br>\r\n                 <span style=\"text-transform: uppercase\">({{msr.quarterStatus.role}})</span>\r\n                </a>\r\n               </p>\r\n              </td>\r\n              <td>\r\n               <a [routerLink]=\"msr.opiId\">view</a>\r\n              </td>\r\n             </tr>\r\n            </table>\r\n           </td>\r\n          </tr>\r\n         </table>\r\n        </td>\r\n       </tr>\r\n      </table>\r\n     </td>\r\n    </tr>\r\n   </tbody>\r\n   <tfoot *ngIf=\"!goals.length\">\r\n    <tr>\r\n     <td colspan=\"4\" class=\"text-center\">No Data to Display .,.</td>\r\n    </tr>\r\n   </tfoot>\r\n  </table>\r\n </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/hod/assigned-kpi/kpi.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KPIComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_filters__ = __webpack_require__("../../../../../src/app/shared/filters.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hod_service__ = __webpack_require__("../../../../../src/app/hod/hod.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_alertifyjs__ = __webpack_require__("../../../../alertifyjs/build/alertify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_alertifyjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_alertifyjs__);
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





var KPIComponent = (function (_super) {
    __extends(KPIComponent, _super);
    function KPIComponent(utServ, storage) {
        var _this = _super.call(this) || this;
        _this.utServ = utServ;
        _this.storage = storage;
        _this.roles = ["coordinator", "hod", "dvc", "vc", "chanceller"];
        _this.getOpi();
        return _this;
    }
    KPIComponent.prototype.getOpi = function () {
        var _this = this;
        this.utServ.getOpiByDeptId(this.storage.getData('user_roleInfo')[0].departmentId).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.initFilters(response);
            }
        });
    };
    KPIComponent.prototype.setQuarterFeedback = function (data) {
        var _this = this;
        console.log(data.feedback);
        if (data.feedback == 'true')
            __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["confirm"]("Do you realy want to Approve this??", function () {
                _this.utServ.approve(data.id, { comment: data.comment }).subscribe(function (reponse) {
                    console.log(reponse);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Audit has been Approved");
                    $("#feedbackModal").modal('hide');
                }, function (error) {
                    console.log(error);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Something went wrong");
                    $("#feedbackModal").modal('hide');
                });
            });
        else
            __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["confirm"]("Do you realy want to Reject this??", function () {
                _this.utServ.reject(data.id, { comment: data.comment }).subscribe(function (reponse) {
                    console.log(reponse);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Audit has been Rejected");
                }, function (error) {
                    console.log(error);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Something went wrong");
                });
            });
    };
    KPIComponent.prototype.showOpi = function (goal, measure) {
        $('#edit-block').show();
        $('#edit-section').collapse('show');
        console.log(measure);
    };
    KPIComponent.prototype.hideEditBlock = function () {
        $('#edit-block').hide();
    };
    KPIComponent.prototype.get = function (e) {
        var promise = new Promise(function (resolve, reject) { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
        return promise;
    };
    return KPIComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_filters__["a" /* Filters */]));
KPIComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'assigned-kpi',
        template: __webpack_require__("../../../../../src/app/hod/assigned-kpi/kpi.component.html"),
        styles: [__webpack_require__("../../../../../src/app/hod/hod.component.css"), __webpack_require__("../../../../../src/app/coordinator/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__hod_service__["a" /* HodService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__hod_service__["a" /* HodService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _b || Object])
], KPIComponent);

var _a, _b;
//# sourceMappingURL=kpi.component.js.map

/***/ }),

/***/ "../../../../../src/app/hod/departments/departments.component.html":
/***/ (function(module, exports) {

module.exports = "<hod></hod>\r\n<div class=\"container-fluid\">\r\n <div class=\"panel\" *ngIf=\"data\" id=\"edit-block\" style=\"margin-top:50px;\">\r\n  <div class=\"panel-heading\">\r\n   <h4 class=\"panel-title\">\r\n    Assigned KPI : {{data.opi}}\r\n   </h4>\r\n  </div>\r\n  <div class=\"panel-body\">\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <label>Strategic Goal</label>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     {{data.goal}}\r\n    </div>\r\n   </div>\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <label>Initiative</label>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     {{data.initiative}}\r\n    </div>\r\n   </div>\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <label>Activity </label>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     {{data.activity}}\r\n    </div>\r\n   </div>\r\n   <div class=\"row\">\r\n    <div class=\"col-sm-2\">\r\n     <label>OPI </label>\r\n    </div>\r\n    <div class=\"col-sm-10\">\r\n     {{data.opi}}\r\n    </div>\r\n   </div>\r\n\r\n   <div class=\"row mini\">\r\n     <div class=\"col-sm-4\">\r\n      <h5>\r\n       <strong>FREQUENCY</strong>\r\n      </h5>\r\n      <h5>{{data.frequency}}</h5>\r\n     </div>\r\n     <div class=\"col-sm-4\">\r\n      <h5>\r\n       <strong>MEASURE UNIT</strong>\r\n      </h5>\r\n      <h5>{{data.measureUnit}}</h5>\r\n     </div>\r\n     <div class=\"col-sm-4\">\r\n      <h5>\r\n       <strong>EVIDENCE FORM TYPE</strong>\r\n      </h5>\r\n      <h5> {{data.evidanceForm}}\r\n       <p *ngIf=\"!data.evidanceForm\">None</p>\r\n      </h5>\r\n     </div>\r\n    </div>\r\n    <!-- <div class=\"row\">\r\n      <label class=\"col-sm-3\">Corresponding Departments : </label>\r\n      <div class=\"form-group data-list col-sm-9\">\r\n        <input class=\"form-control\">\r\n        <ul>\r\n          <li *ngFor=\"let dept of data.departmentInfo;let d = index;\">\r\n            <label><input type=\"checkbox\">{{dept.department}}</label>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div> -->\r\n\r\n    <br>\r\n    <div class=\"form-group\">\r\n      <label class=\"col-sm-3\">Corresponding Departments : </label>\r\n      <div class=\"col-sm-9\">\r\n        <select class=\"form-control\" (ngModelChange)=\"viewDepartment($event)\" [(ngModel)]=\"department\">\r\n          <option value=\"0\">All Departments</option>\r\n          <option *ngFor=\"let dept of data.departmentInfo;let d = index;\" [ngValue]=\"dept\">{{dept.department}}</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n    <br>\r\n\r\n   <fieldset class=\"the-fieldset\" style=\"position: relative;\" *ngFor=\"let dept of departmentInfo;let d = index;\">\r\n    <legend class=\"the-legend\">{{dept.department}}</legend>\r\n    <a class=\"btn btn-default\" style=\"position: absolute;top: 0;right: 10px;\" (click)=\"getAnnualTargetsByOpiDepartment(dept)\"\r\n     *ngIf=\"!dept.show; else currentBtn\">View All Quarters</a>\r\n    <ng-template #currentBtn>\r\n     <a class=\"btn btn-default\" style=\"position: absolute;top: 0;right: 10px;\" (click)=\"getCurrentAnnualTargets(dept)\">View Current Quarter</a>\r\n    </ng-template>\r\n\r\n    <table id=\"accordion\" class=\"table table-bordered table-edit text-center\">\r\n     <caption>\r\n       <strong>BASE LINE : </strong>{{dept.baseline}}\r\n     </caption>\r\n     <thead>\r\n      <tr>\r\n        <th>Year</th>\r\n        <th>Estimated Cost</th>\r\n        <th>Quarter</th>\r\n        <th>Estimated Target Level</th>\r\n        <th>Current Cost</th>\r\n        <th>Current Target Level</th>\r\n        <th>End Date</th>\r\n        <th>Difference</th>\r\n        <th>Status</th>\r\n        <th>Action</th>\r\n        <th *ngIf=\"!data.evidanceFormId\">Evidence</th>\r\n      </tr>\r\n     </thead>\r\n     <tbody *ngFor=\"let tdl of dept.opiAnnualTargets;let at=index;\">\r\n      <tr>\r\n       <td [attr.rowspan]=\"tdl.levels.length + 3\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n       <td [attr.rowspan]=\"tdl.levels.length + 3\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n      </tr>\r\n      <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n       <tr>\r\n        <td>{{lev.quarter}}</td>\r\n        <td>{{lev.estimatedTargetLevel}}</td>\r\n        <td>{{lev.currentCost}}</td>\r\n        <td>{{lev.currentTargetLevel}}</td>\r\n        <td>{{lev.endDate + tdl.year}}</td>\r\n        <td [style.background]=\"lev.SuccessInfo.color\">\r\n         {{lev.SuccessInfo.difference}}\r\n         <i class=\"glyphicon glyphicon-ok-circle\" *ngIf=\"lev.SuccessInfo.target=='complete';else incomplete\"></i>\r\n         <ng-template #incomplete>\r\n          <i class=\"glyphicon glyphicon-remove-circle\"></i>\r\n         </ng-template>\r\n        </td>\r\n        <td style=\"text-transform: capitalize;\">{{lev.status}}</td>\r\n        <td>\r\n         <button class=\"btn-link\" data-toggle=\"modal\" data-target=\"#feedbackModal\" (click)=\"selectedLevel = lev;\" [disabled]=\"lev.status!='locked'\">\r\n          Approve/Reject</button>\r\n        </td>\r\n        <td *ngIf=\"!data.evidanceFormId\">\r\n         <div class=\"dropdown\" *ngIf=\"lev.evidance&&lev.evidance.length\">\r\n          <a class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"menu1\" data-toggle=\"dropdown\">evidence files\r\n           <span class=\"caret\"></span>\r\n          </a>\r\n          <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"menu1\" style=\"right: 0;left:unset;\">\r\n           <li role=\"presentation\" *ngFor=\"let ev of lev.evidance;let e = index;\">\r\n            <a class=\"btn-link\" role=\"menuitem\" tabindex=\"-1\" [attr.href]=\"ev.url\">evidance {{e+1}}</a>\r\n           </li>\r\n          </ul>\r\n         </div>\r\n        </td>\r\n       </tr>\r\n       <tr *ngIf=\"lev.internshipGraph&&lev.internshipGraph.length\">\r\n        <td></td>\r\n        <td colspan=\"7\">\r\n         <table class=\"table table-bordered\">\r\n          <caption>\r\n           <b>Internship Details</b>\r\n           <div class=\"dropdown pull-right\" >\r\n             <a class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"menu1\" data-toggle=\"dropdown\">evidence files\r\n              <span class=\"caret\"></span>\r\n             </a>\r\n             <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"menu1\" style=\"right: 0;left:unset;\">\r\n              <li role=\"presentation\" *ngFor=\"let ev of lev.internshipDetails[0].evidance;let e = index;\">\r\n               <a class=\"btn-link\" role=\"menuitem\" tabindex=\"-1\" [attr.href]=\"ev.url\">evidance {{e+1}}</a>\r\n              </li>\r\n             </ul>\r\n            </div>\r\n          </caption>\r\n          <thead>\r\n           <tr>\r\n            <th>Organization</th>\r\n            <th>Supervisor</th>\r\n            <th>Total</th>\r\n           </tr>\r\n          </thead>\r\n          <tbody>\r\n           <tr *ngFor=\"let data of lev.internshipGraph;let z = index;\">\r\n            <td>{{data.organization}}</td>\r\n            <td>{{data.internalSupervisior}}</td>\r\n            <td>{{data.count}}</td>\r\n           </tr>\r\n          </tbody>\r\n         </table>\r\n        </td>\r\n       </tr>\r\n       <tr *ngIf=\"lev.mouDetails&&lev.mouDetails.length\">\r\n        <td></td>\r\n        <td colspan=\"7\">\r\n         <table class=\"table table-bordered\">\r\n          <caption>\r\n           <b>Mous Detail</b>\r\n          </caption>\r\n          <thead>\r\n           <tr>\r\n            <th>*</th>\r\n            <th>Mou Type</th>\r\n            <th>Organisation</th>\r\n            <th>Evidence</th>\r\n           </tr>\r\n          </thead>\r\n          <tbody *ngFor=\"let detail of lev.mouDetails;let d = index;\">\r\n           <tr>\r\n            <th>{{d+1}}</th>\r\n            <td>{{detail.mouType}}</td>\r\n            <td>{{detail.organization}}</td>\r\n            <td>\r\n             <ul style=\"list-style:none;padding:0;\">\r\n              <li *ngIf=\"!detail.evidance.length\">None</li>\r\n              <li style=\"float:left;\" *ngFor=\"let ev of detail.evidance;let e = index;\">\r\n               <a [attr.href]=\"ev.url\"> evidance {{e+1}}</a> ,\r\n              </li>\r\n             </ul>\r\n            </td>\r\n           </tr>\r\n          </tbody>\r\n         </table>\r\n        </td>\r\n       </tr>\r\n      </ng-template>\r\n     </tbody>\r\n    </table>\r\n   </fieldset>\r\n  </div>\r\n </div>\r\n</div>\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"feedbackModal\" role=\"dialog\">\r\n <div class=\"modal-dialog\">\r\n  <div class=\"modal-content\" *ngIf=\"selectedLevel\">\r\n   <div class=\"modal-header\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n    <h4 class=\"modal-title\">{{selectedMeasure.opi}}</h4>\r\n   </div>\r\n   <div class=\"modal-body\">\r\n    <div class=\"form-group\">\r\n     <label for=\"optradio\">Feedback :</label>\r\n     <label class=\"radio-inline\">\r\n      <input type=\"radio\" name=\"optradio\" [(ngModel)]=\"selectedLevel.feedback\" value=\"true\">Approve\r\n     </label>\r\n     <label class=\"radio-inline\">\r\n      <input type=\"radio\" name=\"optradio\" [(ngModel)]=\"selectedLevel.feedback\" value=\"false\">Reject\r\n     </label>\r\n    </div>\r\n    <div class=\"form-group\">\r\n     <label for=\"comment\">Comment :</label>\r\n     <textarea class=\"form-control\" id=\"comment\" name=\"comment\" [(ngModel)]=\"selectedLevel.comment\"></textarea>\r\n    </div>\r\n   </div>\r\n   <div class=\"modal-footer\">\r\n    <button type=\"button\" class=\"btn btn-btn-success\" (click)=\"setQuarterFeedback(selectedLevel)\">Submit</button>\r\n    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n   </div>\r\n  </div>\r\n\r\n </div>\r\n</div>\r\n\r\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\r\n <div class=\"modal-dialog modal-lg bar\">\r\n  <div class=\"modal-content\" *ngIf=\"selectedMeasure\">\r\n   <div class=\"modal-header\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n    <h4 class=\"modal-title\">Current Status of KPI</h4>\r\n   </div>\r\n   <div class=\"modal-body\">\r\n    <div customBox>\r\n     <div line [class]=\"selectedMeasure.quarterStatus[role]\" *ngFor=\"let role of roles;\">\r\n      <h4>{{role}}</h4>\r\n     </div>\r\n    </div>\r\n    <div id=\"statu-legend\">\r\n     <ul>\r\n      <li class=\"white\">None</li>\r\n      <li class=\"cyan\">Locked</li>\r\n      <li class=\"green\">Approved</li>\r\n      <li class=\"red\">Rejected</li>\r\n     </ul>\r\n    </div>\r\n   </div>\r\n  </div>\r\n </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/hod/departments/departments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hod_service__ = __webpack_require__("../../../../../src/app/hod/hod.service.ts");
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
    function DepartmentsComponent(route, utServ) {
        var _this = this;
        this.route = route;
        this.utServ = utServ;
        this.department = 0;
        this.departmentInfo = [];
        this.departmentsCopy = [];
        this.route.params.subscribe(function (params) {
            _this.utServ.getDepartmentByOpiId(params['id']).subscribe(function (response) {
                _this.data = response[0];
                _this.departmentInfo = response[0].departmentInfo;
                _this.departmentsCopy = response[0].departmentInfo;
            });
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
    return DepartmentsComponent;
}());
DepartmentsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'dept',
        template: __webpack_require__("../../../../../src/app/hod/departments/departments.component.html"),
        styles: [__webpack_require__("../../../../../src/app/hod/hod.component.css"), __webpack_require__("../../../../../src/app/coordinator/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__hod_service__["a" /* HodService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__hod_service__["a" /* HodService */]) === "function" && _b || Object])
], DepartmentsComponent);

var _a, _b;
//# sourceMappingURL=departments.component.js.map

/***/ }),

/***/ "../../../../../src/app/hod/hod.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".table{\r\n margin-bottom: 0px;\r\n}\r\n.table .table {\r\n background-color: inherit;\r\n}\r\n\r\n.dropdown-menu{\r\n    border:2px solid var(--color-primary);\r\n}\r\n\r\n.btn-save{\r\n    background: var(--color-primary);\r\n    border-color:var(--color-primary);\r\n    color:var(--color-text);\r\n  }\r\n  \r\n  .btn-save:hover ,.btn-save:active ,.btn-save:focus{\r\n    background: var(--color-primary);\r\n    border-color:var(--color-primary);\r\n    color:var(--color-text);\r\n  }\r\n\r\n  \r\n.table-card .table1{\r\n    background:var(--color0);\r\n    margin-bottom: 0px;\r\n    box-shadow: 0 1px 8px 0 rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.12); \r\n  }\r\n  \r\n  \r\n  .table-card thead{\r\n    background: var(--color-primary);\r\n    color:var(--color0);\r\n  }\r\n  \r\n  .hide-text{\r\n    float: left;\r\n    position: absolute;\r\n    margin-top: 10px;\r\n  }\r\n  \r\n  \r\n\r\n\r\n/* serach css end */\r\n.edit-panel .panel-title{\r\n  padding: 10px;\r\n}\r\n\r\n.mini {\r\n  text-align: center;\r\n}\r\n\r\n.mini strong{\r\n  text-decoration: underline;\r\n  color: var(--color-primary);\r\n}\r\n\r\n/* legand */\r\n.the-legend {\r\n  background: var(--color-text);\r\n  color:var(--color-primary);\r\n  border-style: none;\r\n  border-width: 0;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  text-transform: capitalize;\r\n  line-height: 20px;\r\n  margin-bottom: 0;\r\n  width: auto;\r\n  padding: 8px 16px;\r\n  border: 1px solid var(--color-text);\r\n  border-radius: 6px;\r\n}\r\n.the-fieldset {\r\n  border: 1px solid var(--color-primary);\r\n  padding: 10px;\r\n  margin-bottom: 10px;\r\n}\r\n/* legand */\r\n\r\n\r\n.panel-heading{\r\n  background: var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.bar .modal-header{\r\n  background: var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.bar .close{\r\n  color:var(--coolor0);\r\n  opacity: 1;\r\n}\r\n\r\n/* edit-table */\r\n .table-edit thead {\r\n   background: var(--color-primary);\r\n   color:var(--color-text);\r\n    text-transform: uppercase;\r\n }\r\n\r\n\r\n .edit-text{\r\n   text-transform: uppercase;\r\n   color:var(--color-primary);\r\n   text-decoration: underline;\r\n }\r\n\r\n .glyphicon glyphicon-chevron-down:focus {\r\n  outline: -webkit-focus-ring-color auto 0px;\r\n}\r\n\r\n\r\n.table-edit .close{\r\n  color:var(--color-primary);\r\n}\r\n.close:focus {\r\n  outline: -webkit-focus-ring-color auto 0px;\r\n}\r\n\r\n\r\n.box{\r\n  background: var(--color-text);\r\n  padding: 13px;\r\n  width: 80%;\r\n  margin-top: 15px;\r\n  margin-left: 13px;\r\n  text-align: center;\r\n  font-size: 17px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.box a{\r\n  color:var(--color-primary);\r\n}\r\n\r\n.file{\r\n color: #563d7c;\r\n}\r\n\r\n.header-background th{\r\n  text-transform: uppercase;\r\n  vertical-align: middle;\r\n}\r\n\r\n.heading-details{\r\n  font-size: 16px;\r\n  text-transform: uppercase;\r\n  color: #563d7c;\r\n  font-weight: 700;\r\n  text-align: center;\r\n  text-decoration: underline;\r\n  \r\n}\r\n\r\n.btn-save{\r\n  background: var(--color-primary);\r\n  border-color:var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.btn-save:hover ,.btn-save:active ,.btn-save:focus{\r\n  background: var(--color-primary);\r\n  border-color:var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.panel-title .close{\r\n  color:var(--color-text);\r\n  opacity: 1;\r\n}\r\n\r\n/* edit-table */\r\n\r\n/* form-control */\r\n.bg-color{\r\n  background: white;\r\n}\r\n\r\n.form-control{\r\n  background: white;\r\n}\r\n\r\n.form-group label{\r\n  font-weight: 600;\r\n  color:var(--color-primary);\r\n}\r\n\r\n.panel-body label{\r\n    text-transform: uppercase;\r\n}\r\n\r\n.data-list ul{\r\n  border: 1px solid skyblue;\r\n\tdisplay:none;\r\n    list-style:none;\r\n    padding:0px;\r\n    margin:0px;\r\n}\r\n\r\n.data-list ul li{\r\n  padding: 2px;\r\n}\r\n.data-list ul:hover{\r\ndisplay:block;\r\n}\r\n\r\n.data-list ul li:hover{\r\n\tbackground:#4d85b4;\r\n  color:white;\r\n}\r\n.data-list input:focus + ul{\r\n\tdisplay:block;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/hod/hod.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-fixed-top\" id=\"top\">\r\n  <div class=\"navbar-header\">\r\n    <a class=\"navbar-brand\" href=\"#\">UAEU</a>\r\n  </div>\r\n  <ul class=\"nav navbar-nav navbar-left\">\r\n    <li routerLinkActive=\"active\">\r\n      <a routerLink=\"/\">Assigned Operational Performance Indicators</a>\r\n    </li>\r\n  </ul>\r\n  <ul class=\"nav navbar-nav navbar-right\" style=\"margin-right:0px;\">\r\n    <li class=\"dropdown\">\r\n      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n        <span class=\"glyphicon glyphicon-user\"></span>\r\n        <strong style=\"text-transform: capitalize\">{{userDetails.firstName}}({{userDetails.roleInfo[0].role}})</strong>\r\n        <span class=\"glyphicon glyphicon-chevron-down\"></span>\r\n      </a>\r\n      <ul class=\"dropdown-menu\">\r\n        <li>\r\n          <div class=\"navbar-login\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-4\">\r\n                <p class=\"text-center\">\r\n                  <span class=\"glyphicon glyphicon-user icon-size\"></span>\r\n                </p>\r\n              </div>\r\n              <div class=\"col-lg-8\">\r\n                <p class=\"text-left\">\r\n                  <strong>{{userDetails.firstName}} {{userDetails.lastName}}</strong>\r\n                  <br>\r\n                </p>\r\n                <p class=\"text-left small\">{{userDetails.email}}</p>\r\n                <b>Department : </b>\r\n                <p class=\"text-left small\">{{userDetails.roleInfo[0].department}}</p>\r\n                <!-- <p class=\"text-left\">\r\n                  <a href=\"#\" class=\"btn btn-primary btn-block btn-sm\">Profile</a>\r\n                </p> -->\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </li>\r\n        <li class=\"divider\"></li>\r\n        <li>\r\n          <div class=\"navbar-login navbar-login-session\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-6\"></div>\r\n              <div class=\"col-sm-6\">\r\n                <p>\r\n                  <a routerLink=\"/login\" class=\"btn btn-danger btn-block btn-save\" (click)=\"logout()\">Logout</a>\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</nav>\r\n<!-- <router-outlet></router-outlet> -->\r\n<!--NEW EDIT SECTION  CODESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-->\r\n<!-- <div class=\"container-fulid\">\r\n  <div class=\"panel\" *ngIf=\"selectedOpi\" id=\"edit-block\" style=\"margin-top:50px;\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#edit-section\">Edit Section</a>\r\n        <button type=\"button\" class=\"close\" (click)=\"hideEditBlock()\">&times;</button>\r\n      </h4>\r\n    </div>\r\n    <div id=\"edit-section\" class=\"panel-collapse collapse in\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <label>Strategic Goal</label>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            {{selectedOpi.goal}}\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <label>Initiative</label>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            {{selectedInitiative.initiative}}\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <label>Activity </label>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            {{selectedActivity.activity}}\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <label>OPI </label>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            {{selectedMeasure.opi}}\r\n          </div>\r\n        </div>\r\n        <div class=\"row mini\">\r\n          <div class=\"col-sm-3\">\r\n            <h5>\r\n              <strong>FREQUENCY</strong>\r\n            </h5>\r\n            <h5>{{selectedMeasure.frequency}}</h5>\r\n          </div>\r\n          <div class=\"col-sm-3\">\r\n            <h5>\r\n              <strong>MEASURE UNIT</strong>\r\n            </h5>\r\n            <h5>{{selectedMeasure.measureUnit}}</h5>\r\n          </div>\r\n          <div class=\"col-sm-3\">\r\n            <h5>\r\n              <strong>BASE LINE</strong>\r\n            </h5>\r\n            <h5>{{selectedMeasure.departmentInfo[0].baseline}}</h5>\r\n          </div>\r\n          <div class=\"col-sm-3\">\r\n            <h5>\r\n              <strong>EVIDENCE FORM TYPE</strong>\r\n            </h5>\r\n            <h5> {{selectedMeasure.evidanceForm}}\r\n              <p *ngIf=\"!selectedMeasure.evidanceForm\">None</p>\r\n            </h5>\r\n          </div>\r\n        </div>\r\n        <fieldset class=\"the-fieldset\" style=\"position: relative;\">\r\n          <legend class=\"the-legend\">Edit-Section</legend>\r\n          <a class=\"btn btn-default\" style=\"position: absolute;top: 0;right: 10px;\" (click)=\"getAnnualTargetsByOpiDepartment(selectedMeasure.departmentInfo[0])\"\r\n            *ngIf=\"!currentAnnualTargets.length; else currentBtn\">View All Quarters</a>\r\n          <ng-template #currentBtn>\r\n            <a class=\"btn btn-default\" style=\"position: absolute;top: 0;right: 10px;\" (click)=\"getCurrentAnnualTargets(selectedMeasure.departmentInfo[0])\">View Current Quarter</a>\r\n          </ng-template>\r\n            <table id=\"accordion\" class=\"table table-bordered table-edit text-center\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Year</th>\r\n                  <th>Estimated Cost</th>\r\n                  <th>Quarter</th>\r\n                  <th>Estimated Target Level</th>\r\n                  <th>Current Cost</th>\r\n                  <th>Current Target Level</th>\r\n                  <th>End Date</th>\r\n                  <th>Status</th>\r\n                  <th>Action</th>\r\n                  <th *ngIf=\"!selectedMeasure.evidanceFormId\">Evidence</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody *ngFor=\"let tdl of selectedMeasure.departmentInfo[0].opiAnnualTargets;let at=index;\" >\r\n                <tr>\r\n                  <td [attr.rowspan]=\"tdl.levels.length + 3\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n                  <td [attr.rowspan]=\"tdl.levels.length + 3\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n                </tr>\r\n                <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n                  <tr [style.background]=\"lev.SuccessInfo.color\">\r\n                    <td>{{lev.quarter}}</td>\r\n                    <td>{{lev.estimatedTargetLevel}}</td>\r\n                    <td>{{lev.currentCost}}</td>\r\n                    <td>{{lev.currentTargetLevel}}</td>\r\n                    <td>{{lev.endDate + tdl.year}}</td>\r\n                    <td style=\"text-transform: capitalize;\">{{lev.status}}</td>\r\n                    <td>\r\n                      <button class=\"btn-link\" data-toggle=\"modal\" data-target=\"#feedbackModal\" (click)=\"selectedLevel = lev;\" [disabled]=\"lev.status!='locked'\">\r\n                      Approve/Reject</button>\r\n                    </td>\r\n                    <td *ngIf=\"!selectedMeasure.evidanceFormId\">\r\n                      <div class=\"dropdown\" *ngIf=\"lev.evidance&&lev.evidance.length\">\r\n                        <a class=\"btn btn-link dropdown-toggle\" type=\"button\" id=\"menu1\" data-toggle=\"dropdown\">evidence files\r\n                          <span class=\"caret\"></span>\r\n                        </a>\r\n                        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"menu1\" style=\"right: 0;left:unset;\">\r\n                          <li role=\"presentation\" *ngFor=\"let ev of lev.evidance;let e = index;\">\r\n                            <a class=\"btn-link\" role=\"menuitem\" tabindex=\"-1\" [attr.href]=\"ev.url\">evidance {{e+1}}</a>\r\n                          </li>\r\n                        </ul>\r\n                      </div>\r\n                    </td>\r\n                  </tr>\r\n                  <tr *ngIf=\"lev.internshipGraph&&lev.internshipGraph.length\">\r\n                    <td></td>\r\n                    <td colspan=\"6\">\r\n                      <table class=\"table table-bordered\">\r\n                        <caption>\r\n                          <b>Internship Details</b>\r\n                        </caption>\r\n                        <thead>\r\n                          <tr>\r\n                            <th>Organization</th>\r\n                            <th>Supervisor</th>\r\n                            <th>Total</th>\r\n                          </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                          <tr *ngFor=\"let data of lev.internshipGraph;let z = index;\">\r\n                            <td>{{data.organization}}</td>\r\n                            <td>{{data.internalSupervisior}}</td>\r\n                            <td>{{data.count}}</td>\r\n                          </tr>\r\n                        </tbody>\r\n                      </table>\r\n                    </td>\r\n                  </tr>\r\n                  <tr *ngIf=\"lev.mouDetails&&lev.mouDetails.length\">\r\n                    <td></td>\r\n                    <td colspan=\"6\">\r\n                      <table class=\"table table-bordered\">\r\n                        <caption>\r\n                          <b>Mous Detail</b>\r\n                        </caption>\r\n                        <thead>\r\n                          <tr>\r\n                            <th>*</th>\r\n                            <th>Mou Type</th>\r\n                            <th>Organisation</th>\r\n                            <th>Evidence</th>\r\n                          </tr>\r\n                        </thead>\r\n                        <tbody *ngFor=\"let detail of lev.mouDetails;let d = index;\">\r\n                          <tr>\r\n                            <th>{{d+1}}</th>\r\n                            <td>{{detail.mouType}}</td>\r\n                            <td>{{detail.organization}}</td>\r\n                            <td>\r\n                              <ul style=\"list-style:none;padding:0;\">\r\n                                <li *ngIf=\"!detail.evidance.length\">None</li>\r\n                                <li style=\"float:left;\" *ngFor=\"let ev of detail.evidance;let e = index;\">\r\n                                  <a [attr.href]=\"ev.url\"> evidance {{e+1}}</a> ,\r\n                                </li>\r\n                              </ul>\r\n                            </td>\r\n                          </tr>\r\n                        </tbody>\r\n                      </table>\r\n                    </td>\r\n                  </tr>\r\n                </ng-template>\r\n              </tbody>\r\n            </table>\r\n        </fieldset>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div> -->\r\n\r\n<!-- NEW EDIT SECTION CODESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS enddddddddddddddddddddddddddddd -->\r\n<!-- <div class=\"container-fluid\">\r\n  <div class=\"panel\" *ngIf=\"selectedOpi\" id=\"edit-block\" style=\"margin-top:50px;\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#edit-section\">Edit Section</a>\r\n        <button type=\"button\" class=\"close\" (click)=\"hideEditBlock()\">&times;</button>\r\n      </h4>\r\n    </div>\r\n    <div id=\"edit-section\" class=\"panel-collapse collapse in\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-6\">\r\n            <label>Strategic Goal :</label> {{selectedOpi.goal}}\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <label>Initiative :</label> {{selectedInitiative.initiative}}\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <label>Activity :</label> {{selectedActivity.activity}}\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <label>OPI :</label> {{selectedMeasure.opi}}\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <label>Frequency :</label> {{selectedMeasure.frequency}}\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <label>Measure Unit :</label> {{selectedMeasure.measureUnit}}\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <label>Base Line :</label> {{selectedMeasure.departmentInfo[0].baseline}}\r\n          </div>\r\n          <div class=\"col-lg-6\">\r\n            <label>Evidence Form Type :</label> {{selectedMeasure.evidanceForm}}\r\n            <p *ngIf=\"!selectedMeasure.evidanceForm\">None</p>\r\n          </div>\r\n        </div>\r\n\r\n        <table id=\"accordion\" class=\"table table-bordered text-center\">\r\n          <thead>\r\n            <tr>\r\n              <th>Year</th>\r\n              <th>Estimated Cost</th>\r\n              <th>Quarter</th>\r\n              <th>Estimated Target Level</th>\r\n              <th>Current Cost</th>\r\n              <th>Current Target Level</th>\r\n              <th>End Date</th>\r\n              <th>Status</th>\r\n              <th></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody *ngFor=\"let tdl of selectedMeasure.departmentInfo[0].opiAnnualTargets;let at=index;\">\r\n            <tr>\r\n              <td [attr.rowspan]=\"tdl.levels.length + 3\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n              <td [attr.rowspan]=\"tdl.levels.length + 3\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n            </tr>\r\n            <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n              <tr>\r\n                <td>{{lev.quarter}}</td>\r\n                <td>{{lev.estimatedTargetLevel}}</td>\r\n                <td>{{lev.currentCost}}</td>\r\n                <td>{{lev.currentTargetLevel}}</td>\r\n                <td>{{lev.endDate + tdl.year}}</td>\r\n                <td style=\"text-transform: capitalize;\">{{lev.status}}</td>\r\n                <td>\r\n                  <button class=\"btn-link\" data-toggle=\"modal\" data-target=\"#feedbackModal\" (click)=\"selectedLevel = lev;\" [disabled]=\"lev.status!='locked'\"> Approve/Reject</button>\r\n                </td>\r\n              </tr>\r\n              <tr *ngIf=\"lev.evidance&&lev.evidance.length\">\r\n                <td colspan=\"7\">\r\n                  <b>Evidences</b>\r\n                  <br>\r\n                  <div class=\"row\" *ngFor=\"let ev of lev.evidance;let e = index;\">\r\n                    <div class=\"col-lg-6\">\r\n                      <a [attr.href]=\"ev.url\">{{e+1}}) evidance {{e+1}}</a>\r\n                    </div>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n              <tr *ngIf=\"lev.internshipGraph&&lev.internshipGraph.length\">\r\n                <td></td>\r\n                <td colspan=\"6\">\r\n                  <table class=\"table table-bordered\">\r\n                    <caption>\r\n                      <b>Internship Details</b>\r\n                    </caption>\r\n                    <thead>\r\n                      <tr>\r\n                        <th>Organization</th>\r\n                        <th>Supervisor</th>\r\n                        <th>Total</th>\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let data of lev.internshipGraph;let z = index;\">\r\n                        <td>{{data.organization}}</td>\r\n                        <td>{{data.internalSupervisior}}</td>\r\n                        <td>{{data.count}}</td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n              <tr *ngIf=\"lev.mouDetails&&lev.mouDetails.length\">\r\n                <td></td>\r\n                <td colspan=\"6\">\r\n                  <table class=\"table table-bordered\">\r\n                    <caption>\r\n                      <b>Mous Detail</b>\r\n                    </caption>\r\n                    <thead>\r\n                      <tr>\r\n                        <th>*</th>\r\n                        <th>Mou Type</th>\r\n                        <th>Organisation</th>\r\n                        <th>Evidence</th>\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody *ngFor=\"let detail of lev.mouDetails;let d = index;\">\r\n                      <tr>\r\n                        <th>{{d+1}}</th>\r\n                        <td>{{detail.mouType}}</td>\r\n                        <td>{{detail.organization}}</td>\r\n                        <td>\r\n                          <ul style=\"list-style:none;padding:0;\">\r\n                            <li *ngIf=\"!detail.evidance.length\">None</li>\r\n                            <li style=\"float:left;\" *ngFor=\"let ev of detail.evidance;let e = index;\">\r\n                              <a [attr.href]=\"ev.url\"> evidance {{e+1}}</a> ,\r\n                            </li>\r\n                          </ul>\r\n                        </td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n            </ng-template>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"card table-card\" style=\"margin-top:50px;\">\r\n    <table class=\"table table-bordered table1 text-center\">\r\n      <colgroup>\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:16%\">\r\n        <col style=\"width:8.8%\">\r\n        <col style=\"width:9.9%\">\r\n        <col style=\"width:5.19%\">\r\n      </colgroup>\r\n      <thead class=\"header-background\" *ngIf=\"goals.length\">\r\n        <tr>\r\n          <th>\r\n            <span class=\"hide-text\">GOAL</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchGoal($event)\" placeholder=\"GOAL\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">INITIATIVE</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchInitiative($event)\" placeholder=\"INITIATIVE\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">ACTIVITY</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchActivity($event)\" placeholder=\"ACTIVITY\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">KPI</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchOpi($event)\" placeholder=\"KPI\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>Frequency</th>\r\n          <th>Status</th>\r\n          <th>View</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let goal of goals;let i = index;\">\r\n          <td>{{goal.goal}}</td>\r\n          <td colspan=\"6\" style=\"padding:0px;border:none;\" #element [style.height]=\"get(element)\">\r\n            <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n              <colgroup>\r\n                <col style=\"width:25%\">\r\n                <col style=\"width:75%\">\r\n              </colgroup>\r\n              <tr *ngFor=\"let initiate of goal.initiatives;let j=index;\">\r\n                <td>{{initiate.initiative}}</td>\r\n                <td colspan=\"4\" style=\"padding:0px;\" #element1 [style.height]=\"get(element1)\">\r\n                  <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n                    <colgroup>\r\n                      <col style=\"width:33.33%\">\r\n                      <col style=\"width:66.67%\">\r\n                    </colgroup>\r\n                    <tr *ngFor=\"let activit of initiate.activities;let k=index;\">\r\n                      <td [style.border-top]=\"k?'1px solid #ddd':'none'\">{{activit.activity}}</td>\r\n                      <td colspan=\"4\" style=\"padding:0px;\" #element2 [style.height]=\"get(element2) + ' !important'\">\r\n                        <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n                          <colgroup>\r\n                            <col style=\"width:40%\">\r\n                            <col style=\"width:22%\">\r\n                            <col style=\"width:25%\">\r\n                            <col style=\"width:13%\">\r\n                          </colgroup>\r\n                          <tr *ngFor=\"let msr of activit.opis;let l=index\">\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">{{msr.opi}}</td>\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">{{msr.frequency}}</td>\r\n                            <td style=\"text-transform: capitalize;\">\r\n                              <p *ngIf=\"msr.quarterStatus\">\r\n                                <a data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"selectedMeasure=msr;\" style=\"text-transform:uppercase\">{{msr.quarterStatus.status}}\r\n                                  <br>\r\n                                  <span style=\"text-transform: uppercase\">({{msr.quarterStatus.role}})</span>\r\n                                </a>\r\n                              </p>\r\n                            </td>\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                              <a scrollTo href=\"#top\" (click)=\"selectedOpi=goal;selectedInitiative=initiate;selectedActivity=activit;selectedMeasure=msr;showOpi(goal,msr)\">view</a>\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n      <tfoot *ngIf=\"!goals.length\">\r\n        <tr>\r\n          <td colspan=\"4\" class=\"text-center\">No Data to Display .,.</td>\r\n        </tr>\r\n      </tfoot>\r\n    </table>\r\n  </div>\r\n</div> -->\r\n\r\n<!-- Modal -->\r\n<!-- <div class=\"modal fade\" id=\"feedbackModal\" role=\"dialog\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\" *ngIf=\"selectedLevel\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\">{{selectedMeasure.opi}}</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"form-group\">\r\n          <label for=\"optradio\">Feedback :</label>\r\n          <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"optradio\" [(ngModel)]=\"selectedLevel.feedback\" value=\"true\">Approve\r\n          </label>\r\n          <label class=\"radio-inline\">\r\n            <input type=\"radio\" name=\"optradio\" [(ngModel)]=\"selectedLevel.feedback\" value=\"false\">Reject\r\n          </label>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"comment\">Comment :</label>\r\n          <textarea class=\"form-control\" id=\"comment\" name=\"comment\" [(ngModel)]=\"selectedLevel.comment\"></textarea>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-btn-success\" (click)=\"setQuarterFeedback(selectedLevel)\">Submit</button>\r\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-lg bar\">\r\n    <div class=\"modal-content\" *ngIf=\"selectedMeasure\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\">Current Status of KPI</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div customBox>\r\n          <div line [class]=\"selectedMeasure.quarterStatus[role]\" *ngFor=\"let role of roles;\">\r\n            <h4>{{role}}</h4>\r\n          </div>\r\n        </div>\r\n        <div id=\"statu-legend\">\r\n          <ul>\r\n            <li class=\"white\">None</li>\r\n            <li class=\"cyan\">Locked</li>\r\n            <li class=\"green\">Approved</li>\r\n            <li class=\"red\">Rejected</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div> -->"

/***/ }),

/***/ "../../../../../src/app/hod/hod.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HodComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_filters__ = __webpack_require__("../../../../../src/app/shared/filters.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hod_service__ = __webpack_require__("../../../../../src/app/hod/hod.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_alertifyjs__ = __webpack_require__("../../../../alertifyjs/build/alertify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_alertifyjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_alertifyjs__);
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





var HodComponent = (function (_super) {
    __extends(HodComponent, _super);
    function HodComponent(utServ, storage) {
        var _this = _super.call(this) || this;
        _this.utServ = utServ;
        _this.storage = storage;
        _this.userDetails = {};
        _this.roles = ["coordinator", "hod", "dvc", "vc", "chanceller"];
        _this.currentAnnualTargets = [];
        _this.allAnnualTargets = [];
        _this.userDetails = storage.getData('userDetails');
        _this.getOpi();
        return _this;
    }
    HodComponent.prototype.getOpi = function () {
        var _this = this;
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
        });
    };
    HodComponent.prototype.setQuarterFeedback = function (data) {
        var _this = this;
        console.log(data.feedback);
        if (data.feedback == 'true')
            __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["confirm"]("Do you realy want to Approve this??", function () {
                _this.utServ.approve(data.id, { comment: data.comment }).subscribe(function (reponse) {
                    console.log(reponse);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Audit has been Approved");
                    $("#feedbackModal").modal('hide');
                }, function (error) {
                    console.log(error);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Something went wrong");
                    $("#feedbackModal").modal('hide');
                });
            });
        else
            __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["confirm"]("Do you realy want to Reject this??", function () {
                _this.utServ.reject(data.id, { comment: data.comment }).subscribe(function (reponse) {
                    console.log(reponse);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Audit has been Rejected");
                }, function (error) {
                    console.log(error);
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["notify"]("Something went wrong");
                });
            });
    };
    HodComponent.prototype.getAnnualTargetsByOpiDepartment = function (department) {
        var _this = this;
        this.utServ.getAnnualTargets(department.id).subscribe(function (response) {
            console.log(response);
            _this.currentAnnualTargets = department.opiAnnualTargets;
            department.opiAnnualTargets = response;
        });
    };
    HodComponent.prototype.getCurrentAnnualTargets = function (department) {
        this.allAnnualTargets = department.opiAnnualTargets;
        department.opiAnnualTargets = this.currentAnnualTargets;
        this.currentAnnualTargets = [];
    };
    HodComponent.prototype.showOpi = function (goal, measure) {
        $('#edit-block').show();
        $('#edit-section').collapse('show');
        console.log(measure);
    };
    HodComponent.prototype.hideEditBlock = function () {
        $('#edit-block').hide();
    };
    HodComponent.prototype.get = function (e) {
        var promise = new Promise(function (resolve, reject) { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
        return promise;
    };
    HodComponent.prototype.logout = function () {
        localStorage.clear();
    };
    return HodComponent;
}(__WEBPACK_IMPORTED_MODULE_1__shared_filters__["a" /* Filters */]));
HodComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'hod',
        template: __webpack_require__("../../../../../src/app/hod/hod.component.html"),
        styles: [__webpack_require__("../../../../../src/app/hod/hod.component.css"), __webpack_require__("../../../../../src/app/coordinator/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__hod_service__["a" /* HodService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__hod_service__["a" /* HodService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */]) === "function" && _b || Object])
], HodComponent);

var _a, _b;
//# sourceMappingURL=hod.component.js.map

/***/ }),

/***/ "../../../../../src/app/hod/hod.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HodModule", function() { return HodModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hod_component__ = __webpack_require__("../../../../../src/app/hod/hod.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hod_service__ = __webpack_require__("../../../../../src/app/hod/hod.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_default_header_service__ = __webpack_require__("../../../../../src/app/shared/default.header.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__departments_departments_component__ = __webpack_require__("../../../../../src/app/hod/departments/departments.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__assigned_kpi_kpi_component__ = __webpack_require__("../../../../../src/app/hod/assigned-kpi/kpi.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var HodModule = (function () {
    function HodModule() {
    }
    return HodModule;
}());
HodModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forChild([
                {
                    path: '',
                    component: __WEBPACK_IMPORTED_MODULE_7__assigned_kpi_kpi_component__["a" /* KPIComponent */]
                },
                {
                    path: ':id',
                    component: __WEBPACK_IMPORTED_MODULE_6__departments_departments_component__["a" /* DepartmentsComponent */]
                }
            ])],
        exports: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__hod_component__["a" /* HodComponent */], __WEBPACK_IMPORTED_MODULE_6__departments_departments_component__["a" /* DepartmentsComponent */], __WEBPACK_IMPORTED_MODULE_7__assigned_kpi_kpi_component__["a" /* KPIComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_4__shared_default_header_service__["a" /* CustomHttpService */], __WEBPACK_IMPORTED_MODULE_3__hod_service__["a" /* HodService */]]
    })
], HodModule);

//# sourceMappingURL=hod.module.js.map

/***/ }),

/***/ "../../../../../src/app/hod/hod.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HodService; });
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








var HodService = (function () {
    function HodService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.parent = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'parent': true
            })
        });
        this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
    }
    HodService.prototype.getOpiByDeptId = function (deptId) {
        return this.http.get(this.baseUrl + "/result")
            .map(this.extractData)
            .catch(this.handleError);
    };
    HodService.prototype.approve = function (levelId, data) {
        return this.http.put(this.baseUrl + "/quarter/" + levelId + "/approve", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HodService.prototype.reject = function (levelId, data) {
        return this.http.put(this.baseUrl + "/quarter/" + levelId + "/reject", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HodService.prototype.getAnnualTargets = function (opiDepartmentId) {
        return this.http.get(this.baseUrl + "/opiDepartment/" + opiDepartmentId + "/annualTargets?currentYear=false&currentQuarter=false").map(this.extractData)
            .catch(this.handleError);
    };
    HodService.prototype.getDepartmentByOpiId = function (opiId) {
        return this.http.get(this.baseUrl + "/opi/" + opiId + "/departments", this.parent)
            .map(this.extractData)
            .catch(this.handleError);
    };
    HodService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    HodService.prototype.handleError = function (error) {
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
    return HodService;
}());
HodService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__["a" /* CustomHttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__["a" /* CustomHttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], HodService);

var _a, _b, _c;
//# sourceMappingURL=hod.service.js.map

/***/ })

});
//# sourceMappingURL=hod.module.chunk.js.map