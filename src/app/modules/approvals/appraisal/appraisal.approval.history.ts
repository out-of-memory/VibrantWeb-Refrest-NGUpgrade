import { Component } from '@angular/core';
import { BasicCellC, BasicGrid } from './../../../infrastructure/components/basic-grid';
import { MaterializeDirective } from "angular2-materialize";
import { LoaderComponent } from './../../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";
import { AppraisalListModel } from './../../../models/AppraisalModel';
import { HttpSettings } from "./../../../servicesFolder/http/http.settings"
import { HttpService } from './../../../servicesFolder/http/http.service';
import { AutoMapperService } from './../../../servicesFolder/AutoMapperService';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  providers: [HttpService]
})
export class AppraisalApprovalHistoryComponent {

  appraisalList: Array<AppraisalListModel>;
  loaderModal: boolean = false;
  loaderModalMsg: boolean = false;
  loaderModalText: any;
  rowData: Array<any> = [];

  constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService) {
    this.GetAppraisalTickets();
  }

  GetAppraisalTickets() {
    
  }
}
