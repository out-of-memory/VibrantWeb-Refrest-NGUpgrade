import { Component} from '@angular/core';
import {SearchBoxViewModel} from '../../../model/SearchBoxViewModel';
import {SearchBox} from '../../../infrastructure/components/search-box'
import {UiForm} from '../../../infrastructure/components/UiForm';
import {pageHeading} from '../../../infrastructure/components/pageHeading';

import { UserService} from '../../../servicesFolder/user/user.service';
import {CacheService} from '../../../servicesFolder/CacheService';
import {EmployeeService } from '../../../servicesFolder/employee/EmployeeService';
import { Router} from '@angular/router';
import {CapitalizePipe} from '../../../infrastructure/pipes/Pipes';
import { BasicCellC, BasicGrid} from '../../../infrastructure/components/basic-grid';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'employee-search',
    providers:[EmployeeService],
    template: `
    <div class="top-section">
        <page-heading heading="Employee Search"></page-heading>
        <div class="employee-form">
            <div class="row p-reset m-bottom0 pos-relative">
                <div class="col s12">
                    <div class="row margin-zero valign-wrapper">
                        <div class="input-field col s9 m7 l5 search-employee">
                            <search-box [form]=searchForm.mainForm (search)="Search($event)">
                                <ui-form #searchForm [controlMetas]="searchBoxViewModelhub" [model]="searchBoxViewModel" [formReadonly]='searchBoxViewModelFormReadonly'
                                    formCss='view-card' controlCss='view-form-info' labelPosition='top'  [errorOnlyOnSubmit]='cardSubmitted'>
                                </ui-form>
                                <!--<div class="col s12 l6 search-employee m-top20 m-bottom20">
                                    <input type="checkbox" id="raisedByMe" [ngModel]="raisedByMe" (ngModelChange)="raisedCheckboxChanged($event)" />
                                    <label for="raisedByMe"> Show Tickets raised only by me</label>
                                </div>-->
                            </search-box>
                        </div>
                        <div class="col s3 m5 l7 list-view-options right-align valign">
                            <div *ngIf="results">
                                <a [class.active]="showList==false" (click)="showList=false;"><i class="fa fa-th" aria-hidden="true" title="Grid View"></i></a>
                                <a [class.active]="showList==true" (click)="showList=true;"><i class="fa fa-list" aria-hidden="true" title="Chart View"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid-container" *ngIf="!showList">
            <div class="row margin-zero">
                <div class="col s12">
                    <div class="dashboard-data-container employee-search">
                        <div class="card white emp-dashboard-data" *ngFor="let e of results">
                            <div class="row m-bottom0">
                                <div class="col s12 blue-bg-section padding15 emp-wrapper right-align">
                                    <div class="emp-img">
                                        <img src="{{'/images/'+e.imagePath+''}}" alt="" class="circle responsive-img">
                                        <h5>
                                            <a [routerLink]="['R-employee-details', {id :e.id}]">{{e.id}}</a>
                                        </h5>
                                    </div>
                                    <div>
                                        <h5>
                                            {{e.id}}
                                        </h5>
                                        <h5>
                                            {{e.firstName}} {{e.middleName}} {{e.lastName}}
                                        </h5>
                                    </div>
                                </div>
                                <div class="col s12 right-align padding15">
                                        <h6>
                                            {{e.currentDesignation}}
                                        </h6>
                                       <h6>
                                       <span class="location" *ngIf="e.seatingLocation"><i class="fa fa-map-marker"></i>{{e.seatingLocation}}, </span>
                                       {{e.olText}}
                                        </h6>
                                        <h6>
                                            {{e.email}}
                                        </h6>
                                        <h6 *ngIf='e.residenceNumber != 0'>
                                            t: {{e.residenceNumber}}
                                        </h6>
                                        <h6>
                                            m: {{e.mobile}}
                                        </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-container p-top0" *ngIf="showList">
            <basic-grid [(source)]='results' gridPagination='bottom' gridOptions='{"colWidths":[10,15,15,15,15,15,15],"widthType":"%","useScroll":true,"isHorizontalScroll":true}'>
                <basic-cell cell='' headerLabel='Emp.Code'>
                    <template let-item='row'>
                        <div>{{item.id}}</div>
                    </template>
                </basic-cell>
                <basic-cell cell='' headerLabel='Name'>
                    <template let-item='row'>
                        <div>{{item["firstName"]}} {{item["middleName"]}} {{item["lastName"]}}</div>
                    </template>
                </basic-cell>
                <basic-cell cell='' headerLabel='Designation'>
                    <template let-item='row'>
                        <div>{{item["currentDesignation"]}}</div>
                    </template>
                </basic-cell>
                <basic-cell cell='' headerLabel='Location'>
                    <template let-item='row'>
                        <div>{{item["olText"]}}</div>
                    </template>
                </basic-cell>
                <basic-cell cell='' headerLabel='Email ID'>
                    <template let-item='row'>
                        <div>{{item["email"]}}</div>
                    </template>
                </basic-cell>
                <basic-cell cell='' headerLabel='Telephone Number'>
                    <template let-item='row'>
                        <div>{{item["residenceNumber"]}}</div>
                    </template>
                </basic-cell>
                <basic-cell cell='' headerLabel='Mobile Number'>
                    <template let-item='row'>
                        <div>{{item["mobile"]}}</div>
                    </template>
                </basic-cell>
            </basic-grid>
        </div>
    </div>
    `,
   // directives: [pageHeading, SearchBox, UiForm, ROUTER_DIRECTIVES, BasicCellC, BasicGrid],
    //pipes: [CapitalizePipe]
})

export class EmployeeSearchComponent {

    searchBoxViewModel: SearchBoxViewModel;
    searchBoxViewModelhub: any;
    searchBoxViewModelFormReadonly: boolean;

    headers: Array<any> = [];
    results: any;
    userProfile: any;
    showList: boolean = false;
    cardSubmitted: boolean = false;

    constructor(private _employeeService: EmployeeService, private userService: UserService, private _cacheService: CacheService, private router: Router) {
        this.searchBoxViewModelFormReadonly = false;
        this.searchBoxViewModel = new SearchBoxViewModel();
        this.searchBoxViewModelhub = this.searchBoxViewModel["hub"];
    }
    ngOnInit() {

        this.userProfile = this._cacheService.getParams("profile");
        if (this.userProfile.role.length != 0) {
           // if (this.userProfile.role[0].roleId != 12 && this.userProfile.role[0].roleId != 27) {
                this.router.navigate(['dashboard']);
            //}
        }
    }

    Search(form: any) {
        if (form.valid) {
            var value = this.searchBoxViewModel.value;
            var isInActiveUser = this.searchBoxViewModel.activeUser;
            this.headers = [];

            this._employeeService.Search(value, isInActiveUser, (data) => {
                this.results = data;
                if (this.results && this.results.length > 0) {
                    var keys = Object.keys(this.results[0]);
                    for (var i = 0; i < keys.length; i++) {
                        this.headers.push(keys[i]);
                    }
                }
                else
                    Materialize.toast("No data available.", 3000, 'errorTost')

            });
        }
        else {
            this.cardSubmitted = true;
        }

    }

}