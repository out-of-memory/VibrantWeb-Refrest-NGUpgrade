import { Component } from '@angular/core';
import { BasicCellC, BasicGrid } from './../../../infrastructure/components/basic-grid';
import { DropdownValue } from './../../../infrastructure/components/DropDownValue';
import { MaterializeDirective } from "angular2-materialize";
import { LoaderComponent } from './../../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";
import { AppraisalListModel } from './../../../models/AppraisalModel';
import { HttpSettings } from "./../../../servicesFolder/http/http.settings"
import { HttpService } from './../../../servicesFolder/http/http.service';
import { AutoMapperService } from './../../../servicesFolder/AutoMapperService';

@Component({
  selector: 'app-appraisal',
  templateUrl: './onetoone.history.component.html',
  providers: [HttpService]
})
export class OneToOneHistoryComponent {

  appraisalList: Array<AppraisalListModel>;
  loaderModal: boolean = false;
  loaderModalMsg: boolean = false;
  loaderModalText: any;
  rowData: Array<any> = [];

  constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService) {
    this.GetAppraisalTickets();
  }

  GetAppraisalTickets() {
    this.loaderModal = true;
    this.rowData = new Array<any>();
    this.appraisalList = new Array<AppraisalListModel>();
    this.appraisalList.length = 0;
    var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-approval-history/8";
    this._httpService.get(url).subscribe(
      data => {
        data.forEach(element => {
          var model = new AppraisalListModel();
          this._autoMapperService.Map(element, model);
          model.designation = element.employeeProfile.currentDesignation;
          model.email = element.employeeProfile.email;
          model.address = element.employeeProfile.ol;
          model.imagePath = "assets/images/" + element.employeeProfile.imagePath;
          model.mobile = element.employeeProfile.mobile;
          model.employeeId = element.employeeProfile.id;
          model.employeeName = element.employeeProfile.firstName + " " + element.employeeProfile.lastName
          this.appraisalList.push(model);
        });
        this.rowData = this.appraisalList;
        this.loaderModal = false;
      });
  }
}
