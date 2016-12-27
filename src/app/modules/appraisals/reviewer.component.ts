
import { Component} from '@angular/core';
import {HttpService} from '../../servicesFolder/http/http.service';
import {UiForm, UiFormControl} from '../../infrastructure/components/UiForm';
import {BasicCellC, BasicGrid} from '../../infrastructure/components/basic-grid';
import {List, Map} from 'immutable';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"
import {LoaderComponent} from  '../../infrastructure/components/loader.component';
import {ActivatedRoute, Router} from '@angular/router';
import * as Materialize from "angular2-materialize";
import {AppraisalQuestionModel, AppraisalParameterModel, AppraisalReviewerModel, AppraiseeDetails} from  '../../models/AppraisalModel';

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
  averageRating: number = 0;
  isApplied = false;
  appraiseAverageRating: number = 0;
  finalAverageRating: number = 0;
  appraiserComments: string = '';
  reviewerComments: string = '';

  constructor(private _httpService: HttpService, private routeParams: ActivatedRoute, private router: Router) {
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
    this.reviewerParameterCollection = new Array<AppraisalParameterModel>();

    var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-reviewer-parameters/" + this.appraiseeDetails.ID;
    this._httpService.get(url)
      .subscribe
      (
      data => {
        this.reviewerParameterCollection = data.appraiserParameters;
        this.appraiseeAnswerCollection = data.appraiseForm;
        this.appraiserParameterCollection = data.appraiserParameters;
        this.appraiserComments = data.comments;
        this.calculateAppraiserRating();
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
      this.averageRating = this.averageRating + +(element.score)
    });
    this.averageRating = Math.round(this.averageRating / this.appraiserParameterCollection.length);
    this.finalAverageRating = this.averageRating;
  }

  calculateAppraiserRating() {
    this.appraiseAverageRating = 0;
    this.appraiserParameterCollection.forEach(element => {
      this.appraiseAverageRating = this.appraiseAverageRating + (element.score)
    });
    this.appraiseAverageRating = Math.round(this.appraiseAverageRating / this.appraiserParameterCollection.length);
  }

}
