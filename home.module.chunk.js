webpackJsonp(["home.module"],{

/***/ "../../../../../src/app/planner/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "  <div class=\"container-fluid\">\r\n    <div class=\"container text-center\" style=\"    padding: 20px;\">\r\n      <img src=\"assets/uaeu_signature.png\" style=\"height: 100px;\">\r\n    </div>\r\n    <div class=\"panel panel-info panel-no-border\">\r\n      <div class=\"panel-heading\">\r\n        <div class=\"dropdown pull-right\">\r\n          <span class=\"glyphicon glyphicon-option-vertical dropdown-toggle\" data-toggle=\"dropdown\" (click)=\"editMisionVision('mission', organizationInfo.mission);\"></span>\r\n          <ul class=\"dropdown-menu\">\r\n            <li><a data-toggle=\"modal\" data-target=\"#missionVisionForm\" >Edit</a></li>\r\n          </ul>\r\n        </div>\r\n        <b class=\"panel-title\">Mission</b>\r\n      </div>\r\n      <div class=\"panel-body panel-no-border\">\r\n        {{organizationInfo.mission}}\r\n      </div>\r\n    </div>\r\n    <div class=\"panel panel-info panel-no-border\">\r\n      <div class=\"panel-heading\">\r\n        <div class=\"dropdown pull-right\">\r\n          <span class=\"glyphicon glyphicon-option-vertical dropdown-toggle\" data-toggle=\"dropdown\" \r\n          (click)=\"editMisionVision('vision', organizationInfo.vision);\"></span>\r\n          <ul class=\"dropdown-menu\">\r\n            <li><a data-toggle=\"modal\" data-target=\"#missionVisionForm\" >Edit</a></li>\r\n          </ul>\r\n        </div>\r\n        <b class=\"panel-title\">Vision</b>\r\n      </div>\r\n      <div class=\"panel-body panel-no-border\">\r\n        {{organizationInfo.vision}}\r\n      </div>\r\n    </div>\r\n  \r\n    <div class=\"panel panel-info\">\r\n      <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">\r\n          <b>Values</b>\r\n          <span class=\"pull-right ctooltip\">\r\n            <button class=\"btn btn-circle btn-right green-background\" data-toggle=\"modal\" data-target=\"#valueForm\" (click)=\"onValueSelected('',null)\">\r\n              <i class=\"glyphicon glyphicon-plus\"></i>\r\n            </button>\r\n            <span class=\"ctooltiptext\">Add Values</span>\r\n          </span>\r\n        </h3>            \r\n      </div>\r\n      <div class=\"panel-collapse collapse in\">\r\n        <div class=\"panel-body\" *ngIf=\"organizationInfo.values\">\r\n          <div class=\"panel panel-info\" *ngFor=\"let val of organizationInfo.values;let i = index;\">\r\n            <div class=\"panel-heading\"><b>{{i+1}}. {{val.title}}</b>\r\n              <div class=\"dropdown pull-right\">\r\n                <span class=\"glyphicon glyphicon-option-vertical dropdown-toggle\" data-toggle=\"dropdown\"></span>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a data-toggle=\"modal\" data-target=\"#valueForm\" (click)=\"onValueSelected(val,i)\">Edit</a></li>\r\n                  <li><a (click)=\"deleteValue(val,i)\">Delete</a></li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <div class=\"panel-body\">{{val.description}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  \r\n  \r\n  <div class=\"modal fade\" id=\"valueForm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n      <div class=\"modal-content\">\r\n        <!-- Modal Header -->\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n              <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>\r\n          </button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\">\r\n            Value\r\n          </h4>\r\n        </div>\r\n        <!-- Modal Body -->\r\n        <form [formGroup]=\"valueForm\" (submit)=\"onValueSubmit()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <label for=\"title\">Title</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"title\" formControlName=\"title\" />\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"description\">Description</label>\r\n              <textarea type=\"text\" class=\"form-control\" id=\"description\" formControlName=\"description\"></textarea>\r\n            </div>\r\n          </div>\r\n          <!-- Modal Footer -->\r\n          <div class=\"modal-footer\">\r\n            <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  \r\n  \r\n  <div class=\"modal fade\" id=\"missionVisionForm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n      <div class=\"modal-content\">\r\n        <!-- Modal Header -->\r\n        <div class=\"modal-header\">\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n            <span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>\r\n          </button>\r\n          <h4 class=\"modal-title\" id=\"myModalLabel\" style=\"text-transform:capitalize;\">\r\n            {{missionVision}}\r\n          </h4>\r\n        </div>\r\n        <!-- Modal Body -->\r\n        <form [formGroup]=\"missionVisionForm\" (submit)=\"onMissionVisionSubmit()\">\r\n          <div class=\"modal-body\">\r\n            <div class=\"form-group\">\r\n              <!--<label for=\"description\">Description</label>-->\r\n              <textarea type=\"text\" class=\"form-control\" id=\"description\" formControlName=\"description\"></textarea>\r\n            </div>\r\n          </div>\r\n          <!-- Modal Footer -->\r\n          <div class=\"modal-footer\">\r\n            <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n      <!-- ===============================================================================\r\n  ======================== /End of Initial setup Interface ==============================================\r\n  ===================================================================================== -->\r\n  "

/***/ }),

