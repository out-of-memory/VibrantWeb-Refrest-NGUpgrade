import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { LeavesComponent }    from './leave.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'my/leaves', component: LeavesComponent}
  ])],
  exports: [RouterModule]
})
export class LeavesRoutingModule {}
