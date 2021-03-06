import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as alertify from 'alertifyjs';
import { LoaderService } from '../../../../shared/loader.service';
import { HodService } from '../../../hod.service';
import { StorageService } from '../../../../shared/storage.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'without-evidence-form',
  templateUrl: './without.evidence.form.html',
  styleUrls: ['./../../../hod.component.scss'],
})
export class WithoutEvidenceForm implements OnInit {
  saving: boolean;
  role: any;
  formId: any;
  isUpdating: boolean = false;
  targetForm:FormGroup;
  @Output() changeSelected: any = new EventEmitter();
  @Input() department: any;
  @Input() d: number;
  @Input() set evidanceFormId(id: any) {
    this.formId = id;
  }
  @Output() selectEvidence: any = new EventEmitter();

  constructor(public utServ: HodService,
    public loaderService: LoaderService,
    public storage: StorageService,
    private fb:FormBuilder) {
  }

  ngOnInit() {
    this.role = this.storage.getData('userDetails').roleInfo[0].role;
    this.targetForm = this.fb.group({
      currentCost:[0,[Validators.required,Validators.min(0)]],
      currentTargetLevel:[0,[Validators.required,Validators.min(0)]]
    });
  }

  public saveQuarterResult(quarter: any) {
    this.saving = true;
    if (!quarter.isUpdating) {
      // var object = {
      //   'levelId': quarter.id,
      //   'currentCost': quarter.currentCost,
      //   'currentTargetLevel': quarter.currentTargetLevel,
      // }
      this.targetForm.value['levelId']=quarter.id
      this.utServ.saveQuarterResult(this.targetForm.value).subscribe((response: any) => {
        this.saving = false;
        quarter.isUpdating = false;
        quarter.status = 'inprogress';
        Object.keys(response).forEach((key: any) => {
          quarter[key] = response[key];
        });
      }, (error: any) => {
        this.saving = false;
        alertify.error("Something went wrong..");
      });
    } else {
      this.saving = true;
      // let object = {
      //   'currentCost': quarter.currentCost,
      //   'currentTargetLevel': quarter.currentTargetLevel,
      // }
      this.utServ.updateQuarterResult(quarter.id, this.targetForm.value).subscribe((response: any) => {
        this.saving = false;
        quarter.status = 'inprogress';
        quarter.isUpdating = false;
        alertify.success("Updated");

      }, (error: any) => {
        this.saving = false;
        alertify.error("Something went wrong..");
      });
    }
  }

  lockQuarterResult(quarter: any) {
    alertify.confirm("Are you sure, you want to submit your results, once submitted you will not be able to edit them ?", () => {


      this.utServ.lockQuarterResult(quarter.id, { 'status': 'locked' }).subscribe((response: any) => {
      quarter.role = this.role;

        quarter.disable = true;
        quarter.status = "locked";
      }, (error: any) => {
        alertify.error("Something went wrong");
      });
    }).setHeader("Confirmation");
  }

  deleteEvidence(evidences: any[], evidence: any, index: any) {
    alertify.confirm("Are you sure you want to delete this evidence", () => {
      this.utServ.deleteEvidence(evidence.id).subscribe((response: any) => {
        evidences.splice(index, 1);
        alertify.success("Success");
      }, (error: any) => {
        alertify.error("Something went wrong");
      })
    }).setHeader("Atert Message");
  } s

  selectQuarter(level: any) {
    this.changeSelected.emit(level);
  }

  storeEvidence(ev: any) {
    this.selectEvidence.emit(ev);
  }

  selectLevel(level) {
    this.changeSelected.emit(level);
  }
}