import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { KPIComponent } from './kpi.component';
import { ByKPIComponent } from './kpi/by.kpi.component';
import { ByFrequency } from './frequency/by-frequency';
import { ByDepartment } from './department/by.department';
import { CoordinatorDepartmentsComponent } from './c-departments/departments.component';
import { DepartmentsComponent } from './departments/departments.component';
@NgModule({
 imports: [SharedModule, RouterModule.forChild([
  {
   path: '',
   component: KPIComponent,
   children: [
    {
     path: 'by-kpi',
     component: ByKPIComponent
    },
    {
     path: 'by-frequency',
     component: ByFrequency
    },
    {
     path: 'by-department',
     component: ByDepartment
    }
   ]
  },
  {
   path: 'kpis/:id',
   component: CoordinatorDepartmentsComponent
  },
  {
   path: 'opis/:id',
   component: DepartmentsComponent, pathMatch: 'full'
  },
 ])],
 declarations: [KPIComponent, ByKPIComponent, ByDepartment, ByFrequency,DepartmentsComponent,CoordinatorDepartmentsComponent]
})
export class KPIModule {
}