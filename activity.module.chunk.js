webpackJsonp(["activity.module"],{

/***/ "../../../../../src/app/planner/activity/activity.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".table{\r\n margin-bottom: 0px;\r\n}\r\n.table .table {\r\n background-color: inherit;\r\n}\r\n\r\n.title{\r\n    text-align: center;\r\n    text-decoration: underline;\r\n\r\n}\r\n\r\n.add-goal .panel-heading{\r\nbackground: #cf3238;\r\ncolor:white;\r\n border-bottom: 3px solid black;\r\n cursor: pointer;\r\n}\r\n\r\n.add-goal .panel-footer{\r\nbackground-color: #f5f5f500;\r\nborder-top: 1px solid #cf3238\r\n}\r\n\r\n.add-goal .btn-outline-danger{\r\n    background: white;\r\n    border: 1px solid #cf3238;\r\n    color:black;\r\n  }\r\n  \r\n.add-goal .btn-outline-danger:hover{\r\n    background: #cf3238;\r\n    color:white;\r\n }\r\n\r\n\r\n.add-goal .btn-outline-success{\r\n    background: white;\r\n    border: 1px solid #4cae4c;\r\n    color:black;\r\n }\r\n\r\n.add-goal .btn-outline-success:hover{\r\n    background: #4cae4c;\r\n    color:white;  \r\n }\r\n\r\n.table{\r\n  background-color: white;\r\n} \r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/activity/activity.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"panel add-plan\" id=\"add-activity\" style=\"display:none\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#collapse1\" class=\"accordion-toggle\">Add Activity</a>\r\n      </h4>\r\n    </div>\r\n    <div id=\"collapse1\" class=\"panel-collapse collapse\">\r\n      <form [formGroup]=\"activityForm\" (submit)=\"submitActivity()\">\r\n\r\n        <div class=\"panel-body\">\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-6 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label for=\"year\">Plan Year:</label>\r\n                <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\" [ngModel]=\"defaultCycle\" (ngModelChange)=\"getObjective($event)\">\r\n                  <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label for=\"sel1\">Select Goal:</label>\r\n                <select class=\"form-control\" id=\"sel1\" formControlName=\"objectiveId\" (ngModelChange)=\"getInitiative($event)\">\r\n                  <option *ngFor=\"let objective of objectives;let i=index;\" [value]=\"objective.goalId\">{{i+1}}.{{objective.goal}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label for=\"sel1\">Select Initiative:</label>\r\n                <select class=\"form-control\" id=\"sel1\" formControlName=\"initiativeId\">\r\n                  <option *ngFor=\"let initiative of initiatives;let j=index;\" [value]=\"initiative.initiativeId\">{{j+1}}.{{initiative.initiative}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Activity</label>\r\n                <textarea class=\"form-control\" rows=\"3\" formControlName=\"activity\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n        </div>\r\n        <div class=\"panel-footer\">\r\n          <button type=\"submit\" class=\"btn btn-success btn-outline-success btn-empty\" [disabled]=\"activityForm.invalid\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Submit Form\">\r\n            <i class=\"glyphicon glyphicon-ok\"></i>\r\n          </button>\r\n          <button type=\"button\" class=\"btn btn-danger btn-outline-danger btn-close\" data-dismiss=\"modal\" (click)=\"enableFields(); isUpdating = false\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Reset Form\">\r\n            <i class=\"glyphicon glyphicon-remove\"></i>\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"container-fluid\">\r\n  <div class=\"panel detail-plan\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#collapse2\">Proposed Activities</a>\r\n        <div class=\"form-inline pull-right\" style=\"margin-bottom:unset;\">\r\n          <div class=\"form-group\">\r\n            <label class=\"control-label\">Strategic Plan</label>\r\n            <select id=\"year\" name=\"year\" class=\"form-control\" [(ngModel)]=\"defaultCycle\" (ngModelChange)=\"getActivities()\" style=\"width:auto;height: auto;padding: 0px;\">\r\n              <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\" [attr.selected]=\"c.defaultCycle\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}]</option>\r\n            </select>\r\n          </div>\r\n          <button type=\"button\" class=\"btn-info btn-add\" style=\"display: inline-block;\r\n          vertical-align: top;\" (click)=\"addNewActivity()\">\r\n            <span class=\"glyphicon glyphicon-plus\"></span> Add\r\n          </button>\r\n        </div>\r\n      </h4>\r\n    </div>\r\n    <div id=\"collapse2\" class=\"panel-collapse collapse in\">\r\n      <div class=\"panel-body\">\r\n        <table class=\"table table-bordered\">\r\n          <colgroup>\r\n            <col style=\"width:30%\">\r\n            <col style=\"width:30%\">\r\n            <col style=\"width:40%\">\r\n          </colgroup>\r\n          <thead class=\"header-background\" *ngIf=\"goals.length\">\r\n            <tr>\r\n              <th>\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchGoal($event)\" placeholder=\"Goal\">\r\n                </span>\r\n              </th>\r\n              <th>\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchInitiative($event)\" placeholder=\"Initiative\">\r\n                </span>\r\n              </th>\r\n              <th>\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchActivity($event)\" placeholder=\"Activity\">\r\n                </span>\r\n              </th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let goal of goals;let i = index;\">\r\n              <td>{{goal.goal}}</td>\r\n              <td colspan=\"2\" style=\"padding:0px;border:none;\" #element [style.height]=\"get(element)\">\r\n                <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n                  <colgroup>\r\n                    <col style=\"width:42.86%\">\r\n                    <col style=\"width:57.24%\">\r\n                  </colgroup>\r\n                  <tr *ngFor=\"let initiate of goal.initiatives;let j=index;\">\r\n                    <td>{{initiate.initiative}}</td>\r\n                    <td style=\"padding:0px;\" #element1 [style.height]=\"get(element1)\">\r\n                      <table class=\"table\" style=\"height: inherit;\">\r\n                        <colgroup>\r\n                          <col style=\"width:80%\">\r\n                          <col style=\"width:10%\">\r\n                          <col style=\"width:10%\">\r\n                        </colgroup>\r\n                        <tr *ngFor=\"let activit of initiate.activities;let k=index;\">\r\n                          <td [style.border-top]=\"k?'1px solid #ddd':'none'\">{{activit.activity}}</td>\r\n                          <td [style.border-top]=\"k?'1px solid #ddd':'none'\">\r\n                            <span data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Edit\">\r\n                              <i class=\"glyphicon glyphicon-edit btn-edit\" style=\"cursor:pointer;\" (click)=\"updateActivity(goal,initiate,activit)\"></i>\r\n                            </span>\r\n                          </td>\r\n                          <td [style.border-top]=\"k?'1px solid #ddd':'none'\">\r\n                            <span data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Delete\">\r\n                              <i style=\"cursor:pointer;\" class=\"glyphicon glyphicon-trash btn-del\" (click)=\"deleteActivity(activit.activityId,initiate.activities,k)\"></i>\r\n                            </span>\r\n                          </td>\r\n                        </tr>\r\n                      </table>\r\n                    </td>\r\n                  </tr>\r\n                </table>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n          <tfoot *ngIf=\"!goals.length\">\r\n            <tr>\r\n              <td colspan=\"4\" class=\"text-center\">No Data to Display .,.</td>\r\n            </tr>\r\n          </tfoot>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--popup model-->\r\n<div class=\"modal fade\" id=\"activityModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <!-- <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\">Confirm</h4>\r\n      </div> -->\r\n      <div class=\"modal-body color4\">\r\n        <p>Saved successfully .,.</p>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default btn-empty\" data-dismiss=\"modal\" data-toggle=\"collapse\" href=\"#collapse1\">Close</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/activity/activity.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActivityModule", function() { return ActivityModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activity__ = __webpack_require__("../../../../../src/app/planner/activity/activity.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ActivityModule = (function () {
    function ActivityModule() {
    }
    return ActivityModule;
}());
ActivityModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__activity__["a" /* ActivityComponent */]
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__activity__["a" /* ActivityComponent */]],
    })
], ActivityModule);

