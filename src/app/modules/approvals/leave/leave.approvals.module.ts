import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }        from '@angular/router';
import {LeaveApproval} from './leave.approval';
import {LeaveApprovalComponent} from './leave.approval.component';
import {LeaveApprovalHistory} from './leave.approval.history';
import {ControlsModule} from './../../../infrastructure/ControlsModule';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
        RouterModule.forChild([
            { path: 'approvals/leave/...', component: LeaveApproval,
              children: [
                            { path: 'new', component: LeaveApprovalComponent },
                            { path: 'history', component: LeaveApprovalHistory }
                        ]
            }
        ])

  ],
  declarations: [
      LeaveApproval,
      LeaveApprovalComponent,
      LeaveApprovalHistory
  ],
  exports:[RouterModule]
})
export class LeaveApprovalsModule { }
