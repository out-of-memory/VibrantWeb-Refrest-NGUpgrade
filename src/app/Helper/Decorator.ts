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
import { EnablelocationComponent } from '../modules/enablelocation/enablelocation.component'
import { TravelComponent } from '../modules/travel/travel.component';
import { ViewMyHistoryComponent } from '../modules/travel/travel.view.my.history.component';
import { TravelApprovalHistoryView } from '../modules/travel/travel.approval.history.view.component';
import { TravelViewRequestComponent } from '../modules/travel/travel.view.request.component';

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
                },
                {
                    path: "/enablelocation",
                    name: "R-Enablelocation",
                    component: EnablelocationComponent

                },
                {
                    path: "/my/travel/...",
                    name: "R-my-travel",
                    component: TravelComponent
                },
                {
                    path: "/my/travel/view/:id",
                    name: "Travel_My_View_Request_Id",
                    component: ViewMyHistoryComponent
                },
                {
                    path: "/approvalhistory/travel/view/:id",
                    name: "Travel_My_Approval_View_Request_Id",
                    component: TravelApprovalHistoryView
                },
                {
                    path: "/travel/view/:id",
                    name: "Travel_View_Request_Id",
                    component: TravelViewRequestComponent
                }
            ]
        }
    }
}