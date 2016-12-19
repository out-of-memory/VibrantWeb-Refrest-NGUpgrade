import { Component} from '@angular/core';
import {HttpService} from '../../servicesFolder/http/http.service';
import {AutoMapperService} from '../../servicesFolder/AutoMapperService';
import {HelpDeskModel, HelpDeskList, HelpDeskCommentModel, HelpDeskSubmitModel, } from '../../models/HelpDeskModel';
import {UiForm, UiFormControl} from '../../infrastructure/components/UiForm';
import {CacheService} from '../../servicesFolder/CacheService';
import {BasicCellC, BasicGrid} from '../../infrastructure/components/basic-grid';
import {List, Map} from 'immutable';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"
import {LoaderComponent} from  '../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";
import {FileUpload} from  '../../infrastructure/components/file-upload';
import {FileNamePipe} from '../../infrastructure/pipes/pipes'
import {  ActivatedRoute, Router} from '@angular/router';
import { LocationPipe } from '../../infrastructure/pipes/pipes'

@Component({
    selector: 'submithelpdesk',
    templateUrl: './helpdesk.submitted.component.html',
    // directives: [UiForm, UiFormControl, MaterializeDirective, FileUpload, BasicGrid, BasicCellC, LoaderComponent, ROUTER_DIRECTIVES],
    providers: [HttpService],
    //pipes: [FileNamePipe, LocationPipe]
})

export class HelpDeskSubmitComponent {
    helpDeskModel: HelpDeskModel;
    helpDeskHub: any;
    helpDeskCommentModel: HelpDeskCommentModel
    helpDeskCommentHub: any;
    helpDeskSubmitModel: HelpDeskSubmitModel;
    helpDeskCommentCollection: Array<any>
    helpDeskSubmitHub: any;
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    id: any;
    action: any;
    formSubmitted: boolean = false;
    helpDeskTicketList: any;
    issueStatusCollection: Array<any> = [];
    issueStatus = ["In Progress", "On Hold", "Resolved", "Cancelled"];
    selectedStatus: number;
    issueListSelectedStatus: number;
    pipes: [LocationPipe]
    durationRemaining: string;
    personId: string;
    todaysTime: string = "";
    assigneeCollection: Array<any>;
    assignToVisible: boolean = false;

    otherDepartmentAssigneeCollection: Array<any>;
    dropDownCollection: Array<any>;
    raisedByMe: boolean = false;
    constructor(private _httpService: HttpService, private _cacheService: CacheService, private routeParams: ActivatedRoute, private _autoMapperService: AutoMapperService) {
        this.setHelpDeskTicket();
        this.populateSubmittedTicket();
        this.getCurrentDateTime();
    }

    getCurrentDateTime() {
        var currentTime = new Date().getTime();
        var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
        return stamp.toString();
    }

    populateSubmittedTicket() {
        this.id = this.routeParams.snapshot.params['id'];
        this.action = +(this.routeParams.snapshot.params['action']);
        this.issueListSelectedStatus = +(this.routeParams.snapshot.params['selectedStatus']);
        this.getTicketDetails(this.id);
        this.populateIssueStatusDropDown();
    }

    populateIssueStatusDropDown() {
        this.issueStatusCollection = new Array();
        for (var i = 1; i <= this.issueStatus.length; i++) {
            this.issueStatusCollection.push({ "id": (i + 3), "text": this.issueStatus[i - 1] });
        }
    }

    onIssueStatusChanged(val: any) {
        this.helpDeskSubmitModel.status = +(val);
    }

    addUpdateTickets(myCommentForm) {
        var todayTime = this.getCurrentDateTime();
        let url = HttpSettings.apiBaseUrl + "v1/HelpDesk/for-addupdate-ticket/" + todayTime;

        if (this.helpDeskCommentModel.comments != "") {
            this.helpDeskModel.assignedTo = this.helpDeskSubmitModel.assignedTo;
            this.helpDeskModel.status = this.helpDeskSubmitModel.status;
            this.helpDeskModel.ID = this.helpDeskSubmitModel.id;
            this.helpDeskModel.comments = this.helpDeskCommentModel.comments;
            this.addUpdateTicket(url, this.helpDeskModel);
        }
        else {
            this.formSubmitted = true;
        }
    }

    addUpdateTicket(url, postData, callBack = null) {
        this.loaderModal = true;
        let isAdd = postData.id == "" ? 0 : 1;
        this._httpService.post(url, postData)
            .subscribe(
            data => {
                if (typeof callBack === 'function') {
                    callBack();
                }
                if (data == true) {
                    Materialize.toast('Your help desk ticket has been updated', 5000, 'green');
                    this.getTicketDetails(this.id);
                    this.helpDeskCommentModel = new HelpDeskCommentModel();
                }
                else {
                    Materialize.toast('Issue in updating help desk ticket.Please contact System Administrator', 5000, 'red')
                }
                this.formSubmitted = false;
                this.loaderModal = false;
            },
            error => console.log(error),
            () => console.log('Post request has Completed')
            );
    }

