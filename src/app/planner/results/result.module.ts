import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { ResultComponent } from './result.component';
import { HodService } from '../../hod/hod.service';

@NgModule({
	imports: [SharedModule, RouterModule.forChild([{
		path: '', component: ResultComponent
	}])],
	providers: [HodService],
	declarations: [ResultComponent]
})
export class ResultModule {
}