/***/ "../../../../../src/app/planner/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__ = __webpack_require__("../../../../../src/app/shared/UTI.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomeComponent = (function () {
    function HomeComponent(commonService, orgSer) {
        this.commonService = commonService;
        this.orgSer = orgSer;
        this.valueForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            title: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]),
            description: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required),
        });
        this.missionVisionForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            description: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required)
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        // this.organizationInfo = this.commonService.getData('org_info');  
        this.fetchOrganizationInfo();
    };
    HomeComponent.prototype.fetchOrganizationInfo = function () {
        var _this = this;
        this.orgSer.fetchOrganizationInfo().subscribe(function (res) {
            _this.commonService.storeData("org_info", res);
            _this.organizationInfo = res;
        }, function (err) {
        });
    };
    HomeComponent.prototype.onValueSubmit = function () {
        var _this = this;
        if (this.selectedValue) {
            this.orgSer.updateValue(this.valueForm.value, this.selectedValue.valueId)
                .subscribe(function (res) {
                _this.valueForm.value["id"] = _this.selectedValue.valueId;
                _this.organizationInfo.values[_this.selectedValueIndex] = _this.valueForm.value;
                _this.commonService.storeData('org_info', _this.organizationInfo);
                $('#valueForm').modal('hide');
                _this.valueForm.reset();
            });
        }
        else {
            this.valueForm.value["universityId"] = this.organizationInfo.universityId;
            this.orgSer.addValue([this.valueForm.value]).subscribe(function (res) {
                _this.organizationInfo.values.push(_this.valueForm.value);
                $('#valueForm').modal('hide');
                _this.valueForm.reset();
            });
        }
    };
    HomeComponent.prototype.deleteValue = function (val, index) {
        var _this = this;
        console.log("asddfadsfdsfds adsf ");
        this.orgSer.deleteValue(val.valueId).subscribe(function (res) {
            _this.organizationInfo.values.splice(index, 1);
        });
    };
    HomeComponent.prototype.onValueSelected = function (val, index) {
        this.valueForm.controls["title"].patchValue(val.title);
        this.valueForm.controls["description"].patchValue(val.description);
        this.selectedValue = val;
        this.selectedValueIndex = index;
    };
    HomeComponent.prototype.editMisionVision = function (title, mvDesc) {
        this.missionVision = title;
        this.missionVisionForm.controls["description"].patchValue(mvDesc);
    };
    HomeComponent.prototype.onMissionVisionSubmit = function () {
        var _this = this;
        var org_info = this.commonService.getData('org_info');
        var object = {};
        object[this.missionVision] = this.missionVisionForm.value['description'];
        console.log(object);
        this.orgSer.updateMisionVision(object).subscribe(function (res) {
            _this.organizationInfo[_this.missionVision] = _this.missionVisionForm.value['description'];
            org_info[_this.missionVision] = _this.missionVisionForm.value['description'];
            _this.commonService.storeData('org_info', org_info);
            $('#missionVisionForm').modal('hide');
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'planner-home',
        template: __webpack_require__("../../../../../src/app/planner/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__["a" /* UniversityService */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/planner/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_component__ = __webpack_require__("../../../../../src/app/planner/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__initial_setup_setup_component__ = __webpack_require__("../../../../../src/app/planner/home/initial-setup/setup.component.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forChild([
                {
                    path: '',
                    component: __WEBPACK_IMPORTED_MODULE_1__home_component__["a" /* HomeComponent */]
                },
                {
                    path: 'initial-setup',
                    component: __WEBPACK_IMPORTED_MODULE_4__initial_setup_setup_component__["a" /* InitialSetup */]
                }
            ])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__home_component__["a" /* HomeComponent */], __WEBPACK_IMPORTED_MODULE_4__initial_setup_setup_component__["a" /* InitialSetup */]],
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/home/initial-setup/setup.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"container text-center\" style=\"    padding: 20px;\">\r\n    <img src=\"assets/uaeu_signature.png\" style=\"height: 100px;\">\r\n  </div>\r\n  <form class=\"form-horizontal\" [formGroup]=\"setupForm\" (submit)=\"onSubmit()\">\r\n    <div class=\"form-group\">\r\n      <label class=\"control-label col-sm-2\" for=\"mission\">Mission:</label>\r\n      <div class=\"col-sm-8\">\r\n        <textarea class=\"form-control\" id=\"mission\" formControlName=\"mission\"></textarea>\r\n      </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label class=\"control-label col-sm-2\" for=\"vision\">Vision:</label>\r\n      <div class=\"col-sm-8\">\r\n        <textarea class=\"form-control\" id=\"vision\" formControlName=\"vision\"></textarea>\r\n      </div>\r\n    </div>\r\n    <div formArrayName=\"values\">\r\n      <div class=\"form-group\">\r\n        <label class=\"control-label col-sm-2\">Values :</label>\r\n      <!-- </div> -->\r\n      <div class=\"col-sm-8\">\r\n      <div class=\"col-sm-6\" *ngFor=\"let stu of setupForm.controls.values.controls;let j=index;\" [formGroupName]=\"j\" style=\"padding: 0px;\">\r\n        <div class=\"panel\">\r\n          <div class=\"panel-heading\">\r\n            <button type=\"button\" class=\"close\" (click)=\"removeValue(j)\">&times;</button>\r\n          </div>\r\n          <div class=\"panel-body\">\r\n            <div class=\"form-group\">\r\n              <label class=\"control-label col-sm-3\" for=\"title\">Title:</label>\r\n              <div class=\"col-sm-8\">\r\n                <input type=\"text\" class=\"form-control\" id=\"title\" formControlName=\"title\" placeholder=\"Enter title\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label class=\"control-label col-sm-3\" for=\"desc\">Description:</label>\r\n              <div class=\"col-sm-8\">\r\n                <textarea class=\"form-control\" id=\"desc\" formControlName=\"description\"></textarea>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <div class=\"col-sm-offset-2 col-sm-10\">\r\n          <button type=\"button\" class=\"btn btn-default\" (click)=\"addValue()\">Add Value</button>\r\n          <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </form>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/home/initial-setup/setup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitialSetup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__ = __webpack_require__("../../../../../src/app/shared/UTI.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InitialSetup = (function () {
    function InitialSetup(fb, st, utiService) {
        this.fb = fb;
        this.st = st;
        this.utiService = utiService;
        this.setupForm = this.fb.group({
            "mission": ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
            "vision": ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
            "values": this.fb.array([this.fb.group({
                    "title": ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
                    "description": ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]]
                })]),
            "universityId": this.st.getData('org_info').universityId
        });
    }
    InitialSetup.prototype.onSubmit = function () {
        this.utiService.saveInitialSetup(this.setupForm.value).subscribe(function (response) {
            console.log("success", response);
        });
    };
    InitialSetup.prototype.inItValue = function () {
        return this.fb.group({
            "title": ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
            "description": ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]]
        });
    };
    InitialSetup.prototype.removeValue = function (index) {
        var control = this.setupForm.controls['values'];
        control.removeAt(index);
    };
    InitialSetup.prototype.addValue = function () {
        var control = this.setupForm.controls['values'];
        control.push(this.inItValue());
    };
    return InitialSetup;
}());
InitialSetup = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'initial-setup',
        template: __webpack_require__("../../../../../src/app/planner/home/initial-setup/setup.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_UTI_service__["a" /* UniversityService */]) === "function" && _c || Object])
], InitialSetup);

var _a, _b, _c;
//# sourceMappingURL=setup.component.js.map

/***/ })

});
//# sourceMappingURL=home.module.chunk.js.map