import { Component, OnInit } from '@angular/core';
import { ApprovalUserProfile, TravelViewModel, TravelRequirements } from '../../model/TravelDataModel';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../servicesFolder/http/http.service';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { Router } from '@angular/router';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';


@Component({
    selector: 'travel-new-request',
    templateUrl: './travel.new.approval.template.html'
})

export class TravelNewRequestComponent {

    travelsModel: TravelViewModel[];

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService) {
        this.Component_Initialization();
        this.GetNewTravelRequests();
    }

    Component_Initialization() {
        this.travelsModel = new Array<TravelViewModel>();
    }

    GetNewTravelRequests() {

        let totalOnstage = 0;
        let url = HttpSettings.apiBaseUrl + "v1/travel/get-travelapprovals";
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

                this.loaderModal = false;
            });
    }

}