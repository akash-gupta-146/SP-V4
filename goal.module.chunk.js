webpackJsonp(["goal.module"],{

/***/ "../../../../../src/app/planner/goal/goal.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".add-goal .panel-heading{\r\nbackground: #cf3238;\r\ncolor:white;\r\n border-bottom: 3px solid black;\r\n}\r\n\r\n.title{\r\n    text-align: center;\r\n    text-decoration: underline;\r\n}\r\n   \r\n.add-goal .panel-footer{\r\nbackground-color: #f5f5f500;\r\nborder-top: 1px solid #cf3238\r\n}\r\n\r\n.add-goal .btn-outline-danger{\r\n    background: white;\r\n    border: 1px solid #cf3238;\r\n  }\r\n  \r\n .add-goal .btn-outline-danger:hover{\r\n    background: #cf3238;\r\n    color:white;\r\n }\r\n\r\n .add-goal .btn-outline-success{\r\n    background: white;\r\n    border: 1px solid #4cae4c;\r\n    color:black;\r\n }\r\n\r\n .add-goal .btn-outline-success:hover{\r\n    background: #4cae4c;\r\n    color:white;  \r\n }\r\n\r\n\r\n\r\n.table-bordered .glyphicon-edit{\r\n  color:var(--color-primary)\r\n  }\r\n\r\n.table-bordered .glyphicon-trash{\r\n    color:var(--color-primary)\r\n  }\r\n\r\n/* .btn-del:hover {\r\n    color:\r\n  } */\r\n\r\n\r\n  .header-background th{\r\n    vertical-align: middle;\r\n  }\r\n\r\n\r\n\r\n  \r\n\r\n\r\n  /* toggle-css */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/goal/goal.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"bg-nav\">\r\n    <div class=\"form-inline\" style=\"margin-bottom: unset\">\r\n      <button type=\"button\" class=\"btn btn-default pull-right margin\" (click)=\"addNewGoal()\">\r\n        <i class=\"glyphicon glyphicon-plus\"></i>\r\n      </button>\r\n      <div class=\"form-group dropdown-st\">\r\n        <label class=\"control-label\">Strategic Plan</label>\r\n        <select id=\"year\" name=\"year\" class=\"form-control\" [(ngModel)]=\"defaultCycle\" (ngModelChange)=\"getGoals()\" style=\"width:auto;height: auto;padding: 0px;\">\r\n          <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\" [attr.selected]=\"c.defaultCycle\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}]</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- new code for form -->\r\n  <div class=\"card card-form\" id=\"add-plan\" style=\"display:none\">\r\n    <form [formGroup]=\"goalForm\" (submit)=\"onSubmit()\">\r\n      <div class=\"card-header\">\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"closeForm();isUpdating=false;\" data-toggle=\"tooltip\" data-placement=\"auto\"\r\n          title=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n        <h4>ADD GOAL</h4>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label class=\"control-label\" for=\"year\">Strategic Plan:</label>\r\n              <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\" [ngModel]=\"defaultCycle\">\r\n                <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label class=\"control-label\">Goal</label>\r\n              <textarea class=\"form-control\" rows=\"3\" formControlName=\"goal\"></textarea>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-6\"></div>\r\n          <div class=\"col-sm-6\">\r\n            <button type=\"submit\" class=\"btn btn-default pull-right btn-sub\" [disabled]=\"goalForm.invalid\">\r\n              SUBMIT\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <!-- code for table -->\r\n  <div class=\"card table-card\">\r\n    <table class=\"table  table-bordered table-data\">\r\n      <colgroup>\r\n        <col style=\"width:70%\">\r\n        <col style=\"width:10%\">\r\n        <col style=\"width:10%\">\r\n        <col style=\"width:10%\">\r\n      </colgroup>\r\n      <thead class=\"header-background\" *ngIf=\"goalsCopy.length\">\r\n        <tr>\r\n          <th>\r\n            <span class=\"hide-text\">GOAL</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchGoal($event,goals)\" placeholder=\"GOAL\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th style=\"text-align:center\">Disable</th>\r\n          <th>Edit</th>\r\n          <th>Delete</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody class=\"body-background\">\r\n        <tr *ngFor=\"let goal of goals;let i = index;\">\r\n          <td style=\"vertical-align: middle;\">{{goal.goal}}</td>\r\n          <td class=\"text-center\">\r\n            <label class=\"switch\">\r\n              <input type=\"checkbox\" [checked]=\"goal.disable\" (change)=\"disable($event,goal.goalId)\">\r\n              <span class=\"slider round\"></span>\r\n            </label>\r\n          </td>\r\n          <td style=\"vertical-align: middle;\">\r\n            <button class=\"btn-link\" scrollTo href=\"#add-initiative\" (click)=\"updateGoal(goal)\" [disabled]=\"goal.disable\">\r\n              <i class=\"glyphicon glyphicon-edit btn-del\"></i>\r\n            </button>\r\n          </td>\r\n          <td style=\"vertical-align: middle;\">\r\n            <button class=\"btn-link\" (click)=\"deleteGoal(goal.goalId,goals,i)\" [disabled]=\"goal.disable\">\r\n              <i class=\"glyphicon glyphicon-trash btn-del\"></i>\r\n            </button>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n      <tfoot *ngIf=\"!goals.length\">\r\n        <tr>\r\n          <td colspan=\"4\" class=\"text-center\">No Data to Display .,.</td>\r\n        </tr>\r\n      </tfoot>\r\n    </table>\r\n  </div>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/goal/goal.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoalModule", function() { return GoalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goal__ = __webpack_require__("../../../../../src/app/planner/goal/goal.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var GoalModule = (function () {
    function GoalModule() {
    }
    return GoalModule;
}());
GoalModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__goal__["a" /* GoalComponent */]
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__goal__["a" /* GoalComponent */]],
    })
], GoalModule);

