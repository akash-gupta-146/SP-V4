import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { KPIComponent } from './kpi.component';
import { ByKPIComponent } from './kpi/by.kpi.component';
import { ByFrequency } from './frequency/by-frequency';
import { CoordinatorDepartmentsComponent } from './c-departments/departments.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ByDepartment } from './department-wise/by.department';
import { CommunityLearningForm } from './c-departments/community-learning-form/community.learning';
import { StudentInternshipForm } from './c-departments/student-internship-form/student.internship';
import { MousForm } from './c-departments/mous-form/mous.form';
import { WithoutEvidenceForm } from './c-departments/without-evidence-form/without.evidence.form';
import { CurriculumReviewForm } from './c-departments/curiculam-review-form/curriculum.review.form';
import { ExtraCurricularActivity } from './c-departments/extra-curicular-activity-form/extra.curricular.activity';
import { ExchangeProgram } from './c-departments/exchange-program/exchange.program.form';
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
   loadChildren:'app/hod/assigned-kpi/c-departments/coordinator.depatrments.module#CoordinatorDepartmentsModule'
  },
  {
   path: 'opis/:id',
   component: DepartmentsComponent, pathMatch: 'full'
  },
 ])],
 declarations: [KPIComponent, ByKPIComponent, ByDepartment, ByFrequency,DepartmentsComponent]
})
export class KPIModule {
}