import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }        from '@angular/router';
import {AppraisalApprovalComponent} from './appraisal.component';
import {ControlsModule} from './../../../infrastructure/ControlsModule';

@NgModule({
    imports: [
        CommonModule,
        ControlsModule,
        RouterModule.forChild([
            { path: 'approvals/appraisal', component: AppraisalApprovalComponent }
        ])
    ],
    declarations: [
        AppraisalApprovalComponent
        
    ],
    exports:[RouterModule]
})
export class AppraisalApprovalsModule { }
