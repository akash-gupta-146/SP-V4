webpackJsonp(["plan.module"],{

/***/ "../../../../../src/app/planner/plan/plan.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"panel add-plan\" id=\"add-plan\" style=\"display:none;\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#collapse1\" class=\"accordion-toggle\">Add Strategic Plan</a>\r\n      </h4>\r\n    </div>\r\n    <div id=\"collapse1\" class=\"panel-collapse collapse\">\r\n      <form [formGroup]=\"cycleForm\" (submit)=\"onSubmit()\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"year\">Plan Year:</label>\r\n                <select id=\"year\" name=\"year\" class=\"form-control\" style=\"width:auto;\" formControlName=\"planYear\">\r\n                  <option value=\"2017\">2017</option>\r\n                  <option value=\"2018\">2018</option>\r\n                  <option value=\"2019\">2019</option>\r\n                  <option value=\"2020\">2020</option>\r\n                  <option value=\"2021\">2021</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"description\">Description:</label>\r\n                <textarea class=\"form-control\" id=\"description\" name=\"description\" formControlName=\"description\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"year\">From Year:</label>\r\n                <select id=\"from-year\" name=\"from-year\" class=\"form-control\" style=\"width:auto;\" formControlName=\"startYear\">\r\n                  <option value=\"2017\">2017</option>\r\n                  <option value=\"2018\">2018</option>\r\n                  <option value=\"2019\">2019</option>\r\n                  <option value=\"2020\">2020</option>\r\n                  <option value=\"2021\">2021</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"year\">To Year:</label>\r\n                <select id=\"to-year\" name=\"to-year\" class=\"form-control\" style=\"width:auto;\" formControlName=\"endYear\">\r\n                  <option value=\"2017\">2017</option>\r\n                  <option value=\"2018\">2018</option>\r\n                  <option value=\"2019\">2019</option>\r\n                  <option value=\"2020\">2020</option>\r\n                  <option value=\"2021\">2021</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-sm-6\">\r\n              <label class=\"checkbox-inline\">\r\n                <input type=\"checkbox\" value=\"\" formControlName=\"active\">\r\n                <b>Active</b>\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"panel-footer\">\r\n          <button type=\"submit\" class=\"btn btn-default btn-empty\" [disabled]=\"cycleForm.invalid\">\r\n            <i class=\"glyphicon glyphicon-ok\"></i>\r\n          </button>\r\n          <button type=\"button\" class=\"btn btn-danger btn-close\" data-toggle=\"tooltip\" data-placement=\"auto\" title=\"Reset Form\" (click)=\"reset()\">\r\n            <i class=\"glyphicon glyphicon-remove\"></i>\r\n          </button>\r\n          <div class=\"pull-right\" *ngIf=\"isUpdating\">\r\n          <button type=\"button\" class=\"btn btn-default btn-ghost\">Default</button>\r\n          <button type=\"button\" class=\"btn btn-default btn-fault\">Disable</button>\r\n          <button type=\"button\" class=\"btn btn-default btn-del\" (click)=\"deleteCycle(selectedCycle.cycleId)\">Delete</button>   \r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n  <div class=\"panel detail-plan\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <!-- new code -->\r\n        <div class=\"button__holder\">\r\n            <button class=\"plus\"  (click)=\"addNewPlan()\"></button>\r\n        </div>\r\n\r\n        <!-- end -->\r\n        <!-- <button type=\"button\" class=\" btn btn-default btn-add pull-right\" (click)=\"addNewPlan()\">\r\n          <span class=\"glyphicon glyphicon-plus\"></span>\r\n        </button> -->\r\n      </h4>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n      <table class=\"table table-bordered  table-data\">\r\n        <thead class=\"header-background\">\r\n          <tr>\r\n            <th>Plan Year</th>\r\n            <th>From Year</th>\r\n            <th>End Year</th>\r\n            <th>Description</th>\r\n            <th>Disabled</th>\r\n            <th>Delete</th>\r\n            <th>Edit</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let c of cycles;let y = index;\">\r\n            <td>{{c.planYear}}</td>\r\n            <td>{{c.startYear}}</td>\r\n            <td>{{c.endYear}}</td>\r\n            <td>{{c.description}}\r\n              <span class=\"pull-right\" style=\"color:green\" *ngIf=\"c.defaultCycle\">*default</span>\r\n            </td>\r\n            <td>\r\n              <input type=\"checkbox\" [checked]=\"c.disable\" (change)=\"changeStatus($event,c)\">\r\n            </td>\r\n            <td>\r\n              <a (click)=\"deleteCycle(c.cycleId)\">\r\n                <i class=\"glyphicon glyphicon-trash\"></i>\r\n              </a>\r\n            </td>\r\n            <td>\r\n              <a (click)=\"editCycle(c)\">\r\n                <i class=\"glyphicon glyphicon-edit\"></i>\r\n              </a>\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/plan/plan.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanModule", function() { return PlanModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__plan__ = __webpack_require__("../../../../../src/app/planner/plan/plan.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PlanModule = (function () {
    function PlanModule() {
    }
    return PlanModule;
}());
PlanModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__plan__["a" /* PlanComponent */]
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__plan__["a" /* PlanComponent */]],
    })
], PlanModule);

