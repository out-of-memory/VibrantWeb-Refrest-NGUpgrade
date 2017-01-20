import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';



import { CacheService } from './servicesFolder/CacheService';
import { HttpService } from './servicesFolder/http/http.service';
import { MenuService } from './servicesFolder/Menu/MenuService';

import { ExpenseService } from './servicesFolder/Expense/ExpenseService';
import { EmployeeService } from './servicesFolder/Employee/EmployeeService';
import { UserService } from './servicesFolder/User/user.service';
import { MaterializeDirective } from 'angular2-materialize';

import { RoutingModule } from './modules/routing/routing-module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SideNavPanelModule } from './infrastructure/SideNavPanelModule';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { LeaveModule } from './modules/leave/leave.module';
import { ApprovalsModule } from './modules/approvals/approvals.module';
import { HelpdeskModule } from './modules/helpdesk/helpdesk.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { MaintainenceModule } from './modules/maintainence/maintainence.module';
import { EnablelocationModule } from './modules/enablelocation/enablelocation.module';
import { LocationserviceService } from './servicesFolder/Enablelocation/locationservice.service';
import { AdminModule } from './modules/admin/admin.module'


@NgModule({
  declarations: [
    AppComponent,
   

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    RoutingModule,
    DashboardModule,
    AttendanceModule,
    SideNavPanelModule,
    LeaveModule,
    ApprovalsModule,
    HelpdeskModule,
    ExpenseModule,
    EmployeeModule,
    ReportsModule,
    MaintainenceModule,
    EnablelocationModule,
    AdminModule

  ],
  providers: [CacheService, { provide: LocationStrategy, useClass: HashLocationStrategy },
    HttpService, MenuService, ExpenseService, EmployeeService, UserService, LocationserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
