import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppraisalApprovalComponent } from './appraisal.component';
import { ControlsModule } from './../../../infrastructure/ControlsModule';
import { AppraisalApprovalHistoryComponent } from './appraisal.approval.history';
import { AppraisalApproveComponent } from './appraisal.approval';
import { OneToOneApprovalComponent } from './onetoone.approval.component';
import { OneToOneHistoryComponent } from './onetoone.history.component';

@NgModule({
    imports: [
        CommonModule, ControlsModule,
        RouterModule.forChild([
            { path: 'approvals/appraisal', redirectTo: 'approval', pathMatch: 'full' },
            {
                path: 'approvals/appraisal', component: AppraisalApproveComponent,
                children: [
                    { path: 'approval', component: AppraisalApprovalComponent },
                    { path: 'history', component: AppraisalApprovalHistoryComponent },
                    { path: 'onetoone', component: OneToOneApprovalComponent },
                    { path: 'onetoonehistory', component: OneToOneHistoryComponent }
                ]
            }
        ])
    ],
    declarations: [AppraisalApproveComponent, AppraisalApprovalComponent, AppraisalApprovalHistoryComponent, OneToOneApprovalComponent, OneToOneHistoryComponent],
    exports: [RouterModule]
})
export class AppraisalApprovalsModule { }
