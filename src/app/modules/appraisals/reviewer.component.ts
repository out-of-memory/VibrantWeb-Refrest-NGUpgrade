
import { Component } from '@angular/core';
import { HttpService } from '../../servicesFolder/http/http.service';
import { UiForm, UiFormControl } from '../../infrastructure/components/UiForm';
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { List, Map } from 'immutable';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as Materialize from "angular2-materialize";
import { AppraisalQuestionModel, AppraisalParameterModel, AppraisalReviewerModel, AppraiseeDetails } from '../../models/AppraisalModel';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent {
  appraiseeDetails: AppraiseeDetails;
  appraiseeAnswerCollection: Array<AppraisalQuestionModel>;
  appraiserParameterCollection: Array<AppraisalParameterModel>;
  reviewerParameterCollection: Array<AppraisalParameterModel>;
  averageRating: number = 3;
  isApplied = false;
  appraiseAverageRating: number = 0;
  finalAverageRating: number = 3;
  appraiserComments: string = '';
  reviewerComments: string = '';
  loaderModal: boolean = false;
  loaderModalMsg: boolean = false;
  loaderModalText: any;
  isConformationModal: boolean = false;

  constructor(private _httpService: HttpService, private routeParams: ActivatedRoute, private router: Router) {
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
    this.reviewerParameterCollection = new Array<AppraisalParameterModel>();

    var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-reviewer-parameters/" + this.appraiseeDetails.ID;
    this._httpService.get(url).subscribe(
      data => {
        this.reviewerParameterCollection = data.appraiserParameters;
        this.appraiseeAnswerCollection = data.appraiseForm;
        this.appraiserParameterCollection = data.appraiserParameters;        
        for (var i = 0; i < this.appraiserParameterCollection.length; i++) {
          this.appraiserParameterCollection[i].appraiserScore = data.appraiserParameters[i].score;
        }
        this.appraiserComments = data.comments;
        this.calculateAppraiserRating();
        this.calculateReviewerRating();
      },
      error => console.log(error)
    );
  }

  SaveReviewerQuestions() {
    if (this.reviewerComments != "") {
      var appraisalReviewerModel = new AppraisalReviewerModel();
      appraisalReviewerModel.Parameters = this.appraiserParameterCollection;
      appraisalReviewerModel.AppraiseeId = this.appraiseeDetails.ID;
      appraisalReviewerModel.Comments = this.reviewerComments;
      var url = HttpSettings.apiBaseUrl + "v1/appraisal/save-appraiser-form/" + this.finalAverageRating;
      this._httpService.post(url, appraisalReviewerModel)
        .subscribe(
        data => {
          if (data == 4) {
            Materialize.toast('Your appraisal form has been successfully submitted', 5000, 'green');
            this.router.navigateByUrl('/my/dashboard');
          }
          else {
            Materialize.toast('Issue in submitting appraisal form.Please contact System Administrator', 5000, 'red');
          }
        },
        error => console.log(error),
        () => console.log('Post request has Completed')
        );
    }
    else {
      Materialize.toast('Please fill all the required fields', 5000, 'red');
    }
  }


  submitReveiwerForm() {
    this.SaveReviewerQuestions();
  }

  applyReveiwerForm() {
    this.calculateReviewerRating();
    Materialize.toast('Kindly recheck.Once submitted can not be changed', 5000, 'green')
    this.isApplied = true;
  }

  calculateReviewerRating() {
    this.averageRating = 0;
    this.appraiserParameterCollection.forEach(element => {
      this.averageRating = this.averageRating + ((+(element.score) * element.weightage) / 100)
    });
    this.averageRating = Math.round(this.averageRating / this.appraiserParameterCollection.length);
    this.finalAverageRating = this.averageRating;
  }

  calculateAppraiserRating() {
    this.appraiseAverageRating = 0;
    this.appraiserParameterCollection.forEach(element => {
      this.appraiseAverageRating = this.appraiseAverageRating + ((+(element.appraiserScore) * element.weightage) / 100)
    });
    this.appraiseAverageRating = Math.round(this.appraiseAverageRating / this.appraiserParameterCollection.length);
  }

}
