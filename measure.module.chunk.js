webpackJsonp(["measure.module"],{

/***/ "../../../../../src/app/planner/measure/measure.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".department-hierarchy{\r\n  overflow: scroll;\r\n}\r\n.modal-xl{\r\n  width: 80%;\r\n}\r\n.p-3 {\r\n  -webkit-box-flex: 6 !important;\r\n      -ms-flex: 6 !important;\r\n          flex: 6 !important;\r\n}\r\n.p-3o{\r\n  -webkit-box-flex:2;\r\n      -ms-flex:2;\r\n          flex:2;\r\n}\r\n\r\n.table{\r\n  margin-bottom: 0px;\r\n }\r\n .table .table {\r\n  background-color: inherit;\r\n }\r\n\r\n .sibling-list-element{\r\n  box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);\r\n  border-radius:6px;\r\n  padding:15px;\r\n  position:relative;\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.sibling-list-element .edit-btn{\r\n  position: absolute;\r\n  right: 0;\r\n  z-index: 1;\r\n}\r\n\r\n.table>.table,.table>.table>.table{\r\n  border-spacing: 0;\r\n    border-collapse: collapse;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/planner/measure/measure.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n  <div class=\"panel add-plan\" id=\"add-opi\" style=\"display:none;\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#collapse1\" class=\"accordion-toggle\">Add KPI</a>\r\n      </h4>\r\n    </div>\r\n    <div id=\"collapse1\" class=\"panel-collapse collapse\">\r\n      <form [formGroup]=\"measureForm\" (submit)=\"submitMeasure()\">\r\n        <div class=\"panel-body\">\r\n          <div class=\"row\">\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-6\">\r\n              <div class=\"form-group\">\r\n                <label class=\"control-label\" for=\"year\">Plan Year:</label>\r\n                <select id=\"year\" name=\"year\" class=\"form-control\" formControlName=\"cycleId\" [ngModel]=\"defaultCycle\" (ngModelChange)=\"getObjective($event)\">\r\n                  <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\">{{c.planYear}}: [{{c.startYear}} To {{c.endYear}}] : {{c.description}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Select Goal:</label>\r\n                <select class=\"form-control\" id=\"sel1\" formControlName=\"objectiveId\" [ngModel]=\"defaultCycle\" (ngModelChange)=\"getInitiative($event)\">\r\n                  <option *ngFor=\"let objective of objectives;let i=index;\" [value]=\"objective.goalId\">{{i+1}}.{{objective.goal}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Select Initiative:</label>\r\n                <select class=\"form-control\" id=\"sel1\" formControlName=\"initiativeId\" (ngModelChange)=\"getActivities($event)\">\r\n                  <option *ngFor=\"let initiative of initiatives;let j=index;\" [value]=\"initiative.initiativeId\">{{j+1}}.{{initiative.initiative}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Select Activity:</label>\r\n                <select class=\"form-control\" id=\"sel1\" formControlName=\"activityId\">\r\n                  <option *ngFor=\"let activity of activities;let k=index;\" [value]=\"activity.activityId\">{{k+1}}.{{activity.activity}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Operational KPI</label>\r\n                <textarea class=\"form-control\" rows=\"3\" formControlName=\"opi\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Select MeasureUnit</label>\r\n                <select class=\"form-control\" formControlName=\"measureUnit\">\r\n                  <option value=\"\" disabled selected>Choose Measurement Unit</option>\r\n                  <option value=\"percentage\">Percent</option>\r\n                  <option value=\"number\">Decimal</option>\r\n                  <option value=\"rate\">Rate</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Select Direction</label>\r\n                <select class=\"form-control\" formControlName=\"direction\">\r\n                  <option value=\"\" disabled selected>Choose Direction of measureUnit</option>\r\n                  <option value=\"true\">Positive</option>\r\n                  <option value=\"false\">Negative</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Frequency of Measurement</label>\r\n                <select class=\"form-control\" formControlName=\"frequencyId\">\r\n                  <option value=\"1\">Annually</option>\r\n                  <option value=\"2\">Semi-Annual</option>\r\n                  <option value=\"3\">Quarterly</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Evidence Forms</label>\r\n                <select class=\"form-control\" formControlName=\"evidanceFormId\">\r\n                  <option value=\"1\" *ngFor=\"let form of evidenceForms;let f = index;\" [value]=\"form.formId\">{{form.form}}</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Remarks</label>\r\n                <textarea class=\"form-control\" rows=\"3\" formControlName=\"remarks\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label>Help Text</label>\r\n                <textarea class=\"form-control\" rows=\"3\" formControlName=\"helpText\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6 col-xs-12 col-sm-12 form-check\">\r\n              <label class=\"form-check-label\">\r\n                <input type=\"checkbox\" class=\"form-check-input\" formControlName=\"approvalRequired\">\r\n                <span style=\"color:red;\">*</span>\r\n                Approval Required\r\n              </label>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"panel-footer\">\r\n          <button type=\"submit\" class=\"btn btn-success btn-outline-success btn-empty\" [disabled]=\"measureForm.invalid\">\r\n            <i class=\"glyphicon glyphicon-ok\"></i>\r\n          </button>\r\n          <button type=\"button\" class=\"btn btn-danger btn-outine-danger btn-close\" (click)=\"enableFields(); isUpdating = false;\">\r\n            <i class=\"glyphicon glyphicon-remove\"></i>\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"panel detail-plan\">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a data-toggle=\"collapse\" href=\"#collapse2\">Proposed KPIs</a>\r\n        <div class=\"form-inline pull-right\" style=\"margin-bottom:unset;\">\r\n          <div class=\"form-group\">\r\n            <label class=\"control-label\">Strategic Plan</label>\r\n            <select id=\"year\" name=\"year\" class=\"form-control\" [(ngModel)]=\"defaultCycle\" (ngModelChange)=\"getMeasure()\" style=\"width:auto;height: auto;padding: 0px;\">\r\n              <option *ngFor=\"let c of cycles;let y = index;\" [value]=\"c.cycleId\" [attr.selected]=\"c.defaultCycle\">{{c.planYear}} : [{{c.startYear}} To {{c.endYear}}]</option>\r\n            </select>\r\n          </div>\r\n          <button type=\"button\" class=\"btn-info btn-add\" style=\"display: inline-block;\r\n          vertical-align: top;\" (click)=\"addNewMeasure()\">\r\n            <span class=\"glyphicon glyphicon-plus\"></span> Add\r\n          </button>\r\n        </div>\r\n\r\n      </h4>\r\n    </div>\r\n    <div id=\"collapse2\" class=\"panel-collapse collapse in\">\r\n      <div class=\"panel-body\">\r\n        <table class=\"table table-bordered\">\r\n          <colgroup>\r\n            <col style=\"width:16%\">\r\n            <col style=\"width:16%\">\r\n            <col style=\"width:16%\">\r\n            <col style=\"width:16%\">\r\n            <col style=\"width:16%\">\r\n            <col style=\"width:16%\">\r\n            <col style=\"width:2%\">\r\n            <col >\r\n          </colgroup>\r\n          <thead class=\"header-background\" *ngIf=\"goalsCopy.length\">\r\n            <tr>\r\n              <th>\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchGoal($event)\" placeholder=\"Goal\">\r\n                </span>\r\n              </th>\r\n              <th>\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchInitiative($event)\" placeholder=\"Initiative\">\r\n                </span>\r\n              </th>\r\n              <th>\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchActivity($event)\" placeholder=\"Activity\">\r\n                </span>\r\n              </th>\r\n              <th>\r\n                <span class=\"search\">\r\n                  <input type=\"text\" name=\"search\" (keyup)=\"searchOpi($event)\" placeholder=\"KPI\">\r\n                </span>\r\n              </th>\r\n              <th style=\"vertical-align:middle\">KPI Detail</th>\r\n              <th style=\"vertical-align:middle\">Assigned Departments</th>\r\n              <th></th>\r\n              <th></th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let goal of goals;let i = index;\">\r\n              <td>{{goal.goal}}</td>\r\n              <td colspan=\"8\" style=\"padding:0px;\" #element [style.height]=\"get(element)\">\r\n                <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n                  <colgroup>\r\n                    <col style=\"width:19%\">\r\n                    <col style=\"width:81%\">\r\n                  </colgroup>\r\n                  <tr *ngFor=\"let initiate of goal.initiatives;let j=index;\">\r\n                    <td>{{initiate.initiative}}</td>\r\n                    <td colspan=\"7\" style=\"padding:0px;\" #element1 [style.height]=\"get(element1)\">\r\n                      <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n                        <colgroup>\r\n                          <col style=\"width:23.5%\">\r\n                          <col style=\"width:76.5%\">\r\n                        </colgroup>\r\n                        <tr *ngFor=\"let activit of initiate.activities;let k=index;\">\r\n                          <td [style.border-top]=\"k?'1px solid #ddd':'none'\">{{activit.activity}}</td>\r\n                          <td colspan=\"5\" style=\"padding:0px;\" #element2 [style.height]=\"get(element2)\">\r\n                            <table class=\"table table-bordered\" style=\"height: inherit;\">\r\n                              <colgroup>\r\n                                <col style=\"width: 30.9%;\">\r\n                                <col style=\"width: 30.9%;\">\r\n                                <col style=\"width: 30.9%;\">\r\n                                <col >\r\n                                <col >\r\n                              </colgroup>\r\n                              <tr *ngFor=\"let msr of activit.opis;let l=index\">\r\n                                <td [style.border-top]=\"l?'1px solid #ddd':'none'\">{{msr.opi}}</td>\r\n                                <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                                  <label>Frequency :</label>{{msr.frequency}}\r\n                                  <br>\r\n                                  <label>Cost :</label>10000\r\n                                  <br>\r\n                                  <label>MeasureUnit :</label>{{msr.measureUnit}}\r\n                                  <br>\r\n                                  <label>Direction :</label>{{direction[msr.direction]}}\r\n                                  <br>\r\n                                </td>\r\n                                <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                                  <ul style=\"list-style:none;padding:0px;\">\r\n                                    <li *ngIf=\"!msr.assignedDepartments.length\">None\r\n                                      <a class=\"pull-right\" data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"selectedMeasure=msr;next=false;prev=true;checkAssignDept(msr.assignedDepartments);\">Add</a>\r\n                                    </li>\r\n                                    <li *ngFor=\"let dept of msr.assignedDepartments;let d = index\">{{dept.department}}, </li>\r\n                                    <li *ngIf=\"msr.assignedDepartments.length\">\r\n                                      <a data-toggle=\"modal\" data-target=\"#detailModal\" (click)=\"selectedMeasure=msr;\"> Detail</a>\r\n                                    </li>\r\n                                  </ul>                                  \r\n                                </td>\r\n                                <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                                  <a (click)=\"updateMeasure(goal,initiate,activit,msr)\" href=\"#collapse1\">\r\n                                    <i class=\"glyphicon glyphicon-edit\" style=\"cursor:pointer;\"></i>\r\n                                  </a>\r\n                                </td>\r\n                                <td [style.border-top]=\"l?'1px solid #ddd':'none'\">\r\n                                  <i style=\"cursor:pointer;\" class=\"glyphicon glyphicon-remove\" (click)=\"deleteMeasure(msr.opiId,activit.opis,l)\"></i>\r\n                                </td>\r\n                              </tr>\r\n                            </table>\r\n                          </td>\r\n                        </tr>\r\n                      </table>\r\n                    </td>\r\n                  </tr>\r\n                </table>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n          <tfoot *ngIf=\"!goals.length\">\r\n            <tr>\r\n              <td colspan=\"8\" class=\"text-center\">No Data to Display .,.</td>\r\n            </tr>\r\n          </tfoot>\r\n        </table>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!-- Modal -->\r\n<div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\r\n  <div class=\"modal-dialog modal-xl\">\r\n    <div class=\"modal-content\" *ngIf=\"selectedMeasure\">\r\n      <div class=\"modal-header color4\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\"><b>KPI </b>: {{selectedMeasure.opi}}</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"row\" *ngIf=\"prev\">\r\n          <div class=\"col-sm-12\">\r\n            <div class=\"department-hierarchy\">\r\n              <b>Organisation Unit</b>\r\n              <tree-view id=\"termSheetPopup\" [treeData]=\"departments\" [assignedDepartment]=\"selectedMeasure.assignedDepartments\" (onSelected)=\"department($event)\"></tree-view>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"row\" *ngIf=\"next\" style=\"margin: 15px 15px;\">\r\n          <form [formGroup]=\"departmentForm\">\r\n            <ul formArrayName=\"departmentsArray\" style=\"list-style:none;padding-left:0;\">\r\n              <div class=\"sub-title\">Selected Departments</div>\r\n              <li *ngIf=\"!selectedDepartments\">None Selected</li>\r\n              <li *ngFor=\"let dept of departmentForm.controls.departmentsArray.controls;let arr=index;\" [formGroupName]=\"arr\">\r\n                <table class=\"table border-color\">\r\n                  <caption style=\"text-align: left;color: #b10909;\">{{dept.value.departmentName}}\r\n                    <span class=\"input-group pull-right\">\r\n                      <div class=\"input-group-addon base-color\">BaseLine</div>\r\n                      <input type=\"text\" class=\"form-control form-border\" formControlName=\"baseline\" style=\"width:25%\" id=\"exampleInputAmount\">\r\n                    </span>\r\n                  </caption>\r\n                  <ng-container formArrayName=\"opiAnnualTargets\">\r\n                    <tr *ngFor=\"let array of dept.controls.opiAnnualTargets.controls;let op=index;\" [formGroupName]=\"op\">\r\n                      <td>{{array.value.year}}</td>\r\n                      <ng-container formArrayName=\"levels\">\r\n                        <td *ngFor=\"let level of array.controls.levels.controls;let l = index;\" [formGroupName]=\"l\">\r\n                          <div class=\"input-group\">\r\n                            <div class=\"input-group-addon base-color2\">Q{{level.value.quarterId}}</div>\r\n                            <input type=\"text\" class=\"form-control\" id=\"exampleInputAmount\" style=\"width: 50%;\" formControlName=\"estimatedTargetLevel\">\r\n                          </div>\r\n                        </td>\r\n                      </ng-container>\r\n                      <td>\r\n                        <div class=\"input-group\">\r\n                          <div class=\"input-group-addon base-color3\">Estimated Cost</div>\r\n                          <input type=\"text\" class=\"form-control\" formControlName=\"estimatedCost\" style=\"width:50%\" id=\"exampleInputAmount\">\r\n                        </div>\r\n                      </td>\r\n                    </tr>\r\n                  </ng-container>\r\n                </table>\r\n              </li>\r\n            </ul>\r\n          </form>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default btn-empty\" *ngIf=\"next\" (click)=\"prev = true;next = false;\">\r\n          <i class=\"glyphicon glyphicon-arrow-left\"></i>\r\n        </button>\r\n        <button type=\"submit\" class=\"btn btn-default btn-empty\" *ngIf=\"next\" (click)=\"assign()\">\r\n          <i class=\"glyphicon glyphicon-floppy-saved\"></i>\r\n        </button>\r\n        <button type=\"button\" class=\"btn btn-default btn-empty\" *ngIf=\"prev\" (click)=\"prev=false;next=true;assignDepartment()\">\r\n          <i class=\"glyphicon glyphicon-arrow-right\"></i>\r\n        </button>\r\n        <button type=\"button\" class=\"btn btn-default btn-close\" data-dismiss=\"modal\">\r\n          <i class=\"glyphicon glyphicon-remove\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal fade\" id=\"detailModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl\" role=\"document\">\r\n    <div class=\"modal-content\" *ngIf=\"selectedMeasure\">\r\n      <div class=\"modal-header color4\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\">\r\n        <b>KPI </b>: {{selectedMeasure.opi}}</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <h3>Assigned Departments\r\n          <button class=\"btn btn-primary pull-right\" data-toggle=\"modal\" data-dismiss=\"modal\" data-target=\"#myModal\" (click)=\"next=false;prev=true;checkAssignDept(selectedMeasure.assignedDepartments);\">Add\r\n            <span class=\"glyphicon glyphicon-plus\"></span>\r\n          </button>\r\n        </h3>\r\n        <hr>\r\n        <ul style=\"list-style:none;padding-left:0;height: 55vh;overflow-y: auto;\">\r\n          <li class=\"sibling-list-element\" *ngIf=\"!selectedDepartments\">None Selected</li>\r\n          <li class=\"sibling-list-element\" *ngFor=\"let dept of selectedMeasure.assignedDepartments;let arr=index;\">\r\n            <div class=\"edit-btn\">\r\n              <button type=\"button\" class=\"btn btn-link\" (click)=\"viewDepartment(dept)\" *ngIf=\"!dept.edit\">\r\n                <i class=\"glyphicon glyphicon-pencil\"></i>\r\n              </button>\r\n              <button type=\"button\" class=\"btn btn-link\" (click)=\"updateOpiTarget(selectedMeasure,arr);dept.edit = false;\" *ngIf=\"dept.edit\">\r\n                <i class=\"glyphicon glyphicon-floppy-saved\"></i>\r\n              </button>\r\n              <button type=\"button\" class=\"btn btn-link\" (click)=\"removeAssignedDept(selectedMeasure,arr)\" *ngIf=\"dept.edit\">\r\n                <i class=\"glyphicon glyphicon-trash\"></i>\r\n              </button>\r\n              <button type=\"button\" class=\"btn btn-link\" (click)=\"dept.edit = false;\" *ngIf=\"dept.edit\">\r\n                <i class=\"glyphicon glyphicon-remove\"></i>\r\n              </button>\r\n            </div>\r\n            <table class=\"table border-color\" *ngIf=\"!dept.edit\">\r\n              <caption style=\"text-align: left;color: #b10909;\">{{dept.department}}\r\n                <span class=\"input-group pull-right\">\r\n                  <div class=\"input-group-addon base-color\">BaseLine</div>\r\n                  <div class=\"form-control form-border\" style=\"width:25%\">{{dept.baseline}}</div>\r\n                </span>\r\n              </caption>\r\n              <ng-container>\r\n                <tr *ngFor=\"let array of dept.opiAnnualTargets;let op=index;\">\r\n                  <td>{{array.year}}</td>\r\n                  <ng-container>\r\n                    <td *ngFor=\"let level of array.levels;let l = index;\">\r\n                      <div class=\"input-group\">\r\n                        <div class=\"input-group-addon base-color2\">Q{{level.quarterId}}</div>\r\n                        <div class=\"form-control\" style=\"width: 50%;\">{{level.estimatedTargetLevel}}</div>\r\n                      </div>\r\n                    </td>\r\n                  </ng-container>\r\n                  <td>\r\n                    <div class=\"input-group\">\r\n                      <div class=\"input-group-addon base-color3\">Estimated Cost</div>\r\n                      <div class=\"form-control\" style=\"width:50%\">{{array.estimatedCost}}</div>\r\n                    </div>\r\n                  </td>\r\n                </tr>\r\n              </ng-container>\r\n            </table>\r\n            <table class=\"table border-color\" [formGroup]=\"editDepartmentForm\" *ngIf=\"dept.edit\">\r\n              <caption style=\"text-align: left;color: #b10909;\">{{dept.department}}\r\n                <span class=\"input-group pull-right\">\r\n                  <div class=\"input-group-addon base-color\">BaseLine</div>\r\n                  <input type=\"number\" class=\"form-control form-border\" autofocus formControlName=\"baseline\" style=\"width:25%\" id=\"exampleInputAmount\">\r\n                </span>\r\n              </caption>\r\n              <ng-container formArrayName=\"opiAnnualTargets\">\r\n                <tr *ngFor=\"let array of editDepartmentForm.controls.opiAnnualTargets.controls;let op=index;\" [formGroupName]=\"op\">\r\n                  <td>{{dept.opiAnnualTargets[op].year}}</td>\r\n                  <ng-container formArrayName=\"levels\">\r\n                    <td *ngFor=\"let level of array.controls.levels.controls;let l = index;\" [formGroupName]=\"l\">\r\n                      <div class=\"input-group\">\r\n                        <div class=\"input-group-addon base-color2\">Q{{dept.opiAnnualTargets[op].levels[l].quarterId}}</div>\r\n                        <input type=\"number\" class=\"form-control\" id=\"exampleInputAmount\" style=\"width: 50%;\" formControlName=\"estimatedTargetLevel\">\r\n                      </div>\r\n                    </td>\r\n                  </ng-container>\r\n                  <td>\r\n                    <div class=\"input-group\">\r\n                      <div class=\"input-group-addon base-color3\">Estimated Cost</div>\r\n                      <input type=\"number\" class=\"form-control\" formControlName=\"estimatedCost\" style=\"width:50%\" id=\"exampleInputAmount\">\r\n                    </div>\r\n                  </td>\r\n                </tr>\r\n              </ng-container>\r\n            </table>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default btn-close\" data-dismiss=\"modal\">\r\n          <i class=\"glyphicon glyphicon-remove\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!--popup model-->\r\n<div class=\"modal fade\" id=\"measureModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header color4\">\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\r\n        <h4 class=\"modal-title\">Confirm</h4>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <p>You have successfully added a new Measure.</p>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-default btn-close\" data-dismiss=\"modal\" data-toggle=\"collapse\" href=\"#collapse1\">\r\n          <i class=\"glyphicon glyphicon-remove\"></i>\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/planner/measure/measure.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MeasureModule", function() { return MeasureModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__measure__ = __webpack_require__("../../../../../src/app/planner/measure/measure.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tree_view__ = __webpack_require__("../../../../../src/app/planner/measure/tree-view.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var MeasureModule = (function () {
    function MeasureModule() {
    }
    return MeasureModule;
}());
MeasureModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_3__shared_shared_module__["a" /* SharedModule */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["f" /* RouterModule */].forChild([{
                    path: '', component: __WEBPACK_IMPORTED_MODULE_1__measure__["a" /* MeasureComponent */],
                    pathMatch: 'full'
                }])],
        providers: [],
        declarations: [__WEBPACK_IMPORTED_MODULE_1__measure__["a" /* MeasureComponent */], __WEBPACK_IMPORTED_MODULE_4__tree_view__["a" /* TreeView */]],
    })
], MeasureModule);

//# sourceMappingURL=measure.module.js.map

/***/ }),

