
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
  selector: 'app-appraise',
  templateUrl: './appraise.component.html',
  providers: [HttpService],
})
export class AppraiseComponent {
  appraisalQuestionModel: AppraisalQuestionModel;
  appraisalQuestionCollection: Array<AppraisalQuestionModel>;
  formSubmitted: boolean = true;
  appraiserName: string = "";
  reviewerName: string = "";
  isFormInvalid: boolean = false
  isApplied = false;
  isSubmitted: boolean = false;
  formSubmit: boolean = false;
  loaderModal: boolean = false;
  loaderModalMsg: boolean = false;
  loaderModalText: any;
  isConformationModal: boolean = false;

  constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private routeParams: ActivatedRoute, private _cacheService: CacheService) {
    this.loaderModal = true;
    this.GetAppraiseDetail();
  }

  GetAppraiseDetail() {
    var url = HttpSettings.apiBaseUrl + "v1/appraisal/appraisal-assigned-to";
    this._httpService.get(url).subscribe(
      data => {
        if (data) {
          this.appraiserName = data.appraiserName;
          this.reviewerName = data.reviewerName;
          if (data.status != 0) {
            this.isSubmitted = true;
            this.GetAppraiseForm();
          }
          else {
            this.GetAppraiseQuestions();
          }
        }
      }, error => { this.loaderModal = false; });
  }

  GetAppraiseQuestions() {
    var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-questions/";
    this.appraisalQuestionCollection = new Array<AppraisalQuestionModel>();
    this._httpService.get(url).subscribe(
      data => {
        this.appraiserName = data.appraiser;
        this.reviewerName = data.reviewer;
        data.appraiseeQuestions.forEach(element => {
          var model = new AppraisalQuestionModel();
          this._autoMapperService.Map(element, model);
          model.answer = "";
          this.appraisalQuestionCollection.push(model);
        });
        this.loaderModal = false;
      }, error => { this.loaderModal = false; });
  }

  GetAppraiseForm() {
    var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-form-detail/";
    this.appraisalQuestionCollection = new Array<AppraisalQuestionModel>();
    this._httpService.get(url).subscribe(
      data => {
        data.forEach(element => {
          var model = new AppraisalQuestionModel();
          this._autoMapperService.Map(element, model);
          this.appraisalQuestionCollection.push(model);
        });
        this.loaderModal = false;
      }, error => { this.loaderModal = false; });
  }

  SaveAppraiseQuestions() {
    var appraiseeAnswerCollection = new Array<AppraiseeFormModel>();
    var url = HttpSettings.apiBaseUrl + "v1/appraisal/save-appraisee-form/";
    var keepGoing = true;
    this.appraisalQuestionCollection.forEach(element => {
      if (keepGoing == true) {
        var model = new AppraiseeFormModel();
        this._autoMapperService.Map(element, model);
        if (element.answer.length == 0) {
          this.isFormInvalid = true;
          keepGoing = false;
          Materialize.toast('Please fill all the required fields', 5000, 'red');
        }
        appraiseeAnswerCollection.push(model);
      }
    });
    if (keepGoing == true) {
      this._httpService.post(url, appraiseeAnswerCollection).subscribe(
        data => {
          if (data == true) {
            this.isSubmitted = true;
            Materialize.toast('Your appraisal form has been successfully submitted', 5000, 'green');
            this.formSubmitted = false;
          }
          else {
            Materialize.toast('Issue in submitting appraisal form.Please contact System Administrator', 5000, 'red');
            this.formSubmitted = true;
          }
          this.loaderModal = false;
        },
        error => { this.loaderModal = false; });
    }

  }

  submitAppraiseeForm() {
    this.loaderModal = true;
    this.SaveAppraiseQuestions();
  }

  ApplyAppraiseeForm(form) {
    if (form.valid) {
      Materialize.toast('Kindly recheck.Once submitted can not be changed', 5000, 'green')
      this.isApplied = true;
      this.isSubmitted=true;
    }
    else {
      this.formSubmit = true;
    }
  }
}
