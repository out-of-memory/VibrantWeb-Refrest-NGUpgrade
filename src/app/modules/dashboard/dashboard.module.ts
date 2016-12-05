import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {ControlsModule} from './../../infrastructure/ControlsModule';
import {AutoMapperService} from './../../servicesFolder/AutoMapperService';
import {DashboardService} from './../../servicesFolder/Dashboard/DashboardService';


@NgModule({
  imports: [
    CommonModule,
        ControlsModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardComponent],
  providers:[AutoMapperService,DashboardService]
})
export class DashboardModule { }
