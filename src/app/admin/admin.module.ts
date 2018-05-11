import {NgModule} from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { StorageService } from "../shared/storage.service";
import { CustomHttpService } from "../shared/default.header.service";
import { AdminComponent } from "./admin.component";
import { AdminService } from "./admin.service";
import { RoleComponent } from './role/role.component';

@NgModule({
  imports: [SharedModule,RouterModule.forChild([
    {
      path: '',
      redirectTo:'home',
      pathMatch:'full'
    },
    {
			path: '',
			component: AdminComponent,
			children: [
				{
					path: 'home',
					loadChildren: 'app/admin/home/home.module#HomeModule'
        },
        {
					path: 'department',
					loadChildren: 'app/admin/department/department.module#DepartmentModule'
				},
				{
					path:'employee',
					loadChildren:'app/admin/employee/employee.module#EmployeeModule'
				},
				{
					path:'role',
					component:RoleComponent
				}
        
			]
		},
	])],
	providers: [StorageService, CustomHttpService, AdminService],
	declarations: [AdminComponent,RoleComponent],
})
export class AdminModule{
  constructor(){

  }
}