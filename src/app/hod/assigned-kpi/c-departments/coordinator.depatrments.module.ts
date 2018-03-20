import {NgModule} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CoordinatorDepartmentsComponent } from './departments.component';
import { CommunityLearningForm } from './community-learning-form/community.learning';
import { StudentInternshipForm } from './student-internship-form/student.internship';
import { MousForm } from './mous-form/mous.form';
import { WithoutEvidenceForm } from './without-evidence-form/without.evidence.form';
import { CurriculumReviewForm } from './curiculam-review-form/curriculum.review.form';
import { ExtraCurricularActivity } from './extra-curicular-activity-form/extra.curricular.activity';
import { ExchangeProgram } from './exchange-program/exchange.program.form';
import { RouterModule } from '@angular/router';
import { ResearchConsultancy } from './research-consultancy-form/research.consultancy';
import { StudentResearch } from './student-research-form/student.research.form';

@NgModule({
 imports:[SharedModule,RouterModule.forChild([
  {
   path:'',
   component:CoordinatorDepartmentsComponent
  }
 ])],
 declarations:[CoordinatorDepartmentsComponent,CommunityLearningForm, StudentInternshipForm,MousForm,WithoutEvidenceForm,CurriculumReviewForm,ExtraCurricularActivity,ExchangeProgram,ResearchConsultancy,StudentResearch]
})
export class CoordinatorDepartmentsModule{}