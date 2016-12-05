import { Component } from '@angular/core';
import { HttpService } from '../../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../../servicesFolder/AutoMapperService';
import { LeaveApprovalModel, LeaveApprovalStatus } from '../../../models/LeaveModel';
import { DropdownValue } from '../../../infrastructure/components/DropDownValue';
import { UiForm, UiFormControl } from '../../../infrastructure/components/UiForm';
import { DoughnutChart } from '../../../infrastructure/components/DoughnutChart';
import { CacheService } from '../../../servicesFolder/CacheService';
import { BasicCellC, BasicGrid } from '../../../infrastructure/components/basic-grid';
import { List, Map } from 'immutable';
import { MaterializeDirective } from "angular2-materialize";
import { UiCustomModal } from '../../../infrastructure/components/UiCustomModal';
import { HttpSettings } from "../../../servicesFolder/http/http.settings"
//import { HolidayComponent } from "../../../modules/Holiday/holiday.component";
import { LoaderComponent } from '../../../infrastructure/components/loader.component';
//import { TimerWrapper } from '@angular/core/src/facade/async';
import * as Materialize from "../../../index";
import { LocationPipe, ApprovalStatus, ApprovalStatusTitle } from '../../../infrastructure/pipes/pipes'

@Component({
  selector: 'leave-approval',
  templateUrl: './leave.approval.history.html',
  //directives: [BasicCellC, BasicGrid, LoaderComponent, MaterializeDirective, UiCustomModal, UiForm, UiFormControl],
  providers: [HttpService],
  //pipes: [ApprovalStatus, ApprovalStatusTitle]
})

export class LeaveApprovalHistory {
  leaveModelCollection: Array<any> = [];
  rowData: Array<any> = [];

  leaveChartData: Array<any> = [];
  leaveChartlabels: Array<any> = [];
  leaveChartColors: Array<any> = [];

  addEditLeaveModel: LeaveApprovalModel;
  leaveModelHub: any;
  leaveTypeDropDownData: any;

  totalLeaves: number;
  isUs: boolean = false;
  profile: any;

  leaveStatus: string = "Apply For Leaves";
  holiday: boolean = false;
  holidayCollection: Array<any> = [];

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
    this.PopulateLeaveModulePage();
    this.profile = this._cacheService.getParams("profile");
    if (this.profile["ol"] == 2) {
      this.isUs = true;
    }
  }

  //Calls to populate all the controls of the page
  PopulateLeaveModulePage() {
    this.populateLeaveGrid();
  }

  //Populate Grid
  populateLeaveGrid() {
    this.GetLeaveDetails();
  }

  //Get call to get attendence data for the month and year
  GetLeaveDetails() {
    this.loaderModal = true;
    this.leaveModelCollection.length = 0;
    this.rowData.length = 0;
    var url = HttpSettings.apiBaseUrl + "v1/approval/leaves-history";
    this._httpService.get(url)
      .subscribe
      (
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