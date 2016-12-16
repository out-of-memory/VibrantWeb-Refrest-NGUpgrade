import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports.routing';
import { ControlsModule } from './../../infrastructure/ControlsModule';
import { ViewReportsComponent } from './viewreports.component';
import { ReportsListComponent } from './reportslist.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ControlsModule
  ],
  declarations: [ReportsComponent, ViewReportsComponent, ReportsListComponent]
})
export class ReportsModule { }
