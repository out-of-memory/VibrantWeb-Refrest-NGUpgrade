import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { EmployeeComponent } from '../modules/Employee/employee.component';
import { ProfessionalComponent } from '../modules/Employee/professional.component';
import { SecureRouter } from '../Controls/security/SecureRouter';
import { SideNavButtonComponent } from '../infrastructure/components/SideNavButton';
import { SideNavPanelComponent } from '../infrastructure/components/SideNavPanel';
import { EmployeeSearchComponent } from '../modules/Employee/Search/employee-search.component';
import { ExpenseComponent } from '../modules/expense/expense.component'
import { SignInSignOutComponent } from '../modules/Attendence/SignInSignOut.component';
import { LeavesComponent } from '../modules/Leaves/Leaves.component';
import { LeaveApproval } from '../modules/Approvals/Leave/leave.approval';
import { HelpDeskComponent } from '../modules/HelpDesk/helpdesk.component';
import { AttendanceApprovalComponent } from '../modules/Approvals/attendance.approval.component';
import { EmployeeDetailsComponent } from '../modules/Approvals/employeedetails.approval';
import { EmployeeDetailsRequestComponent } from '../modules/Approvals/employeedetails.requestview';
import { ExpenseApprovalComponent } from '../modules/Approvals/Expense/expense.approval.component';
import { ExpApprovalComponent } from '../modules/Approvals/Expense/expense.approval';
import { LoaderComponent } from '../infrastructure/components/loader.component';
import { ExpenseNewComponent } from '../modules/Expense/expense.new.component';
import { CompOffApprovalComponent } from '../modules/Approvals/compoff.approval';
import { ReportsComponent } from '../modules/Reports/Reports';
import { ViewReportsComponent } from '../modules/Reports/ViewReports';
import { HelpDeskApprovalComponent } from '../modules/Approvals/helpdesk.approval.component';
import { HelpDeskSubmitComponent } from '../modules/HelpDesk/helpdesk.submitted.component';
import { TravelComponent } from '../modules/Travel/travel.component';

export module Decorator {
    export class App {
        static component(): any {
            return {
                selector: 'app-root',
                template: `
                            <div class="navbar-fixed">
                                <nav class="dark-gray">                                     
                                    <sidenav-panel *ngIf='isUserLoggedIn' [source]='menu' [isActive]=isNavActive></sidenav-panel>

                                    <ul class="right right-nav"  >
                                        <!--<li class="date-time-text">24 Jun 2016</li>-->
                                        <li class="date-time-text">{{dateObj | date:'dd MMM yyyy'}}</li> 
                                        <!--<li class="date-time-text hide-on-small-and-down">6:29:01 PM</li>
                                        <li class="date-time-text hide-on-small-and-down">{{dateObj | date:'hh:mm:ss'}}</li>-->
                                        <li class="hide-on-small-and-down" *ngIf='userProfile'><span>{{userProfile.lastName}}, {{userProfile.firstName}} ({{userProfile.id}})</span></li>
                                        <li><a><i (click)='Logout()' class="fa fa-power-off" *ngIf='isUserLoggedIn'></i></a></li>
                                        
                                    </ul>
                                    <sidenav-button [isActive]=isNavActive (click) = "toggle($event)"></sidenav-button>
                                    <h5 class="header-title">
                                    <a [routerLink]="['R-my-dashboard']">
                                     <img src="/assets/images/logo-img.png" class="header-logo responsive-img">
                                        VIBRANT <span>WEB 
                                       
                                          </span>   </a>
                                        <div style='background:#494342;padding: 0 10px; display: inline-flex; height: 50px;'>
                                            <span>
                                                    Impersonate :            
                                            </span>
                                            <span>
                                                    <input type='number' [(ngModel)]='impersonate' />
                                            </span>                                            
                                            <span>
                                                    <button  (click)='OnImpersonate()' style='background:green;padding:0 15px;'> Do it!</button>
                                            </span>                                            
                                        </div> 
                                    </h5>  
                                </nav>
                            </div>          
                            <main class="attendance-main" *ngIf='isUserLoggedIn' >
                               
                                <router-outlet></router-outlet>
                            </main> 
                            <footer class="page-footer">
                                <div class="footer-copyright">
                                    <div class="center-align">
                                        © 2016 V2Solutions, Inc.
                                    </div>
                                </div>
                            </footer>
                            <loader-component [(loading)]='loaderModal' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isPage'"
                            [isConformationModal]="isConformationModal"></loader-component>
                        `,
                directives: [ROUTER_DIRECTIVES, SecureRouter, SideNavButtonComponent, SideNavPanelComponent, LoaderComponent]

            }


        }
        static Routes(): Array<any> {
            return [
                {
                    path: '/my/dashboard',
                    name: 'R-my-dashboard',
                    component: DashboardComponent,
                    useAsDefault: true,
                },
                {
                    path: '/my/profile/...',
                    name: 'R-my-profile',
                    component: EmployeeComponent,

                    data: { isViewOnly: false, from: 'profile' }
                },
                {
                    path: '/my/attendance',
                    name: 'R-my-attendence',
                    component: SignInSignOutComponent
                },
                {
                    path: '/employee/details/:id/...',
                    name: 'R-employee-details',
                    component: EmployeeComponent,
                    data: { isViewOnly: true, from: 'search' }
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
                    path: '/my/leaves',
                    name: 'R-my-Leaves',
                    component: LeavesComponent
                },
                {
                    path: '/approvals/leave/...',
                    name: 'R-Approvals-Leave',
                    component: LeaveApproval
                },
                {
                    path: '/approvals/attendance',
                    name: 'R-Approvals-Attendance',
                    component: AttendanceApprovalComponent
                },
                {
                    path: '/approvals/profile',
                    name: 'R-Approvals-EmployeeDetails',
                    component: EmployeeDetailsComponent
                },
                {
                    path: 'approvals/profile/requestview/:id',
                    name: 'R-Approval-EmployeeDetails-Request',
                    component: EmployeeDetailsRequestComponent,
                },
                {
                    path: 'approvals/expense/...',
                    name: 'R-Approvals-Expense',
                    component: ExpApprovalComponent
                },
                {
                    path: '/my/expense/new',
                    name: 'R-my-expense-new',
                    component: ExpenseNewComponent
                },
                {
                    path: '/approvals/compoff',
                    name: 'R-Approvals-Compoff',
                    component: CompOffApprovalComponent
                },
                {
                    path: '/employee/reports',
                    name: 'R-Reports',
                    component: ReportsComponent
                },
                {
                    path: '/employee/reports/:id',
                    name: 'R-Reports-View',
                    component: ViewReportsComponent,
                },
                {
                    path: '/my/helpdesk/...',
                    name: 'R-my-HelpDesk',
                    component: HelpDeskComponent
                },
                {
                    path: '/approvals/helpdesk',
                    name: 'R-Approvals-HelpDesk',
                    component: HelpDeskApprovalComponent
                },
                {
                    path: '/my/helpdesk/details/:id/:action/:selectedStatus',
                    name: 'R-my-HelpDesk-Details',
                    component: HelpDeskSubmitComponent
                },
                {
                    path: 'my/travel/...',
                    name: 'R-my-travel',
                    component: TravelComponent
                }
            ]

        }

    }
}