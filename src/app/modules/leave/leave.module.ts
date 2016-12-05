import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ControlsModule}from  './../../infrastructure/ControlsModule';
import {LeavesRoutingModule} from "./leave.routing";
import {LeavesComponent} from "./leave.component";

@NgModule({
  imports: [
    CommonModule,ControlsModule,
    LeavesRoutingModule
  ],
  declarations: [LeavesComponent]
})
export class LeaveModule { }

