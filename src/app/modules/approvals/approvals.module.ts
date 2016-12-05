import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeaveApprovalsModule} from './leave/leave.approvals.module';
import {ExpenseApprovalsModule} from './expense/expense.approvals.module';
import {HelpdeskApprovalsModule} from './helpdesk/helpdesk.approvals.module';
import {CompoffApprovalsModule} from './compoff/compoff.approvals.module';
import {AttendanceApprovalsModule} from './attendance/attendance.approvals.module';


@NgModule({
  imports: [
    CommonModule,
    LeaveApprovalsModule,
    ExpenseApprovalsModule,
    HelpdeskApprovalsModule,
    CompoffApprovalsModule,
    AttendanceApprovalsModule
    
  ],
  declarations: []
})
export class ApprovalsModule { }
