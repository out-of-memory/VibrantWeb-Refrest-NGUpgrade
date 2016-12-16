import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './../../infrastructure/ControlsModule';
import { RouterModule } from '@angular/router';
import { MaintainenceComponent } from './maintainence.component';
import { HelpDeskAdminComponent } from './helpdeskAdmin.component';

@NgModule({
  imports: [
    CommonModule, ControlsModule,
    RouterModule.forChild([
      { path: 'maintainence', redirectTo: 'helpdesk', pathMatch: 'full' },
      {
        path: 'maintainence', component: MaintainenceComponent,
        children: [
          { path: 'helpdesk', component: HelpDeskAdminComponent },
        ]
      }
    ])
  ],
  declarations: [MaintainenceComponent, HelpDeskAdminComponent]
})
export class MaintainenceModule { }
