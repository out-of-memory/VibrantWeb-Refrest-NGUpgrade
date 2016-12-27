import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompoffApprovalsModule } from './compoff/compoff.approvals.module';
import { AttendanceApprovalsModule } from './attendance/attendance.approvals.module';
import { ProfileModule } from './profile/profile.module';
import { AppraisalApprovalsModule } from './appraisal/appraisal.approval.module';


@NgModule({
  imports: [
    CommonModule,
    CompoffApprovalsModule,
    AttendanceApprovalsModule,
    ProfileModule,
    AppraisalApprovalsModule
  ],
  declarations: []
})

export class ApprovalsModule { }
