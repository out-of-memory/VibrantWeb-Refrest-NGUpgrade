import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './../../infrastructure/ControlsModule';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component'
import { PersonalComponent } from './personal.component'
import { ProfessionalComponent } from './professional.component'
import { UserService } from './../../servicesFolder/user/user.service';
import { AttendanceComponent } from '../attendance/attendance.component';
import { LeavesComponent } from '../leave/leave.component';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild([
      { path: 'my/profile', redirectTo: 'personal', pathMatch: 'full' },
      {
        path: 'my/profile', component: EmployeeComponent, data: { isViewOnly: false, from: 'profile' },
        children: [
          { path: 'professional', component: ProfessionalComponent },
          { path: 'personal', component: PersonalComponent }
        ]
      },
      { path: 'employee/details/:id', redirectTo: 'personal', pathMatch: 'full' },
      {
        path: 'employee/details/:id', component: EmployeeComponent, data: { isViewOnly: true, from: 'search' },
        children: [
          { path: 'professional', component: ProfessionalComponent },
          { path: 'personal', component: PersonalComponent },
          { path: 'attendance', component: AttendanceComponent },
          { path: 'leave', component: LeavesComponent }
        ]
      }
    ])
  ],
  declarations: [
    EmployeeComponent,
    PersonalComponent,
    ProfessionalComponent
  ],
  exports: [RouterModule],
  providers: [UserService]
})
export class EmployeeModule { }
