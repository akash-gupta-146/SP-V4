webpackJsonp(["home.module.0"],{

/***/ "../../../../../src/app/coordinator/coordinator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoordinatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__ = __webpack_require__("../../../../../src/app/shared/default.header.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CoordinatorService = (function () {
    function CoordinatorService(http, htttp, con) {
        this.http = http;
        this.htttp = htttp;
        this.con = con;
        this.baseUrl = "";
        this.baseUrl = con.baseUrl + con.getData('user_roleInfo')[0].role;
    }
    CoordinatorService.prototype.getOpiByDeptId = function (deptId) {
        return this.http.get(this.baseUrl + "/department/" + deptId + "/result")
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterResult = function (data) {
        return this.http.post(this.baseUrl + "/result", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterWithInternship = function (quarterId, data) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/quarter/" + quarterId + "/studentInternshipForm", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateQuarterResult = function (quarterId, data) {
        return this.http.put(this.baseUrl + "/quarter/" + quarterId + "/lock", {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidence = function (data, quarterId) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/quarter/" + quarterId + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidenceForInternshipFile = function (data, id) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/internship/" + id + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteInternshipFile = function (internshipFileId) {
        return this.http.delete(this.baseUrl + "/internship/" + internshipFileId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteInternshipEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/internship/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveEvidenceForMou = function (data, id) {
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            })
        });
        return this.htttp.post(this.baseUrl + "/mous/" + id + "/evidance", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteMou = function (mouResultId) {
        return this.http.delete(this.baseUrl + "/mous/" + mouResultId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteMouEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/mous/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.deleteEvidence = function (evidenceId) {
        return this.http.delete(this.baseUrl + "/evidance/" + evidenceId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.saveQuarterResultWithMou = function (quarterId, data) {
        return this.http.post(this.baseUrl + "/quarter/" + quarterId + "/mous", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateQuarterResultCurrentCost = function (quarterId, data) {
        return this.http.put(this.baseUrl + "/quarter/" + quarterId + "/result", data)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.updateMou = function (mouId, mou) {
        return this.http.put(this.baseUrl + "/mous/" + mouId, mou)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoordinatorService.prototype.extractData = function (res) {
        if (res.status === 204) {
            return res;
        }
        var body = res.json();
        return body || {};
    };
    CoordinatorService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_2__angular_http__["e" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            if (error.status === 0) {
                errMsg = error.status + " - \"Something is wrong..\"";
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw(errMsg);
    };
    return CoordinatorService;
}());
CoordinatorService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__["a" /* CustomHttpService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_default_header_service__["a" /* CustomHttpService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], CoordinatorService);

var _a, _b, _c;
//# sourceMappingURL=coordinator.service.js.map

/***/ }),

/***/ "../../../../../src/app/coordinator/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".table{\r\n margin-bottom: 0px;\r\n}\r\n.table .table {\r\n background-color: inherit;\r\n}\r\n\r\n.panel-opi{\r\n    margin-top: 50px;\r\n}\r\n\r\n.panel-opi .panel-title{\r\n    font-size: 25px;\r\n    color: hsl(264, 6%, 69%);;\r\n}\r\n\r\n.panel-opi .panel-heading{\r\n    background: #563d7c;\r\n}\r\n\r\ndiv[customBox]{\r\n    padding:30px;\r\n    /* height:30px; */\r\n    /* text-align: center; */\r\n  }\r\n  div[line]{\r\n    width:150px;\r\n    border-top:2px solid black;\r\n    display: -webkit-inline-box;\r\n    position:relative;\r\n    transition:0.9s;\r\n  }\r\n  div[line]::before{\r\n    content:'';\r\n    width:20px;\r\n    height:20px;\r\n    border:2px solid black;\r\n    background:white;\r\n    display:block;\r\n    border-radius:50%;\r\n    margin-top:-11px;\r\n    position:absolute;\r\n    right:-16px;\r\n  }\r\n\r\n  div[line] h4{\r\n    text-transform: uppercase;\r\n    margin: auto;\r\n    padding: 20px;\r\n    color:var(--color-primary);\r\n  }\r\n  .active{\r\n    border-color:yellow !important;\r\n  }\r\n  .active::before{\r\n    background:yellow !important;\r\n  }\r\n\r\n  .approved{\r\n    border-color: #1B5E20!important;\r\n  }\r\n  .approved::before{\r\n    background: #1B5E20 !important;\r\n    z-index: 1;\r\n  }\r\n  .rejected{\r\n    border-color: #D50000 !important;\r\n  }\r\n  .rejected::before{\r\n    background: #D50000!important;\r\n    z-index: 1;\r\n  }\r\n  .locked{\r\n    border-color: #C51162 !important;\r\n  }\r\n  .locked::before{\r\n    background: #C51162!important;\r\n    z-index: 1;\r\n  }\r\n  .null{\r\n    border-color:black !important;\r\n  }\r\n  .null::before{\r\n    background:white(134, 134, 95) !important;\r\n    z-index: 1;\r\n  }\r\n\r\n#statu-legend ul\r\n{\r\nmargin: 0;\r\npadding: 0;\r\nlist-style-type: none;\r\ntext-align: center;\r\n}\r\n\r\n#statu-legend ul li {     display: inline-block;\r\n    padding: 0 30px;; }\r\n\r\n\r\n#statu-legend li:before{\r\n    content: '';\r\n    width: 10px;\r\n    height: 10px;\r\n    border-radius: 50%;\r\n    border: 1px solid black;\r\n    display: block;\r\n    left: -15px;\r\n    top: 14px;\r\n    position: relative;\r\n}\r\n.red:before{\r\n    background:#D50000;\r\n    \r\n}\r\n.cyan:before{\r\n    background:#C51162;\r\n}\r\n.green:before{\r\n    background:#1B5E20;\r\n}\r\n.white:before{\r\n    background:white;\r\n}\r\n.table-card .table1{\r\n    background:var(--color0);\r\n    margin-bottom: 0px;\r\n    box-shadow: 0 1px 8px 0 rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 3px 3px -2px rgba(0,0,0,.12); \r\n  }\r\n  \r\n  \r\n  .table-card thead{\r\n    background: var(--color-primary);\r\n    color:var(--color0);\r\n  }\r\n  \r\n  .hide-text{\r\n    float: left;\r\n    position: absolute;\r\n    margin-top: 10px;\r\n  }\r\n\r\n\r\n  /* serach-css  start*/\r\n  .search-form .form-group {\r\n    float: right !important;\r\n    transition: all 0.35s, border-radius 0s;\r\n    width: 32px;\r\n    height: 32px;\r\n    background-color: var(--color-text);\r\n    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;\r\n    border-radius: 25px;\r\n    border: 1px solid #ccc;\r\n  }\r\n  .search-form .form-group input.form-control {\r\n    padding-right: 20px;\r\n    border: 0 none;\r\n    background: transparent;\r\n    box-shadow: none;\r\n    display:block;\r\n  }\r\n  .search-form .form-group input.form-control::-webkit-input-placeholder {\r\n    display: none;\r\n    color:var(--color-primary);\r\n  }\r\n  .search-form .form-group input.form-control:-moz-placeholder {\r\n    /* Firefox 18- */\r\n    display: none;\r\n  }\r\n  .search-form .form-group input.form-control::-moz-placeholder {\r\n    /* Firefox 19+ */\r\n    display: none;\r\n  }\r\n  .search-form .form-group input.form-control:-ms-input-placeholder {\r\n    display: none;\r\n  }\r\n  .search-form .form-group:hover,\r\n  .search-form .form-group.hover {\r\n    width: 100%;\r\n    border-radius: 4px 25px 25px 4px;\r\n  }\r\n  .search-form .form-group span.form-control-feedback {\r\n    position: absolute;\r\n    top: -1px;\r\n    right: -2px;\r\n    z-index: 2;\r\n    display: block;\r\n    width: 34px;\r\n    height: 34px;\r\n    line-height: 34px;\r\n    text-align: center;\r\n    color: var(--color-primary);\r\n    left: initial;\r\n    font-size: 14px;\r\n  }\r\n  \r\n  \r\n\r\n\r\n/* serach css end */\r\n.edit-panel .panel-title{\r\n  padding: 10px;\r\n}\r\n\r\n.mini {\r\n  text-align: center;\r\n}\r\n\r\n.mini strong{\r\n  text-decoration: underline;\r\n  color: var(--color-primary);\r\n}\r\n\r\n/* legand */\r\n.the-legend {\r\n  background: var(--color-text);\r\n  color:var(--color-primary);\r\n  border-style: none;\r\n  border-width: 0;\r\n  font-size: 14px;\r\n  line-height: 20px;\r\n  margin-bottom: 0;\r\n  width: auto;\r\n  padding: 8px 16px;\r\n  border: 1px solid var(--color-text);\r\n  border-radius: 6px;\r\n}\r\n.the-fieldset {\r\n  border: 1px solid var(--color-primary);\r\n  padding: 10px;\r\n}\r\n/* legand */\r\n\r\n\r\n.panel-heading{\r\n  background: var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.bar .modal-header{\r\n  background: var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.bar .close{\r\n  color:var(--coolor0);\r\n  opacity: 1;\r\n}\r\n\r\n/* edit-table */\r\n .table-edit thead th{\r\n   background: var(--color-primary);\r\n   color:var(--color-text);\r\n\r\n }\r\n\r\n\r\n .edit-text{\r\n   text-transform: uppercase;\r\n   color:var(--color-primary);\r\n   text-decoration: underline;\r\n }\r\n\r\n .glyphicon glyphicon-chevron-down:focus {\r\n  outline: -webkit-focus-ring-color auto 0px;\r\n}\r\n\r\n\r\n.table-edit .close{\r\n  color:var(--color-primary);\r\n}\r\n.close:focus {\r\n  outline: -webkit-focus-ring-color auto 0px;\r\n}\r\n\r\n\r\n.box{\r\n  background: var(--color-text);\r\n  padding: 13px;\r\n  width: 80%;\r\n  margin-top: 15px;\r\n  margin-left: 13px;\r\n  text-align: center;\r\n  font-size: 17px;\r\n  text-transform: uppercase;\r\n}\r\n\r\n.box a{\r\n  color:var(--color-primary);\r\n}\r\n\r\n.file{\r\n color: #563d7c;\r\n}\r\n\r\n.header-background th{\r\n  text-transform: uppercase;\r\n  vertical-align: middle;\r\n}\r\n\r\n.heading-details{\r\n  font-size: 16px;\r\n  text-transform: uppercase;\r\n  color: #563d7c;\r\n  font-weight: 700;\r\n  text-align: center;\r\n  text-decoration: underline;\r\n  \r\n}\r\n\r\n.btn-save{\r\n  background: var(--color-primary);\r\n  border-color:var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.btn-save:hover ,.btn-save:active ,.btn-save:focus{\r\n  background: var(--color-primary);\r\n  border-color:var(--color-primary);\r\n  color:var(--color-text);\r\n}\r\n\r\n.panel-title .close{\r\n  color:var(--color-text);\r\n  opacity: 1;\r\n}\r\n\r\n/* edit-table */", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/coordinator/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <!-- new code -->\r\n  <div class=\"panel\" *ngIf=\"selectedOpi\" style=\"margin-top:50px;\" id=\"first-section\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title \">\r\n          <button type=\"button\" class=\"close\" (click)=\"closeForm();\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n        <a data-toggle=\"collapse\" href=\"#edit-section\">EDIT SECTION</a>\r\n      </h4>\r\n     \r\n    </div>\r\n    <div id=\"edit-section\" class=\"panel-collapse collapse in\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <h5>\r\n              <strong>STRATEGIC GOAL</strong>\r\n            </h5>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            <h5>{{selectedOpi.goal}}</h5>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <h5>\r\n              <strong>INITIATIVE</strong>\r\n            </h5>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            <h5>{{selectedInitiative.initiative}}</h5>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <h5>\r\n              <strong>ACTIVITY</strong>\r\n            </h5>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            <h5>{{selectedActivity.activity}}</h5>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-sm-2\">\r\n            <h5>\r\n              <strong>OPI</strong>\r\n            </h5>\r\n          </div>\r\n          <div class=\"col-sm-10\">\r\n            <h5> {{selectedMeasure.opi}}</h5>\r\n          </div>\r\n        </div>\r\n        <div class=\"row mini\">\r\n          <div class=\"col-sm-3 \">\r\n            <h5>\r\n              <strong>FREQUENCY</strong>\r\n            </h5>\r\n            <h5>{{selectedMeasure.frequency}}</h5>\r\n          </div>\r\n          <div class=\"col-sm-3\">\r\n            <h5>\r\n              <strong>MEASURE UNIT</strong>\r\n            </h5>\r\n            <h5>{{selectedMeasure.measureUnit}}</h5>\r\n          </div>\r\n          <div class=\"col-sm-3\">\r\n            <h5>\r\n              <strong>BASE LINE</strong>\r\n            </h5>\r\n            <h5>{{selectedMeasure.departmentInfo[0].baseline}}</h5>\r\n          </div>\r\n          <div class=\"col-sm-3\">\r\n            <h5>\r\n              <strong>EVIDENCE FORM TYPE</strong>\r\n            </h5>\r\n            <h5> {{selectedMeasure.evidanceForm}}\r\n              <p *ngIf=\"!selectedMeasure.evidanceForm\">None</p>\r\n            </h5>\r\n          </div>\r\n        </div>\r\n        <fieldset class=\"the-fieldset\">\r\n          <legend class=\"the-legend\">Edit-Section</legend>\r\n          <!-- without evidenceformId -->\r\n          <div class=\"row\" *ngIf=\"!selectedMeasure.evidanceFormId\" style=\"padding:15px;\">\r\n            <table id=\"accordion\" class=\"table table-hover table-bordered table-edit\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Year</th>\r\n                  <th>Estimated Cost</th>\r\n                  <th>Quarter</th>\r\n                  <th>EstimatedTargetLevel</th>\r\n                  <th>Current Cost</th>\r\n                  <th>CurrentTargetLevel</th>\r\n                  <th>End Date</th>\r\n                  <th></th>\r\n                </tr>\r\n              </thead>\r\n              <tbody *ngFor=\"let tdl of selectedMeasure.departmentInfo[0].opiAnnualTargets;let at=index;\">\r\n                <tr>\r\n                  <td [attr.rowspan]=\"tdl.levels.length + 2\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n                  <td [attr.rowspan]=\"tdl.levels.length + 2\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n                </tr>\r\n                <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n                  <tr [style.background]=\"lev.disable?'lightgray':null\">\r\n                    <td>{{lev.quarter}}</td>\r\n                    <td>{{lev.estimatedTargetLevel}}</td>\r\n                    <td>\r\n                      <input type=\"number\" [(ngModel)]=\"lev.currentCost\" *ngIf=\"lev.status=='unsubmitted'\" [disabled]=\"lev.disable\">\r\n                      <span *ngIf=\"lev.status!='unsubmitted'\">{{lev.currentCost}}</span>\r\n                    </td>\r\n                    <td>\r\n                      <input type=\"number\" [(ngModel)]=\"lev.currentTargetLevel\" *ngIf=\"lev.status=='unsubmitted'\" [disabled]=\"lev.disable\">\r\n                      <span *ngIf=\"lev.status!='unsubmitted'\">{{lev.currentTargetLevel}}</span>\r\n                    </td>\r\n                    <td>{{lev.endDate + tdl.year}}</td>\r\n                    <td>\r\n                      <div *ngIf=\"!lev.disable\">\r\n                        <button *ngIf=\"lev.status=='unsubmitted'\" [disabled]=\"!(lev.currentTargetLevel&&lev.currentCost)\" (click)=\"lev.isUpdating=false;saveQuarterResult(lev)\"\r\n                          [disabled]=\"lev.disable\"> Save</button>\r\n                        <button *ngIf=\"lev.status=='inprogress'\" data-toggle=\"modal\" data-target=\"#evidenceForm\" (click)=\"selectedQuarter=lev;evForm=0\"\r\n                          [disabled]=\"lev.disable\">Upload Evidence</button>\r\n                        <button *ngIf=\"lev.status=='inprogress'\" (click)=\"lev.status='unsubmitted';lev.isUpdating=true;\" [disabled]=\"lev.disable\">Edit</button>\r\n                        <button *ngIf=\"lev.isUpdating\" (click)=\"lev.status='inprogress';lev.isUpdating=false;\"> Cancel</button>\r\n                        <button *ngIf=\"lev.evidance.length&&!isUpdating\" (click)=\"lockQuarterResult(lev)\" [disabled]=\"lev.disable\">Lock</button>\r\n                      </div>\r\n                      <button type=\"button\" class=\"close\" data-toggle=\"collapse\" [attr.href]=\"'#row-collapse'+at\" *ngIf=\"lev.evidance.length\" (click)=\"evidences=lev.evidance;\">\r\n                        <span class=\"glyphicon glyphicon-chevron-down\" aria-hidden=\"true\"></span>\r\n                      </button>\r\n                    </td>\r\n                  </tr>\r\n                </ng-template>\r\n                <ng-container *ngIf=\"evidences.length\">\r\n                  <tr [attr.id]=\"'row-collapse'+at\" class=\"collapse\">\r\n                    <td colspan=\"6\">\r\n                      <div class=\"heading-details\">Evidences</div>\r\n                      <br>\r\n                      <div class=\"row\">\r\n                        <div class=\"col-lg-4\"  *ngFor=\"let ev of evidences;let e = index;\">\r\n                          <div class=\"box\">\r\n                            <span><i class=\"glyphicon glyphicon-file file\"></i></span>\r\n                          <a [attr.href]=\"ev.url\">evidance {{e+1}}</a>\r\n                          <button type=\"button\" class=\"close\" (click)=\"deleteEvidence(evidences,ev,e)\">\r\n                            <span aria-hidden=\"true\">&times;</span>\r\n                            <span class=\"sr-only\">Close</span>\r\n                          </button>\r\n                        </div>\r\n                        </div>\r\n                      </div>\r\n                    </td>\r\n                  </tr>\r\n                </ng-container>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n          <!--with student internship form-->\r\n          <div class=\"row\" *ngIf=\"selectedMeasure.evidanceFormId==1\" style=\"padding:15px;\">\r\n            <table id=\"accordion\" class=\"table table-hover table-bordered table-edit\">\r\n              <colgroup>\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"50%\">\r\n              </colgroup>\r\n              <thead>\r\n                <tr>\r\n                  <th>Year</th>\r\n                  <th>Estimated Cost</th>\r\n                  <th>Quarter</th>\r\n                  <th>EstimatedTargetLevel</th>\r\n                  <th>End Date</th>\r\n                  <th></th>\r\n                </tr>\r\n              </thead>\r\n              <tbody *ngFor=\"let tdl of selectedMeasure.departmentInfo[0].opiAnnualTargets;let at=index;\">\r\n                <tr>\r\n                  <td [attr.rowspan]=\"tdl.levels.length + 5\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n                  <td [attr.rowspan]=\"tdl.levels.length + 5\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n                </tr>\r\n                <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n                  <tr [style.background]=\"lev.disable?'lightgray':null\" data-toggle=\"collapse\" [attr.href]=\"'#row-collapse'+at+'q'+in\" (click)=\"selectedQuarter=lev;evForm=1;\">\r\n                    <td>{{lev.quarter}}</td>\r\n                    <td>{{lev.estimatedTargetLevel}}</td>\r\n                    <td>{{lev.endDate + tdl.year}}</td>\r\n                    <td style=\"text-align:center;\">View</td>\r\n                  </tr>\r\n                  <ng-container>\r\n                    <tr [attr.id]=\"'row-collapse'+at+'q'+in\" class=\"collapse\">\r\n                      <td colspan=\"6\">\r\n                        <table class=\"table table-bordered\">\r\n                          <caption align=\"top\" *ngIf=\"lev.internshipDetails.length\">\r\n                            <div class=\"input-group\">\r\n                              <div class=\"input-group-addon\">Current Cost</div>\r\n                              <input class=\"form-control\" [(ngModel)]=\"lev.currentCost\" style=\"width:25%\" [disabled]=\"!lev.edit\" autofocus>\r\n                              <div class=\"pull-left\" *ngIf=\"!lev.edit;else savebtn\" [hidden]=\"lev.disable\">\r\n                                <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit=true;lev.currentCostCopy=lev.currentCost;\">\r\n                                  <i class=\"glyphicon glyphicon-pencil\"></i>\r\n                                </button>\r\n                              </div>\r\n\r\n                              <ng-template #savebtn>\r\n                                <button type=\"button\" class=\"btn btn-link\" (click)=\"updateCurrentCost(lev);\">\r\n                                  <i class=\"glyphicon glyphicon-floppy-saved\"></i>\r\n                                </button>\r\n                                <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit = false;lev.currentCost=lev.currentCostCopy;\">\r\n                                  <i class=\"glyphicon glyphicon-remove\"></i>\r\n                                </button>\r\n                              </ng-template>\r\n\r\n                              <div class=\"pull-right\">\r\n                                <button (click)=\"lockQuarterResult(lev)\" *ngIf=\"lev.internshipDetails.length\" [disabled]=\"lev.status=='locked'\" [disabled]=\"lev.disable\">Lock </button>\r\n                              </div>\r\n                            </div>\r\n                          </caption>\r\n                          <thead>\r\n                            <tr>\r\n                              <th>Internship Detail</th>\r\n                              <th *ngIf=\"lev.internshipDetails.length\">Evidennce\r\n                                <button class=\"pull-right\" data-toggle=\"modal\" data-target=\"#evidenceForm\" (click)=\"selectedInternshipFile = file;\" *ngIf=\"lev.status!='locked'\"\r\n                                  [disabled]=\"lev.disable\">Add</button>\r\n                              </th>\r\n                            </tr>\r\n                          </thead>\r\n                          <tbody *ngFor=\"let file of lev.internshipDetails;let f=index;\">\r\n                            <tr>\r\n                              <td>\r\n                                <a [attr.href]=\"file.internshipFileUrl\">File 1</a>\r\n                                <button type=\"button\" class=\"close\" (click)=\"deleteInternshipFile(lev.internshipDetails,file,f)\" [disabled]=\"lev.disable\">\r\n                                  <span aria-hidden=\"true\">&times;</span>\r\n                                </button>\r\n                              </td>\r\n                              <td>\r\n                                <ul style=\"list-style: none;padding: 0;\">\r\n                                  <li *ngFor=\"let ev of file.evidance;let e=index;\">\r\n                                    <a [attr.href]=\"ev.url\">evidence {{e+1}}</a>\r\n                                    <button type=\"button\" class=\"close\" (click)=\"deleteInternshipEvidence(file.evidance,ev,e)\" [disabled]=\"lev.disable\">\r\n                                      <span aria-hidden=\"true\">&times;</span>\r\n                                    </button>\r\n                                  </li>\r\n                                  <li *ngIf=\"!file.evidance.length;\" style=\"color:red\">No evidence added yet.</li>\r\n                                </ul>\r\n                              </td>\r\n                            </tr>\r\n                          </tbody>\r\n                          <tfoot *ngIf=\"!lev.internshipDetails.length\">\r\n                            <tr>\r\n                              <td colspan=\"2\">\r\n                                <div class=\"form-group\">\r\n                                  <label>Current Cost</label>\r\n                                  <input class=\"form-control\" type=\"number\" [(ngModel)]=\"lev.currentCost\" [disabled]=\"lev.disable\" style=\"width:25%\">\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                  <label for=\"exampleInputFile\">Student Internship File</label>\r\n                                  <input type=\"file\" class=\"form-control-file\" id=\"exampleInputFile\" accept=\".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel\"\r\n                                    aria-describedby=\"fileHelp\" (change)=\"getInternshipFile(lev,$event)\" [disabled]=\"lev.disable\">\r\n                                  <small id=\"fileHelp\" class=\"form-text text-muted\">Accept only .xls, .csv or excel sheets</small>\r\n                                </div>\r\n                                <div class=\"form-group\">\r\n                                  <button type=\"button\" (click)=\"saveInternshipForm(lev)\" [disabled]=\"lev.disable\" [disabled]=\"!(lev.currentCost&&lev.internshipFile)\">Save</button>\r\n                                </div>\r\n                              </td>\r\n                            </tr>\r\n                          </tfoot>\r\n                        </table>\r\n                      </td>\r\n                    </tr>\r\n                  </ng-container>\r\n                </ng-template>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n          <!--with mous forms-->\r\n          <div class=\"row\" *ngIf=\"selectedMeasure.evidanceFormId==2\" style=\"padding:15px;\">\r\n            <table id=\"accordion\" class=\"table table-hover table-bordered table-edit\">\r\n              <colgroup>\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"10%\">\r\n                <col width=\"50%\">\r\n              </colgroup>\r\n              <thead>\r\n                <tr>\r\n                  <th>Year</th>\r\n                  <th>Estimated Cost</th>\r\n                  <th>Quarter</th>\r\n                  <th>EstimatedTargetLevel</th>\r\n                  <th>End Date</th>\r\n                  <th></th>\r\n                </tr>\r\n              </thead>\r\n              <tbody *ngFor=\"let tdl of selectedMeasure.departmentInfo[0].opiAnnualTargets;let at=index;\">\r\n                <tr>\r\n                  <td [attr.rowspan]=\"tdl.levels.length+4\" style=\"vertical-align: middle;\">{{tdl.year}}</td>\r\n                  <td [attr.rowspan]=\"tdl.levels.length+4\" style=\"vertical-align: middle;\">{{tdl.estimatedCost}}</td>\r\n                </tr>\r\n                <ng-template let-lev ngFor [ngForOf]=\"tdl.levels\" let-in=\"index\">\r\n                  <tr data-toggle=\"collapse\" [attr.href]=\"'#row-collapse'+at+'lev'+in\" (click)=\"selectedQuarter=lev;\" [style.background]=\"lev.disable?'lightgray':null\">\r\n                    <td>{{lev.quarter}}</td>\r\n                    <td>{{lev.estimatedTargetLevel}}</td>\r\n                    <td>{{lev.endDate + tdl.year}}</td>\r\n                    <td style=\"text-align:center;\">View</td>\r\n                  </tr>\r\n                  <ng-container>\r\n                    <tr [attr.id]=\"'row-collapse'+at+'lev'+in\" class=\"collapse\">\r\n                      <td colspan=\"6\">\r\n                        <table class=\"table table-bordered\" *ngIf=\"lev.mouDetails.length\">\r\n                          <caption align=\"top\">\r\n                            <div class=\"input-group\">\r\n                              <div class=\"input-group-addon\">Current Cost</div>\r\n                              <input class=\"form-control\" [(ngModel)]=\"lev.currentCost\" style=\"width:25%\" [disabled]=\"!lev.edit\" autofocus>\r\n                              <div class=\"pull-left\" *ngIf=\"!lev.edit;else savebtn\" [hidden]=\"lev.disable\">\r\n                                <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit=true;lev.currentCostCopy=lev.currentCost;\">\r\n                                  <i class=\"glyphicon glyphicon-pencil\"></i>\r\n                                </button>\r\n                              </div>\r\n\r\n                              <ng-template #savebtn>\r\n                                <button type=\"button\" class=\"btn btn-link\" (click)=\"updateCurrentCost(lev);\">\r\n                                  <i class=\"glyphicon glyphicon-floppy-saved\"></i>\r\n                                </button>\r\n                                <button type=\"button\" class=\"btn btn-link\" (click)=\"lev.edit = false;lev.currentCost=lev.currentCostCopy;\">\r\n                                  <i class=\"glyphicon glyphicon-remove\"></i>\r\n                                </button>\r\n                              </ng-template>\r\n\r\n                              <div class=\"pull-right\">\r\n                                <button class=\"btn\" (click)=\"lockQuarterResult(lev)\" *ngIf=\"lev.mouDetails.length\" [disabled]=\"lev.status=='locked'\" [disabled]=\"lev.disable\">Lock </button>\r\n                              </div>\r\n                            </div>\r\n                          </caption>\r\n                          <colgroup>\r\n                            <col style=\"width:10%\">\r\n                            <col style=\"width:30%\">\r\n                            <col style=\"width:30%\">\r\n                            <col style=\"width:30%\" [hidden]=\"lev.disable\">\r\n                          </colgroup>\r\n                          <thead>\r\n                            <tr>\r\n                              <th>*</th>\r\n                              <th>Mou Type</th>\r\n                              <th>Organisation</th>\r\n                              <th [hidden]=\"lev.disable\">\r\n                                <button class=\"btn\" type=\"button\" *ngIf=\"lev.mouDetails.length\" (click)=\"lev.addMore=true;\">Add More</button>\r\n                              </th>\r\n                            </tr>\r\n                          </thead>\r\n                          <tbody *ngFor=\"let detail of lev.mouDetails;let d = index;\">\r\n                            <tr *ngIf=\"!detail.edit\">\r\n                              <td rowspan=\"2\">{{d+1}}</td>\r\n                              <td>\r\n                                <div class=\"form-control\">{{detail.mouType}}</div>\r\n                              </td>\r\n                              <td>\r\n                                <div class=\"form-control\">{{detail.organization}}</div>\r\n                              </td>\r\n                              <td [hidden]=\"lev.disable\">\r\n                                <button type=\"button\" (click)=\"detail.edit=true;detail.mouTypeCopy=detail.mouType;detail.organizationCopy=detail.organization;\">\r\n                                  Edit</button>\r\n                                <button (click)=\"evForm=2;selectedMou=detail;\" data-toggle=\"modal\" data-target=\"#evidenceForm\">Upload Evidence</button>\r\n                              </td>\r\n                            </tr>\r\n                            <tr *ngIf=\"detail.edit\">\r\n                              <td rowspan=\"2\">{{d+1}}</td>\r\n                              <td>\r\n                                <input class=\"form-control\" [(ngModel)]=\"detail.mouType\">\r\n                              </td>\r\n                              <td>\r\n                                <input class=\"form-control\" [(ngModel)]=\"detail.organization\">\r\n                              </td>\r\n                              <td>\r\n                                <button type=\"button\" (click)=\"updateMou(detail)\">save </button>\r\n                                <button type=\"button\" (click)=\"detail.edit=false;detail.mouType=detail.mouTypeCopy;detail.organization=detail.organizationCopy;\">Cancel </button>\r\n                              </td>\r\n                            </tr>\r\n                            <tr *ngIf=\"detail.evidance.length\">\r\n                              <!-- <td></td> -->\r\n                              <td colspan=\"3\">\r\n                                <b>Evidences :</b>\r\n                                <span *ngFor=\"let evidence of detail.evidance;let e = index;\">\r\n                                  <a [attr.href]=\"evidence.url\">File {{e+1}}</a>,</span>\r\n                              </td>\r\n                            </tr>\r\n                          </tbody>\r\n                          <tfoot *ngIf=\"lev.addMore\">\r\n                            <tr>\r\n                              <td></td>\r\n                              <td>\r\n                                <input class=\"form-control\" [(ngModel)]=\"lev.mouType\">\r\n                              </td>\r\n                              <td>\r\n                                <input class=\"form-control\" [(ngModel)]=\"lev.organization\">\r\n                              </td>\r\n                              <td>\r\n                                <button type=\"button\" (click)=\"saveQuarterResultWithMou(lev)\">save </button>\r\n                                <button type=\"button\" *ngIf=\"lev.addMore\" (click)=\"lev.addMore=false;\">Cancel </button>\r\n                              </td>\r\n                            </tr>\r\n                          </tfoot>\r\n                        </table>\r\n                        <div class=\"row\" *ngIf=\"!lev.mouDetails.length\">\r\n                          <div class=\"col-sm-3\">\r\n                            <div class=\"input-group\">\r\n                              <div class=\"input-group-addon\">Current Cost</div>\r\n                              <input type=\"text\" class=\"form-control\" [(ngModel)]=\"lev.currentCost\" [disabled]=\"lev.disable\">\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"col-sm-3\">\r\n                            <div class=\"input-group\">\r\n                              <div class=\"input-group-addon\">Mou type</div>\r\n                              <input type=\"text\" class=\"form-control\" [(ngModel)]=\"lev.mouType\" [disabled]=\"lev.disable\">\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"col-sm-3\">\r\n                            <div class=\"input-group\">\r\n                              <div class=\"input-group-addon\">Organization</div>\r\n                              <input type=\"text\" class=\"form-control\" [(ngModel)]=\"lev.organization\" [disabled]=\"lev.disable\">\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"col-sm-3\">\r\n                            <div class=\"form-group\">\r\n                              <button class=\"btn\" type=\"button\" (click)=\"saveQuarterResultWithMou(lev)\" [disabled]=\"lev.disable\"> Save</button>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </td>\r\n                    </tr>\r\n                  </ng-container>\r\n                </ng-template>\r\n              </tbody>\r\n            </table>\r\n          </div>\r\n        </fieldset>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--opi List-->\r\n\r\n\r\n  <div class=\"card table-card\" style=\"margin-top:50px;\" id=\"second-section\">\r\n    <table class=\"table table-bordered table1\">\r\n      <colgroup>\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:20%\">\r\n        <col style=\"width:16.1%\">\r\n        <col style=\"width:8.81%\">\r\n        <col style=\"width:9.9%\">\r\n        <col style=\"width:5.19%\">\r\n      </colgroup>\r\n      <thead class=\"header-background\" *ngIf=\"goalsCopy.length\">\r\n        <tr>\r\n          <th>\r\n            <span class=\"hide-text\">GOAL</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchGoal($event)\" placeholder=\"GOAL\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">INITIATIVE</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchInitiative($event)\" placeholder=\"INITIATIVE\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">ACTIVITY</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchActivity($event)\" placeholder=\"ACTIVITY\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>\r\n            <span class=\"hide-text\">KPI</span>\r\n            <form action=\"\" class=\"search-form\">\r\n              <div class=\"form-group has-feedback\" style=\"margin-bottom:10px;\">\r\n                <label for=\"search\" class=\"sr-only\">Search</label>\r\n                <input type=\"text\" class=\"form-control\" name=\"search\" id=\"search\" (keyup)=\"searchOpi($event)\" placeholder=\"KPI\">\r\n                <span class=\"glyphicon glyphicon-search form-control-feedback\"></span>\r\n              </div>\r\n            </form>\r\n          </th>\r\n          <th>Frequency</th>\r\n          <th>Status</th>\r\n          <th>View</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n        <tr *ngFor=\"let goal of goals;let i = index;\">\r\n          <td>{{goal.goal}}</td>\r\n          <td colspan=\"6\" style=\"padding:0px;border:none;\" #element [style.height]=\"get(element)\">\r\n            <table class=\"table table-bordered\">\r\n              <colgroup>\r\n                <col style=\"width:25%\">\r\n                <col style=\"width:75%\">\r\n              </colgroup>\r\n              <tr *ngFor=\"let initiate of goal.initiatives;let j=index;\">\r\n                <td>{{initiate.initiative}}</td>\r\n                <td colspan=\"5\" style=\"padding:0px;\" #element1 [style.height]=\"get(element1)\">\r\n                  <table class=\"table table-bordered\" style=\"height: inherit;border:none;\">\r\n                    <colgroup>\r\n                      <col style=\"width:33.33%\">\r\n                      <col style=\"width:66.67%\">\r\n                    </colgroup>\r\n                    <tr *ngFor=\"let activit of initiate.activities;let k=index;\">\r\n                      <td [style.border-top]=\"k?'1px solid #ddd':'none'\">{{activit.activity}}</td>\r\n                      <td colspan=\"4\" style=\"padding:0px;\" #element2 [style.height]=\"get(element2)\">\r\n                        <table class=\"table table-bordered\" style=\"height: inherit;border:none;\">\r\n                          <colgroup>\r\n                            <col style=\"width:40%\">\r\n                            <col style=\"width:22%\">\r\n                            <col style=\"width:25%\">\r\n                            <col style=\"width:13%\">\r\n                          </colgroup>\r\n                          <tr *ngFor=\"let msr of activit.opis;let l=index\">\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">{{msr.opi}}</td>\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">{{msr.frequency}}</td>\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                              <p *ngIf=\"msr.quarterStatus\">\r\n                                <a data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"selectedMeasure=msr;\" style=\"text-transform:uppercase\">{{msr.quarterStatus.status}}\r\n                                  <br>\r\n                                  <span style=\"text-transform: uppercase\">({{msr.quarterStatus.role}})</span>\r\n                                </a>\r\n                            </td>\r\n                            <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                              <a style=\"cursor:pointer;\" data-target=\"#edit-section\" (click)=\"selectedOpi=goal;selectedInitiative=initiate;selectedActivity=activit;selectedMeasure=msr;showOpi(goal,msr)\">view</a>\r\n                            </td>\r\n                          </tr>\r\n                        </table>\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n            </table>\r\n          </td>\r\n        </tr>\r\n      </tbody>\r\n      <tfoot *ngIf=\"!goals.length\">\r\n        <tr>\r\n          <td colspan=\"4\" class=\"text-center\">No Data to Display .,.</td>\r\n        </tr>\r\n      </tfoot>\r\n    </table>\r\n  </div>\r\n</div>\r\n\r\n<!--Evidence Form-->\r\n<div class=\"modal fade\" id=\"evidenceForm\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\">\r\n    <div class=\"modal-content\" *ngIf=\"selectedMeasure\">\r\n      <!-- Modal Header -->\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Attach Evidence</h4>\r\n      </div>\r\n      <!-- Modal Body -->\r\n      <form [formGroup]=\"evidencForm\" (submit)=\"onEvidenceSubmit(evForm)\">\r\n        <div class=\"modal-body\">\r\n          <div class=\"form-group\">\r\n            <label for=\"title\">Title</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"title\" formControlName=\"title\" />\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"description\">Description</label>\r\n            <textarea type=\"text\" class=\"form-control\" id=\"description\" formControlName=\"description\"></textarea>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"exampleInputFile\">Attachment</label>\r\n            <input type=\"file\" class=\"form-control-file\" id=\"exampleInputFile\" formControlName=\"files\" (change)=\"getFile($event)\" aria-describedby=\"fileHelp\">\r\n          </div>\r\n        </div>\r\n        <!-- Modal Footer -->\r\n        <div class=\"modal-footer\">\r\n          <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n          <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-lg bar\">\r\n    <!-- Modal content-->\r\n    <div class=\"modal-content\" *ngIf=\"selectedMeasure\">\r\n      <div class=\"modal-header\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\">Current Status of KPI</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div customBox>\r\n          <div line [class]=\"selectedMeasure.quarterStatus[role]\" *ngFor=\"let role of roles;\">\r\n            <h4>{{role}}</h4>\r\n          </div>\r\n        </div>\r\n        <div id=\"statu-legend\">\r\n          <ul>\r\n            <li class=\"white\">None</li>\r\n            <li class=\"cyan\">Locked</li>\r\n            <li class=\"green\">Approved</li>\r\n            <li class=\"red\">Rejected</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/coordinator/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__coordinator_service__ = __webpack_require__("../../../../../src/app/coordinator/coordinator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__ = __webpack_require__("../../../../../src/app/shared/storage.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_filters__ = __webpack_require__("../../../../../src/app/shared/filters.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_loader_service__ = __webpack_require__("../../../../../src/app/shared/loader.service.ts");
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






var HomeComponent = (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(utServ, storage, loaderService) {
        var _this = _super.call(this) || this;
        _this.utServ = utServ;
        _this.storage = storage;
        _this.loaderService = loaderService;
        _this.evidences = [];
        _this.roles = ["coordinator", "hod", "dvc", "vc", "chanceller"];
        _this.isUpdating = false;
        _this.getOpi();
        _this.evidencForm = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormGroup */]({
            title: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required]),
            description: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required),
            files: new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])
        });
        return _this;
    }
    HomeComponent.prototype.ngAfterViewInit = function () {
    };
    HomeComponent.prototype.getOpi = function () {
        var _this = this;
        this.loaderService.display(true);
        this.utServ.getOpiByDeptId(this.storage.getData('user_roleInfo')[0].departmentId).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.initFilters(_this.goalsCopy);
            }
            _this.loaderService.display(false);
        }, function (error) {
            _this.loaderService.display(false);
        });
    };
    HomeComponent.prototype.showOpi = function (goal, measure) {
        $("#first-section").show();
        $("#second-section").hide();
        $('#edit-section').collapse('show');
        console.log(goal);
    };
    HomeComponent.prototype.saveQuarterResult = function (quarter) {
        if (!quarter.isUpdating) {
            var object = {
                'levelId': quarter.id,
                'currentCost': quarter.currentCost,
                'currentTargetLevel': quarter.currentTargetLevel,
            };
            this.utServ.saveQuarterResult(object).subscribe(function (response) {
                quarter.status = 'inprogress';
            });
        }
        else {
            var object_1 = {
                'currentCost': quarter.currentCost,
                'currentTargetLevel': quarter.currentTargetLevel,
            };
            this.utServ.updateQuarterResult(quarter.id, object_1).subscribe(function (response) {
                console.log(response);
            });
        }
    };
    HomeComponent.prototype.saveQuarterResultWithMou = function (lev) {
        var object = {
            "currentCost": lev.currentCost,
            "mouType": lev.mouType,
            "organization": lev.organization
        };
        this.utServ.saveQuarterResultWithMou(lev.id, object).subscribe(function (response) {
            console.log(response);
            lev.currentCost = response.currentCost;
            lev['mouDetails'] = response.mouDetails;
        });
    };
    HomeComponent.prototype.updateCurrentCost = function (lev) {
        var object = {
            "currentCost": lev.currentCost
        };
        this.utServ.updateQuarterResultCurrentCost(lev.id, object).subscribe(function (response) {
            lev.edit = false;
            console.log(response);
        });
    };
    HomeComponent.prototype.updateMou = function (mou) {
        var object = {
            "mouType": mou.mouType,
            "organization": mou.organization
        };
        this.utServ.updateMou(mou.id, object).subscribe(function (response) {
            mou.edit = false;
        });
    };
    HomeComponent.prototype.deleteMou = function (mous, mou, index) {
        if (confirm("Are you sure you want to delete this mou"))
            this.utServ.deleteMou(mou.id).subscribe(function (response) {
                mous.splice(index, 1);
            });
    };
    HomeComponent.prototype.lockQuarterResult = function (quarter) {
        this.utServ.updateQuarterResult(quarter.id, { 'status': 'locked' }).subscribe(function (response) {
            console.log(response);
            quarter.disable = true;
            quarter.status = "locked";
        });
    };
    HomeComponent.prototype.deleteEvidence = function (evidences, evidence, index) {
        if (confirm("Are you sure you want to delete this evidence"))
            this.utServ.deleteEvidence(evidence.id).subscribe(function (response) {
                evidences.splice(index, 1);
            });
    };
    HomeComponent.prototype.deleteInternshipEvidence = function (evidences, evidence, index) {
        if (confirm("Are you sure you want to delete this evidence"))
            this.utServ.deleteInternshipEvidence(evidence.id).subscribe(function (response) {
                evidences.splice(index, 1);
            });
    };
    HomeComponent.prototype.getInternshipFile = function (lev, event) {
        console.log(event);
        lev.internshipFile = event.target.files["0"];
    };
    HomeComponent.prototype.getFile = function (event) {
        this.file = event.srcElement.files[0];
    };
    HomeComponent.prototype.onEvidenceSubmit = function (evForm) {
        var _this = this;
        var formData = new FormData();
        formData.append('title', this.evidencForm.value['title']);
        formData.append('description', this.evidencForm.value['description']);
        formData.append('file', this.file);
        switch (evForm) {
            case 0:
                this.utServ.saveEvidence(formData, this.selectedQuarter.id).subscribe(function (res) {
                    if (!_this.selectedQuarter.evidance)
                        _this.selectedQuarter.evidance = [];
                    _this.selectedQuarter.evidance.push(res);
                    $('#evidenceForm').modal('hide');
                });
                break;
            case 1:
                this.utServ.saveEvidenceForInternshipFile(formData, this.selectedInternshipFile.id).subscribe(function (response) {
                    _this.selectedInternshipFile['evidance'].push(response);
                    $('#evidenceForm').modal('hide');
                });
                break;
            case 2:
                this.utServ.saveEvidenceForMou(formData, this.selectedMou.id).subscribe(function (response) {
                    _this.selectedMou.evidance.push(response);
                    $('#evidenceForm').modal('hide');
                });
                break;
        }
    };
    HomeComponent.prototype.saveInternshipForm = function (lev) {
        var formData = new FormData();
        // formData.append('internshipEvidance',lev.internshipEvidance);
        formData.append('internshipFile', lev.internshipFile);
        formData.append('currentCost', lev.currentCost);
        console.log(formData);
        this.utServ.saveQuarterWithInternship(lev.id, formData).subscribe(function (response) {
            lev.internshipDetails = response.internshipDetails;
        });
    };
    HomeComponent.prototype.deleteInternshipFile = function (files, file, index) {
        if (confirm("Are you sure you want to delete this file"))
            this.utServ.deleteInternshipFile(file.id).subscribe(function (response) {
                files.splice(index, 1);
            });
    };
    HomeComponent.prototype.closeForm = function () {
        $("#first-section").hide();
        $("#second-section").show();
    };
    HomeComponent.prototype.get = function (e) {
        var promise = new Promise(function (resolve, reject) { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
        return promise;
    };
    return HomeComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'home',
        template: __webpack_require__("../../../../../src/app/coordinator/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/coordinator/home/home.component.css"), __webpack_require__("../../../../../src/app/coordinator/coordinator.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_1__coordinator_service__["a" /* CoordinatorService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__coordinator_service__["a" /* CoordinatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__coordinator_service__["a" /* CoordinatorService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_storage_service__["a" /* StorageService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__shared_loader_service__["a" /* LoaderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_loader_service__["a" /* LoaderService */]) === "function" && _c || Object])
], HomeComponent);

var _a, _b, _c;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/coordinator/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_component__ = __webpack_require__("../../../../../src/app/coordinator/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* RouterModule */].forChild([
                {
                    path: '',
                    component: __WEBPACK_IMPORTED_MODULE_1__home_component__["a" /* HomeComponent */],
                }
            ])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__home_component__["a" /* HomeComponent */]],
    })
], HomeModule);

//# sourceMappingURL=home.module.js.map

/***/ })

});
//# sourceMappingURL=home.module.0.chunk.js.map