import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { ApprovalUserProfile, TravelViewModel, TravelRequirements, TravelMoneyTransactions, UploadDocument, ClientInformation, HotelBooking, Flight, FlightDetails, FlightCostDetail, FlightViewModel, FlightDetailViewModel, TravelExtension } from '../../model/TravelDataModel';
import { PassportDetailsModel, VisaDetailsModel, DeliveryUnitDetailsModel, EmergencyContacts } from '../../model/EmployeeViewModel'
import { CacheService } from '../../services';
import * as Materialize from "angular2-materialize";
declare var $: any;

@Component({
    selector: 'view-request',
    templateUrl: './travel.view.request.template.html',
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
export class TravelViewRequestComponent implements OnInit {

    travelModel: TravelViewModel = new TravelViewModel();
    loadStatus: boolean = false;

    moneyTransactionsModel: TravelMoneyTransactions;
    moneyTransactionsHub: any;
    todaysDate: any;
    moneyFormSubmitted: boolean = false;

    hotelBookingModel: HotelBooking = new HotelBooking();
    hotelBookingHub: any;
    formHotelBookingSubmitted: boolean = false;

    flightModel: Flight = new Flight();
    flightHub: any;
    flightFormSubmit: boolean = false;
    flightFormTwoSubmit: boolean = false;

    totalAmount: number = 0;
    cashAmount: number = 0;
    wireAmount: number = 0;
    currencyId: number = 0;

    dropdowns: any;
    isFormReadOnly: boolean = true;

    flightDetails: Array<FlightViewModel> = [];
    flightDetailsModelOne: FlightDetails = new FlightDetails();
    flightDetailsHubOne: any;

    flightDetailsModelTwo: FlightDetails = new FlightDetails();
    flightDetailsHubTwo: any;

    flightCostDetail: FlightCostDetail = new FlightCostDetail();
    flightCostDetailHub: any;

    isPaidInternet: boolean = false;
    isApproveModal: boolean = false;
    confirmStatement: string = '';
    isComment: boolean = false;
    actionComments: string = '';

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    loggedInUser: any;
    hideApproval: boolean = false;
    deleteItem: any;
    isDeleteImage: boolean = false;
    extensionDetails: Array<TravelExtension> = [];

    hotelBookingReadOnly: boolean = false;
    flightDetailsReadOnly: boolean = false;
    moneyTransactionsReadOnly: boolean = false;

    traveldropdowns: any;
    expensedropdowns: any;
    dateFormat: any;

    documentArray: Array<any> = [{ "description": "Air Tickets" }, { "description": "Invitation Letter" }, { "description": "Hotel Reservation" }, { "description": "Insurance Details" }, { "description": "Currency Letter" },
    { "description": "Calling Card" }];
    dllApprovalStatus: any = [{ value: '1', label: 'Approved' }, { value: '2', label: 'Rejected' }, { value: '3', label: 'On Hold' }];
    ddlTravelCardType: any = [{ 'id': '1', text: 'Master' }, { 'id': '2', text: 'Visa' }];
    ddlFlightTravelType: any = [{ 'id': '1', text: 'Domestic' }, { 'id': '2', text: 'International' }];
    ddlFlightType: any = [{ 'id': '1', text: 'One Way Trip' }, { 'id': '2', text: 'Round Trip' }];


    constructor(private activatedRoute: ActivatedRoute, private _router: Router, private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.ComponentInitialization();
        this.todaysDate = new Date().toLocaleDateString();
        this.loggedInUser = this._cacheService.getParams('profile');
    }

    ComponentInitialization() {
        this.moneyTransactionsModel = new TravelMoneyTransactions();
        this.moneyTransactionsHub = this.moneyTransactionsModel['hub'];



        this.hotelBookingModel = new HotelBooking();
        this.hotelBookingHub = this.hotelBookingModel['hub'];

        this.flightModel = new Flight();
        this.flightHub = this.flightModel['hub'];

        this.flightDetails = new Array<FlightViewModel>();

        this.flightDetailsModelOne = new FlightDetails();
        this.flightDetailsHubOne = this.flightDetailsModelOne['hub'];

        this.flightDetailsModelTwo = new FlightDetails();
        this.flightDetailsHubTwo = this.flightDetailsModelTwo['hub'];

        this.flightCostDetail = new FlightCostDetail();
        this.flightCostDetailHub = this.flightCostDetail['hub'];

        this.dropdowns = this._cacheService.getParams('dropdowns');
        this.expensedropdowns = this._cacheService.getParams('expenseDropdowns');
        this.traveldropdowns = this._cacheService.getParams('travelDropdowns');

        this.extensionDetails = new Array<TravelExtension>();

        this.EditOrReadOnly();
        this.FillDropdowns();
        this.deleteItem = {};
        this.dateFormat = [{ "format": "mm/dd/yyyy", "today": "", "selectYears": 30 }];
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

        this._httpService.get(url)
            .subscribe
            (
            data => {
                if (data == null)
                    return false;

                this.travelModel = new TravelViewModel();
                var dataModel = data;
                totalOnstage = 0;

                this.travelModel.userProfile.id = dataModel.employeeProfile.id;
                this.travelModel.userProfile.designation = dataModel.employeeProfile.currentDesignation;
                this.travelModel.userProfile.emailId = dataModel.employeeProfile.email;
                this.travelModel.userProfile.fullName = dataModel.employeeProfile.firstName + ' ' + dataModel.employeeProfile.lastName;
                this.travelModel.userProfile.imageURL = "/images/" + dataModel.employeeProfile.imagePath;
                this.travelModel.userProfile.mobileNumber = dataModel.employeeProfile.mobile;
                this.travelModel.userProfile.location = dataModel.employeeProfile.olText;

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

                            if ((dataModel.primaryApproverId == this.loggedInUser.id && this.travelModel.onStageStatus != 2) || totalOnstage == 2) {
                                this.hideApproval = true;
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

                // Travel Money transactions                
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
                    // Employee passort                
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

                // Empoyee Organization details                
                this.FillOrganizationDetails(dataModel.employeeOrganizationdetails);

                // Client Information
                this._autoMapperService.Map(dataModel.clientInformation, this.travelModel.clientInformation);

                // Travel Requirements
                this.travelModel.travelTitle = dataModel.travelTitle;
                this._autoMapperService.Map(dataModel.travelDetails, this.travelModel.travelDetails);
                this.travelModel.travelDetails.meal = dataModel.travelDetails.mealPreference.description;
                this.travelModel.travelDetails.seatlocation = dataModel.travelDetails.seatLocationPreference.description;


                this._autoMapperService.Map(dataModel.hotelBooking, this.hotelBookingModel);
                if (Number(this.hotelBookingModel.internetPreferences.amount) > 0 && this.hotelBookingModel.internetPreferences.paidInternet) {
                    this.isPaidInternet = true;
                }
                else if (!this.hotelBookingModel.internetPreferences.paidInternet && Number(this.hotelBookingModel.internetPreferences.amount) >= 0) {
                    this.isPaidInternet = true;
                }

                dataModel.flightBooking.forEach(element => {

                    let model = new FlightViewModel();
                    model.travelId = this.travelModel.id;

                    this._autoMapperService.Map(element, model);

                    model.flightDetails = new Array<FlightDetailViewModel>();
                    element.flightDetails.forEach(detail => {

                        let detailModel = new FlightDetailViewModel();

                        this._autoMapperService.Map(detail, detailModel);

                        model.flightDetails.push(detailModel);
                    });

                    this.flightDetails.push(model);
                });

                // dataModel.travelExtension.forEach(element => {
                //     let model = new TravelExtension();

                //     this._autoMapperService.Map(element, model);

                //     this.extensionDetails.push(model);
                // });

                for (var i = 0; i < dataModel.travelExtension.length; i++) {

                    let model = new TravelExtension();
                    let element = dataModel.travelExtension[i];

                    this._autoMapperService.Map(element, model);

                    if (i == (dataModel.travelExtension.length - 1)) {
                        model.isChanged = "";
                    }

                    this.extensionDetails.push(model);
                }

                this.SetReadOnlyRights(dataModel);

                this.loadStatus = true;
                this.loaderModal = false;

            });
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



    ReloadMoney(event, form, model: TravelMoneyTransactions) {

        let url = HttpSettings.apiBaseUrl + 'v1/travel/upload-money';

        if (!form.valid) {
            this.moneyFormSubmitted = true;
            return false;
        }

        model.travelId = this.travelModel.id;

        this._httpService.post(url, model).subscribe(
            data => {
                if (data == null)
                    return false;

                Materialize.toast('Money Reloaded Successfully', 3000, 'successTost');
                data.forEach(element => {
                    this.travelModel.moneyTransactions.push(this.ValidateMoneyTransactions(element));
                });

                this.moneyTransactionsModel = new TravelMoneyTransactions();
            });
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

    FileUploaded(item, description) {

        let model = new UploadDocument();
        let url = HttpSettings.apiBaseUrl + 'v1/travel/upload-document';

        model.url = JSON.parse(item).name;
        model.description = description;
        model.travelId = this.travelModel.id;

        this._httpService.post(url, model).subscribe(
            data => {
                if (data)
                    this.travelModel.documentUploads.push(data);
            });
    }

    ConfirmDeleteDocument(event, item) {

        this.isDeleteImage = true;
        this.deleteItem = item;
    }

    RemoveDocument() {


        let url = HttpSettings.apiBaseUrl + "v1/travel/delete-document/" + this.deleteItem.id;

        this._httpService.get(url).subscribe(
            data => {
                if (data == true) {
                    Materialize.toast('Document Deleted Successfully', 3000, 'successTost');
                    this.travelModel.documentUploads.splice(this.travelModel.documentUploads.indexOf(this.deleteItem), 1);
                    this.deleteItem = null;
                    this.isDeleteImage = false;

                }
            });
    }

    AddNewDocument(event) {
        this.documentArray.push({ "description": "Other Document" });
    }

    EditOrReadOnly() {

        $('.edit-card, .view-card').toggleClass('view-card edit-card');
        $('.edit-card-1, .view-card-1').toggleClass('view-card-1 edit-card-1');
        $('.card').removeClass('current');
        $(this).closest('.card').addClass('current');
    }

    SaveHotelBooking(form, model: HotelBooking) {

        let url = HttpSettings.apiBaseUrl + 'v1/travel/save-hotelbooking';

        if (!form.valid) {
            this.formHotelBookingSubmitted = true;
            return false;
        }

        if (!this.isPaidInternet && model.internetPreferences.paidInternet && (Number(model.internetPreferences.amount) > 0 || Number(model.internetPreferences.amount) != NaN)) {
            return false;
        }

        model.travelId = Number(this.travelModel.id);

        this._httpService.post(url, model).subscribe(
            data => {
                if (data != null) {
                    this.hotelBookingModel = data;
                    Materialize.toast('Hotel Booking Saved Successfully', 3000, 'successTost');
                }

            });

        this.EditOrReadOnly();
    }

    FillDropdowns() {
        //  this.expensedropdowns = this._cacheService.getParams('expenseDropdowns');
        // this.traveldropdowns = this._cacheService.getParams('travelDropdowns');

        for (let index = 0; index < this.moneyTransactionsHub.length; index++) {
            let element = this.moneyTransactionsHub[index];
            if (typeof (element.options) === 'string') {
                this.moneyTransactionsHub[index].options = this.expensedropdowns[element.options];
            }
        }

        for (let index = 0; index < this.flightHub.length; index++) {
            let element = this.flightHub[index];
            if (typeof (element.options) === 'string') {
                this.flightHub[index].options = this.traveldropdowns[element.options];
            }
        }

        for (let index = 0; index < this.hotelBookingHub.length; index++) {
            let element = this.hotelBookingHub[index];
            if (typeof (element.options) === 'string') {
                this.hotelBookingHub[index].options = this.traveldropdowns[element.options];
            }
        }

        for (let index = 0; index < this.flightDetailsHubOne.length; index++) {
            let element = this.flightDetailsHubOne[index];
            if (typeof (element.options) === 'string') {
                this.flightDetailsHubOne[index].options = this.traveldropdowns[element.options];
                // this.flightDetailsHubTwo[index].options = traveldropdowns[element.options];
            }
        }
    }

    ResetTransaction() {
        this.moneyTransactionsModel = new TravelMoneyTransactions();
        this.moneyFormSubmitted = false;
    }

    SelectKitchen() {
        let valueToSet: boolean = false;

        if (this.hotelBookingModel.kitchenPreferences.kitchen)
            valueToSet = true;

        this.hotelBookingModel.kitchenPreferences.coffeeMachine = valueToSet;
        this.hotelBookingModel.kitchenPreferences.microwave = valueToSet;
        this.hotelBookingModel.kitchenPreferences.refridgerator = valueToSet;
        this.hotelBookingModel.kitchenPreferences.utensils = valueToSet;
    }

    chekcKitchen() {

        if (this.hotelBookingModel.kitchenPreferences.coffeeMachine || this.hotelBookingModel.kitchenPreferences.microwave || this.hotelBookingModel.kitchenPreferences.refridgerator || this.hotelBookingModel.kitchenPreferences.utensils) {
            this.hotelBookingModel.kitchenPreferences.kitchen = true;
        }
        else { this.hotelBookingModel.kitchenPreferences.kitchen = false; }
    }

    SelectMedia(source) {
        let valueToSet: boolean = false;
        // var source: any = this.hotelBookingModel.mediaPreferences;

        if (this.hotelBookingModel.mediaPreferences.media)
            valueToSet = true;

        // for (let a in source) {
        //     if (typeof (source[a]) == 'boolean') {
        //         source[a] = valueToSet;
        //     }
        // }

        this.hotelBookingModel.mediaPreferences.cableChannels = valueToSet;
        this.hotelBookingModel.mediaPreferences.fax = valueToSet;
        this.hotelBookingModel.mediaPreferences.flatTv = valueToSet;
        this.hotelBookingModel.mediaPreferences.telephone = valueToSet;
    }

    CheckMedia() {
        if (this.hotelBookingModel.mediaPreferences.cableChannels || this.hotelBookingModel.mediaPreferences.fax || this.hotelBookingModel.mediaPreferences.flatTv || this.hotelBookingModel.mediaPreferences.telephone)
            this.hotelBookingModel.mediaPreferences.media = true;
        else
            this.hotelBookingModel.mediaPreferences.media = false;
    }

    SelectServices() {
        let valueToSet: boolean = false;

        if (this.hotelBookingModel.servicesPreferences.services)
            valueToSet = true;

        this.hotelBookingModel.servicesPreferences.atmOnSite = valueToSet;
        this.hotelBookingModel.servicesPreferences.laundry = valueToSet;
        this.hotelBookingModel.servicesPreferences.pickUpDrop = valueToSet;
        this.hotelBookingModel.servicesPreferences.shoppingCenter = valueToSet;
    }

    CheckServices() {
        if (this.hotelBookingModel.servicesPreferences.atmOnSite || this.hotelBookingModel.servicesPreferences.laundry || this.hotelBookingModel.servicesPreferences.pickUpDrop &&
            this.hotelBookingModel.servicesPreferences.shoppingCenter)
            this.hotelBookingModel.servicesPreferences.services = true;
        else
            this.hotelBookingModel.servicesPreferences.services = false;
    }

    SelectGeneral() {
        let valueToSet: boolean = false;

        if (this.hotelBookingModel.generalPreferences.general)
            valueToSet = true;

        this.hotelBookingModel.generalPreferences.hairDryer = valueToSet;
        this.hotelBookingModel.generalPreferences.iron = valueToSet;
        this.hotelBookingModel.generalPreferences.ironFacilites = valueToSet;
    }

    CheckGeneral() {
        if (this.hotelBookingModel.generalPreferences.hairDryer == true || this.hotelBookingModel.generalPreferences.iron == true || this.hotelBookingModel.generalPreferences.ironFacilites == true)
            this.hotelBookingModel.generalPreferences.general = true
        else
            this.hotelBookingModel.generalPreferences.general = false;
    }

    SelectInternet() {
        let valueToSet: boolean = false;

        if (this.hotelBookingModel.internetPreferences.internet)
            valueToSet = true;

        this.hotelBookingModel.internetPreferences.freeWiFi = valueToSet;
        this.hotelBookingModel.internetPreferences.paidInternet = valueToSet;

        this.validatePaidInternet();
    }

    CheckInternet() {
        if (this.hotelBookingModel.internetPreferences.freeWiFi == true || this.hotelBookingModel.internetPreferences.paidInternet == true)
            this.hotelBookingModel.internetPreferences.internet = true;
        else
            this.hotelBookingModel.internetPreferences.internet = false;

        this.validatePaidInternet();
    }

    validatePaidInternet() {
        if (this.hotelBookingModel.internetPreferences.paidInternet && (Number(this.hotelBookingModel.internetPreferences.amount) <= 0 || String(this.hotelBookingModel.internetPreferences.amount) == "" || (Number(this.hotelBookingModel.internetPreferences.amount) == NaN))) {
            this.isPaidInternet = false;
            this.hotelBookingModel.internetPreferences.amount = null;
        }
        else if (!this.hotelBookingModel.internetPreferences.paidInternet && (Number(this.hotelBookingModel.internetPreferences.amount) >= 0)) {
            this.hotelBookingModel.internetPreferences.amount = null;
            this.isPaidInternet = true;
        }
        else {
            this.isPaidInternet = true;
        }
    }

    SaveFlight(flightForm, flightDetailFormOne, flightDetailFormTwo, flightCostForm) {


        let url = HttpSettings.apiBaseUrl + 'v1/travel/save-flight-booking';

        if (Number(this.flightModel.tripType) == 1) {
            if (!flightForm.valid && !flightDetailFormOne.valid && !flightCostForm.valid) {
                this.flightFormSubmit = true;
                return false;
            }
        }
        else {
            // if (!flightForm.mainForm.valid && !flightDetailFormOne.mainForm.valid && !flightDetailFormTwo.mainForm.valid && !flightCostForm.mainForm.valid) {
            if (!flightForm.valid) {
                this.flightFormSubmit = true;
                this.flightFormTwoSubmit = true;
                return false;
            }
        }

        let model = new FlightViewModel();
        model.travelId = this.travelModel.id;

        this._autoMapperService.Map(this.flightModel, model);
        this._autoMapperService.Map(this.flightCostDetail, model);

        let detailModel = new FlightDetails();
        this._autoMapperService.Map(this.flightDetailsModelOne, detailModel);
        model.flightDetails.push(detailModel);

        if (Number(this.flightModel.tripType) == 2) {
            detailModel = new FlightDetails();
            this._autoMapperService.Map(this.flightDetailsModelTwo, detailModel);
            model.flightDetails.push(detailModel);
        }

        this.loaderModal = true;

        this._httpService.post(url, model).subscribe(
            data => {
                Materialize.toast('Flight Details Saved Successfully', 3000, 'successTost');
                this.flightDetails.push(data);
                this.ResetFlightForm();
                this.loaderModal = false;
            },
            error => {
                this.loaderModal = false;
            },
            () => {
                this.loaderModal = false;
            }
        );
    }

    GetFlightDetails() {
        let url = HttpSettings.apiBaseUrl + '';
    }

    ResetFlightForm() {
        this.flightModel = new Flight();
        this.flightDetailsModelOne = new FlightDetails();
        this.flightDetailsModelTwo = new FlightDetails();
        this.flightCostDetail = new FlightCostDetail();
        this.flightFormSubmit = false;
        this.flightFormTwoSubmit = false;
    }

    validateApproveTravel(travelModel) {

        if (this.actionComments == '' && Number(travelModel.submitStatus) != 1) {
            this.isComment = true;
            return false;
        }
        else {
            this.isComment = false;
        }

        switch (Number(travelModel.submitStatus)) {
            case 1: this.confirmStatement = 'to approve';
                break;
            case 2: this.confirmStatement = 'to reject';
                break;
            case 3: this.confirmStatement = 'to put it on hold';
                break;
        }

        this.isApproveModal = true;
    }
    CancelApproval() {
        this.isApproveModal = false;
        this.isDeleteImage = false;
    }
    ResetApproval() {
        this.travelModel.submitStatus = '0';
        this.isComment = false;
        this.actionComments = '';
    }

    ApproveTravel() {

        let url = HttpSettings.apiBaseUrl + 'v1/travel/approve-travel/' + this.travelModel.id;

        if (Number(this.travelModel.submitStatus) == 1) {
            this.loaderModal = true;

            this._httpService.get(url).subscribe(
                data => {
                    if (data == true) {
                        Materialize.toast('Travel Request Approved Successfully', 3000, 'successTost');
                        this.isApproveModal = false;
                        this.travelModel.onStageStatus = 0;

                        // if (Number(this.travelModel.onStage) == 1)
                        this.travelModel.onStage = String(Number(this.travelModel.onStage) + 1);

                        this.hideApproval = true;
                        this.travelModel.lastcomments = "Approved";

                        this.loaderModal = false;

                    }
                },
                error => {
                    this.loaderModal = false;
                }
            );
        }
        else if (Number(this.travelModel.submitStatus) == 2) {
            this.RejectTravel();
        }
        else if (Number(this.travelModel.submitStatus) == 3) {
            this.OnHoldTravel();
        }

    }

    RejectTravel() {

        let url = HttpSettings.apiBaseUrl + 'v1/travel/reject-travel/' + this.travelModel.id + '/' + this.actionComments;
        this.loaderModal = true;
        this._httpService.get(url).subscribe(
            data => {
                if (data == true) {
                    Materialize.toast('Travel Request Is Rejected', 3000, 'successTost');
                    this.isApproveModal = false;
                    this.travelModel.onStageStatus = 1;

                    window.location.href = "#/my/travel/newapproval";
                    this.loaderModal = false;
                    // if (Number(this.travelModel.onStage) == 1)
                    this.travelModel.onStage = String(Number(this.travelModel.onStage) + 1);

                    this.hideApproval = true;
                    this.travelModel.lastcomments = this.actionComments;
                }
            },
            error => {
                this.loaderModal = false;
            }
        );
    }

    OnHoldTravel() {

        let url = HttpSettings.apiBaseUrl + 'v1/travel/onHold-travel/' + this.travelModel.id + '/' + this.actionComments;
        this.loaderModal = true;

        this._httpService.get(url).subscribe(
            data => {
                if (data == true) {
                    Materialize.toast('Travel Request Is On-Hold', 3000, 'successTost');
                    this.isApproveModal = false;
                    this.travelModel.onStageStatus = 2;
                    this.loaderModal = false;

                    if (Number(this.travelModel.onStage) == 1)
                        this.travelModel.onStage = String(Number(this.travelModel.onStage) + 1);

                    this.travelModel.lastcomments = this.actionComments;
                    this.ResetApproval();
                }
            },
            error => {
                this.loaderModal = false;
            }
        );
    }

    UpdateApprovalStatus(detailsModel) {

        for (let i = 0; i < detailsModel.length; i++) {


        }
    }
    SetReadOnlyRights(dataModel: TravelViewModel) {

        let thisUser = this.loggedInUser;

        if (dataModel.financeAdmin == thisUser.id && dataModel.travelAdmin == thisUser.id) {
            this.hotelBookingReadOnly = true;
            this.flightDetailsReadOnly = true;
            this.moneyTransactionsReadOnly = true;
        }
        else if (dataModel.financeAdmin == thisUser.id) {
            this.hotelBookingReadOnly = false;
            this.flightDetailsReadOnly = false;
            this.moneyTransactionsReadOnly = true;
            this.hideApproval = true;

            setTimeout(() => {
                this.EditOrReadOnly();
            }, 1000);
        }
        else if (dataModel.travelAdmin == thisUser.id) {
            this.hotelBookingReadOnly = true;
            this.flightDetailsReadOnly = true;
            this.moneyTransactionsReadOnly = true;
        }
        else if (dataModel.primaryApproverId == thisUser.id) {
            this.hotelBookingReadOnly = false;
            this.flightDetailsReadOnly = false;
            this.moneyTransactionsReadOnly = false;

            setTimeout(() => {
                this.EditOrReadOnly();
            }, 1000);
        }
    }
    SetAgencyName(bookingFrom) {

        if (bookingFrom == 1) {
            this.flightModel.agencyName = this.traveldropdowns.travelBookingAgency.find(x => x.id == bookingFrom).text;
        }
        else { this.flightModel.agencyName = ''; }
    }

}
