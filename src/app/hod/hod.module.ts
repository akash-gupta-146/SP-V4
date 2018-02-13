import {NgModule} from '@angular/core';
import { HodComponent } from './hod.component';
import { RouterModule } from '@angular/router';
import { HodService } from './hod.service';
import { CustomHttpService } from '../shared/default.header.service';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsComponent } from './departments/departments.component';
import { KPIComponent } from './assigned-kpi/kpi.component';
import { CoordinatorDepartmentsComponent } from './c-departments/departments.component';

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
  },
  {
    path:'kpis/:id',
    component:CoordinatorDepartmentsComponent
  }
 ])],
 exports:[],
 declarations:[HodComponent,DepartmentsComponent,KPIComponent,CoordinatorDepartmentsComponent],
 providers:[CustomHttpService,HodService]
})
export class HodModule{

}