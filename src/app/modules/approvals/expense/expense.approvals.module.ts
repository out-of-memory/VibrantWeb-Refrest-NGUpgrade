import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }        from '@angular/router';
import {ExpApprovalComponent} from './expense.approval';
import {ExpenseApprovalComponent} from './expense.approval.component';
import {ExpenseApprovalHistoryComponent} from './expense.approvalHistory.component';
import {ControlsModule} from './../../../infrastructure/ControlsModule';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild([
            { path: 'approvals/expense/...', component: ExpApprovalComponent,
              children: [
                            { path: 'new', component: ExpenseApprovalComponent },
                            { path: 'history', component: ExpenseApprovalHistoryComponent }
                        ]
            }
        ])
    
  ],
  declarations: [
      ExpApprovalComponent,
      ExpenseApprovalComponent,
      ExpenseApprovalHistoryComponent
     
  ],
  exports:[ RouterModule]
})
export class ExpenseApprovalsModule { }
