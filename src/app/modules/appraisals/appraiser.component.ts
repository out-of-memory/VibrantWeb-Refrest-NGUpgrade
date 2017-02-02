import { Component } from '@angular/core';
import { HttpService } from '../../servicesFolder/http/http.service';
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as Materialize from "angular2-materialize";
import { NgModule } from '@angular/core';
import { AppraisalQuestionModel, AppraisalParameterModel, AppraisalReviewerModel, AppraiseeDetails } from '../../models/AppraisalModel';
import { Location } from '@angular/common';

@Component({
    selector: 'app-appraiser',
    templateUrl: './appraiser.component.html',
    styleUrls: ['./appraiser.component.css']
})
export class AppraiserComponent {
    appraiseeAnswerCollection: Array<AppraisalQuestionModel>;
    appraiserParameterCollection: Array<AppraisalParameterModel>;
    appraiseeDetails: AppraiseeDetails;
    averageRating: number = 3;
    isApplied = false;
    isSubmitted: boolean = false;
    appraiserComments: string = '';
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    formSubmit: boolean = false;

    constructor(private _httpService: HttpService, private router: Router, private routeParams: ActivatedRoute, private _location: Location) {
        this.appraiseeDetails = new AppraiseeDetails();
        this.GetAppraiseeDetail();
    }

    GetAppraiseeDetail() {
        this.loaderModal = true;
        var self = this;
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/appraisee-details/" + +(this.routeParams.snapshot.params['id']);
        this._httpService.get(url).subscribe(
            data => {
                if (data) {
                    this.appraiseeDetails.ID = data.empID;
                    this.appraiseeDetails.appraiseeName = data.empName;
                    this.appraiseeDetails.appraiserName = data.appraiserName;
                    this.appraiseeDetails.reviewerName = data.reviewerName;
                    this.GetParametersForAppraiser();
                }
            },
            error => {
                this.loaderModal = false;
            });
    }

    GetParametersForAppraiser() {
        this.appraiseeAnswerCollection = new Array<AppraisalQuestionModel>();
        this.appraiserParameterCollection = new Array<AppraisalParameterModel>();
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-appraiser-parameters/" + this.appraiseeDetails.ID;
        this._httpService.get(url).subscribe(
            data => {
                this.appraiseeAnswerCollection = data.appraiseForm;
                this.appraiserParameterCollection = data.appraiserParameters;
                for (var i = 0; i < this.appraiserParameterCollection.length; i++) {
                    this.appraiserParameterCollection[i].score = 3;
                }
                this.appraiserComments = data.comments;
                this.loaderModal = false;
            },
            error => {
                this.loaderModal = false;
            });
    }

    calculateAppraiserRating() {
        this.averageRating = 0;
        this.appraiserParameterCollection.forEach(element => {
            this.averageRating = this.averageRating + ((+(element.score) * element.weightage) / 100)
        });
        this.averageRating = Math.round(this.averageRating / this.appraiserParameterCollection.length);
    }

    submitAppraiseeForm() {
        this.loaderModal = true;
        var appraisalReviewerModel = new AppraisalReviewerModel();
        appraisalReviewerModel.Parameters = this.appraiserParameterCollection;
        appraisalReviewerModel.AppraiseeId = this.appraiseeDetails.ID;
        appraisalReviewerModel.Comments = this.appraiserComments;
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/save-appraiser-form/0";
        this._httpService.post(url, appraisalReviewerModel).subscribe(
            data => {
                if (data == 4) {
                    Materialize.toast('Your appraisal form has been successfully submitted', 5000, 'green');
                    this._location.back();
                }
                else {
                    Materialize.toast('Issue in submitting appraisal form.Please contact System Administrator', 5000, 'red');
                }
            });
    }

    applyAppraiseeForm(comments) {
        if (comments.valid == true) {
            this.calculateAppraiserRating();
            Materialize.toast('Kindly recheck.Once submitted can not be changed', 5000, 'green')
            this.isApplied = true;
        }
        else {
            this.formSubmit = true;
        }
    }
}
