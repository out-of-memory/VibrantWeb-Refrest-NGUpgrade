import { Component } from '@angular/core';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { LeaveApprovalModel } from '../../models/LeaveModel';
import { UiForm } from '../../infrastructure/components/UiForm';
import { CacheService } from '../../servicesFolder/CacheService';
import { List, Map } from 'immutable';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";
import { HelpDeskList } from '../../models/HelpDeskModel';

@Component({
  selector: 'helpdesk-approval',
  templateUrl: './helpdesk.approval.component.html',
  providers: [HttpService],

})

export class HelpDeskApprovalComponent {
  helpDeskTicketList: Array<HelpDeskList>;
  rowData: any;

  loaderModal: boolean = false;
  loaderModalMsg: boolean = false;
  loaderModalText: any;
  isConformationModal: boolean = false;
  duration = ["30", "90", "120", "360"];
  durationCollection: Array<any> = [];

  constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
    this.helpDeskTicketList = new Array<HelpDeskList>();
    this.populateDurationDropDown();
    this.GetHelpDeskTickets();

  }

  populateDurationDropDown() {
    this.durationCollection = new Array<any>();
    for (var i = 0; i < this.duration.length; i++) {
      this.durationCollection.push({ "id": +(this.duration[i]), "text": this.duration[i] });
    }
  }

  rejectLeave(item: HelpDeskList) {
    if (item.comments == "" || item.comments == null) {
      Materialize.toast('Please provide comments', 5000, 'red');
    }
    else {
      item.status = 2;
      this.addUpdateTicket(item);
    }
  }

  approveLeave(item: HelpDeskList) {
    if (item.comments == "" || item.comments == null) {
      item.comments = "Approved";
    }
    if (item.duration == 0) {
      Materialize.toast('Please provide durtaion for approval', 5000, 'red')
    }
    else {

      item.status = 1;
      this.addUpdateTicket(item)
    }
  }

  //Get call to get attendence data for the month and year
  GetHelpDeskTickets() {
    this.loaderModal = true;
    this.helpDeskTicketList.length = 0;
    var url = HttpSettings.apiBaseUrl + "v1/approval/help-desk";
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
          model.duration = this.durationCollection[0].id;
          this.helpDeskTicketList.push(model);
        });
        this.rowData = this.helpDeskTicketList;
        this.loaderModal = false;
      },
      error => console.log(error)
      );
  }

  addUpdateTicket(postData, callBack = null) {
    this.loaderModal = true;
    let isApproveOrReject = postData.status == 1 ? "approved" : "rejected";
    let todaysDate = this.getCurrentDateTime();
    let url = HttpSettings.apiBaseUrl + "v1/HelpDesk/for-approve-ticket/" + todaysDate;
    this._httpService.post(url, postData)
      .subscribe(
      data => {
        if (typeof callBack === 'function') {
          callBack();
        }
        this.GetHelpDeskTickets();
        this.loaderModal = false;
        Materialize.toast('Help desk ticket has been ' + isApproveOrReject, 5000, 'green')
      },
      error => console.log(error),
      () => console.log('Post request has Completed')
      );
  }

  getCurrentDateTime() {
    var currentTime = new Date().getTime();
    var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
    var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
    return stamp.toString();
  }

  onDurationChanged(val: any) {
    console.log(val);
  }

}