//# sourceMappingURL=activity.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/activity/activity.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivityComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__ = __webpack_require__("../../../../../src/app/shared/UTI.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_filters__ = __webpack_require__("../../../../../src/app/shared/filters.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_alertifyjs__ = __webpack_require__("../../../../alertifyjs/build/alertify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_alertifyjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_alertifyjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__ = __webpack_require__("../../../../../src/app/shared/loader.service.ts");
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







var ActivityComponent = (function (_super) {
    __extends(ActivityComponent, _super);
    function ActivityComponent(orgService, formBuilder, commonService, loaderService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
        _this.loaderService = loaderService;
        _this.cycles = [];
        _this.quarter = ["Q1", "Q2", "Q3", "Q4"];
        _this.objectiveIndex = [];
        _this.isUpdating = false;
        _this.loaderService.display(true);
        _this.orgService.getCycleWithChildren().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
                _this.objectives = [];
            }
            else {
                _this.cycles = response;
                _this.cycles.forEach(function (element) {
                    if (element.defaultCycle) {
                        _this.defaultCycle = element.cycleId;
                    }
                });
                _this.getActivities();
            }
        });
        _this.activityForm = _this.setActivity();
        return _this;
    }
    ActivityComponent.prototype.ngOnInit = function () {
        // this.getActivities();
    };
    ActivityComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    ActivityComponent.prototype.getObjective = function (cycleId) {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (element.cycleId == cycleId) {
                _this.objectives = element.goals;
                return;
            }
        });
    };
    ActivityComponent.prototype.getActivities = function () {
        var _this = this;
        this.orgService.getActivitiesByCycleId(this.defaultCycle).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.initFilters(response);
            }
            _this.loaderService.display(false);
        }, function (error) {
            _this.loaderService.display(false);
        });
    };
    ActivityComponent.prototype.getInitiative = function (objId) {
        var _this = this;
        if (objId) {
            this.objectives.forEach(function (element) {
                if (element.goalId == objId) {
                    _this.initiatives = element.initiatives;
                    return;
                }
            });
        }
        else {
            this.initiatives = [];
        }
    };
    ActivityComponent.prototype.setActivity = function () {
        return this.formBuilder.group({
            "cycleId": [this.defaultCycle, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "objectiveId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "initiativeId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "activity": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
    };
    ActivityComponent.prototype.submitActivity = function () {
        var _this = this;
        delete this.activityForm.value["cycleId"];
        delete this.activityForm.value["objectiveId"];
        if (!this.isUpdating) {
            this.orgService.saveActivity(this.activityForm.value)
                .subscribe(function (response) {
                $("#add-activity").hide();
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["notify"]("Saved successfully .,.");
                _this.getActivities();
                _this.activityForm.controls["activity"].reset();
            });
        }
        else {
            __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Are you sure you want to Update this Activity?", function () {
                delete _this.activityForm.value["initiativeId"];
                _this.orgService.updateActivity(_this.seletedActivity.activityId, _this.activityForm.value).subscribe(function (res) {
                    _this.getActivities();
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["notify"]("Updated successfully .,.");
                    _this.isUpdating = false;
                    _this.activityForm = _this.setActivity();
                });
            });
        }
    };
    ActivityComponent.prototype.deleteActivity = function (activityId, activities, index) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Are you sure you want to delete this Activity?", function () {
            _this.orgService.deleteActivity(activityId).subscribe(function (res) {
                activities.splice(index, 1);
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["notify"]("Deleted successfully .,.");
            });
        });
    };
    ActivityComponent.prototype.updateActivity = function (objective, initiative, activity) {
        $("#add-activity").show();
        $("#collapse1").collapse('show');
        this.isUpdating = true;
        this.seletedActivity = activity;
        this.activityForm.controls["cycleId"].disable();
        this.activityForm.controls["objectiveId"].disable();
        this.activityForm.controls["initiativeId"].disable();
        this.activityForm.patchValue({
            cycleId: this.defaultCycle,
            objectiveId: objective.goalId,
            initiativeId: initiative.initiativeId,
            activity: activity.activity
        });
    };
    ActivityComponent.prototype.enableFields = function () {
        this.activityForm.controls["cycleId"].enable();
        this.activityForm.controls["objectiveId"].enable();
        this.activityForm.controls["initiativeId"].enable();
        this.activityForm = this.setActivity();
        $("#add-activity").hide();
    };
    ActivityComponent.prototype.addNewActivity = function () {
        this.enableFields();
        this.isUpdating = false;
        $("#add-activity").show();
        $("#collapse1").collapse('show');
        this.activityForm = this.setActivity();
    };
    ActivityComponent.prototype.get = function (e) {
        var promise = new Promise(function (resolve, reject) { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
        return promise;
    };
    return ActivityComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
ActivityComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'activities',
        template: __webpack_require__("../../../../../src/app/planner/activity/activity.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/activity/activity.css"), __webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */]) === "function" && _d || Object])
], ActivityComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=activity.js.map

/***/ })

});
//# sourceMappingURL=activity.module.chunk.js.map