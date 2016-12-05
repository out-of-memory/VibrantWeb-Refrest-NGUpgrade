import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }        from '@angular/router';
import {HelpDeskApprovalComponent} from './helpdesk.approval.component';
import {ControlsModule} from './../../../infrastructure/ControlsModule';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
      RouterModule.forChild([
            { path: 'approval/helpdesk', component: HelpDeskApprovalComponent }
        ])
  ],
  declarations: [
      HelpDeskApprovalComponent
  ],
  exports:[RouterModule]
})
export class HelpdeskApprovalsModule { }
