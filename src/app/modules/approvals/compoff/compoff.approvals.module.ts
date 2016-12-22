import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompOffApprovalComponent } from './compoff.approval';
import { ControlsModule } from './../../../infrastructure/ControlsModule';

@NgModule({
    imports: [
        CommonModule,
        ControlsModule,
        RouterModule.forChild([
            { path: 'approvals/compoff', component: CompOffApprovalComponent }
        ])
    ],
    declarations: [
        CompOffApprovalComponent
    ],
    exports: [RouterModule]
})
export class CompoffApprovalsModule { }