//# sourceMappingURL=plan.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/plan/plan.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlanComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__ = __webpack_require__("../../../../../src/app/shared/UTI.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_alertifyjs__ = __webpack_require__("../../../../alertifyjs/build/alertify.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_alertifyjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_alertifyjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_loader_service__ = __webpack_require__("../../../../../src/app/shared/loader.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PlanComponent = (function () {
    function PlanComponent(ss, orgService, loaderService) {
        this.ss = ss;
        this.orgService = orgService;
        this.loaderService = loaderService;
        this.title = "Strategic Plan";
        this.cycles = [];
        this.status = [];
        this.loaderService.display(true);
        this.cycleForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            "universityId": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.ss.getData('org_info').universityId),
            "description": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]),
            "planYear": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]),
            "startYear": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]),
            "endYear": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]),
            "active": new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](false, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])
        });
        this.getCycles();
    }
    PlanComponent.prototype.addNewPlan = function () {
        $("#add-plan").show();
        $("#collapse1").collapse('show');
    };
    PlanComponent.prototype.getCycles = function () {
        var _this = this;
        this.orgService.getCycles().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
            }
            _this.loaderService.display(false);
        }, function (error) {
            _this.loaderService.display(false);
        });
    };
    PlanComponent.prototype.editCycle = function (c) {
        $("#add-plan").show();
        $("#collapse1").collapse('show');
        this.isUpdating = true;
        this.selectedCycle = c;
        this.cycleForm.patchValue(c);
    };
    PlanComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.isUpdating)
            this.orgService.saveCycle(this.cycleForm.value).subscribe(function (response) {
                __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["success"]('You added New Strategic plan.');
                _this.isUpdating = false;
                _this.getCycles();
                _this.cycleForm.reset();
            });
        else {
            var data = {};
            data['description'] = this.cycleForm.value["description"];
            data['endYear'] = this.cycleForm.value["endYear"];
            this.orgService.updateCycle(this.selectedCycle.cycleId, data).subscribe(function (response) {
                __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["success"]('You updated Strategic plan.');
                _this.isUpdating = false;
                _this.getCycles();
                _this.cycleForm.reset();
            });
        }
    };
    PlanComponent.prototype.changeStatus = function (event, c) {
        if (event.srcElement.checked) {
            var forDiabled = confirm("Are you sure you want to disable it");
            if (forDiabled) {
                this.orgService.disableCycle(c.cycleId).subscribe(function (response) {
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["success"]('You disabled the plan.');
                });
            }
            else {
                event.srcElement.checked = !event.srcElement.checked;
            }
            debugger;
        }
        else {
            var forEnabled = confirm("Are you sure you want to enable it");
            if (forEnabled) {
                this.orgService.enableCycle(c.cycleId).subscribe(function (response) {
                    __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["success"]('You enabled the plan.');
                });
            }
            else {
                event.srcElement.checked = !event.srcElement.checked;
            }
        }
    };
    PlanComponent.prototype.deleteCycle = function (cycleId) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["confirm"]("Do you Really want to Delete this Cycle??", function () {
            _this.orgService.deleteCycle(cycleId).subscribe(function (response) {
                _this.getCycles();
            }, function (error) {
                __WEBPACK_IMPORTED_MODULE_4_alertifyjs__["alert"]("You Can not Delete this Cycle??");
            });
        });
    };
    PlanComponent.prototype.reset = function () {
        $("#add-plan").hide();
        this.isUpdating = false;
        this.cycleForm.reset();
    };
    return PlanComponent;
}());
PlanComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'strategic-plan',
        template: __webpack_require__("../../../../../src/app/planner/plan/plan.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__["a" /* UniversityService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__shared_loader_service__["a" /* LoaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_loader_service__["a" /* LoaderService */]) === "function" && _c || Object])
], PlanComponent);

var _a, _b, _c;
//# sourceMappingURL=plan.js.map

/***/ })

});
//# sourceMappingURL=plan.module.chunk.js.map