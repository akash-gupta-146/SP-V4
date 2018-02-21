import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ActionPlan } from './action.plan.component';
import { ActionPlanByDepartment } from './department/by.department';

@NgModule({
 imports: [SharedModule,RouterModule.forChild([
  {
   path: '',
   component: ActionPlan
  },
  {
   path: 'by-department',
   component: ActionPlanByDepartment
  },
  {
   path: 'my-action-step',
   component: ActionPlan
  },
 ])],
 declarations:[ActionPlanByDepartment,ActionPlan]
})
export class ActionPlanModule {

}