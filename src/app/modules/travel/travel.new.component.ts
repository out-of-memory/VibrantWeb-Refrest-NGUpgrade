import { Component, OnInit } from '@angular/core';
import { ClientInformation, TravelRequirements, TravelViewModel } from '../../model/TravelDataModel';
import { PassportDetailsModel, VisaDetailsModel, DeliveryUnitDetailsModel, EmergencyContacts } from '../../model/EmployeeViewModel'
import { RouterModule } from '@angular/router';
import { HttpService } from '../../servicesFolder/http/http.service';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { Router } from '@angular/router';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { CacheService } from '../../servicesFolder/CacheService';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'app-travel',
    templateUrl: './travel.new.template.html'
})
    
export class TravelNewComponent implements OnInit {

    clientInformationHub: any;
    clientInformationModel: ClientInformation;

    travelRequirementsModel: TravelRequirements;
    travelRequirementsHub: any;

    passportModel: PassportDetailsModel;
    passportHub: any;
    passportSubmitted: boolean = false;

    visaModel: VisaDetailsModel;
    visaDetails: VisaDetailsModel[];
    visaHub: any;
    visaDetailsHeader: string = '';
    visaSubmit: boolean = false;

    organizationDetails: DeliveryUnitDetailsModel;

    emergencyContactsModel: EmergencyContacts;
    emergencyContacts: EmergencyContacts[];
    emergerncyContactsHub: any;
    emergencyContactsheader: string = '';
    emergencyContactsSubmit: boolean = false;

    expensedropdowns: any;
    dropdowns: any;
    profileData: any;

    formSubmitted: boolean = false;
    isAddEmergencyContacts: boolean = false;
    addVisaDetails: boolean = false;
    pageLoaderModal: boolean = false;

    emergencyCardLoader: boolean = false;
    emergencyModalText: any;
    emergencyCardShow: boolean = false;
    isEmergencyDeleteCard: boolean = false;
    emergencyCardConfirmation: boolean = false;

    visaCardLoader: boolean = false;
    visaCardConfirmation: boolean = false;
    visaModalText: any;
    visaCardShow: boolean = false;
    loading: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.pageLoaderModal = true;

        this.InitializeComponent();
        this.FillDropdowns();
        this.FillOrganizationDetails();
        this.FillEmergencyContacts();
        this.FillVisaDetails();
        this.FillPassportDetails();

