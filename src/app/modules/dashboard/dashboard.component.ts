import { Component, Input, OnInit } from '@angular/core';
import { CacheService, AutoMapperService, HttpService, HttpSettings, DashboardService } from '../../services';
import { DashboardItem } from '../../models/DashboardItem';
import { Employee } from './../../model/EmployeeViewModel';
import { HolidayModel } from '../../models/HolidayModel';
import { SISOModel } from '../../models/AttendenceModel';
import { Card } from '../../infrastructure/components/Card';
import { UiForm } from '../../infrastructure/components/UiForm';
import { CardModel, GridCardModel } from '../../models/CardModels';
import { UiCustomModal } from '../../infrastructure/components/UiCustomModal';
import { RouterModule, Router } from '@angular/router';
import { ModulePipe, TicketStatusPipe } from '../../infrastructure/Pipes/Pipes';

import { MaterializeDirective } from "angular2-materialize";
import * as Materialize from "angular2-materialize";
import { HelpDeskList } from '../../models/HelpDeskModel';
import { SubmittedExpense } from './../../model/NewExpenseDataModel';
import { ApprovalStatus, ApprovalStatusTitle } from '../../infrastructure/pipes/pipes';
declare var $: any;

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    results: any;
    date: string;
    selectedMonth: number;
    attendanceModel: SISOModel;
    holidayCollection: Array<any> = [];
    btnAutoText: string;
    noOfLeaves: number;
    holiday: boolean = false;
    holidayModel: HolidayModel;
    approvals: Array<any> = [];
    submittedExpense: SubmittedExpense[];
    submittedExpenseCollection: Array<any> = [];
    expenseAvtivity: boolean = true;
    pendingHelpDeskTickets: Array<any> = [];
    isSignOut: boolean = false;
    isSignIn: boolean = false;
    helpDeskList: HelpDeskList;
    helpDeskTicketList: Array<HelpDeskList>;
    rowData: any;
    showHelpDeskStatusDetails: boolean = false;
    showHelpDeskStatusToggle: boolean = true;
    myTeamList: Array<any> = [];
    myTeamList2Count: Array<any> = [];
    isUs: boolean = false;
    appraisalAssignedTo: boolean = false;
    isAdminUser: boolean = false;

    constructor(private _cacheService: CacheService, private _autoMapperService: AutoMapperService, private _activatedRoute: Router, private _httpService: HttpService, private dashboardService: DashboardService) {
        this.date = new Date().toISOString();
        this.rowData = new Array<HelpDeskList>();
        this.selectedMonth = new Date().getMonth() + 1;
        this.PopulateAttendence();
        this.attendanceModel = new SISOModel();
        this.helpDeskTicketList = new Array<HelpDeskList>();
        this.GetLeaveDetails(this.selectedMonth, (new Date()).getFullYear(), 0);
        this.holidayModel = new HolidayModel();
        this.GetExpenseActivity();
        this.GetHelpDeskTickets();
        this.fetchPendingHelpDeskTicket();
        this.GetAppraisalAssignedTo();
    }

    ngOnInit() {
        var data = this._cacheService.getParams("profile");
        if (data["ol"] == 2) {
            this.isUs = true;
        }
        this.showAdministration(data.role);
        this.InitializeCards(data);
        this.GetUpcomingHoliday(data["ol"]);
        this.fetchPendingApprovals();
        this.GetMyTeamList();
    }

    InitializeCards(data) {
        this.results = data;
    }

    //Populate Grid
    PopulateAttendence() {
        this.GetAttendenceDetails();
    }

    //Get call to get attendence data for the month and year
    GetAttendenceDetails() {
        var self = this;
        var currentTime = new Date().getTime();
        var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
        var dateTime = stamp.toString();
        var url = HttpSettings.apiBaseUrl + 'v1/attendance/for-current-user/todays-login/' + dateTime;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                self.attendanceModel = data.employeeSISOViewModels[0] !== undefined ? data.employeeSISOViewModels[0] : new SISOModel();
                this.isSignIn = data.todayStatus.isSignIn;
                this.isSignOut = data.todayStatus.isSignOut;
            });
    }

    //Perform sign in and sign out for auto
    PerformAutoSignIn(e: any, status) {
        let url = HttpSettings.apiBaseUrl + 'v1/attendance/add';
        this.attendanceModel = new SISOModel();
        let timeZone = this._cacheService.getParams('geolocation');
        
        var model = new SISOModel();
        if (status == 'SignIn') {
            this.attendanceModel.IsSignIn = true;
        }
        else {
            this.attendanceModel.IsSignIn = false;
        }
        var currentTime = new Date().getTime();
        var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
        this.attendanceModel.Time = stamp.toString();
        this.attendanceModel.Narration = "Auto Approved";
        this.attendanceModel.IsManual = "false";
        this.attendanceModel.TimeZoneName = timeZone.timeZoneName;

        this._autoMapperService.Map(this.attendanceModel, model);
        this._httpService.post(url, model)
            .subscribe(
            data => {
                var self = this;
                if (data == 1) {
                    if (self.attendanceModel.IsSignIn == true) {
                        Materialize.toast('Successfully Signed In', 3000, 'successTost')
                    }
                    else {
                        Materialize.toast('Successfully Signed Out', 3000, 'successTost')
                    }
                }
                else if (data == 0) {
                    Materialize.toast('Please Sign-In first', 3000, 'errorTost')
                }
                else if (data == 2) {
                    Materialize.toast('Sign-In Time should not be greater than Sign-Out Time', 3000, 'errorTost')
                }
                else if (data == 3) {
                    Materialize.toast('Sign-Out Time should not be less than Sign-In Time', 3000, 'errorTost')
                }
                this.GetAttendenceDetails();
            });
    }

    //Get call to get attendence data for the month and year
    GetLeaveDetails(month: number, year: number, leaveType: number) {
        var self = this;
        var url = HttpSettings.apiBaseUrl + "v1/leave-management/for-current-user/0/" + month + "/" + year;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                this.noOfLeaves = data.availableLeaves.leavesAvailable;
            });
    }

    //Get upcoming holiday from the current date
    GetUpcomingHoliday(ol) {
        var self = this;
        var url = HttpSettings.apiBaseUrl + "v1/leave-management/upcoming-holiday/" + ol;
        this._httpService.get(url)
            .subscribe(
            data => {
                self.holidayModel = (data === null) ? new HolidayModel() : data;
            });
    }

    openHolidayList(ol) {
        this.holidayCollection = new Array<any>();
        var url = HttpSettings.apiBaseUrl + "v1/leave-management/current-year-holidaylist/" + ol + "/" + (new Date()).getFullYear();
        this._httpService.get(url)
            .subscribe
            (
            data => {
                data.forEach(element => {
                    this.holidayCollection.push(element);
                });
                this.holiday = true;
            });
    }

    onHolidayClose(e) {
        this.holiday = false;
    }

    fetchPendingApprovals() {
        this.dashboardService.fetchPendingApprovalsForMe((data) => {
            this.approvals = data;
            let smallModules: Array<string> = ["leave", "profile", "expense", "compoff", "helpdesk", "travel", "appraisal"];
            for (var i = 0; i < data.length; i++) {
                if (data[i].module == '1') {
                    this.approvals[i].url = 'my/leaves/approvals';
                }
                else if (data[i].module == '3') {
                    this.approvals[i].url = 'my/expense/newapproval';
                }
                else if (data[i].module == '5') {
                    this.approvals[i].url = 'my/helpdesk/newapproval';
                }
                else if (data[i].module == '6') {
                    this.approvals[i].url = 'my/travel/newapproval';
                }
                else {
                    this.approvals[i].url = 'approvals/' + smallModules[(+(data[i].module) - 1)]
                }
            }
        });
    }

    GetHelpDeskTickets() {
        this.helpDeskTicketList.length = 0;
        let todaysDate = this.getCurrentDateTime();
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-tickets-list/3/0/" + todaysDate;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                data.forEach(element => {
                    var model = new HelpDeskList();
                    this._autoMapperService.Map(element, model);
                    this.helpDeskTicketList.push(model);
                });
                this.rowData = this.helpDeskTicketList;
            });
    }

    getCurrentDateTime() {
        var currentTime = new Date().getTime();
        var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
        return stamp.toString();
    }

    fetchPendingHelpDeskTicket() {
        this
            .dashboardService
            .fetchPendingTicketStatusForMe((data) => {
                this.pendingHelpDeskTickets = data;
                this.pendingHelpDeskTickets.forEach(element => {
                    if (element.count > 0) {
                        this.showHelpDeskStatusDetails = true;
                    }
                });
            });

    }

    GetExpenseActivity() {
        let url = HttpSettings.apiBaseUrl + "v1/expense/activity";
        let totalOnstage;
        this._httpService.get(url)
            .subscribe(
            data => {
                if (data == null || data.length == 0) {
                    this.submittedExpense = undefined;
                    return false;
                }

                data.forEach(element => {

                    let model = new SubmittedExpense();
                    let expenseDetailsCollection = Array<any>();
                    totalOnstage = 0;

                    model.expenseId = element.expenseId;
                    model.reimbursementTitle = element.reimbursmentTitle;

                    element.expenseStatus.forEach(detailElement => {
                        if (detailElement.status > 0) {
                            model.onStageStatus = detailElement.status;
                        }
                        if (detailElement.status > 0) {
                            model.lastcomments = detailElement.stage == 1 ? 'Primary Approval Stage' : 'Secondary Approval Stage';
                        }
                    });
                    this.submittedExpenseCollection.push(model);
                });

                this.submittedExpense = this.submittedExpenseCollection;
            });
    }

    closeExpenseActivity($event) {
        this.expenseAvtivity = false;
    }

    GetMyTeamList() {
        var self = this;
        var url = HttpSettings.apiBaseUrl + "v1/employee/my-team-list";
        this._httpService.get(url)
            .subscribe(
            data => {
                self.myTeamList = data;
                if (self.myTeamList.length > 3) {
                    for (var i = 0; i < 3; i++) {
                        self.myTeamList2Count.push(data[i]);
                    }
                }
            });
    }

    ShowLessMyTeam(e: any) {
        for (var i = 0; i < this.myTeamList.length; i++) {
            if (i > 2)
                $('.my-team-section').children().eq(i).css('display', 'none');
        }
        $('.read-more-trigger').css('display', 'block');
        $('.read-less-trigger').css('display', 'none');
    }

    ShowMoreMyTeam(e: any) {
        this.myTeamList2Count = this.myTeamList;
        for (var i = 0; i < this.myTeamList.length; i++) {
            if (i > 2)
                $('.my-team-section').children().eq(i).css('display', 'block');
        }
        $('.read-less-trigger').css('display', 'block');
        $('.read-more-trigger').css('display', 'none');
    }

    GetDays(days: any) {
        var d = new Date(days);
        var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        return weekday[d.getDay()];
    }

    IsBirthday(date: any) {
        var birthday = new Date(date), today = new Date();
        birthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
        if (birthday.getMonth() == 0 && today.getMonth() == 11) {
            birthday = new Date((today.getFullYear()) + 1, birthday.getMonth(), birthday.getDate());
        }
        var beforBirthday = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate());
        beforBirthday.setDate(beforBirthday.getDate() - 30);
        if (today.setHours(0, 0, 0, 0) <= birthday.setHours(0, 0, 0, 0) && today.setHours(0, 0, 0, 0) >= beforBirthday.setHours(0, 0, 0, 0)) {
            return { date: birthday, isDisplay: true };
        }
        else {
            return { date: birthday, isDisplay: false };
        }
    }

    GetAppraisalAssignedTo() {
        // var self = this;
        // var url = HttpSettings.apiBaseUrl + "v1/appraisal/appraisal-assigned-to";
        // this._httpService.get(url).subscribe(
        //     data => {
        //         if (data == this.results.id)
        //             self.appraisalAssignedTo = true;
        //     });
    }

    showAdministration(roles: any) {
        for (var i = 0; i < roles.length; i++) {
            if (roles[i].roleId == 24 || roles[i].roleId == 32 || roles[i].roleId == 25
                || roles[i].roleId == 23 || roles[i].roleId == 22 || roles[i].roleId == 1 || roles[i].roleId == 26 || roles[i].roleId == 27 ||
                roles[i].roleId == 28 || roles[i].roleId == 29 || roles[i].roleId == 30 || roles[i].roleId == 31 || roles[i].roleId == 33 || roles[i].roleId == 34 || roles[i].roleId == 35 || roles[i].roleId == 36 || roles[i].roleId == 37 || roles[i].roleId == 38) {
                this.isAdminUser = true;
            }
        }
    }
}