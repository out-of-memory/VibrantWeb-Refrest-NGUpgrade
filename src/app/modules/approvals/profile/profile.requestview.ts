import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Repeater } from '../../../infrastructure/components/repeater';
import { GridCard } from '../../../infrastructure/components/GridCard';
import { UiGirdForm } from '../../../infrastructure/components/UiGridForm';
import { Card } from '../../../infrastructure/components/Card';
import { UiForm, UiFormControl } from '../../../infrastructure/components/UiForm';
import { SearchBoxViewModel } from '../../../model/SearchBoxViewModel';
import { Employee } from '../../../model/EmployeeViewModel';
import { ShortProfileComponent } from '../../../modules/employee/short-profile.component';
import { CardModel, GridCardModel } from '../../../models/CardModels'
import { MenuService, HttpService, EmployeeService, CacheService, UserService, AutoMapperService } from '../../../services';
import {
    PersonalDetailsModel, Address, Education, EmergencyContacts, MedicalHistoryModel, CertificationDetailsModel,
    DependentsModel, VisaDetailsModel, PassportDetailsModel, GapExperienceModel, SkillsModel,
    ProjectDetailsModel, DeclarationDetailsModel, ExperienceDetailsModel, ApprovalStatus
} from '../../../model/EmployeeViewModel'
import { MaterializeDirective } from "angular2-materialize";
import { DropdownValue } from '../../../infrastructure/components/DropDownValue';
import { HttpSettings } from "../../../servicesFolder/http/http.settings";
import { Utility } from '../../../Helper/Utility';
import { LoaderComponent } from '../../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'employeedetails-requestview',
    templateUrl: './profile.requestview.html'
})
export class EmployeeDetailsRequestComponent {
    EmployeeData: any;
    approvalStatus: ApprovalStatus;
    statushub: any;
    cardSubmitted: boolean = false;

    personCard: CardModel<PersonalDetailsModel>;
    addressCard: CardModel<Address>;
    educationCard: GridCardModel<Education>;
    emergencyCard: GridCardModel<EmergencyContacts>;
    medicalCard: CardModel<MedicalHistoryModel>;
    passportCard: CardModel<PassportDetailsModel>;
    certificationCard: GridCardModel<CertificationDetailsModel>;
    dependentCard: GridCardModel<DependentsModel>;
    gapCard: GridCardModel<GapExperienceModel>;
    visaCard: GridCardModel<VisaDetailsModel>;
    skillCard: GridCardModel<SkillsModel>;
    experienceCard: GridCardModel<ExperienceDetailsModel>;
    declarationCard: GridCardModel<DeclarationDetailsModel>;

    loaderModalMsg: boolean = false;
    loaderModalText: any;
    loaderModal: boolean = false;
    isConformationModal: boolean = false;

    cards: Array<any>;
    id: any;
    dropdowncard: Array<any> = [];
    employee: Employee;
    emphub: any;
    results: Array<any> = [];
    empInfo: any;
    action: Array<any> = [];
    responseData: any;
    userProfile: any;

    constructor(private _employeeService: EmployeeService, private _autoMapperService: AutoMapperService, private _httpService: HttpService, private _cacheService: CacheService,
        private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(
            (param: any) => {
                this.id = param['id'];
            });
        this.GetData(this.id);
        this.employee = new Employee();
        this.emphub = this.employee["hub"];
        this.approvalStatus = new ApprovalStatus();
        this.statushub = this.approvalStatus["hub"];
        // this.FillStatus();

        this.cards = [
            { name: "Personal Details", moduleCode: "1", type: PersonalDetailsModel, dropDown: true, isArray: false, cardType: "CardModel" },
            { name: "Contact Details", moduleCode: "2", type: Address, dropDown: false, isArray: true, cardType: "Grid" },
            { name: "Emergency Contact", moduleCode: "5", type: EmergencyContacts, dropDown: true, isArray: true, cardType: "Grid" },
            { name: "Education Details", moduleCode: "3", type: Education, dropDown: true, isArray: true, cardType: "Grid" },
            { name: "Passport Details", moduleCode: "4", type: PassportDetailsModel, dropDown: false, isArray: false, cardType: "CardModel" },
            { name: "Certification Details", moduleCode: "6", type: CertificationDetailsModel, dropDown: true, isArray: true, cardType: "Grid" },
            { name: "Dependent Details", moduleCode: "17", type: DependentsModel, dropDown: true, isArray: true, cardType: "Grid" },
            { name: "Visa Details", moduleCode: "8", type: VisaDetailsModel, dropDown: true, isArray: true, cardType: "Grid" },
            { name: "Medical History", moduleCode: "10", type: MedicalHistoryModel, dropDown: false, isArray: false, cardType: "CardModel" },
            { name: "Experience Details", moduleCode: "7", type: ExperienceDetailsModel, dropDown: false, isArray: true, cardType: "Grid" },
            { name: "Declaration", moduleCode: "18", type: DeclarationDetailsModel, dropDown: true, isArray: true, cardType: "Grid" },
            { name: "Skills", moduleCode: "16", type: SkillsModel, dropDown: true, isArray: true, cardType: "Grid" }
        ]

        //this.InitializeCards(this.EmployeeData["models"], cards);
        //this.InitializeCards(this.EmployeeData, cards);
    }

