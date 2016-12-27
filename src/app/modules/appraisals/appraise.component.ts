
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
  constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private routeParams: ActivatedRoute, private _cacheService: CacheService) {
    this.GetAppraiseQuestions();
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
      });
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
        },
        error => console.log(error),
        () => console.log('Post request has Completed')
        );
    }

  }

  submitAppraiseeForm() {
    this.SaveAppraiseQuestions();
  }

  ApplyAppraiseeForm(form) {
    if (form.valid) {
      Materialize.toast('Kindly recheck.Once submitted can not be changed', 5000, 'green')
      this.isApplied = true;
    }
    else {
      this.formSubmit = true;
    }
  }
}
