import { Component} from '@angular/core';
import {HttpService} from '../../servicesFolder/http/http.service';
import {AutoMapperService} from '../../servicesFolder/AutoMapperService';
import {HelpDeskModel, HelpDeskList} from '../../models/HelpDeskModel';
import {UiForm, UiFormControl} from '../../infrastructure/components/UiForm';
import {CacheService} from '../../servicesFolder/CacheService';
import {BasicCellC, BasicGrid} from '../../infrastructure/components/basic-grid';
import {List, Map} from 'immutable';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"
import {LoaderComponent} from  '../../infrastructure/components/loader.component';
import { FileUpload } from  '../../infrastructure/components/file-upload';
import {ActivatedRoute} from '@angular/router';
import { LocationPipe } from '../../infrastructure/pipes/pipes'
import * as Materialize from "angular2-materialize";
@Component({
    selector: 'helpdesklist',
    templateUrl: './helpdesklist.component.html',
    //directives: [UiForm, UiFormControl, MaterializeDirective, LoaderComponent, BasicGrid, BasicCellC, ROUTER_DIRECTIVES],
    providers: [HttpService],
   // pipes: [LocationPipe]

})

export class HelpDeskListComponent {
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
    issueStatusCollection: Array<any> = [];
    issueStatus = ["All", "Pending For Approval", "Open", "Rejected", "In Progress", "On Hold", "Resolved", "Cancelled"];
    selectedStatus: number;
    raisedByMe: number = 0;
    isPokeEnabled: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private routeParams: ActivatedRoute, private _cacheService: CacheService) {
        this.helpDeskModel = new HelpDeskModel();
        this.helpDeskHub = this.helpDeskModel["hub"];
        var cachedUserDetails = this._cacheService.getParams('profile');
        this.personId = cachedUserDetails.id;
        this.populateHelpDeskList();
        this.populateIssueStatusDropDown();
    }

    routerOnActivate(curr: any, prev?: any): void {
        //console.log(curr);
    }

    populateHelpDeskList() {
        this.status = +(this.routeParams.params['status']);
        this.selectedStatus = this.status;
        this.helpDeskTicketList = new Array<HelpDeskList>();
        this.rowData = new Array<any>();
        if (this.status != 0) {
            this.raisedByMe = 0;
            this.GetHelpDeskTickets(2);
        }
        else
            this.GetHelpDeskTickets(this.raisedByMe);
    }

    raisedCheckboxChanged(val: any) {
        if (val == true)
            this.raisedByMe = 1;
        else
            this.raisedByMe = 0;
        this.GetHelpDeskTickets(this.raisedByMe);
    }

    populateIssueStatusDropDown() {
        this.issueStatusCollection = new Array();
        for (var i = 0; i < this.issueStatus.length; i++) {
            this.issueStatusCollection.push({ "id": i, "text": this.issueStatus[i] });
        }
    }

    onIssueStatusChanged(val: any) {
        this.status = +(val);
        this.GetHelpDeskTickets(this.raisedByMe);
    }

    GetHelpDeskTickets(ticketType: number) {
        this.loaderModal = true;
        this.helpDeskTicketList.length = 0;
        var todayTime = this.getCurrentDateTime();
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-tickets-list/" + ticketType + "/" + this.status + "/" + todayTime;
        this._httpService.get(url)
            .subscribe
            (
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
            },
            error => console.log(error)
            );
    }

    AskForUpdate(ticketId: number) {
        var todayTime = this.getCurrentDateTime();
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/poke-for-status/" + ticketId + "/" + todayTime;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                this.GetHelpDeskTickets(this.raisedByMe);
                Materialize.toast('You have successfully buzzed for the status.', 5000, 'green');
            },
            error => console.log(error)
            );
    }

     getCurrentDateTime() {
        var currentTime = new Date().getTime();
        var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
        return stamp.toString();
    }
}
