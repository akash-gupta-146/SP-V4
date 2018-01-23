webpackJsonp(["initiative.module"],{

/***/ "../../../../../src/app/planner/initiative/initiative.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".table{\r\n margin-bottom: 0px;\r\n}\r\n.table .table {\r\n background-color: inherit;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/initiative/initiative.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"bg-nav\">\r\n    <div class=\"form-inline \" style=\"margin-bottom: unset\">\r\n      <button type=\"button\" class=\"btn btn-default pull-right margin\" (click)=\"addNewInitiative()\">\r\n        <i class=\"glyphicon glyphicon-plus\"></i>\r\n      </button>\r\n      <div class=\"form-group dropdown-st\">\r\n        <label class=\"control-label\">Strategic Plan</label>\r\n        <select id=\"year\" name=\"year\" class=\"form-control\" [(ngModel)]=\"defaultCycle\" (ngModelChange)=\"getInitiative()\" style=\"width:auto;height: auto;padding: 0px;\">\r\n          <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\" [attr.selected]=\"c.defaultCycle\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}]</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!-- new code for form-->\r\n  <div class=\"card card-form\" id=\"add-initiative\" style=\"display:none\">\r\n    <form [formGroup]=\"initiativeForm\" (submit)=\"submitInitiative()\">\r\n      <div class=\"card-header\">\r\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"closeForm();\" data-toggle=\"tooltip\" data-placement=\"auto\"\r\n          title=\"Reset Form\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n        <h4>ADD INITIATIVE</h4>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label class=\"control-label\" for=\"year\">Strategic Plan :</label>\r\n              <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\" [ngModel]=\"defaultCycle\" (ngModelChange)=\"getObjective($event)\">\r\n                <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"form-group\">\r\n              <label for=\"sel1\">Goal:</label>\r\n              <select class=\"form-control\" id=\"sel1\" formControlName=\"goalId\">\r\n                <option *ngFor=\"let goal of objectives;let i=index;\" [value]=\"goal.goalId\">{{i+1}}. {{goal.goal}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"form-group \">\r\n              <label>Proposed Initiative</label>\r\n              <textarea class=\"form-control\" rows=\"2\" formControlName=\"initiative\"></textarea>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-6\"></div>\r\n          <div class=\"col-sm-6\">\r\n            <button type=\"submit\" class=\"btn btn-default pull-right btn-sub\" [disabled]=\"initiativeForm.invalid\" data-toggle=\"tooltip\"\r\n              data-placement=\"auto\" title=\"Submit Form\">\r\n              SUBMIT\r\n            </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <!-- for table -->\r\n  <div class=\"card table-card\">\r\n    <div class=\"panel-body\">\r\n      <table class=\"table table-bordered table-data\">\r\n        <colgroup>\r\n          <col style=\"width:30%\">\r\n          <col style=\"width:40%\">\r\n          <col style=\"width:10%\">\r\n          <col style=\"width:10%\">\r\n          <col style=\"width:10%\">\r\n        </colgroup>\r\n        <thead class=\"header-background\" *ngIf=\"goalsCopy.length\">\r\n          <tr>\r\n            <th>\r\n              <span class=\"hide-text\">GOAL</span>\r\n              <form action=\"\" class=\"search-form\">\r\n                <div class=\"form-group has-feedback\" style=\"margin-bottom: 10px;\">\r\n                  <label for=\"search\" class=\"sr-only\">Search</label>\r\n                  <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchGoal($event)\" placeholder=\"GOAL\">\r\n                  <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n                </div>\r\n              </form>\r\n            </th>\r\n            <th>\r\n              <span class=\"hide-text\">INITIATIVE</span>\r\n              <form action=\"\" class=\"search-form\">\r\n                <div class=\"form-group has-feedback\" style=\"margin-bottom: 10px;\">\r\n                  <label for=\"search\" class=\"sr-only\">Search</label>\r\n                  <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchInitiative($event)\" placeholder=\"INITIATIVE\">\r\n                  <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n                </div>\r\n              </form>\r\n            </th>\r\n            <th>Disable</th>\r\n            <th>Edit</th>\r\n            <th>Delete</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let goal of goals;let i = index;\">\r\n            <td>{{goal.goal}}</td>\r\n            <td colspan=\"4\" style=\"padding:0px;border:none;\" #element [style.height]=\"get(element)\">\r\n              <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n                <colgroup>\r\n                  <col style=\"width:40%\">\r\n                  <col style=\"width:10%\">\r\n                  <col style=\"width:10%\">\r\n                  <col style=\"width:10%\">\r\n                </colgroup>\r\n                <tr class=\"to-be-highlighted\" *ngFor=\"let initiate of goal.initiatives;let j=index;\" #highlight>\r\n                  <td>{{initiate.initiative}}</td>\r\n                  <td class=\"text-center\">\r\n                    <label class=\"switch\">\r\n                      <input type=\"checkbox\" [checked]=\"initiate.disable\" (change)=\"disable($event,initiate.initiativeId)\">\r\n                      <span class=\"slider round\"></span>\r\n                    </label>\r\n                  </td>\r\n                  <td>\r\n                    <button class=\"btn-link\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Edit\" (click)=\"updateInitiative(goal.goalId,initiate,highlight)\"\r\n                      [disabled]=\"initiate.disable\">\r\n                      <a scrollTo href=\"#add-initiative\">\r\n                        <i class=\"glyphicon glyphicon-edit btn-edit\"></i>\r\n                      </a>\r\n                    </button>\r\n                  </td>\r\n                  <td>\r\n                    <button class=\"btn-link\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Delete\" (click)=\"deleteInitiative(initiate.initiativeId,goal.initiatives,j)\"\r\n                      [disabled]=\"initiate.disable\">\r\n                      <i class=\"glyphicon glyphicon-trash btn-del\"></i>\r\n                    </button>\r\n                  </td>\r\n                </tr>\r\n              </table>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n        <tfoot *ngIf=\"!goals.length\">\r\n          <tr>\r\n            <td colspan=\"4\" class=\"text-center\">No Data to Display .,.</td>\r\n          </tr>\r\n        </tfoot>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/initiative/initiative.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InitiativeModule", function() { return InitiativeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__initiative__ = __webpack_require__("../../../../../src/app/planner/initiative/initiative.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_filter_pipe__ = __webpack_require__("../../../../../src/app/planner/initiative/my-filter.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var InitiativeModule = (function () {
    function InitiativeModule() {
    }
    return InitiativeModule;
}());
InitiativeModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__initiative__["a" /* InitiativeComponent */]
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__initiative__["a" /* InitiativeComponent */], __WEBPACK_IMPORTED_MODULE_4__my_filter_pipe__["a" /* MyFilterPipe */]],
    })
], InitiativeModule);

