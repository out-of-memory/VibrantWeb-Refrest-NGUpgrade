import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsModule } from './../../infrastructure/ControlsModule';

import { TravelComponent } from './travel.component';
import { TravelNewComponent } from './travel.new.component';
import { TravelNewRequestComponent } from './travel.new.approval.component'
import { TravelHistory } from './travel.history.component';
import { TravelApprovalHistory } from './travel.approval.history.component';
import { ViewMyHistoryComponent } from './travel.view.my.history.component';
import { TravelApprovalHistoryView } from './travel.approval.history.view.component';
import { TravelViewRequestComponent } from './travel.view.request.component';
import { TravelExtensionComponent } from './travel.extension.component';

@NgModule({
  imports: [
    CommonModule, ControlsModule,
    RouterModule.forChild([
      { path: 'my/travel', redirectTo: 'my/travel/new', pathMatch: 'full' },
      {
        path: 'my/travel', component: TravelComponent,
        children: [
          { path: 'new', component: TravelNewComponent },
          { path: 'history', component: TravelHistory },
          { path: 'newapproval', component: TravelNewRequestComponent },
          { path: 'approvalhistory', component: TravelApprovalHistory },
          // { path: "view/:id", component: ViewMyHistoryComponent }
        ]
      },
      { path: "my/travel/view/:id", component: ViewMyHistoryComponent },
      { path: "approvalhistory/travel/view/:id", component: TravelApprovalHistoryView },
      { path: "travel/view/:id", component: TravelViewRequestComponent },
      { path: "travel/extension/:id", component: TravelExtensionComponent }
    ])
  ],
  declarations: [TravelComponent, TravelNewComponent, TravelHistory, TravelNewRequestComponent, TravelApprovalHistory, ViewMyHistoryComponent, TravelApprovalHistoryView, TravelViewRequestComponent, TravelExtensionComponent],
  exports: [ControlsModule, RouterModule]
})
export class TravelModule { }
