import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";
import { ScrollToModule } from 'ng2-scroll-to';
import { TreeView } from '../planner/measure/tree-view';
@NgModule({
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpModule, ScrollToModule.forRoot()],
  declarations: [TreeView],
  providers: [],
  exports: [ReactiveFormsModule, CommonModule, FormsModule, HttpModule, ScrollToModule, TreeView]
})
export class SharedModule {

}