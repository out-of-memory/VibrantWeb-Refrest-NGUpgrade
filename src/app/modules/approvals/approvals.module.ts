import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompoffApprovalsModule } from './compoff/compoff.approvals.module';
import { AttendanceApprovalsModule } from './attendance/attendance.approvals.module';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  imports: [
    CommonModule,
    CompoffApprovalsModule,
    AttendanceApprovalsModule,
    ProfileModule
  ],
  declarations: []
})

export class ApprovalsModule { }
