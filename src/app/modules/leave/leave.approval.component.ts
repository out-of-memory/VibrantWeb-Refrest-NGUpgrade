import { Component } from '@angular/core';
import { HttpService, AutoMapperService, CacheService, HttpSettings } from '../../services';
import { LeaveApprovalModel, LeaveApprovalStatus } from '../../models/LeaveModel';
import { DropdownValue } from '../../infrastructure/components/DropDownValue';
import { UiForm, UiFormControl } from '../../infrastructure/components/UiForm';
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { List, Map } from 'immutable';
import { MaterializeDirective } from "angular2-materialize";
import { UiCustomModal } from '../../infrastructure/components/UiCustomModal';
import { LoaderComponent } from '../../infrastructure/components/loader.component';
//import { TimerWrapper } from '@angular/core/src/facade/async';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'leave-approval',
    templateUrl: './leave.approval.component.html',
    providers: [HttpService]
})

export class LeaveApprovalComponent {
    leaveModelCollection: Array<any> = [];
    rowData: Array<any> = [];
    addEditLeaveModel: LeaveApprovalModel;
    leaveModelHub: any;
    leaveTypeDropDownData: any;
    totalLeaves: number;
    profile: any;
    leaveStatus: string = "Apply For Leaves";
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    formSubmitted: boolean = false;
    approvalStatus: LeaveApprovalStatus;
    statushub: any;
    cardSubmitted: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.addEditLeaveModel = new LeaveApprovalModel();
        this.leaveModelHub = this.addEditLeaveModel["hub"];
        this.approvalStatus = new LeaveApprovalStatus();
        this.statushub = this.approvalStatus["hub"];
        this.GetLeaveDetails();
        this.profile = this._cacheService.getParams("profile");
    }

    Cancel(item: any, statusModel: any) {
        statusModel.status = item.model.status;
        statusModel.statusComment = item.model.statusComment;
        this.cardSubmitted = false;
    }

    SaveLeave(e: any, item: any, statusModel: any, form: any) {
        let url = HttpSettings.apiBaseUrl + "v1/leave-management/approve-or-reject-leave";
        if (statusModel.status == 2 || form.valid) {
            if (statusModel.status == 2 && statusModel.statusComment == null) {
                item.model.statusComment = "Approved";
            }
            else {
                item.model.statusComment = statusModel.statusComment;
            }
            item.model.status = statusModel.status;
            this.addUpdateLeave(url, item.model)
        }
        else {
            this.cardSubmitted = true;
        }
    }

    //Get call to get attendence data for the month and year
    GetLeaveDetails() {
        this.loaderModal = true;
        this.leaveModelCollection.length = 0;
        this.rowData.length = 0;
        var url = HttpSettings.apiBaseUrl + "v1/approval/leaves/0/0/0";
        this._httpService.get(url)
            .subscribe
            (
            data => {
                data.employeeLeaveViewModels.forEach(element => {
                    var model = new LeaveApprovalModel();
                    this._autoMapperService.Map(element, model);
                    this.leaveModelCollection.push({ "model": element, "statusModel": { "status": "0", "statusComment": element.statusComment } });
                });
                this.rowData = this.leaveModelCollection;
                this.loaderModal = false;
            });
    }

    addUpdateLeave(url, postData) {
        let isAdd = postData.id == "" ? 0 : 1;
        this._httpService.post(url, postData)
            .subscribe(
            data => {
                this.leaveStatus = "Apply For Leaves";
                if (postData.statusComment == "Approved")
                    Materialize.toast('Leave Approved Succesfuly', 3000, 'green');
                else
                    Materialize.toast('Leave Reject Succesfuly', 3000, 'green');
                this.formSubmitted = false;
                this.GetLeaveDetails()
            });
    }

    leaveTypes(leave) {
        var data = ["Comp Off", "Leave", "LWP", "Maternity", "Paternity", "LL", "Birthday"];
        return data[leave];
    }
}