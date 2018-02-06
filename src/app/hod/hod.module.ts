import {NgModule} from '@angular/core';
import { HodComponent } from './hod.component';
import { RouterModule } from '@angular/router';
import { HodService } from './hod.service';
import { CustomHttpService } from '../shared/default.header.service';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsComponent } from './departments/departments.component';
import { KPIComponent } from './assigned-kpi/kpi.component';
// import { TreeView } from '../planner/measure/tree-view';
@NgModule({
 imports:[SharedModule,RouterModule.forChild([
  {
   path:'',
   component:KPIComponent
  },
  {
   path:':id',
   component:DepartmentsComponent
  }
 ])],
 exports:[],
 declarations:[HodComponent,DepartmentsComponent,KPIComponent],
 providers:[CustomHttpService,HodService]
})
export class HodModule{

}