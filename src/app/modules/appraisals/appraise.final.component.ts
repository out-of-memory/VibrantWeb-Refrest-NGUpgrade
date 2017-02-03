import { Component } from '@angular/core';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { UiForm, UiFormControl } from '../../infrastructure/components/UiForm';
import { CacheService } from '../../servicesFolder/CacheService';
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { List, Map } from 'immutable';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import { FileUpload } from '../../infrastructure/components/file-upload';
import { ActivatedRoute } from '@angular/router';
import { LocationPipe } from '../../infrastructure/pipes/pipes'
import * as Materialize from "angular2-materialize";
import { AppraisalQuestionModel, AppraiseeFormModel } from '../../models/AppraisalModel';
import { NgModule } from '@angular/core';

@Component({
    selector: 'app-appraise-final',
    templateUrl: './appraise.final.component.html',
    providers: [HttpService],
})
export class AppraiseFinalComponent {
    appraisalQuestionModel: AppraisalQuestionModel;
    appraisalQuestionCollection: Array<AppraisalQuestionModel>;
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    appraiseDetails: any;
    isLoad: boolean = false;
    appraiserComments: any;
    reviewerComments: any;
    onetooneComment: any;
    appraiserParameters:any;
    finalRating:any;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private routeParams: ActivatedRoute, private _cacheService: CacheService) {
        this.loaderModal = true;
        this.GetAppraiseeDetail();
    }

    GetAppraiseeDetail() {
        this.loaderModal = true;
        var self = this;
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/appraisee-details/" + +(this.routeParams.snapshot.params['id']);
        this._httpService.get(url).subscribe(
            data => {
                if (data) {
                    this.appraiseDetails = data;
                    this.isLoad = true;
                    this.GetParametersForAppraiser();
                }
            },
            error => {
                this.loaderModal = false;
            });
    }

    GetParametersForAppraiser() {
        this.appraisalQuestionCollection = new Array<AppraisalQuestionModel>();
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-appraiser-parameters/" + this.appraiseDetails.empID;
        this._httpService.get(url).subscribe(
            data => {
                data.appraiseForm.forEach(element => {
                    var model = new AppraisalQuestionModel();
                    this._autoMapperService.Map(element, model);
                    this.appraisalQuestionCollection.push(model);
                });
                this.appraiserParameters=data.appraiserParameters;
                this.appraiserComments = data.appraiserComments;
                this.reviewerComments = data.reviewerComments;
                this.onetooneComment = data.oneToOneComments;
                this.finalRating=data.finalReviewerRating
                this.loaderModal = false;
            },
            error => {
                this.loaderModal = false;
            });
    }
}
