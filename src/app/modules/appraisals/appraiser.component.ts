
import { Component} from '@angular/core';
import {HttpService} from '../../servicesFolder/http/http.service';
import {AutoMapperService} from '../../servicesFolder/AutoMapperService';
import {UiForm, UiFormControl} from '../../infrastructure/components/UiForm';
import {CacheService} from '../../servicesFolder/CacheService';
import {BasicCellC, BasicGrid} from '../../infrastructure/components/basic-grid';
import {List, Map} from 'immutable';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"
import {LoaderComponent} from  '../../infrastructure/components/loader.component';
import { FileUpload } from  '../../infrastructure/components/file-upload';
import {ActivatedRoute, Router} from '@angular/router';
import { LocationPipe } from '../../infrastructure/pipes/pipes'
import * as Materialize from "angular2-materialize";
import { NgModule }            from '@angular/core';
import {AppraisalQuestionModel, AppraisalParameterModel, AppraisalReviewerModel, AppraiseeDetails} from  '../../models/AppraisalModel';

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

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private router: Router, private routeParams: ActivatedRoute, private _cacheService: CacheService) {
        this.appraiseeDetails = new AppraiseeDetails();
        this.appraiseeDetails.ID = +(this.routeParams.snapshot.params['id']);
        this.appraiseeDetails.appraiseeName = this.routeParams.snapshot.params['name'];
        this.appraiseeDetails.appraiserName = this.routeParams.snapshot.params['appraiser'];
        this.appraiseeDetails.reviewerName = this.routeParams.snapshot.params['reviewer'];
        this.GetParametersForAppraiser();

    }

    GetParametersForAppraiser() {
        this.appraiseeAnswerCollection = new Array<AppraisalQuestionModel>();
        this.appraiserParameterCollection = new Array<AppraisalParameterModel>();
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-appraiser-parameters/" + this.appraiseeDetails.ID;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                this.appraiseeAnswerCollection = data.appraiseForm;
                this.appraiserParameterCollection = data.appraiserParameters;
                this.appraiserComments = data.comments;
            },
            error => console.log(error)
            );
    }

    calculateAppraiserRating() {
        this.averageRating = 0;
        this.appraiserParameterCollection.forEach(element => {
            this.averageRating = this.averageRating + +(element.score)
        });
        this.averageRating = Math.round(this.averageRating / this.appraiserParameterCollection.length);
    }

    SaveAppraiseQuestions() {
        if (this.appraiserComments != "") {
            var appraisalReviewerModel = new AppraisalReviewerModel();
            appraisalReviewerModel.Parameters = this.appraiserParameterCollection;
            appraisalReviewerModel.AppraiseeId = this.appraiseeDetails.ID;
            appraisalReviewerModel.Comments = this.appraiserComments;
            var url = HttpSettings.apiBaseUrl + "v1/appraisal/save-appraiser-form/0";
            this._httpService.post(url, appraisalReviewerModel)
                .subscribe(
                data => {
                    if (data == 4) {
                        Materialize.toast('Your appraisal form has been successfully submitted', 5000, 'green');
                        this.router.navigate(['my/dashboard']);

                    }
                    else {
                        Materialize.toast('Issue in submitting appraisal form.Please contact System Administrator', 5000, 'red');
                    }
                },
                error => console.log(error),
                () => console.log('Post request has Completed')
                );
        }
        else{
             Materialize.toast('Please fill all the required fields', 5000, 'red');
        }
    }


    submitAppraiseeForm() {
        this.SaveAppraiseQuestions();
    }

    applyAppraiseeForm() {
        this.calculateAppraiserRating();
        Materialize.toast('Kindly recheck.Once submitted can not be changed', 5000, 'green')
        this.isApplied = true;
    }
}
