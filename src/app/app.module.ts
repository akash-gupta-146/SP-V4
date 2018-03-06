import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StorageService } from "./shared/storage.service";
import { AuthGuard } from "./shared/auth.gaurd";
import { LoaderService } from './shared/loader.service';

// ROLE = JSON.parse(localStorage.getItem('role'));

export const routes: Routes = [
	{
		path: '',
		redirectTo: "/" + JSON.parse(localStorage.getItem('role')),
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: 'app/login/login.module#LoginModule',
	},
	{
		path: 'planner',
		loadChildren: 'app/planner/planner.module#PlannerModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'coordinator',
		// loadChildren: 'app/coordinator/coordinator.module#CoordinatorModule',
		loadChildren: 'app/hod/hod.module#HodModule',		
		canActivate: [AuthGuard]
	},
	{
		path: 'admin',
		loadChildren: 'app/admin/admin.module#AdminModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'hod',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard]
	}, {
		path: 'deputyViceChancellor',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard]
	}, {
		path: 'viceChancellor',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'chancellor',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard]
	},
];
@NgModule({
	imports: [BrowserModule, RouterModule.forRoot(routes, { useHash: true, })],
	declarations: [AppComponent],
	providers: [StorageService, AuthGuard, LoaderService],
	bootstrap: [AppComponent],
	exports: []
})
export class AppModule { }
