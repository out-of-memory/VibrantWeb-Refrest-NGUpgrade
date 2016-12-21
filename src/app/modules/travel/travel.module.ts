import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsModule } from './../../infrastructure/ControlsModule';

import { TravelComponent } from './travel.component';
import { TraveNewComponent } from './travel.new.component';

@NgModule({
  imports: [
    CommonModule, ControlsModule,
    RouterModule.forChild([
      { path: 'my/travel', redirectTo: 'new', pathMatch: 'full' },
      {
        path: 'my/travel', component: TravelComponent,
        children: [
          { path: 'new', component: TraveNewComponent },
        ]
      }

    ])
  ],
  declarations: [TravelComponent, TraveNewComponent],
  exports: [ControlsModule, RouterModule]
})
export class TravelModule { }
