import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppraisalApprovalComponent } from './appraisal.component';
import { ControlsModule } from './../../../infrastructure/ControlsModule';
import { AppraisalApprovalHistoryComponent } from './appraisal.approval.history';
import { AppraisalApproveComponent } from './appraisal.approval';

@NgModule({
    imports: [
        CommonModule, ControlsModule,
        RouterModule.forChild([
            { path: 'approvals/appraisal', redirectTo: 'approval', pathMatch: 'full' },
            {
                path: 'approvals/appraisal', component: AppraisalApproveComponent,
                children: [
                    { path: 'approval', component: AppraisalApprovalComponent },
                    { path: 'history', component: AppraisalApprovalHistoryComponent }
                ]
            }
        ])
    ],
    declarations: [AppraisalApproveComponent, AppraisalApprovalComponent, AppraisalApprovalHistoryComponent],
    exports: [RouterModule]
})
export class AppraisalApprovalsModule { }
