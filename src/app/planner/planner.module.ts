import { NgModule } from '@angular/core';
import { PlannerComponent } from './planner.component';
import { RouterModule } from '@angular/router';
import { UniversityService } from "../shared/UTI.service";
import { StorageService } from "../shared/storage.service";
import { CustomHttpService } from "../shared/default.header.service";
import { SharedModule } from "../shared/shared.module";
import { InitialSetup } from './initial-setup/setup.component';
import { InitialGuard } from './initial-setup/initial.gaurd';
@NgModule({
	imports: [SharedModule, RouterModule.forChild([
		{
			path: '', redirectTo: 'home', pathMatch: 'full'
		},
		{
			path: '',
			component: PlannerComponent,
			children: [
				{
					path: '',
					loadChildren: 'app/planner/home/home.module#HomeModule',
					canActivate:[InitialGuard]
				},
				{
					path: 'initial-setup',
					component: InitialSetup
				},
				{
					path: 'home',
					loadChildren: 'app/planner/home/home.module#HomeModule',
					canActivate:[InitialGuard]
				},
				{ path: 'strategic-plan', loadChildren: 'app/planner/plan/plan.module#PlanModule' },
				{ path: 'strategic-goal', loadChildren: 'app/planner/goal/goal.module#GoalModule' },				
				{ path: 'initiatives', loadChildren:'app/planner/initiative/initiative.module#InitiativeModule'},
				{ path: 'activities', loadChildren: 'app/planner/activity/activity.module#ActivityModule' },
				{ path: 'kpis', loadChildren: 'app/planner/measure/measure.module#MeasureModule' },
				{ path: 'spi', loadChildren: 'app/planner/spi/spi.module#SPIModule' },
				{ path: 'result', loadChildren: 'app/planner/results/result.module#ResultModule'}
			]
		},

	])],
	providers: [UniversityService, StorageService, CustomHttpService, InitialGuard],
	declarations: [PlannerComponent,InitialSetup],
	// exports: [RouterModule]
})
export class PlannerModule {
}