import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ControlsModule } from './../../../infrastructure/ControlsModule';
import { EmployeeDetailsComponent } from './profile.approvallist';
import { EmployeeDetailsRequestComponent } from './profile.requestview';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild([
      { path: 'approvals/profile', component: EmployeeDetailsComponent },
      { path: 'approvals/profile/requestview/:id', component: EmployeeDetailsRequestComponent }
    ])
  ],
  declarations: [
    ProfileComponent,
    EmployeeDetailsComponent,
    EmployeeDetailsRequestComponent
  ],
  exports: [RouterModule]
})
export class ProfileModule { }
