import { NgModule } from '@angular/core';
import { HodComponent } from './hod.component';
import { RouterModule } from '@angular/router';
import { HodService } from './hod.service';
import { CustomHttpService } from '../shared/default.header.service';
import { SharedModule } from '../shared/shared.module';
import { ActionPlanByDepartment } from './action-plan/department/by.department';
import { AnnualAchievement } from './annual-achievement/annual.achievement';
import { ByGoal } from './achievement-by-goal/by.goal';
@NgModule({
  imports: [SharedModule, RouterModule.forChild([
    { path: '', redirectTo: 'home' },    
    {
      path: '',
      component: HodComponent,

      children: [
        {
          path: 'home',
          loadChildren: "app/hod/assigned-kpi/kpi.module#KPIModule",
        },
        {
          path: 'action-step',
          loadChildren:'app/hod/action-plan/action.plan.module#ActionPlanModule'
        },
        {
          path: 'annual-achievement',
          component: AnnualAchievement
        },
        {
          path: 'by-goal',
          component: ByGoal
        }
      ]
    },
  ])],
  exports: [],
  declarations: [HodComponent, 
  ByGoal, AnnualAchievement],
  providers: [CustomHttpService, HodService]
})
export class HodModule {

}