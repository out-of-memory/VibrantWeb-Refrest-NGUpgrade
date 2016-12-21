import {Component} from '@angular/core';
import {UiForm, UiFormControl} from './../../../infrastructure/components/UiForm';
import {Card} from './../../../infrastructure/components/Card';
//import {ROUTER_DIRECTIVES, RouteConfig, RouteParams, Router, RouteData} from '@angular/router-deprecated';

import {MenuService} from "./../../../servicesFolder/menu/MenuService";
import {EmployeeService} from './../../../servicesFolder/employee/EmployeeService';
import { CacheService} from './../../../servicesFolder/CacheService';
import {UserService} from './../../../servicesFolder/user/user.service';

import { ActivatedRoute } from '@angular/router';
import {MaterializeDirective} from "angular2-materialize";
import {SideMenu} from './../../../infrastructure/components/sideMenu';
import {pageHeading} from './../../../infrastructure/components/pageHeading';
import {SearchBoxViewModel} from './../../../model/SearchBoxViewModel';
import {HttpSettings} from "./../../../servicesFolder/http/http.settings";
import {HttpService} from "./../../../servicesFolder/http/http.service";
import {Repeater} from './../../../infrastructure/components/repeater';
import { BasicCellC, BasicGrid} from './../../../infrastructure/components/basic-grid';
import {CompoffApprovalModel} from './../../../models/CompOffModel';
import {DropdownValue} from  './../../../infrastructure/components/DropDownValue';
import {UiCustomModal} from  './../../../infrastructure/components/UiCustomModal';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'compoff-approval',
    templateUrl: `./compoff.approval.html`,
    
})

export class CompOffApprovalComponent {

    yearCollection: Array<any> = [];
    selectedYear: number;
    approvalModel: CompoffApprovalModel;
    statushub: any;
    cardSubmitted: boolean = false;
    rowData: Array<any> = [];
    action: Array<any> = [];
    profile: any;
    isUs: boolean = false;

    holiday: boolean = false;
    holidayCollection: Array<any> = [];

    constructor(private _employeeService: EmployeeService, private _httpService: HttpService, private _cacheService: CacheService) {
        this.profile = this._cacheService.getParams("profile");
        if (this.profile["ol"] == 2) {
            this.isUs = true;
        }
        this.approvalModel = new CompoffApprovalModel();
        this.statushub = this.approvalModel["hub"];
        this.GetEmployeeData();
        this.selectedYear = 0;
        this.populateMonthYearDropDowns();
    }

    GetEmployeeData() {
        this.rowData.length = 0;
        var url = HttpSettings.apiBaseUrl + 'v1/approval/compoffs';
        this._httpService.get(url)
            .subscribe(
            data => {
                for (var i = 0; i < data.employeeLeaveViewModels.length; i++) {
                    var compoffModel = data.employeeLeaveViewModels[i];
                    this.rowData.push({ "model": compoffModel, "statusModel": { "status": compoffModel.status, "statusComment": compoffModel.statusComment }, cardSubmitted: false });
                }

            },
            error => alert(error)
           // () => console.log('Get request has Completed')
            );

    }

    SaveApproval(e: any, item, form, statusModel: any) {
        var self = this;
        var url = HttpSettings.apiBaseUrl + 'v1/approval/compoff/' + item.model.id;
        if (form.valid || statusModel.status == 1) {
            if (statusModel.status == 1) {
                item.model.statusComment = "Approved";
            }
            else {
                item.model.statusComment = statusModel.statusComment;
            }
            item.model.status = statusModel.status;
            this.ApprovalStatus(url, item.model);
            //     self.GetEmployeeData();
            //     if (typeof e === 'function') {
            //         e();
            //     }

            // });
        }
        else {
            item.cardSubmitted = true;
        }
    }

    CancelEdit(item: any, statusModel: any) {
        statusModel.status = item.model.status;
        statusModel.statusComment = item.model.statusComment;
        item.cardSubmitted = false;
    }

    ApprovalStatus(url, model, callBack = null) {
        var self = this;
        this._httpService.post(url, model)
            .subscribe(
            data => {
                if (model.status == 1)
                   Materialize.toast('Compensatory Off has been Approved', 3000, 'successTost');
                else
                    Materialize.toast('Compensatory Off has been Rejected', 3000, 'successTost');

                if (typeof callBack === 'function') {
                    callBack();
                }
                self.GetEmployeeData();
            },
            error => {
                Materialize.toast(error, 3000, 'errorTost')
            }
            );
    }

    //Creation of month array for dropdown
    populateMonthYearDropDowns() {
        var thisYear = (new Date()).getFullYear();
        for (var i = 0; i < 1; i++) {
            this.yearCollection.push(new DropdownValue(i, (thisYear).toString()));
            thisYear = thisYear - 1;
        }
    }

    onYearSelected(value: any) {
        this.selectedYear = +(value);
        let year = this.yearCollection[this.selectedYear];
        //this.GetLeaveDetails(year.label);
    }


    openHolidayList() {
        this.holidayCollection = new Array<any>();
        var url = HttpSettings.apiBaseUrl + "v1/leave-management/current-year-holidaylist/1";
        this._httpService.get(url)
            .subscribe
            (
            data => {
                data.forEach(element => {
                    this.holidayCollection.push(element);
                });
                this.holiday = true;
            },
            error => console.log(error)
            );
    }

    onHolidayClose(e) {
        this.holiday = false;
    }


}