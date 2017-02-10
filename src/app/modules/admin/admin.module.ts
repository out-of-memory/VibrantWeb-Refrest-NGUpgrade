import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from './../../infrastructure/ControlsModule';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component'
import { UserService } from './../../servicesFolder/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild([
     { path: 'admin', component: AdminComponent },
    ])
  ],
  declarations: [
    AdminComponent
  ],
  exports: [RouterModule],
  providers: [UserService]
})
export class AdminModule { }
