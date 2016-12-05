import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReportsComponent} from './reports.component';
import {ReportsRoutingModule} from './reports.routing';
import {ControlsModule} from './../../infrastructure/ControlsModule';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ControlsModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
