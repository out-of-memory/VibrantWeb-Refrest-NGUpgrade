import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { TravelViewModel, TravelRequirements, TravelExtension, TravelMoneyTransactions, UploadDocument, CommentModel } from '../../model/TravelDataModel';
import { CacheService } from '../../services';
import { PassportDetailsModel, VisaDetailsModel, DeliveryUnitDetailsModel, EmergencyContacts } from '../../model/EmployeeViewModel'
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'my-history',
    templateUrl: './travel.view.my.history.template.html',
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
export class ViewMyHistoryComponent implements OnInit {

    travelModel: TravelViewModel = new TravelViewModel();
    loadStatus: boolean = false;

    dropdowns: any;

    totalAmount: number = 0;
    cashAmount: number = 0;
    wireAmount: number = 0;
    currencyId: number = 0;

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    isTravelExtension: boolean = false;
    extensionItem: TravelExtension = new TravelExtension();
    extensionItemHub: any;
    isCloseTravel: boolean = false;

    commentModel: CommentModel = new CommentModel();
    commentHub: any;
    commentSubmit: boolean = false;
    showClosingForm: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService, private _router: Router) {
        this.travelModel = new TravelViewModel();
        this.dropdowns = this._cacheService.getParams('dropdowns');
        this.extensionItem = new TravelExtension();
        this.extensionItemHub = this.extensionItem['hub'];

        this.commentModel = new CommentModel();
        this.commentHub = this.commentModel['hub'];
    }

    ngOnInit() {

        let id: any;

        this.activatedRoute.params.subscribe(
            (param: any) => {
                id = Number(param['id']);
            });

        if (id <= 0)
            this._router.navigate(['my/dashboard']);

        let totalOnstage = 0;
        let url = HttpSettings.apiBaseUrl + "v1/travel/view-request/" + id;
        this.loaderModal = true;
        this.loadStatus = false;


        this._httpService.get(url)
            .subscribe
            (
            data => {
                if (data == null)
                    return false;


                this.travelModel = new TravelViewModel();
                var dataModel = data;
                totalOnstage = 0;

                // this.travelModel.userProfile.id = dataModel.employeeProfile.id;
                // this.travelModel.userProfile.designation = dataModel.employeeProfile.currentDesignation;
                // this.travelModel.userProfile.emailId = dataModel.employeeProfile.email;
                // this.travelModel.userProfile.fullName = dataModel.employeeProfile.firstName + ' ' + dataModel.employeeProfile.lastName;
                // this.travelModel.userProfile.imageURL = "/images/" + dataModel.employeeProfile.imagePath;
                // this.travelModel.userProfile.mobileNumber = dataModel.employeeProfile.mobile;
                // this.travelModel.userProfile.location = dataModel.employeeProfile.olText;

                this.travelModel.id = dataModel.id;
                this.travelModel.travelTitle = dataModel.travelTitle;
                this.travelModel.clientInformation.clientName = dataModel.clientInformation.clientName.clientName;

                // Travel Approval Status.
                if (dataModel.travelStatus != null) {
                    dataModel.travelStatus.forEach(statusdataModel => {

                        if (statusdataModel.status > 0) {
                            totalOnstage = totalOnstage + 1;
                            this.travelModel.onStageStatus = statusdataModel.status - 1;
                            this.travelModel.lastcomments = statusdataModel.comment;
                            if (statusdataModel.status == 4 || statusdataModel.status == 2) {
                                this.showClosingForm = true;
                            }
                        }
                    });
                }
                this.travelModel.onStage = String(totalOnstage + 1);
                this.travelModel.totalStages = +(dataModel.totalStages + 1);

                this.travelModel.travelTo = dataModel.travelDetails.travelTo;
                this.travelModel.travelFrom = dataModel.travelDetails.travelFrom;
                this.travelModel.departure = dataModel.travelDetails.departure;
                this.travelModel.arrival = dataModel.travelDetails.arrival;

                // // Travel Money transactions                
                dataModel.moneyTransactions.forEach(element => {

                    this.travelModel.moneyTransactions.push(this.ValidateMoneyTransactions(element));
                    this.currencyId = element.currencyId;

                });

                this.totalAmount = Number(this.totalAmount.toFixed(2));
                this.cashAmount = Number(this.cashAmount.toFixed(2));
                this.wireAmount = Number(this.wireAmount.toFixed(2));

                // travel Uploaded documents                
                dataModel.uploadedDocuments.forEach(element => {
                    let model = new UploadDocument();
                    this._autoMapperService.Map(element, model);

                    this.travelModel.documentUploads.push(model);
                });

                if (Number(dataModel.travelDetails.travelType) == 2) {
                    // // Employee passort                
                    this._autoMapperService.Map(dataModel.employeePassport, this.travelModel.employeePassport);

                    // Visa Details                
                    dataModel.employeeVisas.forEach(element => {
                        let model = new VisaDetailsModel();

                        this._autoMapperService.Map(element, model);

                        this.travelModel.employeeVisas.push(model);
                    });
                }

                // Employee Emergency contacts
                dataModel.employeeEmergencyContacts.forEach(element => {
                    let model = new EmergencyContacts();

                    this._autoMapperService.Map(element, model);
                    this.travelModel.employeeContacts.push(model);
                });

                // // Empoyee Organization details                
                this.FillOrganizationDetails(dataModel.employeeOrganizationdetails);

                // // Client Information
                this._autoMapperService.Map(dataModel.clientInformation, this.travelModel.clientInformation);

                // Travel Requirements
                this.travelModel.travelTitle = dataModel.travelTitle;
                this._autoMapperService.Map(dataModel.travelDetails, this.travelModel.travelDetails);

                // this._autoMapperService.Map(dataModel.hotelBooking, this.hotelBookingModel);
                // if (Number(this.hotelBookingModel.internetPreferences.amount) == 0 && !this.hotelBookingModel.internetPreferences.paidInternet) {
                //     this.isPaidInternet = true;
                // }

                // dataModel.flightBooking.forEach(element => {

                //     let model = new FlightViewModel();
                //     model.travelId = this.travelModel.id;

                //     this._autoMapperService.Map(element, model);

                //     element.flightDetails.forEach(detail => {

                //         let detailModel = new FlightDetailViewModel();

                //         this._autoMapperService.Map(detail, detailModel);

                //         model.flightDetails.push(detailModel);
                //     });

                //     this.flightDetails.push(model);
                // });

                if (dataModel.travelExtension.length > 0) {
                    this.travelModel.travelExtensionImageUrl = "assets/images/trip-extension-red.svg";
                }

                this.loadStatus = true;
                this.loaderModal = false;
            },
            error => console.log(error));
    }

    FillOrganizationDetails(employeeOrganizationdetails) {
        let model = new DeliveryUnitDetailsModel();
        let orgDetails = employeeOrganizationdetails;

        this.travelModel.organizationDetails.currentDU = this.dropdowns["deliveryUnit"].find(x => x.id === orgDetails.currentDU).text;
        this.travelModel.organizationDetails.deliveryTeam = this.dropdowns["deliveryTeam"].find(x => x.id === orgDetails.deliveryTeam).text;
        this.travelModel.organizationDetails.deliveryUnit = this.dropdowns["deliveryUnit"].find(x => x.id === orgDetails.deliveryUnit).text;
        this.travelModel.organizationDetails.exitProcessManager = orgDetails.exitProcessManager;
        this.travelModel.organizationDetails.resourcePool = this.dropdowns["resourcePool"].find(x => x.id === orgDetails.resourcePool).text;
        this.travelModel.organizationDetails.reportingManager = orgDetails.reportingManager;
    }

    ValidateMoneyTransactions(model) {

        let transactionModel = new TravelMoneyTransactions();
        let amount = 0;

        this._autoMapperService.Map(model, transactionModel);

        if (model.cash > 0) {
            transactionModel.transactionType = "Cash"
            this.cashAmount = this.cashAmount + model.cash;
            transactionModel.amount = model.cash.toFixed(2)
        }
        else {
            transactionModel.transactionType = "Card"
            this.wireAmount = this.wireAmount + model.cardAmount;
            transactionModel.amount = model.cardAmount.toFixed(2);
        }
        this.totalAmount = this.wireAmount + this.cashAmount;
        return transactionModel;
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
        this.isCloseTravel = false;
    }

    SubmitTravelExtension(event) {
        event.preventDefault();

        let url = HttpSettings.apiBaseUrl + 'v1/travel/add-travel-extension';

        this._httpService.post(url, this.extensionItem).subscribe(
            data => {
                if (data == true) {

                    this.travelModel.arrival = this.extensionItem.arrival;
                    Materialize.toast('Travel Extension Saved Successfully', 3000, 'successTost');
                    this.isTravelExtension = false;
                }
            },
            error => console.log(error),
            () => {
            }
        );
    }

    ConfirmClose($event) {
        this.isCloseTravel = true;
    }

    CloseTravelRequest(form) {

        if (!form.mainForm.valid) {
            this.commentSubmit = true;
            return false;
        }

        let url = HttpSettings.apiBaseUrl + 'v1/travel/close-travel/' + this.travelModel.id + '/' + this.commentModel.closingComments;

        this._httpService.get(url).subscribe(
            data => {
                if (data == true) {

                    Materialize.toast('Travel Request Closed Successfully', 3000, 'successTost');
                    window.location.href = "#/my/travel/history";
                }
            },
            error => console.log(error),
            () => {
            }
        );
    }
}


