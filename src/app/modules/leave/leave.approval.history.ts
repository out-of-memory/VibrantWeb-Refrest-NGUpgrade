import { Component } from '@angular/core';
import { HttpService, CacheService, AutoMapperService, HttpSettings } from '../../services';
import { LeaveApprovalModel, LeaveApprovalStatus } from '../../models/LeaveModel';
import { List, Map } from 'immutable';
import { MaterializeDirective } from "angular2-materialize";
import { UiCustomModal } from '../../infrastructure/components/UiCustomModal';
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'leave-approval',
    templateUrl: './leave.approval.history.html',
    providers: [HttpService],
})

export class LeaveApprovalHistory {
    leaveModelCollection: Array<any> = [];
    rowData: Array<any> = [];
    addEditLeaveModel: LeaveApprovalModel;
    leaveModelHub: any;
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    formSubmitted: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.addEditLeaveModel = new LeaveApprovalModel();
        this.leaveModelHub = this.addEditLeaveModel["hub"];
        this.GetLeaveDetails();
    }

    //Get call to get attendence data for the month and year
    GetLeaveDetails() {
        this.loaderModal = true;
        this.leaveModelCollection.length = 0;
        this.rowData.length = 0;
        var url = HttpSettings.apiBaseUrl + "v1/approval/leaves-history";
        this._httpService.get(url).subscribe(
            data => {
                data.employeeLeaveViewModels.forEach(element => {
                    var model = new LeaveApprovalModel();
                    //model.push(element);
                    this._autoMapperService.Map(element, model);
                    if (element.status != 4) {
                        element.status = element.status - 1;
                    }
                    this.leaveModelCollection.push({ "model": element, "statusModel": { "status": "0", "statusComment": element.statusComment } });
                });
                this.rowData = this.leaveModelCollection;
                this.loaderModal = false;
            },
            error => console.log(error)
        );
    }
}