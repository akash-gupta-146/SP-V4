webpackJsonp(["spi.module"],{

/***/ "../../../../../src/app/planner/spi/spi.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"panel add-plan\">\r\n    <div class=\"panel-heading\">Edit Section</div>\r\n    <div class=\"panel-body\">\r\n      <form [formGroup]=\"spiForm\" (submit)=\"onSubmit()\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n            <div class=\"form-group\">\r\n              <label class=\"control-label\" for=\"year\">Strategic Plan:</label>\r\n              <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\" (ngModelChange)=\"getObjective($event)\">\r\n                  <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"y\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n              </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n            <div class=\"form-group\">\r\n              <label for=\"sel1\">Select Goal:</label>\r\n              <select class=\"form-control\" id=\"sel1\" formControlName=\"goalId\">\r\n              <option *ngFor=\"let objective of objectives;let i=index;\" [value]=\"objective.goalId\">{{i+1}}.{{objective.goal}}</option>\r\n            </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n            <div class=\"form-group\">\r\n              <label>Enter Strategic Planning Indicator :</label>\r\n              <textarea class=\"form-control\" rows=\"4\" formControlName=\"spi\"></textarea>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n            <div class=\"form-group\">\r\n              <label>Measure Mode:</label>\r\n              <select class=\"form-control\" formControlName=\"measureUnit\">\r\n              <option value=\"\" disabled selected>Choose Measurement Unit</option>\r\n              <option value=\"percentage\">Percent</option>\r\n              <option value=\"number\">Number</option>\r\n              <option value=\"rate\">Rate</option>\r\n            </select>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n            <div class=\"form-group\">\r\n              <label>Base Line</label>\r\n              <input type=\"number\" min=\"0\" step=\"1\" class=\"form-control\" formControlName=\"baseline\">\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-6\">\r\n            <div class=\"checkbox form-group\">\r\n              <label>\r\n              <input type=\"checkbox\" formControlName=\"direction\"> Improvement direction (+ve)\r\n            </label>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-sm-6\">\r\n            <div class=\"checkbox form-group\">\r\n              <label>\r\n              <input type=\"checkbox\" formControlName=\"approvalRequired\"> Approval Required \r\n            </label>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n            <div class=\"form-group\">\r\n              <label>Remarks :</label>\r\n              <textarea class=\"form-control\" rows=\"5\" formControlName=\"remarks\"></textarea>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n            <div class=\"form-group\">\r\n              <label>Help Text :</label>\r\n              <textarea class=\"form-control\" rows=\"5\" formControlName=\"helpText\"></textarea>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <!-- <div class=\"panel panel-default\" formArrayName=\"targetDigital\">\r\n          <div class=\"panel-heading background-transparent background-5\">\r\n            <b>Annual Target</b>\r\n          </div>\r\n          <div class=\"panel-body\">\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-lg-3 col-sm-3 col-xs-12 col-md-3\" *ngFor=\"let td of spiForm.controls.targetDigital.controls;let m = index;\"\r\n                [formGroupName]=\"m\">\r\n                <label for=\"example-text-input\">{{td.value.year}}</label>\r\n                <input type=\"number\" min=\"0\" step=\"1\" class=\"form-control\" formControlName=\"expectedLevel\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div> -->\r\n      </form>\r\n    </div>\r\n    <div class=\"panel-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success btn-empty\" [disabled]=\"spiForm.invalid\"><i class=\"glyphicon glyphicon-ok\"></i></button>\r\n        <button type=\"button\" class=\"btn btn-default btn-close\" (click)=\"spiForm.reset()\" data-dismiss=\"modal\"><i class=\"glyphicon glyphicon-remove\"></i></button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"panel detail-plan\">\r\n    <div class=\"panel-heading\">Strategic Planning - Strategic Performance Indicators\r\n      <span class=\"pull-right\" style=\"cursor:pointer\">\r\n      <div class=\"ctooltip\">\r\n        <i class=\"glyphicon glyphicon-plus\"></i>\r\n        <span class=\"ctooltiptext\">Add Activity</span>\r\n    </div>\r\n    </span>\r\n  </div>\r\n  <table class=\"table table-bordered header-background\" id=\"thable\" *ngIf=\"spis.length\">\r\n    <colgroup>\r\n      <col width=\"50%\">\r\n      <col width=\"48%\">\r\n      <col width=\"1%\">\r\n      <col width=\"1%\">\r\n    </colgroup>\r\n    <thead>\r\n      <tr>\r\n        <th>Goal</th>\r\n        <th>Performance Indicator</th>\r\n        <th></th>\r\n        <th></th>\r\n      </tr>\r\n    </thead>\r\n    <tbody class=\"body-background\" *ngFor=\"let goal of spis;let i = index;\">\r\n      <tr>\r\n        <td [attr.rowspan]=\"goal.spis.length+1\" style=\"vertical-align: middle;\">{{goal.goal}}</td>\r\n      </tr>\r\n      <ng-template let-spi ngFor [ngForOf]=\"goal.spis\" let-j=\"index\">\r\n        <tr>\r\n          <td style=\"vertical-align: middle;\">\r\n            <div>{{spi.spi}}</div>\r\n          </td>\r\n          <td style=\"vertical-align: middle;\"><i class=\"glyphicon glyphicon-edit\" style=\"cursor:pointer;\" (click)=\"updateSpi(goal.goalId,spi)\"></i></td>\r\n          <td style=\"vertical-align: middle;\"><i class=\"glyphicon glyphicon-remove\" style=\"cursor:pointer;\" (click)=\"deleteSpi(spi.spiId,goal.spis,j)\"></i></td>\r\n        </tr>\r\n      </ng-template>\r\n    </tbody>\r\n  </table>\r\n  <p class=\"text-center\" *ngIf=\"!spis.length\" style=\"padding-top: 5px;\">No SPI Added Yet...</p>\r\n</div>\r\n\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/spi/spi.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SPIComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__ = __webpack_require__("../../../../../src/app/shared/UTI.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SPIComponent = (function () {
    function SPIComponent(orgService, formBuilder, commonService) {
        this.orgService = orgService;
        this.formBuilder = formBuilder;
        this.commonService = commonService;
        this.cycles = [];
        this.spis = [];
        // this.orgService.getObjectives().subscribe((response: any) => {
        //   this.objectives = response;
        // });
        this.getCycles();
        this.getSpis();
        this.spiForm = this.inItSpi();
    }
    SPIComponent.prototype.ngAfterViewInit = function () {
    };
    SPIComponent.prototype.getCycles = function () {
        var _this = this;
        this.orgService.getCycleWithChildren().subscribe(function (response) {
            if (response.status == 204) {
                _this.cycles = [];
            }
            else {
                _this.cycles = response;
            }
        });
    };
    SPIComponent.prototype.getObjective = function (cycleId) {
        if (cycleId)
            this.objectives = this.cycles[cycleId].goals;
    };
    SPIComponent.prototype.getSpis = function () {
        var _this = this;
        this.orgService.getSpis().subscribe(function (res) {
            if (res.status == 204) {
                _this.spis = [];
            }
            else {
                _this.spis = res;
            }
        });
    };
    SPIComponent.prototype.inItSpi = function () {
        return this.formBuilder.group({
            "cycleId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "goalId": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "spi": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "measureUnit": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "direction": [false, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "baseline": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "approvalRequired": [false, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "remarks": [''],
            "helpText": ['']
            // "frequencyId": [1],
            // "targetDigital": this.formBuilder.array(this.inItTarget())
        });
    };
    SPIComponent.prototype.updateSpi = function (goalId, spi) {
        this.spiForm.patchValue({
            "goalId": goalId,
            "spi": spi.spi,
            "measureUnit": spi.measureUnit,
            "direction": spi.direction,
            "baseline": spi.baseline,
            "approvalRequired": spi.approvalRequired,
            "remarks": spi.remarks,
            "helpText": spi.helpText
        });
    };
    SPIComponent.prototype.deleteSpi = function (spiId, spis, index) {
        if (confirm("SPi will be deleted permanently.."))
            this.orgService.deleteSpi(spiId).subscribe(function (response) {
                spis.splice(index, 1);
                console.log("success");
            });
    };
    SPIComponent.prototype.inItTarget = function () {
        var _this = this;
        var fa = [];
        this.commonService.getData('org_info').cycle.forEach(function (element) {
            fa.push(_this.inItTargetDigital(element));
        });
        return fa;
    };
    SPIComponent.prototype.inItTargetDigital = function (year) {
        return this.formBuilder.group({
            "year": [year, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "expectedLevel": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
        });
    };
    SPIComponent.prototype.onSubmit = function () {
        var _this = this;
        delete this.spiForm.value["cycleId"];
        this.orgService.saveSpi(this.spiForm.value).subscribe(function (res) {
            _this.spiForm.reset();
            _this.getSpis();
        });
    };
    return SPIComponent;
}());
SPIComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'spi',
        template: __webpack_require__("../../../../../src/app/planner/spi/spi.component.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], SPIComponent);

var _a, _b, _c;
//# sourceMappingURL=spi.component.js.map

/***/ }),

/***/ "../../../../../src/app/planner/spi/spi.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPIModule", function() { return SPIModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__spi_component__ = __webpack_require__("../../../../../src/app/planner/spi/spi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SPIModule = (function () {
    function SPIModule() {
    }
    return SPIModule;
}());
SPIModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__spi_component__["a" /* SPIComponent */]
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__spi_component__["a" /* SPIComponent */]],
    })
], SPIModule);

//# sourceMappingURL=spi.module.js.map

/***/ })

});
//# sourceMappingURL=spi.module.chunk.js.map