        this.pageLoaderModal = false;
        this.loading = true;
    }

    InitializeComponent() {
        this.clientInformationModel = new ClientInformation();
        this.clientInformationHub = this.clientInformationModel['hub'];

        this.travelRequirementsModel = new TravelRequirements();
        this.travelRequirementsHub = this.travelRequirementsModel['hub'];

        this.passportModel = new PassportDetailsModel();
        this.passportHub = this.passportModel['hub'];

        this.visaModel = new VisaDetailsModel();
        this.visaHub = this.visaModel['hub'];

        this.emergencyContactsModel = new EmergencyContacts();
        this.emergencyContacts = new Array<EmergencyContacts>();
        this.emergerncyContactsHub = this.emergencyContactsModel['hub'];

        this.expensedropdowns = this._cacheService.getParams('expenseDropdowns');
        this.dropdowns = this._cacheService.getParams('dropdowns');
        this.profileData = this._cacheService.getParams('profile');
    }

    ngOnInit() { }

    FillDropdowns() {

        for (let index = 0; index < this.clientInformationHub.length; index++) {
            let element = this.clientInformationHub[index];
            if (typeof (element.options) === 'string') {
                this.clientInformationHub[index].options = this.expensedropdowns[element.options];
            }
        }
        for (let index = 0; index < this.visaHub.length; index++) {
            let element = this.visaHub[index];
            if (typeof (element.options) === 'string') {
                this.visaHub[index].options = this.dropdowns[element.options];
            }
        } for (let index = 0; index < this.emergerncyContactsHub.length; index++) {
            let element = this.emergerncyContactsHub[index];
            if (typeof (element.options) === 'string') {
                this.emergerncyContactsHub[index].options = this.dropdowns[element.options];
            }
        }
    }

    SaveTravel(event, clientForm, travelRequirementForm, passportForm, clientInformationModel: ClientInformation, travelRequirements: TravelRequirements, passportModel) {
        event.preventDefault();

        let model = new TravelViewModel();

        if ((this.isAddEmergencyContacts || this.addVisaDetails)) {
            Materialize.toast('Please save all the cards', 3000, 'errorTost');
            return false;
        }

        if (Number(travelRequirements.travelType) == 1) {
            this.validateEmergencyContacts();

            if (this.isAddEmergencyContacts) {
                Materialize.toast('Please save all the cards', 3000, 'errorTost');
                return false;
            }

            if (!clientForm.mainForm.valid || !travelRequirementForm.mainForm.valid) {
                this.formSubmitted = true;
                return false;
            }

        } else {
            this.validateVisaDetails();
            this.validateEmergencyContacts();

            if (!clientForm.mainForm.valid || !travelRequirementForm.mainForm.valid || !passportForm.mainForm.valid) {
                this.formSubmitted = true;
                this.passportSubmitted = true;
                return false;
            }
        }

        let url = HttpSettings.apiBaseUrl + 'v1/travel/save-update-travel';

        let travelRequirementsModel = new TravelRequirements();

        this._autoMapperService.Map(clientInformationModel, model.clientInformation);

        model.travelTitle = travelRequirements.travelTitle;
        this._autoMapperService.Map(travelRequirements, model.travelDetails);

        model.employeePassport = passportModel;
        model.primaryApproverId = this.organizationDetails.exitProcessManager;
        this.pageLoaderModal = true;

        this._httpService.post(url, model).subscribe(
            data => {
                this.pageLoaderModal = false;

                if (Number(travelRequirements.travelType) == 1) {
                    this.passportModel = passportModel;
                    this.upadatePassportCache(passportModel);
                }
                this.ResetForm();
                Materialize.toast('Travel request saved successfully.', 3000, 'successTost');
            },
            error => {
                this.pageLoaderModal = false;
            },
            () => {
            }
        );
    }

    validateVisaDetails() {
        if (this.visaDetails.length == 0) {
            Materialize.toast('Please add Visa Details', 3000, 'errorTost');
            return false;
        }
    }

    validateEmergencyContacts() {
        if (this.emergencyContacts.length == 0) {
            Materialize.toast('Please add Emergency Contacts', 3000, 'errorTost');
            return false;
        }
    }

    upadatePassportCache(passportModel) {

        let passportData = this.profileData['employeePassport'];

        passportData[0] = JSON.parse(JSON.stringify(passportModel));

        this._cacheService.setParams("profile", this.profileData);
    }

    FillOrganizationDetails() {
        this.organizationDetails = new DeliveryUnitDetailsModel();
        let orgDetails = this.profileData["employeeOrganizationdetails"];

        this.organizationDetails.currentDU = this.dropdowns["deliveryUnit"].find(x => x.id === orgDetails.currentDU).text;
        this.organizationDetails.deliveryTeam = this.dropdowns["deliveryTeam"].find(x => x.id === orgDetails.deliveryTeam).text;
        this.organizationDetails.deliveryUnit = this.dropdowns["deliveryUnit"].find(x => x.id === orgDetails.deliveryUnit).text;
        this.organizationDetails.exitProcessManager = orgDetails.exitProcessManager;
        this.organizationDetails.resourcePool = this.dropdowns["resourcePool"].find(x => x.id === orgDetails.resourcePool).text;
        this.organizationDetails.reportingManager = orgDetails.reportingManager;
    }

    FillPassportDetails() {
        this.passportModel = new PassportDetailsModel();
        let myPassport = this.profileData["employeePassport"][0];

        if (myPassport == undefined || myPassport == null)
            return false;
        this._autoMapperService.Map(myPassport, this.passportModel);
    }

    FillEmergencyContacts() {
        this.emergencyContacts = new Array<EmergencyContacts>();
        let myEmergencyContacts = this.profileData['emergencyContacts'];
        let relation = this.dropdowns['relation'];

        myEmergencyContacts.forEach(element => {
            let model = new EmergencyContacts();

            this._autoMapperService.Map(element, model);
            this.emergencyContacts.push(model);
        });
    }

    FillVisaDetails() {
        this.visaDetails = new Array<VisaDetailsModel>();
        let visas = this.profileData['visas'];

        visas.forEach(element => {
            let model = new VisaDetailsModel();
            this._autoMapperService.Map(element, model);

            this.visaDetails.push(model);
        });


    }

    GridAddNewContact(event, model) {
        this.emergencyContactsModel = model = new EmergencyContacts();
        this.emergencyContactsheader = 'Add Emergency Contact';
        this.isAddEmergencyContacts = true;
        this.emergencyContactsSubmit = false;
    }

    EditGridData(event, model) {
        this.isAddEmergencyContacts = true;
        this.emergencyContactsheader = 'Edit Emergency Contact';
        this.emergencyContactsModel = model;
    }

    CancelEmergencyEdit(event, model: EmergencyContacts) {

        this.emergencyContacts = new Array<EmergencyContacts>();
        this.emergencyContacts = JSON.parse(JSON.stringify(this.profileData['emergencyContacts']));

        this.emergencyContactsModel = new EmergencyContacts();
        this.isAddEmergencyContacts = false;
        this.emergencyContactsSubmit = false;

        this.emergencyCardConfirmation = false;
        this.emergencyCardLoader = false;
    }

    ConfirmEmergencyEdit(event, form, model) {
        this.emergencyCardLoader = true;

        if (form.pristine && model.id != "") {
            Materialize.toast('No change in data.', 3000, 'successTost');
            this.isAddEmergencyContacts = false;
            this.emergencyCardLoader = false;
            return false;
        }
        if (!form.valid) {
            this.emergencyContactsSubmit = true;
            this.emergencyCardLoader = false;
            return false;
        }

        let url = HttpSettings.apiBaseUrl + 'v1/travel/save-update-emergencycontacts';

        this._httpService.post(url, model).subscribe(
            data => {
                this.emergencyModalText = 'Successfully updated record';
                this.emergencyCardShow = true;

                setTimeout(() => {
                    this.updateCacheData(data, "emergencyContacts");
                    this.emergencyModalText = '';
                    this.emergencyCardShow = false;
                    this.emergencyCardLoader = false;
                }, 2000);

            },
            error => {
                this.emergencyModalText = 'Error occurred !';
                this.emergencyCardShow = true;

                setTimeout(() => {
                    this.emergencyModalText = '';
                    this.emergencyCardShow = false;
                    this.emergencyCardLoader = false;
                }, 2000);

            },
            () => {
            }
        );
    }

    DeleteContact(event, model) {

        this.emergencyCardConfirmation = true;
        this.emergencyCardLoader = true;

        this.EditGridData(event, model);
    }

    DeleteEmergencyContactData(model) {

        this.emergencyCardLoader = true;
        this.emergencyCardConfirmation = false;
        let url = HttpSettings.apiBaseUrl + 'v1/travel/delete-emergencycontacts';

        this._httpService.post(url, model).subscribe(
            data => {
                this.isAddEmergencyContacts = false;
                if (data == true) {

                    this.profileData["emergencyContacts"].splice(this.emergencyContacts.indexOf(model), 1);;
                    this.emergencyContacts.splice(this.emergencyContacts.indexOf(model), 1);
                    let collection = this.emergencyContacts;
                    this.emergencyContacts = Array<EmergencyContacts>();
                    this.emergencyContacts = collection;
                    this.isAddEmergencyContacts = false;

                    setTimeout(() => {
                        this.emergencyCardLoader = false;
                    }, 2000);

                    this._cacheService.setParams("profile", this.profileData);
                }
            });
    }

    updateCacheData(model, moduleType) {

        this.isAddEmergencyContacts = false;
        let data = this.profileData[moduleType];
        var a = data.find(x => x.id == model.id);

        if (a == undefined) {
            this.emergencyContacts.push(model);
            let collection = this.emergencyContacts;
            this.emergencyContacts = Array<EmergencyContacts>();
            this.emergencyContacts = collection;

            data.push(model);
        }
        else {
            var id = data.indexOf(a);
            data[id] = model;
        }
        this._cacheService.setParams("profile", this.profileData);
    }

    GridAddNewVisa(event, model) {
        this.visaModel = model = new VisaDetailsModel();
        this.visaDetailsHeader = "Add Visa Details";
        this.addVisaDetails = true;
    }

    CancelVisaEdit(event, model) {

        this.visaModel = new VisaDetailsModel();
        this.visaDetails = JSON.parse(JSON.stringify(this.profileData['visas']));
        this.addVisaDetails = false;
        this.visaSubmit = false;

        this.visaCardConfirmation = false;
        this.visaCardLoader = false;
    }

    ConfirmVisaEdit(event, form, model) {

        this.visaCardLoader = true;

        if (form.pristine && model.id != "") {
            Materialize.toast('No change in data.', 3000, 'successTost');
            this.addVisaDetails = false;
            this.visaCardLoader = false;
            return false;
        }
        if (!form.valid) {
            this.visaSubmit = true;
            this.visaCardLoader = false;
            return false;
        }

        let url = HttpSettings.apiBaseUrl + 'v1/travel/save-update-visadetails';

        this._httpService.post(url, model).subscribe(
            data => {
                this.visaModalText = 'Successfully updated record';
                this.visaCardShow = true;

                setTimeout(() => {
                    this.updateVisaCacheData(data, "visas");
                    this.visaModalText = '';
                    this.visaCardShow = false;
                    this.visaCardLoader = false;
                }, 2000);
            },
            error => {
                this.visaModalText = 'Error occurred !';
                this.visaCardShow = true;

                setTimeout(() => {
                    this.visaModalText = '';
                    this.visaCardShow = false;
                    this.visaCardLoader = false;
                }, 2000);
            },
            () => {
            }
        );
    }

    updateVisaCacheData(model, moduleType) {

        this.addVisaDetails = false;
        let data = this.profileData[moduleType];
        var a = data.find(x => x.id == model.id);

        if (a == undefined) {
            this.visaDetails.push(model);
            let collection = this.visaDetails;
            this.visaDetails = Array<VisaDetailsModel>();
            this.visaDetails = collection;

            data.push(model);
        }
        else {
            var id = data.indexOf(a);
            data[id] = model;
        }
        this._cacheService.setParams("profile", this.profileData);
    }

    EditVisa(event, model) {
        this.visaDetailsHeader = 'Edit Emergency Contact';
        this.visaModel = model;
        this.addVisaDetails = true;
    }

    DeleteVisa(event, model) {

        this.visaCardConfirmation = true;
        this.visaCardLoader = true;

        this.EditVisa(event, model);
    }

    DeleteVisaData(model) {

        this.visaCardLoader = true;
        let url = HttpSettings.apiBaseUrl + 'v1/travel/delete-visa';
        this.visaCardConfirmation = false;

        this._httpService.post(url, model).subscribe(
            data => {
                this.addVisaDetails = false;
                if (data == true) {

                    this.profileData["visas"].splice(this.visaDetails.indexOf(model), 1);;
                    this.visaDetails.splice(this.visaDetails.indexOf(model), 1);
                    let collection = this.visaDetails;
                    this.visaDetails = Array<VisaDetailsModel>();
                    this.visaDetails = collection;
                    this.addVisaDetails = false;

                    setTimeout(() => {
                        this.visaCardLoader = false;
                    }, 2000);

                    this._cacheService.setParams("profile", this.profileData);
                }
            });
    }

    ResetForm() {
        this.clientInformationModel = new ClientInformation();
        this.travelRequirementsModel = new TravelRequirements();
        this.formSubmitted = false;
        this.passportSubmitted = false;
    }

}
