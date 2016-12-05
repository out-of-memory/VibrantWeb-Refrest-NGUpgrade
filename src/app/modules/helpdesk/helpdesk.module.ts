import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }        from '@angular/router';
import {ControlsModule} from './../../infrastructure/ControlsModule';

import {HelpDeskComponent} from './helpdesk.component';
import {HelpDeskSubmitComponent} from './helpdesk.submitted.component';
import {HelpDeskListComponent} from './helpdesklist.component';
import {NewHelpDeskComponent} from './newhelpdesk.component';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild([
            { path: 'my/helpdesk', component: HelpDeskComponent,
              children: [
                            { path: 'newticket', component: NewHelpDeskComponent },
                            { path: 'ticketlist/:status', component: HelpDeskListComponent },
                            { path: 'details/:id/:action/:selectedStatus',component: HelpDeskSubmitComponent },
                        ]
            }
        ])
    
  ],
  declarations: [HelpDeskComponent,NewHelpDeskComponent,HelpDeskListComponent,HelpDeskSubmitComponent],
  exports:[RouterModule]
})
export class HelpdeskModule { }
