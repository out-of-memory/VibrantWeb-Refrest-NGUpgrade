import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }        from '@angular/router';
import {AttendanceApprovalComponent} from './attendance.approval.component';
import {ControlsModule} from './../../../infrastructure/ControlsModule';

@NgModule({
    imports: [
        CommonModule,
        ControlsModule,
        RouterModule.forChild([
            { path: 'approvals/attendance', component: AttendanceApprovalComponent }
        ])
    ],
    declarations: [
        AttendanceApprovalComponent
        
    ],
    exports:[RouterModule]
})
export class AttendanceApprovalsModule { }
