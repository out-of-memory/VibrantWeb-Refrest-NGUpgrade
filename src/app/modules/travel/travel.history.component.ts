import { Component, OnInit } from '@angular/core';
import { ApprovalUserProfile, TravelViewModel, TravelRequirements, TravelExtension } from '../../model/TravelDataModel';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../servicesFolder/http/http.service';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { Router } from '@angular/router';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'travel-history',
    templateUrl: './travel.history.template.html',
    styles:
    [`
        .isGray
        {
            border-bottom: 1px solid #9e9e9e;
        }
        .isRed
        {
            border-bottom: 1px solid red;
        }
        .toDisplay
        {
            visibility:hidden;
        }
        .toDisplayNone
        {
            display:none;
        }
        .toDisplayBlock
        {
            display:block;
        }
    `]
})
export class TravelHistory implements OnInit {
    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService) {
        this.travelsModel = new Array<TravelViewModel>();
        this.extensionItem = new TravelExtension();
        this.extensionItemHub = this.extensionItem['hub'];
    }

    travelsModel: TravelViewModel[];
    isTravelExtension: boolean = false;
    extensionItem: TravelExtension = new TravelExtension();
    extensionComments: string = '';
    loadStatus: boolean = false;
    extensionItemHub: any;

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    ngOnInit() {

        let totalOnstage = 0;
        let url = HttpSettings.apiBaseUrl + "v1/travel/get-mytravel-list";
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
                            if (statusElement.status == 4 || statusElement.status == 2) {
                                model.showForm = true;
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

    OpenTravelExtension(event, model) {
        event.preventDefault();
        this.isTravelExtension = true;
        this.extensionItem.arrival = model.arrival;
        this.extensionItem.departure = model.departure;
        this.extensionItem.travelId = model.id;
        this.extensionItem.travelFrom = model.travelFrom;
        this.extensionItem.travelTo = model.travelTo;
    }

    CloseTravelExtension() {
        this.isTravelExtension = false;
    }

    SubmitTravelExtension(event) {
        event.preventDefault();

        let url = HttpSettings.apiBaseUrl + 'v1/travel/add-travel-extension';

        this._httpService.post(url, this.extensionItem).subscribe(
            data => {
                if (data == true) {
                    var traveldata = this.travelsModel.find(x => Number(x.id) == this.extensionItem.travelId);
                    traveldata.arrival = this.extensionItem.arrival;
                    traveldata.travelExtensionImageUrl = "assets/images/trip-extension-red.svg";

                    this.travelsModel = JSON.parse(JSON.stringify(this.travelsModel));

                    Materialize.toast('Travel Extension Saved Successfully', 3000, 'successTost');
                    this.isTravelExtension = false;
                }

            });
    }
}