/***/ "../../../../../src/app/planner/measure/measure.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeasureComponent; });
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





var MeasureComponent = (function (_super) {
    __extends(MeasureComponent, _super);
    function MeasureComponent(orgService, formBuilder, commonService) {
        var _this = _super.call(this) || this;
        _this.orgService = orgService;
        _this.formBuilder = formBuilder;
        _this.commonService = commonService;
        _this.objectives = [];
        _this.initiatives = [];
        _this.activities = [];
        _this.departments = [];
        _this.departmentsCopy = [];
        _this.evidenceForms = [];
        _this.isUpdating = false;
        _this.cycles = [];
        _this.direction = {
            true: 'Upward',
            false: 'Downward'
        };
        _this.prev = true;
        _this.next = false;
        _this.quarter = ["Q1", "Q2", "Q3", "Q4"];
        _this.quarters = [
            {
                "id": 1,
                "endDate": "31/03/",
                "startDate": "01/01/",
                "quarter": "q1"
            },
            {
                "id": 2,
                "endDate": "31/06/",
                "startDate": "01/04/",
                "quarter": "q2"
            },
            {
                "id": 3,
                "endDate": "31/09/",
                "startDate": "01/07/",
                "quarter": "q3"
            },
            {
                "id": 4,
                "endDate": "31/12/",
                "startDate": "01/10/",
                "quarter": "q4"
            }
        ];
        _this.selectedQuarter = 0;
        _this.selectedDepartments = [];
        _this.measureForm = _this.setMeasure();
        _this.orgService.getCycleWithChildren().subscribe(function (response) {
            _this.cycles = response;
            _this.cycles.forEach(function (element) {
                if (element.defaultCycle)
                    _this.defaultCycle = element.cycleId;
            });
            _this.getMeasure();
            _this.getEvidenceForms();
        });
        return _this;
    }
    MeasureComponent.prototype.ngOnInit = function () {
        // this.getQuarter();
        this.getDepartments();
    };
    MeasureComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        // $("#myModal").on('hidden.bs.modal', function (e: any) {
        //   $(this).find("input[type=checkbox], input[type=radio]")
        //     .prop("checked", "")
        //     .end();
        // });
    };
    MeasureComponent.prototype.getObjective = function (cycleId) {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (element.cycleId == cycleId) {
                _this.objectives = element.goals;
                return;
            }
        });
    };
    MeasureComponent.prototype.getInitiative = function (objId) {
        var _this = this;
        if (objId) {
            this.objectives.forEach(function (element) {
                if (element.goalId == objId) {
                    _this.initiatives = element.initiatives;
                    return;
                }
            });
        }
        else {
            this.objectives = [];
        }
    };
    MeasureComponent.prototype.getActivities = function (initId) {
        var _this = this;
        if (initId) {
            this.initiatives.forEach(function (element) {
                if (element.initiativeId == initId) {
                    _this.activities = element.activities;
                    return;
                }
            });
        }
        else {
            this.objectives = [];
        }
    };
    MeasureComponent.prototype.getMeasure = function () {
        var _this = this;
        this.orgService.getMeasuresByCycleId(this.defaultCycle).subscribe(function (response) {
            if (response.status == 204) {
                _this.goals = [];
                _this.goalsCopy = [];
            }
            else {
                _this.goals = response;
                _this.goalsCopy = response;
                _this.filteredActivities = response;
                _this.filteredGoals = response;
                _this.filteredInitiatives = response;
                _this.filteredOpis = response;
            }
        });
    };
    MeasureComponent.prototype.getQuarter = function () {
        var _this = this;
        this.orgService.getQuarter().subscribe(function (res) {
            _this.quarters = res;
        });
    };
    MeasureComponent.prototype.getDepartments = function () {
        var _this = this;
        // this.departmentIds = [];
        this.orgService.getDepartments().subscribe(function (res) {
            _this.departments = res;
            _this.departmentsCopy = res;
        });
    };
    MeasureComponent.prototype.viewDepartment = function (dept) {
        dept.edit = true;
        this.editDepartmentForm = this.formBuilder.group({
            "id": [dept.id],
            "baseline": [dept.baseline],
            "opiAnnualTargets": this.formBuilder.array(this.getOpiAnnualTargets(dept.opiAnnualTargets))
        });
    };
    MeasureComponent.prototype.getOpiAnnualTargets = function (opiAnnualTargets) {
        var _this = this;
        var annualTargets = [];
        opiAnnualTargets.forEach(function (element) {
            annualTargets.push(_this.formBuilder.group({
                "id": [element.id],
                "estimatedCost": [element.estimatedCost],
                "levels": _this.formBuilder.array(_this.getLevels(element.levels))
            }));
        });
        return annualTargets;
    };
    MeasureComponent.prototype.getLevels = function (levelsArray) {
        var _this = this;
        var levels = [];
        levelsArray.forEach(function (element) {
            levels.push(_this.formBuilder.group({
                "id": element.id,
                "estimatedTargetLevel": element.estimatedTargetLevel
            }));
        });
        return levels;
    };
    MeasureComponent.prototype.removeAssignedDept = function (selectedMeasure, index) {
        var assignedDepartments = selectedMeasure.assignedDepartments;
        if (confirm("Do you realy want to unassign department??"))
            this.orgService.deleteAssignedDepartment(selectedMeasure.assignedDepartments[index].id).subscribe(function (response) {
                assignedDepartments.splice(index, 1);
            });
    };
    MeasureComponent.prototype.updateOpiTarget = function (selectedMeasure, index) {
        if (confirm("Do you realy want to update targets??"))
            this.orgService.updateTarget(selectedMeasure.opiId, [this.editDepartmentForm.value]).subscribe(function (response) {
                selectedMeasure.assignedDepartments[index] = response[0];
            });
    };
    MeasureComponent.prototype.department = function (event) {
        this.travers(event, event.my);
    };
    MeasureComponent.prototype.checkAssignDept = function (assignedDepartments) {
        var _this = this;
        this.selectedDepartments = [];
        this.departments = JSON.parse(JSON.stringify(this.departmentsCopy));
        assignedDepartments.forEach(function (outerElement) {
            _this.departments.forEach(function (innerElement) {
                _this.searchDepartment(innerElement, outerElement);
            });
        });
    };
    MeasureComponent.prototype.searchDepartment = function (department, assigneddepartment) {
        var _this = this;
        if (!department) {
            return;
        }
        else {
            if (department.departmentId == assigneddepartment.departmentId) {
                department.baseline = assigneddepartment.baseline;
                department.opiAnnualTargets = assigneddepartment.opiAnnualTargets;
                department.my = true;
                department.disabled = true;
                department.isUpdating = true;
                // this.selectedDepartments.push(department);
            }
            else {
                if (department.reporteeDepartments)
                    department.reporteeDepartments.forEach(function (element) {
                        _this.searchDepartment(element, assigneddepartment);
                    });
            }
        }
    };
    MeasureComponent.prototype.travers = function (department, checked) {
        var _this = this;
        if (!department) {
            return;
        }
        else {
            if (checked) {
                if (!department.disabled) {
                    department.my = true;
                    if (this.selectedDepartments.indexOf(department) === -1)
                        this.selectedDepartments.push(department);
                }
            }
            else {
                if (!department.disabled) {
                    department.my = false;
                    this.selectedDepartments.splice(this.selectedDepartments.indexOf(department), 1);
                }
            }
            if (department.reporteeDepartments)
                department.reporteeDepartments.forEach(function (element) {
                    _this.travers(element, checked);
                });
        }
    };
    MeasureComponent.prototype.assignDepartment = function () {
        var _this = this;
        this.cycles.forEach(function (element) {
            if (_this.defaultCycle == element.cycleId)
                _this.cycle = element.cycle;
        });
        this.departmentForm = this.formBuilder.group({
            departmentsArray: this.formBuilder.array(this.getDepartmentFormArray())
        });
    };
    MeasureComponent.prototype.assign = function () {
        var _this = this;
        var departmentsArray = this.departmentForm.controls["departmentsArray"].value;
        departmentsArray.forEach(function (element) {
            delete element["departmentName"];
        });
        if (confirm("Do you really want to assign this OPI"))
            this.orgService.assignOpi(this.selectedMeasure.opiId, departmentsArray).subscribe(function (response) {
                _this.selectedMeasure.assignedDepartments = _this.selectedMeasure.assignedDepartments.concat(response);
                $('#detailModal').modal('show');
                $('#myModal').modal('hide');
            });
    };
    MeasureComponent.prototype.getDepartmentFormArray = function () {
        var _this = this;
        var departmentsFormArray = [];
        var departmentsArrayForEdit = [];
        this.selectedDepartments.forEach(function (element) {
            departmentsFormArray.push(_this.formBuilder.group({
                baseline: [element.baseline],
                departmentId: [element.departmentId],
                departmentName: [element.department],
                opiAnnualTargets: _this.formBuilder.array(_this.setAnnualTarget(element.opiAnnualTargets))
            }));
        });
        return departmentsFormArray;
    };
    MeasureComponent.prototype.setAnnualTarget = function (opiAnnualTargets) {
        var _this = this;
        var annualTarget = [];
        if (opiAnnualTargets)
            opiAnnualTargets.forEach(function (element) {
                annualTarget.push(_this.inItTargetWithLevels(element));
            });
        else
            this.cycle.forEach(function (element) {
                annualTarget.push(_this.inItTargetIn(element));
            });
        return annualTarget;
    };
    MeasureComponent.prototype.inItTargetIn = function (year) {
        return this.formBuilder.group({
            "year": [year, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "levels": this.formBuilder.array(this.setLevels(this.selectedMeasure.frequencyId)),
            "estimatedCost": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    };
    MeasureComponent.prototype.inItTargetWithLevels = function (annualTarget) {
        return this.formBuilder.group({
            "year": [annualTarget.year, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "levels": this.formBuilder.array(this.setLevelsWithValue(annualTarget.levels)),
            "estimatedCost": [annualTarget.estimatedCost, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    };
    MeasureComponent.prototype.setLevelsWithValue = function (levels) {
        var _this = this;
        var quarterLevel = [];
        levels.forEach(function (element) {
            quarterLevel.push(_this.formBuilder.group({
                quarterId: element.quarterId,
                estimatedTargetLevel: element.estimatedTargetLevel
            }));
        });
        return quarterLevel;
    };
    MeasureComponent.prototype.setLevels = function (count) {
        var levels = [];
        if (count == 3)
            count++;
        for (var i = 0; i < count; i++) {
            if (count == 2)
                levels.push(this.getLevel(2 * i + 1));
            else if (count == 1)
                levels.push(this.getLevel(3));
            else
                levels.push(this.getLevel(i));
        }
        return levels;
    };
    MeasureComponent.prototype.getLevel = function (q) {
        return this.formBuilder.group({
            quarterId: this.quarters[q].id,
            estimatedTargetLevel: [0]
        });
    };
    MeasureComponent.prototype.setMeasure = function () {
        return this.formBuilder.group({
            "cycleId": [{ value: this.defaultCycle, disabled: false }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "objectiveId": [{ value: '', disabled: false }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "initiativeId": [{ value: '', disabled: false }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "activityId": [{ value: '', disabled: false }, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "opi": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "frequencyId": [1, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "measureUnit": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "evidanceFormId": ['', []],
            "direction": [false, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "approvalRequired": [false, [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "remarks": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]],
            "helpText": ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required]]
        });
    };
    MeasureComponent.prototype.submitMeasure = function () {
        var _this = this;
        var formChanges = {};
        var msg = "";
        delete this.measureForm.value["cycleId"];
        delete this.measureForm.value["objectiveId"];
        delete this.measureForm.value["initiativeId"];
        if (!this.isUpdating) {
            this.orgService.saveMeasure(this.measureForm.value).subscribe(function (response) {
                _this.getMeasure();
                $('#measureModal').modal('show');
                _this.measureForm.reset({
                    opi: '',
                    measureUnit: '', frequencyId: 1, baseline: '', direction: '', remarks: '', helpText: '', approvalRequired: ''
                });
                $('#add-opi').hide();
            }, function (error) {
                console.log(error);
            });
        }
        else {
            Object.keys(this.measureForm.value).forEach(function (key) {
                if (_this.selectedMeasure[key] != _this.measureForm.value[key]) {
                    formChanges[key] = _this.measureForm.value[key];
                    msg += "\n" + key + " = " + formChanges[key] + ",";
                }
            });
            if (confirm("Are you sure you want to update this OPI as " + msg)) {
                delete this.measureForm.value["activityId"];
                this.orgService.updateMeasure(this.selectedMeasure.opiId, formChanges).subscribe(function (response) {
                    _this.measureForm = _this.setMeasure();
                    _this.getMeasure();
                });
            }
            $('#add-opi').hide();
        }
    };
    MeasureComponent.prototype.updateMeasure = function (objective, initiative, activity, measure) {
        this.measureForm.controls["cycleId"].disable();
        this.measureForm.controls["objectiveId"].disable();
        this.measureForm.controls["initiativeId"].disable();
        this.measureForm.controls["activityId"].disable();
        this.isUpdating = true;
        this.selectedMeasure = measure;
        this.measureForm.patchValue({
            cycleId: this.defaultCycle,
            objectiveId: objective.goalId,
            initiativeId: initiative.initiativeId,
            activityId: activity.activityId,
            opi: measure.opi,
            measureUnit: measure.measureUnit,
            frequencyId: measure.frequencyId,
            baseline: measure.baselineOfOpi,
            evidanceFormId: measure.evidanceFormId,
            direction: measure.direction,
            remarks: measure.remarks,
            helpText: measure.helpText,
            approvalRequired: measure.approvalRequired
        });
        $('#add-opi').show();
        $('#collapse1').collapse('show');
        // this.measureForm.controls["annualTarget"].patchValue(measure.annualTarget);
    };
    MeasureComponent.prototype.enableFields = function () {
        $('#add-opi').hide();
        this.measureForm.controls["cycleId"].enable();
        this.measureForm.controls["objectiveId"].enable();
        this.measureForm.controls["initiativeId"].enable();
        this.measureForm.controls["activityId"].enable();
        this.measureForm = this.setMeasure();
    };
    MeasureComponent.prototype.deleteMeasure = function (measureId, measures, index) {
        var _this = this;
        if (confirm("Are you sure you want to delete this Measure?"))
            this.orgService.deleteMeasure(measureId).subscribe(function (res) {
                console.log(res);
                // measures.splice(index, 1);
                _this.getMeasure();
            });
    };
    MeasureComponent.prototype.getEvidenceForms = function () {
        var _this = this;
        this.orgService.getEvidenceForms().subscribe(function (response) {
            _this.evidenceForms = response;
        });
    };
    MeasureComponent.prototype.addNewMeasure = function () {
        this.enableFields();
        this.isUpdating = false;
        $('#add-opi').show();
        $("#collapse1").collapse('show');
        this.measureForm = this.setMeasure();
    };
    MeasureComponent.prototype.get = function (e) {
        var promise = new Promise(function (resolve, reject) { $(e)["0"].height = $(e)["0"].clientHeight; resolve(); });
        return promise;
    };
    return MeasureComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared_filters__["a" /* Filters */]));
MeasureComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'measure',
        template: __webpack_require__("../../../../../src/app/planner/measure/measure.html"),
        styles: [__webpack_require__("../../../../../src/app/planner/measure/measure.css"), __webpack_require__("../../../../../src/app/planner/planner.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_UTI_service__["a" /* UniversityService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_storage_service__["a" /* StorageService */]) === "function" && _c || Object])
], MeasureComponent);

var _a, _b, _c;
//# sourceMappingURL=measure.js.map

/***/ }),

/***/ "../../../../../src/app/planner/measure/tree-view.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TreeView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TreeView = (function () {
    function TreeView() {
        this.onSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]();
    }
    TreeView.prototype.ngAfterViewInit = function () {
    };
    TreeView.prototype.department = function (event) {
        this.onSelected.emit(event);
    };
    return TreeView;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Array)
], TreeView.prototype, "treeData", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
    __metadata("design:type", Array)
], TreeView.prototype, "assignedDepartment", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* EventEmitter */]) === "function" && _a || Object)
], TreeView.prototype, "onSelected", void 0);
TreeView = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'tree-view',
        template: "\n  <ul style=\"list-style:none;\">\n    <li *ngFor=\"let node of treeData;let i=index;\">\n      <div class=\"checkbox\">\n        <label><input type=\"checkbox\" [(ngModel)]=\"node.my\" [disabled]=\"node.disabled\" (change)=\"department(node)\">{{node.department}}</label>\n      </div>      \n      <tree-view [assignedDepartment]=\"assignedDepartment\" [treeData]=\"node.reporteeDepartments\" (onSelected)=\"department($event)\"></tree-view>\n    </li>\n  </ul>\n  "
    }),
    __metadata("design:paramtypes", [])
], TreeView);

var _a;
//# sourceMappingURL=tree-view.js.map

/***/ })

});
//# sourceMappingURL=measure.module.chunk.js.map