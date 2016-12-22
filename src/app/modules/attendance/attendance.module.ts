import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoMapperService } from './../../servicesFolder/AutoMapperService';
import { AttendanceRoutingModule } from './attendance.routing';
import { AttendanceComponent } from './attendance.component';
import { ControlsModule } from './../../infrastructure/ControlsModule';

@NgModule({
  imports: [
    CommonModule, ControlsModule,
    AttendanceRoutingModule
  ],
  declarations: [],
  providers: [AutoMapperService]
})
export class AttendanceModule { }
