import { Component, OnInit, Input } from '@angular/core';
import { ControlMeta } from '../../infrastructure/models/ControlMeta';
import { Employee } from '../../model/EmployeeViewModel';
import { SideMenu } from '../../infrastructure/components/sideMenu';
import { pageHeading } from '../../infrastructure/components/pageHeading';
import { UiForm, UiFormControl } from '../../infrastructure/components/UiForm';
import { Card } from '../../infrastructure/components/Card';
import { MenuService, HttpService, EmployeeService, CacheService, UserService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"
import {
    AttendanceReportModel, sisoReportModel, empleavebalReportModel, managerleaveReportModel, EmployeeDetailsReportModel, LeaveSummaryReportModel, LeaveDetailsReportModel,
    LeaveTransactionReportModel, HelpdeskReportModel, HelpDeskStatus
} from "../../models/ReportsModel"
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { CapitalizePipe } from '../../infrastructure/pipes/Pipes';
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import { LineChart } from '../../infrastructure/components/LineChart';
import * as Materialize from "angular2-materialize";
declare var $: any;

@Component({
    selector: 'view-reports',
    templateUrl: './viewreports.component.html'
})

export class ViewReportsComponent {

    selectedId: string;
    selectedReport: string;
    attendanceModel: AttendanceReportModel;
    sisoModel: sisoReportModel;
    empleavebalModel: empleavebalReportModel;
    managerleaveModel: managerleaveReportModel;
    empDetailReportModel: EmployeeDetailsReportModel;
    leaveSummary: LeaveSummaryReportModel;
    leaveDetails: LeaveDetailsReportModel;
    leavetrans: LeaveTransactionReportModel;
    helpdesk: HelpdeskReportModel;
    attendanceHub: any;
    sisoHub: any;
    managerleaveHub: any;
    empleavebalHub: any;
    empDetailHub: any;
    leavesummaryHub: any;
    leaveDetailHub: any;
    leavetransHub: any;
    hlpdeskhub: any;
    cardSubmitted: boolean = false;
    reportData: Array<any> = [];
    headers: Array<any> = [];
    empStatusData: Array<any> = [];
    colWidths: string = '';
    dropdowncard: Array<any> = [];
    isHR: boolean = false;
    showCriteria: boolean = false;
    data: any;
    originalWidth: any;
    hlpdskCategories: Array<any> = [];

    loaderModalMsg: boolean = false;
    loaderModalText: any;
    loaderModal: boolean = false;
    isConformationModal: boolean = false;

    statusChartData: Array<any> = [];
    statusChartlabels: Array<any> = [];
    statusChartColors: Array<any> = [];
    typeChartData: Array<any> = [];
    typeChartlabels: Array<any> = [];
    typeChartColors: Array<any> = [];

    lineChartData: Array<any> = [{ data: [], label: 'Ticket Reporting Trend' }];
    lineChartLabels: any = [];
    lineChartChartColors: any;
    helpdeskStatusModel: HelpDeskStatus;

    constructor(private es: EmployeeService, private _httpService: HttpService, private _cacheService: CacheService, private userService: UserService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(
            (param: any) => {
                this.selectedReport = param['id'];
            });
        this.data = this._cacheService.getParams("profile");
        if (this.data["role"].length != 0) {
            for (var i = 0; i < this.data["role"].length; i++) {
                var role = this.data["role"][i];
                if (role.roleId == 12 || role.roleId == 24 || role.roleId == 38 || role.roleId == 35 || role.roleId == 27) {
                    this.isHR = true;
                }
            }
        }
        this.InitializeModels();
        this.FillEmpStatusData();
        this.InitializeDropdownsForModels();

    }
    InitializeModels() {
        this.attendanceModel = new AttendanceReportModel();
        this.attendanceHub = this.attendanceModel["hub"];
        this.sisoModel = new sisoReportModel();
        this.sisoHub = this.sisoModel["hub"];
        this.empleavebalModel = new empleavebalReportModel();
        this.empleavebalHub = this.empleavebalModel["hub"];
         this.managerleaveModel = new managerleaveReportModel();
        this.managerleaveHub = this.managerleaveModel["hub"];
        this.empDetailReportModel = new EmployeeDetailsReportModel();
        this.empDetailHub = this.empDetailReportModel["hub"];
        this.leaveSummary = new LeaveSummaryReportModel();
        this.leavesummaryHub = this.leaveSummary["hub"];
        this.leaveDetails = new LeaveDetailsReportModel();
        this.leaveDetailHub = this.leaveDetails["hub"];
        this.leavetrans = new LeaveTransactionReportModel();
        this.leavetransHub = this.leavetrans["hub"];
        this.helpdesk = new HelpdeskReportModel();
        this.hlpdeskhub = this.helpdesk["hub"];
        this.dropdowncard.push(this.empDetailReportModel);
        this.dropdowncard.push(this.attendanceModel);
        this.dropdowncard.push(this.sisoModel);
        this.dropdowncard.push(this.leaveSummary);
        this.dropdowncard.push(this.leaveDetails);
        this.dropdowncard.push(this.leavetrans);
        this.dropdowncard.push(this.empleavebalModel);
        this.dropdowncard.push(this.managerleaveModel);
        if (!this.isHR) {
            this.attendanceModel.Employeecode = this.data.id;
            this.sisoModel.Employeecode = this.data.id;
            this.leaveSummary.UserID = this.data.id;
            this.leaveDetails.UserID = this.data.id;
            this.leavetrans.UserID = this.data.id;
             this.managerleaveModel.UserID = this.data.id;
              this.empleavebalModel.UserID = this.data.id;
            this.DisableUserIDEdit(this.dropdowncard);
        }
        if (this.isHR) {
            this.attendanceModel.Employeecode = 'All';
            this.sisoModel.Employeecode = 'All';
            this.empDetailReportModel.EmployeeName = 'All';
            this.leaveSummary.UserID = 'All';
            this.leaveDetails.UserID = 'All';
            this.leavetrans.UserID = 'All';
             this.managerleaveModel.UserID = 'All';
              this.empleavebalModel.UserID = 'All';
        }
        this.FillHelpDeskData(this.helpdesk);

    }
    InitializeDropdownsForModels() {
        let dropdowns = this._cacheService.getParams("dropdowns");
        if (dropdowns == null) {
            this.userService.pullDropDowns(() => {
                dropdowns = this._cacheService.getParams("dropdowns");
                this.FillDropDowns(dropdowns);
            })
        }
        else {
            this.FillDropDowns(dropdowns);
        }
    }
    private FillDropDowns(dropdowns) {

        for (var i = 0; i < this.dropdowncard.length; i++) {
            (this.dropdowncard[i].hub as Array<any>).forEach(hub => {
                if (typeof (hub["options"]) === 'string') {
                    hub["options"] = dropdowns[hub["options"]];
                }
            })
        }
    }

    FillEmpStatusData() {
        this.empStatusData.push({ "id": 1, "text": "Confirmed" });
        this.empStatusData.push({ "id": 2, "text": "Probation" });
        this.empStatusData.push({ "id": 3, "text": "Resigned" });
        this.empStatusData.push({ "id": 4, "text": "Part Time" });
        this.empStatusData.push({ "id": 5, "text": "Work from Home" });
        this.empStatusData.push({ "id": 6, "text": "Absconding" });
        this.empStatusData.push({ "id": 7, "text": "Terminated" });
        this.empStatusData.push({ "id": 8, "text": "On Notice" });
        this.empStatusData.push({ "id": 9, "text": "On Leave" });
        this.empStatusData.push({ "id": 10, "text": "Direct Contract" });
        this.empStatusData.push({ "id": 11, "text": "3rd Party Contract" });
        for (var i = 0; i < this.dropdowncard.length; i++) {
            (this.dropdowncard[i].hub as Array<any>).forEach(hub => {
                if ((hub["options"]) === 'empStatus') {
                    hub["options"] = this.empStatusData;
                }
            })
        }
    }

    FillHelpDeskData(model) {
        this.getDropDownValue(data => {
            this.hlpdskCategories = data;
            (model.hub as Array<any>).forEach(hub => {
                if ((hub["name"]) === 'category') {
                    hub["options"] = this.hlpdskCategories;
                }
            })
        });
    }
    getDropDownValue(callback) {
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-dropdown"
        this._httpService.get(url)
            .subscribe
            (
            data => {
                callback(data.categories)
            });
    }

    DisableUserIDEdit(model: any) {
        for (var i = 0; i < model.length; i++) {
            (model[i].hub as Array<any>).forEach(hub => {
                if (hub["name"] == "Employeecode" || hub["name"] == "UserID") {
                    hub["css"] = hub["css"] + " attendance-emp-code-hide";
                }
            })
        }
    }
    SetLeaveReport(e: any, reportType) {
        this.selectedReport = reportType;
    }
    BackToLeaveReport(e: any) {
        this.selectedReport = "Leaves";
        this.reportData = [];
        this.showCriteria = false;
        this.leaveSummary = new LeaveSummaryReportModel();
        this.leaveDetails = new LeaveDetailsReportModel();
        this.leavetrans = new LeaveTransactionReportModel();
        this.managerleaveModel = new managerleaveReportModel();
        this.empleavebalModel = new empleavebalReportModel();

        if (this.isHR) {
            this.leaveSummary.UserID = 'All';
            this.leaveDetails.UserID = 'All';
            this.leavetrans.UserID = 'All';
             this.managerleaveModel.UserID = 'All';
              this.empleavebalModel.UserID = 'All';
        }
        else {
            this.leaveSummary.UserID = this.data.id;
            this.leaveDetails.UserID = this.data.id;
            this.leavetrans.UserID = this.data.id;
              this.managerleaveModel.UserID = this.data.id;
              this.empleavebalModel.UserID = this.data.id;
        }
    }

    BackToAttendanceReport(e: any) {
        this.selectedReport = "AttendanceDetail";
        this.reportData = [];
        this.showCriteria = false;
        this.attendanceModel = new AttendanceReportModel();
        this.sisoModel = new sisoReportModel();
        if (this.isHR) {
            this.attendanceModel.Employeecode = 'All';
            this.sisoModel.Employeecode = 'All';
        }
        else {
            this.attendanceModel.Employeecode = this.data.id;
            this.sisoModel.Employeecode = this.data.id;
        }
    }

    PopulateStatusChart(reportData) {
        this.helpdeskStatusModel = new HelpDeskStatus();
        for (var prop in reportData) {
            if (reportData[prop].status === 'Open') {
                this.helpdeskStatusModel.Open += 1;
            }
            if (reportData[prop].status === 'On Hold') {
                this.helpdeskStatusModel.OnHold += 1;
            }
            if (reportData[prop].status === 'Pending For Approval') {
                this.helpdeskStatusModel.PendingForApproval += 1;
            }
            if (reportData[prop].status === 'In Progress') {
                this.helpdeskStatusModel.InProgress += 1;
            }
            if (reportData[prop].status === 'Rejected') {
                this.helpdeskStatusModel.Rejected += 1;
            }
            if (reportData[prop].status === 'Resolved') {
                this.helpdeskStatusModel.Resolved += 1;
            }
            if (reportData[prop]['help DeskTicket Type'] === "Request") {

                this.helpdeskStatusModel.Request += 1;
            }
            if (reportData[prop]['help DeskTicket Type'] === 'Issue') {
                this.helpdeskStatusModel.Issue += 1;
            }
        }
        this.statusChartData = new Array<any>();
        this.statusChartData.push(this.helpdeskStatusModel.Open);
        this.statusChartData.push(this.helpdeskStatusModel.OnHold);
        this.statusChartData.push(this.helpdeskStatusModel.PendingForApproval);
        this.statusChartData.push(this.helpdeskStatusModel.InProgress);
        this.statusChartData.push(this.helpdeskStatusModel.Rejected);
        this.statusChartData.push(this.helpdeskStatusModel.Resolved);

        this.typeChartData = new Array<any>();
        this.typeChartData.push(this.helpdeskStatusModel.Request);
        this.typeChartData.push(this.helpdeskStatusModel.Issue);

        var labels = ["Open", "On Hold", "Pending For Approval", "In Progress", "Rejected", "Resolved"];
        var colors = ["#2D82B0", "#76B1CD", "#F15B28", "#cd7320", "#c31205", "#8DA408"];
        var typeLable = ["Reuest", "Issue"];
        var typecolors = ["#cd7320", "#8DA408"]
        var tempLabels = [], tempColors = [], typetmpclr = [], typetmplable = [];
        for (var i = 0; i < this.statusChartData.length; i++) {
            if (this.statusChartData[i] != 0) {
                tempLabels.push(labels[i]);
                tempColors.push(colors[i]);
            }
        }
        for (var i = 0; i < this.typeChartData.length; i++) {
            if (this.typeChartData[i] != 0) {
                typetmplable.push(typeLable[i]);
                typetmpclr.push(typecolors[i]);
            }
        }
        this.statusChartlabels = tempLabels;
        this.statusChartColors = [{ backgroundColor: tempColors }];
        this.typeChartlabels = typetmplable;
        this.typeChartColors = [{ backgroundColor: typetmpclr }];
        this.showLineChartDetail();
    }

    showLineChartDetail() {

        this.lineChartData = [{ data: [14, 7, 18, 11, 9, 15, 25], label: 'Ticket Reporting Trend' }];
        this.lineChartLabels = ['NOVW1', 'NOVW2', 'NOVW3', 'NOVW4', 'DECW1', 'DECW2', 'DECW3'];
        var time = [], days = [], count = 0;
        var lineChartColors: Array<any> = [
            { // grey
                //backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartChartColors = lineChartColors;

    }

    ViewReport(e: any, model: any, form) {
        // ND: Need to remove this code as It is done by ui-control-item.
        if (model.StartDate !== undefined) {
            var endDate = new Date(model.EndDate.toString()).getTime();
            var startDate = new Date(model.StartDate.toString()).getTime();
            if ((endDate - startDate) < 0) {
                Materialize.toast("EndDate cannot be less than StartDate", 3000, 'errorTost');
                this.reportData = [];
                this.cardSubmitted = true;
            }
            else {
                this.ShowViewReport(e, model, form);
            }
        }
        else {
            this.ShowViewReport(e, model, form);
        }
    }

    ShowViewReport(e, model: any, form) {
        var self = this;
        this.headers = [];
        this.reportData = [];
        var link = HttpSettings.apiBaseUrl + 'v1/report/' + this.selectedReport.toLowerCase() + '/view';
        if (form.mainForm.valid) {
            this.showCriteria = true;
            this.GetReportData(link, model, function () {
                if (self.selectedReport == 'Helpdesk') {
                    self.PopulateStatusChart(self.reportData);
                }
                for (var i = 0; i < self.reportData.length; i++) {
                    var keys = Object.keys(self.reportData[i]);
                    for (var i = 0; i < keys.length; i++) {
                        self.headers.push(keys[i]);
                    }
                    var columnCount = self.headers.length;
                    self.originalWidth = 100 / (self.headers.length);
                    self.originalWidth = self.originalWidth + "%";
                    var width = self.originalWidth.toString();
                    var tempWidth = "";
                    for (var i = 0; i < columnCount; i++) {
                        tempWidth = width + ',' + tempWidth;
                    }
                    self.colWidths = tempWidth.substring(0, tempWidth.length - 1);
                    break;
                }
                if (typeof e === 'function') {
                    e();
                }
            });
        }
        else {
            this.cardSubmitted = true;
            this.showCriteria = false;
        }
    }

    DownloadReport(e: any, data: any) {
        var self = this;
        var jsonStr = JSON.stringify(data);
        var link = HttpSettings.apiBaseUrl + 'v1/report/' + this.selectedReport.toLowerCase() + '/download';
        this._httpService.downloadCSV(link, data)
            .subscribe(
            data => {
                var a = $("<a style='display: none;'/>");
                var url = window.URL.createObjectURL(new Blob([data["_body"]], { type: "text/csv" }));
                a.attr("href", url);
                a.attr("download", this.selectedReport.toLowerCase() + ".csv");
                $("body").append(a);
                a[0].click();
                window.URL.revokeObjectURL(url);
                a.remove();
            },
            error => {
                Materialize.toast(error, 3000, 'errorTost')
            }
            );
    }

    GetReportData(url, model, callBack = null) {
        this.loaderModal = true;
        var self = this;
        this._httpService.post(url, model)
            .subscribe(
            data => {
                self.reportData = data;
                self.loaderModal = false;
                if (data.length == 0) {
                    Materialize.toast("No data available.", 3000, 'successTost');
                }
                if (typeof callBack === 'function') {
                    callBack();
                }
            },
            error => {
                data => {
                    data;
                }
                self.loaderModal = false;
                Materialize.toast(error, 3000, 'errorTost')
            }
            );
    }

}