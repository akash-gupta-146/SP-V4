import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { DepartmentsComponent } from '../departments/departments.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([
    {
      path: '',
      component: HomeComponent,
    },
    {
      path:'kpis/:id',
      component:DepartmentsComponent
    }
  ])],
  providers: [],
  declarations: [HomeComponent,DepartmentsComponent],
  // exports: [RouterModule]
})
export class HomeModule {
}