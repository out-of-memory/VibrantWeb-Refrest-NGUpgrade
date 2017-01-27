import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsModule } from './../../infrastructure/ControlsModule';
import { AppraisalsComponent } from './appraisals.component';
import { AppraiseComponent } from './appraise.component';
import { FormsModule } from '@angular/forms';
import { AppraiserComponent } from './appraiser.component';
import { ReviewerComponent } from './reviewer.component';
import { AppraisalAdminComponent } from './appraisalAdmin.component';
import { AppraisalInitiationComponent } from './appraisalinitiation.component';

@NgModule({
  imports: [CommonModule,
    ControlsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'my/appraisal', component: AppraiseComponent },
      { path: 'my/appraiser/:id/:name/:appraiser/:reviewer', component: AppraiserComponent },
      { path: 'my/reviewer/:id/:name/:appraiser/:reviewer', component: ReviewerComponent },
      {
        path: 'appraisal/admin', component: AppraisalAdminComponent,
        children: [
          { path: 'empList', component: AppraisalInitiationComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  declarations: [AppraisalsComponent, AppraiseComponent, AppraiserComponent, ReviewerComponent, AppraisalAdminComponent, AppraisalInitiationComponent]
})
export class AppraisalsModule {


}
