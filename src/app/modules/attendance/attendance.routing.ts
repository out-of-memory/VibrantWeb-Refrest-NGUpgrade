import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { AttendanceComponent }    from './attendance.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'my/attendance', component: AttendanceComponent}
  ])],
  exports: [RouterModule]
})
export class AttendanceRoutingModule {}
