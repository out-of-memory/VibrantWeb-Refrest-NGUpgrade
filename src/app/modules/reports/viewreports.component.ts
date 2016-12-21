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
import { AttendanceReportModel, EmployeeDetailsReportModel, LeaveSummaryReportModel, LeaveDetailsReportModel } from "../../models/ReportsModel"
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { CapitalizePipe } from '../../infrastructure/pipes/Pipes';
import { LoaderComponent } from '../../infrastructure/components/loader.component';
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
    empDetailReportModel: EmployeeDetailsReportModel;
    leaveSummary: LeaveSummaryReportModel;
    leaveDetails: LeaveDetailsReportModel;
    attendanceHub: any;
    empDetailHub: any;
    leavesummaryHub: any;
    leaveDetailHub: any;
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

    loaderModalMsg: boolean = false;
    loaderModalText: any;
    loaderModal: boolean = false;
    isConformationModal: boolean = false;

    constructor(private es: EmployeeService, private _httpService: HttpService, private _cacheService: CacheService, private userService: UserService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(
            (param: any) => {
                this.selectedReport = param['id'];
            });
        this.data = this._cacheService.getParams("profile");
        if (this.data["role"].length != 0 && this.data["role"][0].roleId == 12) {
            this.isHR = true;
        }
        this.InitializeModels();
        this.FillEmpStatusData();
        this.InitializeDropdownsForModels();

    }
    InitializeModels() {
        this.attendanceModel = new AttendanceReportModel();
        this.attendanceHub = this.attendanceModel["hub"];
        this.empDetailReportModel = new EmployeeDetailsReportModel();
        this.empDetailHub = this.empDetailReportModel["hub"];
        this.leaveSummary = new LeaveSummaryReportModel();
        this.leavesummaryHub = this.leaveSummary["hub"];
        this.leaveDetails = new LeaveDetailsReportModel();
        this.leaveDetailHub = this.leaveDetails["hub"];
        this.dropdowncard.push(this.empDetailReportModel);
        this.dropdowncard.push(this.attendanceModel);
        this.dropdowncard.push(this.leaveSummary);
        this.dropdowncard.push(this.leaveDetails);
        if (!this.isHR) {
            this.attendanceModel.Employeecode = this.data.id;
            this.leaveSummary.UserID = this.data.id;
            this.leaveDetails.UserID = this.data.id;
            this.DisableUserIDEdit(this.dropdowncard);
        }
        if (this.isHR) {
            this.attendanceModel.Employeecode = 'All';
            this.empDetailReportModel.EmployeeName = 'All';
            this.leaveSummary.UserID = 'All';
            this.leaveDetails.UserID = 'All';
        }

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
        if (this.isHR) {
            this.leaveSummary.UserID = 'All';
            this.leaveDetails.UserID = 'All';
        }
        else {
            this.leaveSummary.UserID = this.data.id;
            this.leaveDetails.UserID = this.data.id;
        }
    }

    ViewReport(e: any, model: any, form) {
        // ND: Need to remove this code as It is done by ui-control-item.
        if (model.StartDate !== undefined) {
            var endDate = new Date(model.EndDate.toString()).getTime();
            var startDate = new Date(model.StartDate.toString()).getTime();
            if ((endDate - startDate) < 0) {
                Materialize.toast("EndDate cannot be greater than StartDate", 3000, 'errorTost');
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
                // console.log(JSON.stringify(data));
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