//# sourceMappingURL=goal.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/goal/goal.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoalComponent; });
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







var GoalComponent = (function (_super) {
    __extends(GoalComponent, _super);
    function GoalComponent(orgService, formBuilder, commonService, loaderService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
        _this.loaderService = loaderService;
        _this.isUpdating = false;
        // public goals:any[]=[];
        // public goalsCopy:any[]=[];
        _this.cycles = [];
        _this.check = [];
        _this.getCycles();
        _this.goalForm = _this.initObjectiveForm();
        return _this;
    }
    GoalComponent.prototype.ngAfterViewInit = function () {
    };
    GoalComponent.prototype.getCycles = function () {
        var _this = this;
        this.loaderService.display(true);
        this.orgService.getCycles().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
                _this.cycles.forEach(function (element) {
                    if (element.defaultCycle)
                        _this.defaultCycle = element.cycleId;
                });
                _this.getGoals();
            }
        });
    };
    GoalComponent.prototype.getGoals = function () {
        var _this = this;
        this.orgService.getObjectivesByCycleId(this.defaultCycle).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
            }
            _this.loaderService.display(false);
        }, function (error) {
            _this.loaderService.display(false);
        });
    };
    GoalComponent.prototype.initObjectiveForm = function () {
        return this.formBuilder.group({
            "cycleId": [this.defaultCycle, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "goal": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
    };
    GoalComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.isUpdating) {
            this.orgService.addObjective(this.goalForm.value).subscribe(function (response) {
                // $('#objectModal').modal('show');
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["notify"]('You have successfully added a new Goal.', 'success', 5, function () { console.log('dismissed'); });
                $("#add-plan").hide();
                _this.goalForm.controls["goal"].reset();
                _this.getGoals();
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["alert"]("Something went wrong..");
            });
        }
        if (this.isUpdating) {
            __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Are you sure you want to Update this Goal?", function () {
                _this.orgService.updateObjective(_this.selectedObjective.goalId, _this.goalForm.value).subscribe(function (res) {
                    // $('#objectModal').modal('show');
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["notify"]('You have successfully added a new Goal.', 'success', 5, function () { console.log('dismissed'); });
                    _this.goalForm = _this.initObjectiveForm();
                    _this.getGoals();
                    _this.isUpdating = false;
                }, function (error) {
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["alert"]("Something went wrong..");
                });
            });
        }
    };
    GoalComponent.prototype.deleteGoal = function (goalId, goals, index) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Are you sure you want to delete this Goal?", function () {
            _this.orgService.deleteObjective(goalId).subscribe(function (res) {
                goals.splice(index, 1);
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["alert"]("Something went wrong..");
            });
        });
    };
    GoalComponent.prototype.updateGoal = function (goal, highlight) {
        $(".to-be-highlighted").removeClass("highlight");
        $(highlight).addClass("highlight");
        this.selectedObjective = goal;
        this.isUpdating = true;
        this.goalForm.patchValue({ goal: goal.goal, cycleId: this.defaultCycle });
        $("#add-plan").show();
        $("#collapse1").collapse('show');
    };
    GoalComponent.prototype.addNewGoal = function () {
        $("#add-plan").show();
        this.isUpdating = false;
        $("#collapse1").collapse('show');
        this.goalForm = this.initObjectiveForm();
    };
    GoalComponent.prototype.disable = function (event, goalId) {
        var _this = this;
        if (event.srcElement.checked)
            __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Do you Really want to disable this Goal??", function () {
                _this.orgService.disableGoal(goalId).subscribe(function (response) {
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["success"]("You disabled the Goal..");
                    _this.getGoals();
                }, function () {
                    event.srcElement.checked = !event.srcElement.checked;
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Something went wrong..");
                });
            }, function () {
                event.srcElement.checked = !event.srcElement.checked;
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Action was not performed");
            });
        else
            __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Do you Really want to enable this Goal??", function () {
                _this.orgService.enableGoal(goalId).subscribe(function (response) {
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["success"]("You enabled the Goal..");
                    _this.getGoals();
                }, function () {
                    event.srcElement.checked = !event.srcElement.checked;
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Something went wrong..");
                });
            }, function () {
                event.srcElement.checked = !event.srcElement.checked;
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Action was not performed");
            });
    };
    GoalComponent.prototype.closeForm = function () {
        $(".to-be-highlighted").removeClass("highlight");
        $("#add-plan").hide();
    };
    return GoalComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
GoalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'strategic-goal',
        template: __webpack_require__("../../../../../src/app/planner/goal/goal.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/goal/goal.css"), __webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */]) === "function" && _d || Object])
], GoalComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=goal.js.map

/***/ })

});
//# sourceMappingURL=goal.module.chunk.js.map