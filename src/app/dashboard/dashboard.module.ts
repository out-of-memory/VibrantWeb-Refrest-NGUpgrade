import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {ControlsModule} from './../../infrastructure/ControlsModule';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ControlsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
