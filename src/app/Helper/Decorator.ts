import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { EmployeeComponent } from '../modules/Employee/employee.component';
import { EmployeeSearchComponent } from '../modules/Employee/Search/employee-search.component';
import { ExpenseComponent } from '../modules/expense/expense.component'
import { HelpDeskComponent } from '../modules/HelpDesk/helpdesk.component';
import { HelpDeskSubmitComponent } from '../modules/HelpDesk/helpdesk.submitted.component';
import { AttendanceComponent } from '../modules/attendance/attendance.component';
import { LeaveApproval } from '../modules/leave/leave';
import { ReportsComponent } from '../modules/reports/reports.component';
import { MaintainenceComponent } from '../modules/Maintainence/maintainence.component';
import { ProfileComponent } from '../modules/approvals/profile/profile.component';
import { CompOffApprovalComponent } from '../modules/approvals/compoff/compoff.approval';

export module Decorator {
    export class App {
        static Routes(): Array<any> {
            return [
                {
                    path: '/my/dashboard',
                    name: 'R-my-dashboard',
                    component: DashboardComponent,
                    useAsDefault: true,
                },
                {
                    path: '', redirectTo: 'my/dashboard', pathMatch: 'full'
                },
                {
                    path: '/my/profile/...',
                    name: 'R-my-profile',
                    component: EmployeeComponent,
                    data: { isViewOnly: false, from: 'profile' }
                },
                {
                    path: '/employee/details/:id/...',
                    name: 'R-employee-details',
                    component: EmployeeComponent,
                    data: { isViewOnly: true, from: 'search' }
                },
                {
                    path: '/my/attendance',
                    name: 'R-my-attendence',
                    component: AttendanceComponent
                },
                {
                    path: '/employee/search',
                    name: 'R-employee-search',
                    component: EmployeeSearchComponent
                },
                {
                    path: 'my/expense/...',
                    name: 'R-my-expense',
                    component: ExpenseComponent
                },
                {
                    path: '/my/leaves/...',
                    name: 'R-my-Leaves',
                    component: LeaveApproval
                },
                {
                    path: '/my/helpdesk/...',
                    name: 'R-my-HelpDesk',
                    component: HelpDeskComponent
                },
                {
                    path: '/my/helpdesk/details/:id/:action/:selectedStatus',
                    name: 'R-my-HelpDesk-Details',
                    component: HelpDeskSubmitComponent
                },
                {
                    path: '/employee/reports/...',
                    name: 'R-Reports',
                    component: ReportsComponent
                },
                {
                    path: "/maintainence",
                    name: "R-Maintainence",
                    component: MaintainenceComponent
                },
                {
                    path: '/approvals/profile',
                    name: 'R-Approvals-EmployeeDetails',
                    component: ProfileComponent
                },
                {
                    path: '/approvals/compoff',
                    name: 'R-Approvals-Compoff',
                    component: CompOffApprovalComponent
                }               
            ]

        }

    }
}