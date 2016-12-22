import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule } from '../../../infrastructure/ControlsModule';
import { RouterModule } from '@angular/router';
import { UserService, EmployeeService } from '../../../services';
import { EmployeeSearchComponent } from './employee-search.component';

@NgModule({
    imports: [
        CommonModule,
        ControlsModule,
        RouterModule.forChild([
            { path: 'employee/search', component: EmployeeSearchComponent }
        ])
    ],
    declarations: [
        EmployeeSearchComponent
    ],
    exports: [RouterModule],
    providers: [UserService, EmployeeService]
})

export class EmployeeSearchModule { }