import { NgModule } from '@angular/core';
import { MeasureComponent } from './measure';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
	imports: [SharedModule, RouterModule.forChild([{
		path: '', component: MeasureComponent
	}])],
	declarations: [MeasureComponent]
})
export class MeasureModule {
}