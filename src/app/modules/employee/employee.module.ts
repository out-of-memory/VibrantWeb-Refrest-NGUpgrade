import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlsModule} from './../../infrastructure/ControlsModule';
import { RouterModule }        from '@angular/router';
import {EmployeeComponent} from './employee.component'
import {EmployeeSearchComponent} from './search/employee-search.component'
import {PersonalComponent} from './personal.component'
import {ProfessionalComponent} from './professional.component'
import {UserService} from './../../servicesFolder/user/user.service';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild([
            {path:'my/profile', redirectTo:'personal', pathMatch: 'full'},
            { path: 'my/profile', component: EmployeeComponent,data: { isViewOnly: false, from: 'profile' },
              
              children: [
                            { path: 'professional', component: ProfessionalComponent },
                            { path: 'personal', component: PersonalComponent }
                        ]
            },
            { path: 'employee/search', component: EmployeeSearchComponent },
            
            
        ])
  ],
  declarations: [
      
      EmployeeComponent,
      PersonalComponent,
      ProfessionalComponent,
      EmployeeSearchComponent
      
  ],
  exports:[RouterModule],
  providers:[UserService]
})
export class EmployeeModule { }
