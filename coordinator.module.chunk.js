webpackJsonp(["coordinator.module"],{

/***/ "../../../../../src/app/coordinator/coordinator.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menuBar{\r\n  border: 1px solid #6788be;\r\n  background-color: #93b4df;\r\n}\r\n\r\n.table{\r\n  margin-bottom: 0px;\r\n }\r\n .table .table {\r\n  background-color: inherit;\r\n }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/coordinator/coordinator.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top menuBar\">\r\n  <div class=\"container-fluid\">\r\n    <ul class=\"nav navbar-nav\">\r\n      <li routerLinkActive=\"active\"><a routerLink=\"/\">Home</a></li>\r\n      <li><a routerLink=\"/login\" (click)=\"logout()\">Logout</a></li>      \r\n    </ul>\r\n  </div>\r\n</nav>\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/coordinator/coordinator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoordinatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CoordinatorComponent = (function () {
    function CoordinatorComponent() {
    }
    CoordinatorComponent.prototype.logout = function () {
        localStorage.clear();
    };
    return CoordinatorComponent;
}());
CoordinatorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'co-ordinator',
        template: __webpack_require__("../../../../../src/app/coordinator/coordinator.component.html"),
        styles: [__webpack_require__("../../../../../src/app/coordinator/coordinator.component.css")]
    })
], CoordinatorComponent);

//# sourceMappingURL=coordinator.component.js.map

/***/ }),

/***/ "../../../../../src/app/coordinator/coordinator.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoordinatorModule", function() { return CoordinatorModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coordinator_component__ = __webpack_require__("../../../../../src/app/coordinator/coordinator.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_default_header_service__ = __webpack_require__("../../../../../src/app/shared/default.header.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var CoordinatorModule = (function () {
    function CoordinatorModule() {
    }
    return CoordinatorModule;
}());
CoordinatorModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_5__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forChild([
                {
                    path: '',
                    redirectTo: 'home',
                    pathMatch: 'full'
                },
                {
                    path: '',
                    component: __WEBPACK_IMPORTED_MODULE_1__coordinator_component__["a" /* CoordinatorComponent */],
                    children: [
                        {
                            path: '',
                            loadChildren: 'app/coordinator/home/home.module#HomeModule'
                        }
                    ]
                },
            ])],
        providers: [__WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */], __WEBPACK_IMPORTED_MODULE_4__shared_default_header_service__["a" /* CustomHttpService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__coordinator_component__["a" /* CoordinatorComponent */]],
    })
], CoordinatorModule);

//# sourceMappingURL=coordinator.module.js.map

/***/ })

});
//# sourceMappingURL=coordinator.module.chunk.js.map