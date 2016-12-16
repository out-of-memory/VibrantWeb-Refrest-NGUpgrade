import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { DashboardComponent }    from './dashboard.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'my/dashboard', component: DashboardComponent}
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
