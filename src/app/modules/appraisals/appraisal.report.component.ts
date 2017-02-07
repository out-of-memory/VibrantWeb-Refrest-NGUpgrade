import { Component } from '@angular/core';
import { HttpService } from '../../servicesFolder/http/http.service';
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as Materialize from "angular2-materialize";
import { AppraisalQuestionModel, AppraisalParameterModel, AppraisalReviewerModel, AppraiseeDetails } from '../../models/AppraisalModel';
import { Location } from '@angular/common';

@Component({
    selector: 'app-appraisal-report',
    templateUrl: './appraisal.report.component.html'
})
export class AppraisalReportComponent {
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;

    constructor(private _httpService: HttpService, private routeParams: ActivatedRoute, private router: Router, private _location: Location) {
        this.GetAppraiseeDetail();
    }

    GetAppraiseeDetail() {
        this.loaderModal = true;
        var self = this;
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/appraisal-report-details";
        this._httpService.get(url).subscribe(
            data => {
                if (data) {
                    debugger;
                }
            },
            error => {
                this.loaderModal = false;
            });
    }

    backClicked() {
        this._location.back();
    }
}
