import { Component, OnInit } from '@angular/core';
import { ApprovalUserProfile, TravelViewModel, TravelRequirements } from '../../model/TravelDataModel';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { Router } from '@angular/router';
import * as Materialize from "angular2-materialize";
import { UpdateMaterializeParams, RestrictValueTo } from '../../infrastructure/directives/materialized.extension.directive';
import { LoaderComponent } from '../../infrastructure/components/loader.component';

@Component({
    selector: 'approval-history',
    templateUrl: './travel.approval.history.template.html'
})

export class TravelApprovalHistory implements OnInit {
    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService) {
        this.travelsModel = new Array<TravelViewModel>();
    }
    travelsModel: TravelViewModel[];
    loadStatus: boolean = false;

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    ngOnInit() {


        let totalOnstage = 0;
        let url = HttpSettings.apiBaseUrl + "v1/travel/approved-travelrequests";
        this.loaderModal = true;

        this._httpService.get(url)
            .subscribe
            (
            data => {
                if (data == null) {
                    this.loaderModal = false;
                    return false;
                }

                this.travelsModel = new Array<TravelViewModel>();

                data.forEach(element => {
                    let model = new TravelViewModel();
                    totalOnstage = 0;

                    model.userProfile.id = element.employeeProfile.id;
                    model.userProfile.designation = element.employeeProfile.currentDesignation;
                    model.userProfile.emailId = element.employeeProfile.email;
                    model.userProfile.fullName = element.employeeProfile.firstName + ' ' + element.employeeProfile.lastName;
                    model.userProfile.imageURL = "/images/" + element.employeeProfile.imagePath;
                    model.userProfile.mobileNumber = element.employeeProfile.mobile;
                    model.userProfile.location = element.employeeProfile.olText;

                    model.id = element.id;
                    model.travelTitle = element.travelTitle;
                    model.clientInformation.clientName = element.clientInformation.clientName.clientName;

                    if (element.travelStatus != null) {
                        element.travelStatus.forEach(statusElement => {
                            if (statusElement.status > 0) {
                                totalOnstage = totalOnstage + 1;
                                model.onStageStatus = statusElement.status - 1;
                                model.lastcomments = statusElement.comment;
                            }
                        });
                    }
                    model.onStage = String(totalOnstage + 1);
                    model.totalStages = element.totalStages + 1;


                    model.travelTo = element.travelDetails.travelTo;
                    model.travelFrom = element.travelDetails.travelFrom;
                    model.departure = element.travelDetails.departure;
                    model.arrival = element.travelDetails.arrival;

                    if (element.travelExtension.length > 0) {
                        model.travelExtensionImageUrl = "assets/images/trip-extension-red.svg";
                    }

                    this.travelsModel.push(model);

                });

                this.loadStatus = true;
                this.loaderModal = false;
            });
    }
}