import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlsModule } from './../../infrastructure/ControlsModule';
import { AppraisalsComponent } from './appraisals.component';
import { AppraiseComponent } from './appraise.component';
import { AppraiseFinalComponent } from './appraise.final.component';
import { FormsModule } from '@angular/forms';
import { AppraiserComponent } from './appraiser.component';
import { ReviewerComponent } from './reviewer.component';
import { OneToOneComponent } from './onetoone.component';
import { AppraisalAdminComponent } from './appraisalAdmin.component';
import { AppraisalInitiationComponent } from './appraisalinitiation.component';
import { AppraisalReportComponent } from './appraisal.report.component';

@NgModule({
  imports: [CommonModule,
    ControlsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'my/appraisal', component: AppraiseComponent },
      { path: 'my/appraisalreport/:id', component: AppraiseFinalComponent },
      { path: 'my/appraiser/:id', component: AppraiserComponent },
      { path: 'my/reviewer/:id', component: ReviewerComponent },
      { path: 'my/onetoone/:id', component: OneToOneComponent },
      { path: 'my/appraisalReport', component: AppraisalReportComponent },
      {
        path: 'appraisal/admin', component: AppraisalAdminComponent,
        children: [
          { path: 'empList', component: AppraisalInitiationComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  declarations: [AppraisalsComponent, AppraiseComponent, AppraiserComponent, ReviewerComponent, AppraisalAdminComponent, AppraisalInitiationComponent, OneToOneComponent, AppraiseFinalComponent,AppraisalReportComponent]
})
export class AppraisalsModule {


}