//# sourceMappingURL=initiative.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/initiative/initiative.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitiativeComponent; });
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







var InitiativeComponent = (function (_super) {
    __extends(InitiativeComponent, _super);
    function InitiativeComponent(orgService, formBuilder, commonService, loaderService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
        _this.loaderService = loaderService;
        _this.cycles = [];
        // public goals:any[]=[];
        // public goalsCopy:any[]=[];
        _this.objectives = [];
        _this.isUpdating = false;
        _this.quarter = ["Q1", "Q2", "Q3", "Q4"];
        _this.loaderService.display(true);
        _this.getCycleWithChildren(false);
        _this.initiativeForm = _this.initForm();
        return _this;
    }
    InitiativeComponent.prototype.getCycleWithChildren = function (flag) {
        var _this = this;
        this.orgService.getCycleWithChildren(flag).subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
                _this.cycles.forEach(function (element) {
                    if (element.defaultCycle)
                        _this.defaultCycle = element.cycleId;
                });
                if (!flag)
                    _this.getInitiative();
            }
        });
    };
    InitiativeComponent.prototype.getObjective = function (cycleId) {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (element.cycleId == cycleId) {
                _this.objectives = element.goals;
                return;
            }
        });
    };
    InitiativeComponent.prototype.getInitiative = function () {
        var _this = this;
        this.orgService.getInitiativesByCycleId(this.defaultCycle).subscribe(function (response) {
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
    InitiativeComponent.prototype.initForm = function () {
        return this.formBuilder.group({
            "cycleId": [this.defaultCycle, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "goalId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "initiative": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    };
    InitiativeComponent.prototype.submitInitiative = function () {
        var _this = this;
        delete this.initiativeForm.value["cycleId"];
        if (!this.isUpdating)
            this.orgService.addInitiative(this.initiativeForm.value).subscribe(function (res) {
                _this.getInitiative();
                $("#add-initiative").hide();
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["notify"]("You have successfully added a new Initiative.");
                // $('#initiativeModal').modal('show');
                _this.initiativeForm.controls["initiative"].reset();
            }, function (err) {
                console.log(err);
            });
        else
            __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Are you sure you want to update this Initiative?", function () {
                _this.orgService.updateInitiative(_this.selectedInitiative.initiativeId, _this.initiativeForm.value).subscribe(function (res) {
                    $("#add-initiative").hide();
                    _this.getInitiative();
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["notify"]("You have successfully updated Initiative.");
                    // $('#initiativeModal').modal('show');
                    _this.isUpdating = false;
                });
            });
    };
    InitiativeComponent.prototype.deleteInitiative = function (initiativeId, initiatives, index) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Are you sure you want to delete this Initiative?", function () {
            _this.orgService.deleteInitiative(initiativeId).subscribe(function (res) {
                console.log(res);
                initiatives.splice(index, 1);
                _this.getInitiative();
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["alert"]("Something went wrong..");
            });
        });
    };
    InitiativeComponent.prototype.updateInitiative = function (goalId, initiative, highlight) {
        $(".to-be-highlighted").removeClass("highlight");
        $(highlight).addClass("highlight");
        this.isUpdating = true;
        this.initiativeForm.controls["cycleId"].disable();
        this.initiativeForm.controls["goalId"].disable();
        this.selectedInitiative = initiative;
        this.initiativeForm.patchValue({
            cycleId: this.defaultCycle,
            goalId: goalId,
            initiative: initiative.initiative
        });
        $("#add-initiative").show();
        $("#collapse1").collapse('show');
    };
    InitiativeComponent.prototype.enableFields = function () {
        $(".to-be-highlighted").removeClass("highlight");
        this.initiativeForm.controls["cycleId"].enable();
        this.initiativeForm.controls["goalId"].enable();
        this.initiativeForm = this.initForm();
    };
    InitiativeComponent.prototype.closeForm = function () {
        $("#add-initiative").hide();
        this.enableFields();
        this.isUpdating = false;
        this.getCycleWithChildren(false);
    };
    InitiativeComponent.prototype.addNewInitiative = function () {
        $("#add-initiative").show();
        this.isUpdating = false;
        $("#collapse1").collapse('show');
        this.getCycleWithChildren(true);
        this.initiativeForm = this.initForm();
    };
    InitiativeComponent.prototype.disable = function (event, initiativeId) {
        var _this = this;
        if (event.srcElement.checked)
            __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Do you Really want to disable this Initiative??", function () {
                _this.orgService.disableInitiative(initiativeId).subscribe(function (response) {
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["success"]("You disabled the Initiative..");
                    _this.getInitiative();
                }, function () {
                    event.srcElement.checked = !event.srcElement.checked;
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Something went wrong..");
                });
            }, function () {
                event.srcElement.checked = !event.srcElement.checked;
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Action was not performed");
            });
        else
            __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["confirm"]("Do you Really want to enable this Initiative??", function () {
                _this.orgService.enableInitiative(initiativeId).subscribe(function (response) {
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["success"]("You enabled the Initiative..");
                    _this.getInitiative();
                }, function () {
                    event.srcElement.checked = !event.srcElement.checked;
                    __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Something went wrong..");
                });
            }, function () {
                event.srcElement.checked = !event.srcElement.checked;
                __WEBPACK_IMPORTED_MODULE_5_alertifyjs__["error"]("Action was not performed");
            });
    };
    InitiativeComponent.prototype.get = function (e) {
        var promise = new Promise(function (resolve, reject) { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
        return promise;
    };
    return InitiativeComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
InitiativeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'initiatives',
        template: __webpack_require__("../../../../../src/app/planner/initiative/initiative.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/initiative/initiative.css"), __webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__shared_loader_service__["a" /* LoaderService */]) === "function" && _d || Object])
], InitiativeComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=initiative.js.map

/***/ }),

/***/ "../../../../../src/app/planner/initiative/my-filter.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var MyFilterPipe = (function () {
    function MyFilterPipe() {
    }
    MyFilterPipe.prototype.transform = function (items, filter) {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(function (item) { return item.initiative.toLowerCase().indexOf(filter.toLowerCase()) > -1; });
    };
    return MyFilterPipe;
}());
MyFilterPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'myfilter',
        pure: false
    })
], MyFilterPipe);

//# sourceMappingURL=my-filter.pipe.js.map

/***/ })

});
//# sourceMappingURL=initiative.module.chunk.js.map