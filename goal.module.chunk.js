webpackJsonp(["goal.module"],{

/***/ "../../../../../src/app/planner/goal/goal.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".add-goal .panel-heading{\r\nbackground: #cf3238;\r\ncolor:white;\r\n border-bottom: 3px solid black;\r\n}\r\n\r\n.title{\r\n    text-align: center;\r\n    text-decoration: underline;\r\n}\r\n   \r\n.add-goal .panel-footer{\r\nbackground-color: #f5f5f500;\r\nborder-top: 1px solid #cf3238\r\n}\r\n\r\n.add-goal .btn-outline-danger{\r\n    background: white;\r\n    border: 1px solid #cf3238;\r\n  }\r\n  \r\n .add-goal .btn-outline-danger:hover{\r\n    background: #cf3238;\r\n    color:white;\r\n }\r\n\r\n .add-goal .btn-outline-success{\r\n    background: white;\r\n    border: 1px solid #4cae4c;\r\n    color:black;\r\n }\r\n\r\n .add-goal .btn-outline-success:hover{\r\n    background: #4cae4c;\r\n    color:white;  \r\n }\r\n\r\n .detail-plan .panel-heading{\r\n    color: white;\r\n    background-color: #293f53;\r\n    border-bottom: 3px solid #cf3238;\r\n }\r\n\r\n.table-bordered thead{\r\n    background: aliceblue;\r\n}\r\n\r\n.table-bordered .glyphicon-edit{\r\n    color:red;\r\n  }\r\n\r\n.table-bordered .glyphicon-trash{\r\n    color:#293f53;\r\n  }\r\n\r\n.btn-del:hover {\r\n    color: var(--button-color2);\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/goal/goal.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"title\">\r\n    <h1>Strategic Goal</h1>\r\n  </div>\r\n  <div class=\"panel add-plan\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#collapse1\" class=\"accordion-toggle\">Add Goal</a>\r\n      </h4>\r\n    </div>\r\n    <div id=\"collapse1\" class=\"panel-collapse collapse\">\r\n      <div class=\"panel-body\">\r\n        <form [formGroup]=\"goalForm\" (submit)=\"onSubmit()\">\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"control-label\" for=\"year\">Strategic Plan:</label>\r\n                <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\" [ngModel]=\"defaultCycle\">\r\n                  <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"control-label\">Goal</label>\r\n                <textarea class=\"form-control\" rows=\"3\" formControlName=\"goal\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"panel-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success btn-empty\" [disabled]=\"goalForm.invalid\">Submit</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"panel detail-plan\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#collapse2\">Strategic Goals</a>  \r\n        <button type=\"button\" class=\"btn-info pull-right btn-add\" (click)=\"addNewGoal()\">\r\n          <span class=\"glyphicon glyphicon-plus\"></span> Add\r\n        </button>      \r\n      </h4>\r\n    </div>\r\n\r\n    <div id=\"collapse2\" class=\"panel-collapse collapse in\">\r\n      <table class=\"table table-hover table-bordered\" >\r\n        <caption class=\"form-inline\">\r\n          <div class=\"form-group pull-right\">\r\n            <label class=\"control-label\">Strategic Plan</label>\r\n            <select id=\"year\" name=\"year\" class=\"form-control\" [(ngModel)]=\"defaultCycle\" (ngModelChange)=\"getGoals()\" style=\"width:auto;height: auto;padding: 0px;\">\r\n              <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\" [attr.selected]=\"c.defaultCycle\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}]</option>\r\n            </select>\r\n          </div>\r\n        </caption>\r\n        <thead class=\"header-background\" *ngIf=\"goals.length\">\r\n          <tr>\r\n            <th>Goal\r\n              <span class=\"search\">\r\n                <input type=\"text\" name=\"search\" (keyup)=\"searchGoal($event,goals)\" placeholder=\"Search..\">\r\n              </span>\r\n            </th>\r\n            <th></th>\r\n            <th></th>\r\n          </tr>\r\n        </thead>\r\n        <tbody class=\"body-background\">\r\n          <tr *ngFor=\"let goal of goals;let i = index;\">\r\n            <td style=\"vertical-align: middle;\">{{goal.goal}}</td>\r\n            <td style=\"vertical-align: middle;\">\r\n              <i class=\"glyphicon glyphicon-edit btn-del\" style=\"cursor:pointer;\" (click)=\"updateGoal(goal)\"></i>\r\n            </td>\r\n            <td style=\"vertical-align: middle;\">\r\n              <i class=\"glyphicon glyphicon-trash btn-del\" style=\"cursor:pointer;\" (click)=\"deleteGoal(goal.goalId,goals,i)\"></i>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n        <tfoot *ngIf=\"!goals.length\">\r\n          <tr><td colspan=\"4\" class=\"text-center\">No Data to Display .,.</td></tr>\r\n        </tfoot>\r\n      </table>\r\n    </div>\r\n  </div>\r\n\r\n  <!--popup model-->\r\n  <div class=\"modal fade\" id=\"objectModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n          <h4 class=\"modal-title\">Confirm</h4>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <p>You have successfully added a new Goal.</p>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" data-toggle=\"collapse\" href=\"#collapse1\">Close</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forChild([{
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
    function GoalComponent(orgService, formBuilder, commonService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
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
        });
    };
    GoalComponent.prototype.initObjectiveForm = function () {
        return this.formBuilder.group({
            "cycleId": [this.defaultCycle, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "goal": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
    };
    // inItSpi() {
    //   return this.formBuilder.group({
    //     "spi": ['', [Validators.required]],
    //     "measureUnit": ['', [Validators.required]],
    //     "currentLevel": ['', [Validators.required]],
    //     "frequencyId":[1],
    //     "targetDigital": this.formBuilder.array(this.inItTarget())
    //   });
    // }  
    // inItTarget() {
    //   const fa:any[] = [];
    //   this.commonService.getData('org_info').cycle.forEach((element:any) => {
    //     fa.push(this.inItTargetDigital(element));
    //   });
    //   return fa;
    // }
    // inItTargetDigital(year:any) {
    //   return this.formBuilder.group({
    //     "year": [year, [Validators.required]],
    //     "expectedLevel": ['', [Validators.required]],
    //   });
    // }
    // addSpi(form:any) {
    //   const control = <FormArray>form.controls['spis'];
    //   control.push(this.inItSpi());
    // }
    // removeSpi(form:any, index:any) {
    //   const control = <FormArray>form.controls['spis'];
    //   control.removeAt(index);
    // }
    GoalComponent.prototype.onSubmit = function () {
        var _this = this;
        // this.goalForm.value["cycleId"] = this.commonService.getData('org_info').cycles[0].cycleId;/
        console.log(this.goalForm.value);
        if (!this.isUpdating) {
            this.orgService.addObjective(this.goalForm.value).subscribe(function (response) {
                $('#objectModal').modal('show');
                // this.returnedObject = response;
                // this.goals.push(this.returnedObject);
                // this.initObjectiveForm();
                _this.goalForm.controls["goal"].reset();
                _this.getGoals();
            }, function (error) {
                console.log(error);
            });
        }
        if (this.isUpdating) {
            if (confirm("Are you sure you want to Update this Goal?"))
                this.orgService.updateObjective(this.selectedObjective.goalId, this.goalForm.value).subscribe(function (res) {
                    console.log(res);
                    $('#objectModal').modal('show');
                    _this.goalForm = _this.initObjectiveForm();
                    _this.getGoals();
                    _this.isUpdating = false;
                });
        }
    };
    GoalComponent.prototype.deleteGoal = function (goalId, goals, index) {
        if (confirm("Are you sure you want to delete this Goal?"))
            this.orgService.deleteObjective(goalId).subscribe(function (res) {
                console.log(res);
                goals.splice(index, 1);
            });
    };
    GoalComponent.prototype.updateGoal = function (goal) {
        this.selectedObjective = goal;
        this.isUpdating = true;
        this.goalForm.patchValue({ goal: goal.goal, cycleId: this.defaultCycle });
        $("#collapse1").collapse('show');
    };
    GoalComponent.prototype.addNewGoal = function () {
        this.isUpdating = false;
        $("#collapse1").collapse('show');
        this.goalForm = this.initObjectiveForm();
    };
    return GoalComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
GoalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'strategic-goal',
        template: __webpack_require__("../../../../../src/app/planner/goal/goal.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/goal/goal.css"), __webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], GoalComponent);

var _a, _b, _c;
//# sourceMappingURL=goal.js.map

/***/ })

});
//# sourceMappingURL=goal.module.chunk.js.map