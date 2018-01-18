webpackJsonp(["department.module"],{

/***/ "../../../../../src/app/admin/department/department.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-8\">\r\n      <div class=\"panel panel-default\">\r\n        <div class=\"panel-heading\" style=\"color: red;\">\r\n          <h4>Add New Department</h4>\r\n        </div>\r\n        <div class=\"panel-body\">\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"panel panel-default\">\r\n          <div class=\"panel-heading\" style=\"color: red;\">\r\n            <h4>Existing Departments</h4>\r\n          </div>\r\n          <div class=\"panel-body\">\r\n            \r\n          </div>\r\n        </div>       \r\n    </div>    \r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/admin/department/department.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeparmtmentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__admin_service__ = __webpack_require__("../../../../../src/app/admin/admin.service.ts");
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




var DeparmtmentComponent = (function () {
    function DeparmtmentComponent(formBuilder, adminService, cs) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.adminService = adminService;
        this.cs = cs;
        this.departments = [];
        adminService.getDepartments().subscribe(function (response) {
            if (response.status === 204) {
                _this.departments = [];
                // alert("There is not Departments Entry yet.\nYou are going to create Parent Department");
            }
            else {
                console.log(response);
                _this.departments = response;
            }
        }, function (err) {
            _this.departments = [];
            console.log(err);
        });
        adminService.getUniversity().subscribe(function (response) {
            if (response.status === 204) {
                _this.university = [];
                alert("There is not university Entry yet.\nFirst Feed the entries of University");
            }
            else {
                console.log(response);
                _this.university = response;
            }
        }, function (err) {
            _this.university = [];
            console.log(err);
        });
        this.newDepartment = this.formBuilder.group({
            "department": ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]],
            "parentDepartmentId": [-1, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]]
        });
    }
    DeparmtmentComponent.prototype.onSubmit = function () {
        var _this = this;
        this.newDepartment.value['universityId'] = this.cs.getData('org_info').id;
        if (this.newDepartment.value['parentDepartmentId'] == -1) {
            delete this.newDepartment.value['parentDepartmentId'];
        }
        this.adminService.addDepartment(this.newDepartment.value).subscribe(function (res) {
            _this.departments.push(res);
            $('#deptModal').modal('show');
            _this.newDepartment.reset();
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    };
    return DeparmtmentComponent;
}());
DeparmtmentComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'department',
        template: __webpack_require__("../../../../../src/app/admin/department/department.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__admin_service__["a" /* AdminService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], DeparmtmentComponent);

var _a, _b, _c;
//# sourceMappingURL=department.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/department/department.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepartmentModule", function() { return DepartmentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__department_component__ = __webpack_require__("../../../../../src/app/admin/department/department.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DepartmentModule = (function () {
    function DepartmentModule() {
    }
    return DepartmentModule;
}());
DepartmentModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forChild([
                {
                    path: '',
                    component: __WEBPACK_IMPORTED_MODULE_3__department_component__["a" /* DeparmtmentComponent */]
                }
            ])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_3__department_component__["a" /* DeparmtmentComponent */]],
    })
], DepartmentModule);

//# sourceMappingURL=department.module.js.map

/***/ })

});
//# sourceMappingURL=department.module.chunk.js.map