    getTicketDetails(id: number) {
        this.loaderModal = true;
        this.helpDeskSubmitModel = new HelpDeskSubmitModel();
        this.helpDeskCommentCollection = new Array<any>();
        this.helpDeskTicketList = new Array<any>();
        var todayTime = this.getCurrentDateTime();
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-ticket/" + id + "/" + todayTime;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                this.helpDeskSubmitModel = data.helpDesk;
                this.assigneeCollection = new Array<any>();
                this.otherDepartmentAssigneeCollection = new Array<any>();
                this.dropDownCollection = new Array<any>();
                debugger;
                if ((data.assigness.findIndex(x => x.id == this.helpDeskSubmitModel.assignedTo) >= 0) || (data.otherDepartmentAdmin.findIndex(x => x.id == this.helpDeskSubmitModel.assignedTo)  >= 0)) {
                    this.assignToVisible = false;
                }
                else {
                    this.assignToVisible = true;
                }

                this.assigneeCollection.push({ "id": this.personId, "text": "Select" });
                data.assigness.forEach(element => {
                    this.assigneeCollection.push({ "id": element.id, "text": element.text });
                });

                this.otherDepartmentAssigneeCollection.push({ "id": this.personId, "text": "Select" });
                data.otherDepartmentAdmin.forEach(element => {
                    this.otherDepartmentAssigneeCollection.push({ "id": element.id, "text": element.text });
                });
                this.dropDownCollection = this.assigneeCollection;
                this.helpDeskSubmitModel.assignedTo = this.assigneeCollection[0].id;

                this.selectedStatus = data.helpDesk.status;
                this.populateSelectedHelpDeskListModel(data, this.helpDeskSubmitModel);
                this.helpDeskSubmitModel.durationDisplay = this.helpDeskSubmitModel.duration == 0 ? "NA" : this.helpDeskSubmitModel.duration + " Days";
                if (data.durationRemaining != -9999) {
                    this.durationRemaining = "(" + data.durationRemaining + " days left)";
                }
                else {
                    this.durationRemaining = "";
                }
                data.helpDeskComments.forEach(element => {
                    var model = new HelpDeskCommentModel();
                    this._autoMapperService.Map(element, model);
                    if (element.attachedFile != null && element.attachedFile != "") {
                        model.attachedFiles = element.attachedFile.split('|');
                    }
                    this.helpDeskCommentCollection.push(model);
                });

                if (this.helpDeskCommentCollection[0].CommentedBy == data.employeeProfile.id)
                    this.helpDeskCommentCollection[0].CommentedByRole = "Requester";
                this.helpDeskTicketList[0].description = this.helpDeskCommentCollection[0].comments;
                if (data.helpDesk.status == 2) {
                    this.helpDeskSubmitModel.status = this.issueStatusCollection[0].id;
                }
                this.loaderModal = false;

            },
            error => console.log(error)
            );
    }

    populateSelectedHelpDeskListModel(data: any, helpDeskSubmitModel: any) {
        this.helpDeskTicketList = new Array<any>();
        let helpDeskListModel = new HelpDeskList();
        helpDeskListModel.isPokeEnabled = data.helpDesk.isPokeEnabled;
        helpDeskListModel.ID = data.helpDesk.id;
        helpDeskListModel.designation = data.employeeProfile.currentDesignation;
        helpDeskListModel.email = data.employeeProfile.email;
        helpDeskListModel.address = data.employeeProfile.ol;
        helpDeskListModel.imagePath = "assets/images/" + data.employeeProfile.imagePath;
        helpDeskListModel.mobile = data.employeeProfile.mobile;
        helpDeskListModel.employeeId = data.employeeProfile.id;
        helpDeskListModel.number = helpDeskSubmitModel.number;
        helpDeskListModel.issueDate = helpDeskSubmitModel.issueDate;
        helpDeskListModel.type = helpDeskSubmitModel.type;
        helpDeskListModel.severity = helpDeskSubmitModel.severity;
        helpDeskListModel.status = helpDeskSubmitModel.status;
        helpDeskListModel.description = helpDeskSubmitModel.description;
        this.helpDeskTicketList.push(helpDeskListModel);
    }


    downloadFile(file: any) {
        let url = HttpSettings.apiBaseUrl + "v1/HelpDesk/Download/" + file;
        this._httpService.post(url, '', undefined).subscribe(
            data => {
                var mediaType = 'application/octet-stream';
                var blob = new Blob([data._body], { type: data });
            }, error => console.log(error));
    }

    populateCachedData() {
        var cachedUserDetails = this._cacheService.getParams('profile');
        this.helpDeskSubmitModel.seatingLocation = cachedUserDetails.location;
        this.helpDeskSubmitModel.reportingTo = cachedUserDetails.r1.name;
        this.helpDeskSubmitModel.phoneExtension = cachedUserDetails.extension;
        this.personId = cachedUserDetails.id;
    }

    setHelpDeskTicket() {
        this.helpDeskSubmitModel = new HelpDeskSubmitModel();
        this.helpDeskSubmitHub = this.helpDeskSubmitModel["hub"];
        this.helpDeskModel = new HelpDeskModel();
        this.helpDeskHub = this.helpDeskModel["hub"];
        this.helpDeskCommentModel = new HelpDeskCommentModel();
        this.helpDeskCommentHub = this.helpDeskCommentModel["hub"];
        this.populateCachedData();
    }

    AskForUpdate(ticketId: number) {
        let todayTime = this.getCurrentDateTime();
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/poke-for-status/" + ticketId + "/" + todayTime;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                Materialize.toast('You have successfully buzzed for the status.', 5000, 'green');
                this.getTicketDetails(this.id);
            },
            error => console.log(error)
            );
    }

    departmentChanged(val: any) {
        this.dropDownCollection = new Array<any>();
        this.dropDownCollection.length = 0;
        if (val.srcElement.checked == true) {
            this.dropDownCollection = this.otherDepartmentAssigneeCollection;
        } else {
            this.dropDownCollection = this.assigneeCollection;
        }

    }
}
