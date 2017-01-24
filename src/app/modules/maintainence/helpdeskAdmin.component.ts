import { Component, OnInit } from '@angular/core';
import { HttpService, CacheService, AutoMapperService } from '../../services';
import { HttpSettings } from "../../servicesFolder/http/http.settings";
import { HelpDeskModel, HelpDeskList } from '../../models/HelpDeskModel';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'helpdeskadmin',
    templateUrl: './helpdeskAdmin.component.html',
})

export class HelpDeskAdminComponent {
    helpDeskModel: HelpDeskModel;
    helpDeskHub: any;
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    helpDeskTicketList: Array<HelpDeskList>;
    rowData: any;
    personId: number;
    status: any = 0;
    // Status in alphabetical order
    issueStatusCollection: Array<any> = [{ "id": 0, "text": "All" },
    { "id": 4, "text": "In Progress" },
    { "id": 5, "text": "On Hold" },
    { "id": 2, "text": "Open" },
    { "id": 1, "text": "Pending For Approval" }];

    selectedStatus: number;
    raisedByMe: number = 0;
    isPokeEnabled: boolean = false;
    cachedUserDetails: any;
    showUnassigned: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.helpDeskModel = new HelpDeskModel();
        this.helpDeskHub = this.helpDeskModel["hub"];
        this.cachedUserDetails = this._cacheService.getParams('profile');
        this.personId = this.cachedUserDetails.id;
        this.populateHelpDeskList();
    }

    populateHelpDeskList() {
        this.status = 0;
        this.selectedStatus = this.status;
        this.helpDeskTicketList = new Array<HelpDeskList>();
        this.rowData = new Array<any>();
        this.GetHelpDeskTeamTickets(this.status);
    }

    onIssueStatusChanged(val: any) {
        this.status = +(val);
        this.showUnassigned = false;
        this.GetHelpDeskTeamTickets(this.status);
    }

    GetHelpDeskTeamTickets(status: number) {
        this.loaderModal = true;
        this.helpDeskTicketList.length = 0;
        var todayTime = this.getCurrentDateTime();
        var catagory = this.getCetagorys(this.cachedUserDetails.role)
        if (catagory.length > 0) {
            var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-team-tickets-list/" + status + "/" + todayTime;
            this._httpService.post(url, catagory).subscribe(
                data => {
                    data.forEach(element => {
                        var model = new HelpDeskList();
                        this._autoMapperService.Map(element, model);
                        model.designation = element.employeeProfile.currentDesignation;
                        model.email = element.employeeProfile.email;
                        model.address = element.employeeProfile.ol;
                        model.imagePath = "assets/images/" + element.employeeProfile.imagePath;
                        model.mobile = element.employeeProfile.mobile;
                        model.employeeId = element.employeeProfile.id;
                        this.helpDeskTicketList.push(model);
                    });
                    this.rowData = this.helpDeskTicketList;
                    this.loaderModal = false;
                });
        }
        else {
            this.loaderModal = false;
        }
    }

    getCetagorys(roles: any) {
        var catagory = [], HR = 0, IT = 0, fin = 0, admin = 0, AM = 0, RMG = 0, Internal = 0, CQ = 0, VWR = 0;
        for (var i = 0; i < roles.length; i++) {
            if ((roles[i].roleId == 24 || roles[i].roleId == 38) && HR == 0) {
                HR++;
                catagory.push(24);
            }
            if ((roles[i].roleId == 25 || roles[i].roleId == 37) && IT == 0) {
                IT++;
                catagory.push(25);
            }
            if ((roles[i].roleId == 23 || roles[i].roleId == 33) && fin == 0) {
                fin++;
                catagory.push(23);
            }
            if ((roles[i].roleId == 22 || roles[i].roleId == 1 || roles[i].roleId == 31) && admin == 0) {
                admin++;
                catagory.push(22);
            }
            if ((roles[i].roleId == 26) && AM == 0) {
                AM++;
                catagory.push(26);
            }
            if ((roles[i].roleId == 27 || roles[i].roleId == 35) && RMG == 0) {
                RMG++;
                catagory.push(27);
            }
            if ((roles[i].roleId == 28 || roles[i].roleId == 34) && Internal == 0) {
                Internal++;
                catagory.push(28);
            }
            if ((roles[i].roleId == 29 || roles[i].roleId == 32) && CQ == 0) {
                CQ++;
                catagory.push(29);
            }
            if ((roles[i].roleId == 30 || roles[i].roleId == 36) && VWR == 0) {
                VWR++;
                catagory.push(30);
            }
        }
        return catagory;
    }

    getCurrentDateTime() {
        var currentTime = new Date().getTime();
        var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
        return stamp.toString();
    }

    showUnassignedEvent(val: any) {
        this.rowData = new Array<any>();
        var tempData = this.helpDeskTicketList;
        if (val == true) {
            tempData = this.helpDeskTicketList.filter(function (el) {
                return el.assignedTo == null || el.assignedTo == 0;
            }.bind(this));
            this.rowData = tempData;
        } else {
            this.rowData = this.helpDeskTicketList;
        }
    }
}