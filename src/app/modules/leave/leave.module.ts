import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsModule } from './../../infrastructure/ControlsModule';
import { LeaveApproval } from "./leave";
import { LeavesComponent } from "./leave.component";
import { LeaveApprovalComponent } from "./leave.approval.component";
import { LeaveApprovalHistory } from "./leave.approval.history";

@NgModule({
  imports: [
    CommonModule, ControlsModule,
    RouterModule.forChild([
      { path: 'my/leaves', redirectTo: 'new', pathMatch: 'full' },
      {
        path: 'my/leaves', component: LeaveApproval,
        children: [
          { path: 'new', component: LeavesComponent },
          { path: 'approvals', component: LeaveApprovalComponent },
          { path: 'history', component: LeaveApprovalHistory }
        ]
      }
    ])
  ],
  declarations: [LeaveApproval, LeavesComponent, LeaveApprovalComponent, LeaveApprovalHistory],
  exports: [RouterModule]
})
export class LeaveModule { }

