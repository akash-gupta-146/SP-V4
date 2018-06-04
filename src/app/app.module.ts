import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StorageService } from "./shared/storage.service";
import { AuthGuard } from "./shared/auth.gaurd";
import { LoaderService } from './shared/loader.service';
// ROLE =  JSON.parse(localStorage.getItem('role'));
export const routes: Routes = [
	{
		path: '',
		redirectTo: "/" + JSON.parse(localStorage.getItem('role')),
		pathMatch: 'full',
	},
	{
		path: 'login',
		loadChildren: 'app/login/login.module#LoginModule',
	},
	{
		path: 'planner',
		loadChildren: 'app/planner/planner.module#PlannerModule',
		canActivate: [AuthGuard],
		data:{role:'planner'}
	},
	{
		path: 'coordinator',
		// loadChildren: 'app/coordinator/coordinator.module#CoordinatorModule',
		loadChildren: 'app/hod/hod.module#HodModule',		
		canActivate: [AuthGuard],
		data:{role:'coordinator'}
	},
	{
		path: 'admin',
		loadChildren: 'app/admin/admin.module#AdminModule',
		canActivate: [AuthGuard],
		data:{role:'admin'}
	},
	{
		path: 'hod',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard],
		data:{role:'hod'}
	}, {
		path: 'deputyViceChancellor',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard],
		data:{role:'deputyViceChancellor'}
	}, {
		path: 'viceChancellor',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard],
		data:{role:'viceChancellor'}
	},
	{
		path: 'chancellor',
		loadChildren: 'app/hod/hod.module#HodModule',
		canActivate: [AuthGuard],
		data:{role:'chancellor'}
	},
];
@NgModule({
	imports: [BrowserModule, RouterModule.forRoot(routes, { useHash: true, })],
	declarations: [AppComponent],
	providers: [StorageService, AuthGuard, LoaderService],
	bootstrap: [AppComponent],
	exports: []
})
export class AppModule { 

}