    ngOnInit() {
        this.userProfile = this._cacheService.getParams("profile");
        if (this.userProfile.role.length != 0) {
            if (this.userProfile.role[0].roleId != 12) {
                this.router.navigateByUrl('/my/dashboard');
            }
        }
    }

    setCard<T>(data: any, type: { new (): T }, needDropDown, isArray: any, cardType, cardname, modulecode) {
        data.oldModel = JSON.parse(data.oldModel);
        data.newModel = JSON.parse(data.newModel);
        let changeval: Array<any> = [];
        //let cssClass="";
        changeval = this.ChangedValues(data.oldModel, data.newModel);
        let card: any;
        if (cardname == "Medical History") {
            card = new CardModel<T>(data.CardID, type, isArray, this._autoMapperService, data.oldModel[0], true, null);
        } else {
            card = new CardModel<T>(data.CardID, type, isArray, this._autoMapperService, data.oldModel, true, null);
        }
        card.newModelHub = Utility.clone(card.hub);
        if (changeval.length != 0) {
            for (var i = 0; i < changeval.length; i++) {

                if (changeval[i].object != "") {
                    if (changeval[i].object.IsDeleted == true) {
                        // this.ApplyCSSForDelete(changeval, card);
                    }
                    else if (changeval[i].object.ID == 0 && cardType == "CardModel") {
                        this.ApplyCSSForADD(changeval, card);
                    }
                    else {
                        this.ApplyCSSForUpdate(changeval, card, cardType);
                    }
                }
                else {
                    this.ApplyCSSForUpdate(changeval, card, cardType);
                }
            }
        }
        let newData = new type;
        if (cardType == "CardModel") {
            if (cardname == "Medical History" || cardname == "Passport Details") {
                this._autoMapperService.Map(data.newModel[0], newData);
                if (data.oldModel.length > 0) {
                    this._autoMapperService.Map(data.oldModel[0], card.model);
                }
            } else {
                this._autoMapperService.Map(data.newModel, newData);
            }
            data.newModel = newData;
        }
        var changeId: Array<any> = [];
        if (cardType == "Grid") {
            if (changeval.length != 0) {
                for (var i = 0; i < changeval.length; i++) {
                    changeId.push(changeval[i].object.ID);

                }
            }
        }

        this.results.push({
            "card": card, "name": cardname, "type": cardType, "newModel": [{ "model": data.oldModel, "hub": card.hub }, { "model": data.newModel, "hub": card.newModelHub }],
            "moduleCode": modulecode, "statusModel": { "status": data.approvalStatus, "comment": data.comment }, "changeId": changeId
        });
        if (needDropDown)
            this.dropdowncard.push(card);
    }
    InitializeCards(data, cards) {

        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < cards.length; j++) {
                if (data[i].moduleID == cards[j].moduleCode) {
                    this.setCard(data[i], cards[j].type, cards[j].dropDown, cards[j].isArray, cards[j].cardType, cards[j].name, cards[j].moduleCode);
                }
            }
        }

        this.InitializeDropdownsForModels();
    }
    InitializeDropdownsForModels() {
        let dropdowns = this._cacheService.getParams("dropdowns");
        if (dropdowns == null) {
            this.userService.pullDropDowns(() => {
                dropdowns = this._cacheService.getParams("dropdowns");
                this.FillDropDowns(dropdowns);
            })
        }
        else {
            this.FillDropDowns(dropdowns);
        }
    }
    private FillDropDowns(dropdowns) {
        for (var i = 0; i < this.dropdowncard.length; i++) {
            (this.dropdowncard[i].hub as Array<any>).forEach(hub => {
                if (typeof (hub["options"]) === 'string') {
                    hub["options"] = dropdowns[hub["options"]];
                }
            })

        }
        for (var i = 0; i < this.dropdowncard.length; i++) {
            (this.dropdowncard[i].newModelHub as Array<any>).forEach(newModelHub => {
                if (typeof (newModelHub["options"]) === 'string') {
                    newModelHub["options"] = dropdowns[newModelHub["options"]];
                }
            })

        }
    }
    ChangedValues(oldModel: any, newModel: any) {
        var changedValues: Array<any> = [];
        if (oldModel.length == null || newModel.length == null) {
            var n = 0;
            for (var i in oldModel) {
                if (oldModel[i] != newModel[i]) {
                    changedValues.push({ "key": Object.keys(newModel)[n], "object": "" });
                }
                n++;
            }
        }
        else {
            for (var k = 0, m = 0; k < oldModel.length, m < newModel.length; k++ , m++) {
                var oldobj = oldModel[k]; var newobj = newModel[m]; var n = 0;
                if (newobj.IsDeleted == true || newobj.ID == 0) {
                    changedValues.push({ "key": "", "object": newobj });
                }
                else {
                    for (var i in oldobj) {
                        if (oldobj[i] != newobj[i]) {
                            changedValues.push({ "key": Object.keys(newobj)[n], "object": newobj });
                        }
                        n++;
                    }
                }
            }
        }

        return changedValues;
    }
    ApplyCSSForUpdate(changeval: any, card: any, cardType) {
        (card.newModelHub as Array<any>).forEach(newModelHub => {
            for (var i = 0; i < changeval.length; i++) {
                if ((newModelHub["name"].toLowerCase() == changeval[i].key.toLowerCase())) {
                    if (newModelHub["css"] == "" || cardType == "Grid") {
                        newModelHub["css"] = "new-value-content";
                    }
                    else {
                        newModelHub["css"] = newModelHub["css"] + " new-value-content";
                    }
                }
                else {
                    if (cardType == "Grid" && changeval[i].key != "") {
                        newModelHub["css"] = "";
                    }
                }
            }
        })
        if (cardType == "Grid") {
            for (var i = 0; i < changeval.length; i++) {
                {
                    for (var j = 0; j < card.model.length; j++) {
                        if (changeval[i].object.ID == card.model[j].ID) {
                            (card.hub as Array<any>).forEach(hub => {
                                hub["css"] = "";
                            })
                        }
                    }
                }
            }
        }
    }

    ApplyCSSForDelete(changeval: any, card: any) {
        (card.newModelHub as Array<any>).forEach(newModelHub => {
            for (var i = 0; i < changeval.length; i++) {
                if (newModelHub["css"] == "") {
                    newModelHub["css"] = "deleted-value-content";
                }
                else {
                    newModelHub["css"] = newModelHub["css"] + " deleted-value-content";
                }
            }
        })
    }

    ApplyCSSForADD(changeval: any, card: any) {
        (card.newModelHub as Array<any>).forEach(newModelHub => {
            for (var i = 0; i < changeval.length; i++) {
                if (newModelHub["css"] == "") {
                    newModelHub["css"] = "new-value-content";
                }
                else {
                    newModelHub["css"] = newModelHub["css"] + " new-value-content";
                }
            }
        })
    }

    CancelEdit(e: any, model: any, EmployeeData: any, statusModel: any) {
        var models = EmployeeData["employeeApprovalViewModelList"];
        for (var j = 0; j < models.length; j++) {
            if (models[j].moduleID == model.moduleCode) {
                statusModel.comment = models[j].comments;
                statusModel.status = models[j].approvalStatus;

            }
        }

    }
    SaveApproval(e: any, model: any, EmployeeData: any, statusModel: any, form) {
        var self = this;
        var models = EmployeeData["employeeApprovalViewModelList"];
        if (statusModel.status == "1" || form.valid) {
            for (var j = 0; j < models.length; j++) {
                if (models[j].moduleID == model.moduleCode) {
                    models[j].comments = statusModel.comment || 'approved';
                    models[j].approvalStatus = +statusModel.status;
                    models[j].by = this.id;
                    var link = HttpSettings.apiBaseUrl + 'v1/approval/employee/approvals/' + this.id + "/" + models[j].stageID + "/" + models[j].moduleID + "/" + models[j].approvalStatus + "?comments=" + models[j].comments;
                    this.ApprovalStatus(link, models[j], function () {
                        if (statusModel.status == 1 || statusModel.status == 2) {
                            var i = self.results.indexOf(model);
                            if (i != -1) {
                                self.results.splice(i, 1);
                            }
                        }
                        if (typeof e === 'function') {
                            e();
                        }
                    });

                }
            }
        }
        else {
            this.cardSubmitted = true;
        }

    }

    GetData(id) {
        this.loaderModal = true;
        var self = this;
        var url = HttpSettings.apiBaseUrl + 'v1/approval/employee/approvals/request/' + id;
        this._httpService.get(url)
            .subscribe(
            data => {
                self.EmployeeData = data;
                self.InitializeCards(self.EmployeeData["employeeApprovalViewModelList"], self.cards);
                self.loaderModal = false;
            },
            error => alert(error)
            );
    }

    ApprovalStatus(url, model, callBack = null) {
        var self = this;
        this._httpService.post(url, model)
            .subscribe(
            data => {
                if (model.approvalStatus == 1)
                    Materialize.toast('Successfully Approved Record', 3000, 'successTost')
                else if (model.approvalStatus == 2)
                    Materialize.toast('Successfully Rejected Record', 3000, 'successTost')
                else
                    Materialize.toast('Record is kept On-Hold.', 3000, 'successTost')
                self.responseData = data;
                if (typeof callBack === 'function') {
                    callBack();
                }
            },
            error => {
                Materialize.toast(error, 3000, 'errorTost')
            }
            );
    }
}