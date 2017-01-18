import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttendanceComponent } from './attendance.component';
import { AuthGuard } from './../../servicesFolder/AuthGuard.service';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'my/attendance', component: AttendanceComponent, canActivate: [AuthGuard] }
  ])],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
