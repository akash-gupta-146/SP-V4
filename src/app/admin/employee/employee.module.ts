import {NgModule} from '@angular/core';
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { EmployeeComponent } from './employee.component';
@NgModule({
  imports: [SharedModule, RouterModule.forChild([
    {
      path: '',
      component: EmployeeComponent
    }
  ])],
  providers: [],
  declarations: [EmployeeComponent],
})
export class EmployeeModule{
  
}