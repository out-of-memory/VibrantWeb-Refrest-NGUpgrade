import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ReportsComponent }    from './reports.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'reports', component: ReportsComponent}
  ])],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
