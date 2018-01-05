webpackJsonp(["coordinator.module"],{

/***/ "../../../../../src/app/coordinator/coordinator.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "nav{\r\n  background: #00d2ff;  /* fallback for old browsers */  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #3a7bd5, #00d2ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n  \r\n  \r\n  /* box-shadow: 0px 1px 15px 1px rgb(94, 97, 138); */\r\n}\r\nnav a{\r\n  color:white;\r\n}\r\n\r\n.nav .open>a{\r\n  background-color: #b93f75;\r\n  border-color: #b93f75;\r\n}\r\n\r\n.nav>li>a:focus, .nav>li>a:hover , .nav>li:active>a{\r\n  text-decoration: none;\r\n    background-color: #b93f75;\r\n    color: #ffffff;\r\n}\r\n\r\n.navbar-login{\r\n  width: 305px;\r\n  padding: 10px;\r\n  padding-bottom: 0px;\r\n}\r\n\r\n.navbar-login-session{\r\n  padding: 10px;\r\n  padding-bottom: 0px;\r\n  padding-top: 0px;\r\n}\r\n\r\n.icon-size{\r\n  font-size: 87px;\r\n}\r\n\r\n.table{\r\n  margin-bottom: 0px;\r\n }\r\n .table .table {\r\n  background-color: inherit;\r\n }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/coordinator/coordinator.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-fixed-top\">\r\n  <div class=\"navbar-header\">\r\n    <a class=\"navbar-brand\" href=\"\" style=\"font-family: -webkit-pictograph;font-weight: bolder;background:#397cd5;color: red;\">UAEU</a>\r\n  </div>\r\n  <ul class=\"nav navbar-nav navbar-right\" style=\"margin-right:0px;\">\r\n    <li class=\"dropdown\">\r\n      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n        <span class=\"glyphicon glyphicon-user\"></span>\r\n        <strong>{{userDetails.firstName}}</strong>\r\n        <span class=\"glyphicon glyphicon-chevron-down\"></span>\r\n      </a>\r\n      <ul class=\"dropdown-menu\">\r\n        <li>\r\n          <div class=\"navbar-login\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-4\">\r\n                <p class=\"text-center\">\r\n                  <span class=\"glyphicon glyphicon-user icon-size\"></span>\r\n                </p>\r\n              </div>\r\n              <div class=\"col-lg-8\">\r\n                <p class=\"text-left\">\r\n                  <strong>{{userDetails.firstName}} {{userDetails.lastName}}</strong>\r\n                </p>\r\n                <p class=\"text-left small\">{{userDetails.email}}</p>\r\n                <p class=\"text-left\">\r\n                  <a href=\"#\" class=\"btn btn-primary btn-block btn-sm\">Profile</a>\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </li>\r\n        <li class=\"divider\"></li>\r\n        <li>\r\n          <div class=\"navbar-login navbar-login-session\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-12\">\r\n                <p>\r\n                  <a routerLink=\"/login\" class=\"btn btn-danger btn-block\" (click)=\"logout()\">Logout</a>\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</nav>\r\n\r\n<!-- <nav class=\"navbar navbar-default navbar-fixed-top\">\r\n  <div class=\"container-fluid\">\r\n    <ul class=\"nav navbar-nav\">\r\n      <li routerLinkActive=\"active\"><a routerLink=\"/\">Home</a></li>\r\n      <li><a routerLink=\"/login\" (click)=\"logout()\">Logout</a></li>      \r\n    </ul>\r\n  </div>\r\n  <ul class=\"nav navbar-nav navbar-right\">\r\n    <li class=\"dropdown\">\r\n      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n        <span class=\"glyphicon glyphicon-user\"></span>\r\n        <strong>{{userDetails.firstName}}</strong>\r\n        <span class=\"glyphicon glyphicon-chevron-down\"></span>\r\n      </a>\r\n      <ul class=\"dropdown-menu\">\r\n        <li>\r\n          <div class=\"navbar-login\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-4\">\r\n                <p class=\"text-center\">\r\n                  <span class=\"glyphicon glyphicon-user icon-size\"></span>\r\n                </p>\r\n              </div>\r\n              <div class=\"col-lg-8\">\r\n                <p class=\"text-left\">\r\n                  <strong>{{userDetails.firstName}} {{userDetails.lastName}}</strong>\r\n                </p>\r\n                <p class=\"text-left small\">{{userDetails.email}}</p>\r\n                <p class=\"text-left\">\r\n                  <a href=\"#\" class=\"btn btn-primary btn-block btn-sm\">Profile</a>\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </li>\r\n        <li class=\"divider\"></li>\r\n        <li>\r\n          <div class=\"navbar-login navbar-login-session\">\r\n            <div class=\"row\">\r\n              <div class=\"col-lg-12\">\r\n                <p>\r\n                  <a href=\"#\" class=\"btn btn-danger btn-block\" (click)=\"logout()\">Logout</a>\r\n                </p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </li>\r\n      </ul>\r\n    </li>\r\n  </ul>\r\n</nav> -->\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/coordinator/coordinator.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoordinatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CoordinatorComponent = (function () {
    function CoordinatorComponent(stogareService) {
        this.stogareService = stogareService;
        this.userDetails = {};
        this.userDetails = this.stogareService.getData('userDetails');
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
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_storage_service__["a" /* StorageService */]) === "function" && _a || Object])
], CoordinatorComponent);

var _a;
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