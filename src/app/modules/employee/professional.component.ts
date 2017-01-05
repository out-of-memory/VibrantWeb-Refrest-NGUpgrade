import {Component} from '@angular/core';
import {CacheService} from '../../servicesFolder/CacheService';
import {AutoMapperService} from '../../servicesFolder/AutoMapperService';
import {JoiningDetailsModel, CompetencyDetailsModel, SkillsModel, LocationDetailsModel, DeliveryUnitDetailsModel,
    ProjectDetailsModel, DeclarationDetailsModel, ExperienceDetailsModel, ContractDetailsModel, GrowthModel } from '../../model/EmployeeViewModel';
import {JoiningDetails, CompetencyDetails, SkillsDetails, DependentDetails, LocationDetails, DeliveryUnitDetails, ProjectDetails,
    DeclarationDetails, ContractDetails, GrowthDetails } from '../../model/EmployeeDataModel';
import {Card} from '../../infrastructure/components/Card';
import {UiForm, UiFormControl} from '../../infrastructure/components/UiForm';
import {HttpService} from '../../servicesFolder/http/http.service';
import {Http, Headers} from '@angular/http';
import {UIGrid, GridSortOrders} from  '../../infrastructure/components/UiGrid.component';
import {UIGridDataSource} from  '../../infrastructure/components/UIGridDataSource';
import {UIGridConfig} from  '../../infrastructure/components/UIGridConfig.component';
import {UIGridColumn} from  '../../infrastructure/components/UiGridColumn.component';
import {TestModel} from '../../Models/TestModel';
import {Repeater} from '../../infrastructure/components/repeater';
import {GridCard} from '../../infrastructure/components/GridCard';
import {UiGirdForm} from '../../infrastructure/components/UiGridForm';
import {CardModel, GridCardModel} from '../../models/CardModels'
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from "../../servicesFolder/user/user.service"
import {HttpSettings} from "../../servicesFolder/http/http.settings"
import {OptionTextPipe, RatingPipe} from '../../infrastructure/pipes/pipes'
import {LoaderComponent} from  '../../infrastructure/components/loader.component';

import {Confirmation} from '../../infrastructure/components/confirmationMsg';
import {EditConfirmation} from '../../infrastructure/components/EditConfirmationMsg';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'employee-professional',
    template: `
    <div class="col s12 tab-content">
         <div class="card-container" *ngIf='joiningCard && approvalStatus'>
            <card header="Joining Details"  [formReadonly]='true' *ngIf='setCardVisibility(joiningCard.id,cardsVisibilityArr)' [isViewOnly]='isViewOnly' [nonEditable]='true'
             (readOnlyChanged)="ProfessionalFormReadOnlyChanged($event,joiningCard)"
                (saveData) = "UpdateProfessionalData($event,joiningCard,'v1/employee/personal/personalupdate/','proDCard',joiningCard.id)"
                (cancelData) ="CancelEdit($event,joiningCard)">
                    <ui-form #joiningForm
                        [controlMetas]="joiningCard.hub"
                        [model]="joiningCard.model"
                        [errorOnlyOnSubmit]='joiningCard.cardSubmitted'
                        [formReadonly]='joiningCard.readOnlyFormState'
                        formCss='view-card'
                        columnOrientation='2'
                        controlCss='view-form-info'>
                    </ui-form>
             <loader-component [(loading)]='joiningCard.isCardLoader' [isConformationModal]='joiningCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'"></loader-component>  
            </card> 
            <grid-card header="Skills" *ngIf='setCardVisibility(skillCard.id,cardsVisibilityArr)' [formReadonly]='skillCard.readOnlyFormState' [nonEditable]='isViewOnly'
             [isSentForApproval]="GetApprovalStatus(skillCard,approvalStatus)" (addActivationChanged)="GridAddNew($event,skillCard)">
                    <repeater [source]='skillCard.model' *ngIf='skillCard.readOnlyFormState'>
                    <template  #tmplRepeater  let-item='item'>
                     <div class="saved-data">
                        <div class="row valign-wrapper">
                            <div class="col s8 valign">
                                <div class="view-form-info">
                                    <!--<h5 >{{item.skillID|option:skillCard.hub[0].options}} <span>({{item.experienceYears}} Years)</span></h5>-->
                                    <h5 >{{item.skillID|option:skillCard.hub[0].options}} </h5>
                                    <h6 [innerHTML]='item.skillRating/2|rating'>
                                    </h6>
                                </div>
                            </div>
                            <div class="col s4 valign right-align" *ngIf='item.stageStatusID==0'>
                                <span *ngIf='!isViewOnly' (click)="EditGridData(item,skillCard)">
                                    <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                </span>
                                <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,skillCard)">
                                    <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                </span>
                            </div>
                        </div>
                         <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                    </div>
                      </template>
                      </repeater>
                   
                    <ui-grid-form  [header]="skillCard.header + ' Skill'" #skillForm *ngIf='!skillCard.readOnlyFormState' (cancelData) = "CancelEdit($event,skillCard)"
                        (addData)= "ConfirmEdit($event,skillCard,skillForm.mainForm,'v1/employee/professional/skillsmanage/','skCard',skillCard.id,'skills')"
                        [controlMetas]="skillCard.hub"
                        [model]="skillCard.model"
                        [errorOnlyOnSubmit]='skillCard.cardSubmitted'
                        [formReadonly]='skillCard.readOnlyFormState'
                        formCss='view-card saved-data'
                          columnOrientation='1'
                        inputLabelPosition='top'
                        controlCss='view-form-info'>
                    </ui-grid-form>
                    <div  class="approval-data-msg" *ngIf='!skillCard.readOnlyFormState && skillCard.model.skillRating >10'>Please enter rating between 1-10</div>
            <loader-component [(loading)]='skillCard.isCardLoader' [isConformationModal]='skillCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
            <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'skillsmanage',skillCard,'skillCard',skillCard.id,'skills')" (CancelDelete)="CancelEdit($event,skillCard)"></confirm>
            <edit-confirm *ngIf='isEditCard'></edit-confirm>
           </loader-component>          
            </grid-card>
             <card header="Organization Details"  [formReadonly]='deliveryUnitCard.readOnlyFormState'  *ngIf='setCardVisibility(deliveryUnitCard.id,cardsVisibilityArr)' [isViewOnly]='isViewOnly' [nonEditable]='deliveryUnitEdit'
              [isSentForApproval]="GetApprovalStatus(deliveryUnitCard,approvalStatus)"
             (readOnlyChanged)="ProfessionalFormReadOnlyChanged($event,deliveryUnitCard)"
                (saveData) = "ConfirmEdit($event,deliveryUnitCard,deliveryForm.mainForm,'v1/employee/professional/orgDetailsupdate/','orgDCard',deliveryUnitCard.id,'employeeOrganizationdetails')"
                (cancelData) ="CancelEdit($event,deliveryUnitCard)">
                    <ui-form #deliveryForm
                        [controlMetas]="deliveryUnitCard.hub"
                        [model]="deliveryUnitCard.model"
                        [errorOnlyOnSubmit]='deliveryUnitCard.cardSubmitted'
                        [formReadonly]='deliveryUnitCard.readOnlyFormState'
                        formCss='view-card'
                        columnOrientation='2'
                        controlCss='view-form-info'>
                    </ui-form>
             <loader-component [(loading)]='deliveryUnitCard.isCardLoader' [isConformationModal]='deliveryUnitCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'"></loader-component>  
            </card> 
             <grid-card header="Experience Details" *ngIf='setCardVisibility(experienceCard.id,cardsVisibilityArr)' [formReadonly]='experienceCard.readOnlyFormState' [nonEditable]='isViewOnly'
              [isSentForApproval]="GetApprovalStatus(experienceCard,approvalStatus)"
              (addActivationChanged)="GridAddNew($event,experienceCard)" >
                     <repeater  [source]='experienceCard.model' *ngIf='experienceCard.readOnlyFormState'>
                     <template #tmplRepeater let-item='item'>
                     <div class="saved-data">
                        <div class="row">
                            <div class="col s8">
                                <div class="view-form-info">
                                    <h5>{{item.lastDesignation}}</h5>
                                    <h5 class="subheading">{{item.organisationName}}, {{item.location}}</h5>
                                    <h6>{{item.joiningDate}} - {{item.workedTill}}</h6>
                                </div>
                            </div>
                             <div class="col s4 valign right-align" *ngIf='item.stageStatusID==0'>
                                <span *ngIf='!isViewOnly' (click)="EditGridData(item,experienceCard)">
                                    <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                </span>
                                <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,experienceCard)">
                                            <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                </span>
                            </div>
                        </div>
                         <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                    </div>
                     </template>
                     </repeater>
                   
                    <ui-grid-form #experienceForm [header]="experienceCard.header + ' Experience Details'" *ngIf='!experienceCard.readOnlyFormState' (cancelData) = "CancelEdit($event,experienceCard)"
                        (addData)= "ConfirmEdit($event,experienceCard,experienceForm.mainForm,'v1/employee/professional/emphistorymanage/','expHCard',experienceCard.id,'employeeHistories')"
                        [controlMetas]="experienceCard.hub"
                        [model]="experienceCard.model"
                        [errorOnlyOnSubmit]='experienceCard.cardSubmitted'
                        [formReadonly]='experienceCard.readOnlyFormState'
                        columnOrientation='2'
                        inputLabelPosition='top'
                        formCss='view-card saved-data'
                        controlCss='view-form-info'>
                         <ui-control-item for='joiningDate' behaviours='[{"name":"max","value":"today"}]' ></ui-control-item>
                        <ui-control-item for='workedTill' behaviours='[{"name":"max","value":"today"}]' ></ui-control-item>
                    </ui-grid-form>
             <loader-component [(loading)]='experienceCard.isCardLoader' [isConformationModal]='experienceCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
             <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'emphistorymanage',experienceCard,'experienceCard',experienceCard.id,'employeeHistories')"  (CancelDelete)="CancelEdit($event,experienceCard)"></confirm>
              <edit-confirm *ngIf='isEditCard' ></edit-confirm>
             </loader-component>         
             </grid-card>

             <grid-card header="Declaration" *ngIf='setCardVisibility(declarationCard.id,cardsVisibilityArr)' [formReadonly]='declarationCard.readOnlyFormState' [nonEditable]='isViewOnly'
             [isSentForApproval]="GetApprovalStatus(declarationCard,approvalStatus)" (addActivationChanged)="GridAddNew($event,declarationCard)">
                     <repeater [source]='declarationCard.model' *ngIf='declarationCard.readOnlyFormState'>
                      <template  #tmplRepeater  let-item='item'>
                      <div class="saved-data">
                            <div class="row">
                                <div class="col s8">
                                    <div class="view-form-info" *ngFor="let p of declarationCard.hub[1].options">
                                        <h5 *ngIf='p.id==item.relationType'>{{item.declaredPerson}} <span class="p-left10">{{p.text}}</span></h5>
                                    </div>
                                </div>
                                 <div class="col s4 valign right-align" *ngIf='item.stageStatusID==0'>
                                    <span *ngIf='!isViewOnly' (click)="EditGridData(item,declarationCard)">
                                        <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                    </span>
                                    <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,declarationCard)">
                                        <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                    </span>
                                </div>
                            </div>   
                            <div class="row">
                                <div class="col s12">
                                    <div class="view-form-info">
                                        <h5>{{item.v2PersonID}}<span class="p-left10">Active</span></h5>
                                        <h6>V2 Employee ID</h6>
                                    </div>
                                </div>
                            </div>
                             <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                        </div>
                      </template>
                      </repeater>
                   
                    <ui-grid-form #declarationForm  [header]="declarationCard.header + ' Declaration'" *ngIf='!declarationCard.readOnlyFormState' (cancelData) = "CancelEdit($event,declarationCard)"
                        (addData)= "ConfirmEdit($event,declarationCard,declarationForm.mainForm,'v1/employee/professional/declarationmanage/','declarationCard',declarationCard.id,'declarations')"                        
                        [controlMetas]="declarationCard.hub"
                        [model]="declarationCard.model"
                        [errorOnlyOnSubmit]='declarationCard.cardSubmitted'
                        [formReadonly]='declarationCard.readOnlyFormState'
                         columnOrientation='2'
                        inputLabelPosition='top'
                        formCss='view-card saved-data'
                        controlCss='view-form-info'>
                          <ui-control-item for='birthDate' behaviours='[{"name":"max","value":"today"}]' ></ui-control-item>
                    </ui-grid-form>
             <loader-component [(loading)]='declarationCard.isCardLoader' [isConformationModal]='declarationCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
             <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'declarationmanage',declarationCard,'declarationCard',declarationCard.id,'declarations')" (CancelDelete)="CancelEdit($event,declarationCard)"></confirm>
              <edit-confirm *ngIf='isEditCard' ></edit-confirm>
             </loader-component>         
            </grid-card>
      
        </div>
    </div>
         <loader-component [(loading)]='loaderModal' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isPage'" [isConformationModal]="isConformationModal"></loader-component>
    `,
    //directives: [Card, UiForm, UiFormControl, UIGrid, UIGridColumn, Repeater, GridCard, UiGirdForm, LoaderComponent, Confirmation, EditConfirmation],
    //pipes: [OptionTextPipe, RatingPipe]
})
export class ProfessionalComponent {
    id: string;
    tempData: any;

    rdata: any;
    joiningCard: CardModel<JoiningDetailsModel>;
    locationCard: CardModel<LocationDetailsModel>;
    competencyCard: CardModel<CompetencyDetailsModel>;
    deliveryUnitCard: CardModel<DeliveryUnitDetailsModel>;
    projectCard: GridCardModel<ProjectDetailsModel>;
    skillCard: GridCardModel<SkillsModel>;
    experienceCard: GridCardModel<ExperienceDetailsModel>;
    declarationCard: GridCardModel<DeclarationDetailsModel>;
    contractCard: GridCardModel<ContractDetailsModel>;
    growthCard: GridCardModel<GrowthModel>;
    cardsVisibilityArr: Array<number> = [];// this need to be populated fro0m server data , by default it's empty no nulll'
    isReadOnlyMode: boolean = true;
    isSearchUser: boolean = false;
    dropdowncard: Array<any> = [];
    userid: string;
    isViewOnly: boolean = true;
    params: any = [];
    oldData: any;
    responseModel: any;

    loaderModalMsg: boolean = false;
    loaderModalText: any;
    loaderModal: boolean = false;
    isConformationModal: boolean = false;
    isEditCard: boolean = false;
    isDeleteCard: boolean = false;
    approvalStatus: Array<number>;
    deliveryUnitEdit: boolean = true;

    constructor(private _cacheService: CacheService, private _activatedRoute: ActivatedRoute,private _router:Router, private _httpService: HttpService, private _autoMapperService: AutoMapperService, private userService: UserService) {
        //console.log(this._activatedRoute.root.currentInstruction.component.routeData.data);
        this.loaderModal = true;
        this.rdata = this._activatedRoute.parent;
        if (this.rdata)
            this.isReadOnlyMode = this.isViewOnly = this.rdata.snapshot.data["isViewOnly"];

        if (this.rdata) {
            this.InitializeCards(this._cacheService.getParams(this.rdata.snapshot.data["from"]));

            //  this.InitializeDropdownsForModels();
        }
        this.id = this._cacheService.getParams(this.rdata.snapshot.data["from"]).id;
    }
    ngOnInit() {
        this.oldData = this._cacheService.getParams("profile");
        if (this.isReadOnlyMode) {
            if (this.oldData.role.length != 0) {
                if (this.oldData.role[0].roleId != 12 && this.oldData.role[0].roleId != 27) {
                    this._router.navigateByUrl('/my/dashboard');
                }
            }
        }
    }

    routerOnActivate(curr: any, prev?: any): void {
        // console.log(curr);
    }

    InitializeCards(data) {

        this.joiningCard = new CardModel<JoiningDetailsModel>(11, JoiningDetailsModel, false, this._autoMapperService, data, this.isViewOnly, data["approvals"]);
        // this.locationCard = new CardModel<LocationDetailsModel>(LocationDetailsModel, false, null, null, this.isViewOnly);
        // this.competencyCard = new CardModel<CompetencyDetailsModel>(CompetencyDetailsModel, false, null, null, this.isViewOnly);
        this.deliveryUnitCard = new CardModel<DeliveryUnitDetailsModel>(14, DeliveryUnitDetailsModel, false, this._autoMapperService, data["employeeOrganizationdetails"], this.isViewOnly, data["approvals"]);
        //this.projectCard = new GridCardModel<ProjectDetailsModel>(ProjectDetailsModel, true, null, null, this.isViewOnly);
        this.skillCard = new GridCardModel<SkillsModel>(16, SkillsModel, true, null, data["skills"], this.isViewOnly, data["approvals"]);
        this.experienceCard = new GridCardModel<ExperienceDetailsModel>(7, ExperienceDetailsModel, true, null, data["employeeHistories"], this.isViewOnly, data["approvals"]);
        this.declarationCard = new GridCardModel<DeclarationDetailsModel>(18, DeclarationDetailsModel, true, null, data["declarations"], this.isViewOnly, data["approvals"]);
        //this.contractCard = new GridCardModel<ContractDetailsModel>(ContractDetailsModel, true, null, null, this.isViewOnly);
        //this.growthCard = new GridCardModel<GrowthModel>(GrowthModel, true, null, null, this.isViewOnly);

        this.dropdowncard.push(this.skillCard);
        this.dropdowncard.push(this.declarationCard);
        this.dropdowncard.push(this.deliveryUnitCard);
        this.InitializeDropdownsForModels();
        this.cardsVisibilityArr = data["cards"];
        this.ApprovalData();
        this.oldData = this._cacheService.getParams("profile");
        if (this.oldData.role.length != 0) {
            if (this.oldData.role[0].roleId == 27) {
                this.deliveryUnitEdit = false;
            }

        }

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
    }
    ApprovalData() {
        var self = this;
        var status: boolean = false;
        if (!this.isViewOnly) {
            status = true;
        }
        this.userService.getApprovalStatus(status, data => {
            self.approvalStatus = data;
            self.loaderModal = false;
        });
    }
    GetApprovalStatus(card, approvalStatus) {

        var status: boolean = false;
        for (var i = 0; i < approvalStatus.length; i++) {
            if (card.id == approvalStatus[i]) {
                status = true;
                break;
            }
        }
        return status;

    }
    ProfessionalFormReadOnlyChanged(e, model) {
        model.readOnlyFormState = e;
    }
    CancelEdit(e, model) {
        model.resetModel();
        model.data = model.resetDataModel();
        model.readOnlyFormState = true;
        model.isConfirmation = false;
        model.isCardLoader = false;
        this.isDeleteCard = false;
        model.cardSubmitted = false;
    }
    UpdateProfessionalData(e: any, viewModel, url, componentName, componentId, dataValueName) {
        var self = this;
        var model = viewModel;
        var link = HttpSettings.apiBaseUrl + url + this.id;
        if (model.model.id == "" && (!model.setApprovalFlag())) {
            model.backUpModel = null;
        }
        this.PostData(link, model["getChangeSet"](componentName, componentId, "id"), model, function () {
            model.readOnlyFormState = true;
            model.cardSubmitted = false;
            if (model.setApprovalFlag()) {
                model.model = model.backUpModel;
                self.ApprovalData();
            }
            else {
                self._autoMapperService.Map(model.model, self.oldData);
            }
            if (dataValueName != '') {
                if (model.model.id == "") {
                    model.model.id = self.responseModel["newModel"].id;
                    model.model.stageStatusID = self.responseModel["newModel"].stageStatusID;
                }
                model.backUpModel = self.responseModel["newModel"];
                self.oldData[dataValueName][0] = model.model;
            }
            self._cacheService.setParams("profile", self.oldData);
            if (typeof e === 'function') {
                e();
            }
        });

    }
    EditGridData(data, editmodel) {
        editmodel.readOnlyFormState = false;
        editmodel.model = data;
        editmodel.header = "Edit";
    }
    GridAddNew(e, model) {
        model.resetNewModel();
        model.model = model.newModel;
        model.readOnlyFormState = false;
        model.header = "Add"

    }
    UpdateGridData(e, model, url, componentName, componentId, dataValueName) {
        // var model = this[model];
        var self = this;
        var objArray = new Array<any>();
        objArray.push(model.model);
        var link = HttpSettings.apiBaseUrl + url + this.id;
        this.PostData(link, model["getChangeSet"](componentName, componentId, "id"), model, function () {
            model.readOnlyFormState = true;
            model.cardSubmitted = false;
            if (model.setApprovalFlag()) {
                model.model = model.data;
                for (var i = 0; i < model.model.length; i++) {
                    if (model.model[i].id == objArray[0].id) {
                        model.model[i].stageStatusID = 1;
                    }
                }
                for (var i = 0; i < model.backUpModel.length; i++) {
                    if (model.backUpModel[i].id == objArray[0].id) {
                        model.backUpModel[i].stageStatusID = 1;
                    }
                }
                if (objArray[0].id == 0 || objArray[0].id == "") {
                    objArray[0].stageStatusID = 1;
                    model.model.push(objArray[0]);
                    model.backUpModel.push(objArray[0]);
                }
            }
            else {
                model.model = model.data;
                for (var i = 0; i < model.model.length; i++) {
                    if (model.model[i].id == objArray[0].id) {
                        model.model[i] = objArray[0];
                    }
                }
                if (objArray[0].id == 0 || objArray[0].id == "") {
                    objArray[0].id = self.responseModel["newModel"].id;
                    model.model.push(objArray[0]);
                    model.backUpModel.push(self.responseModel["newModel"]);
                }
                for (var i = 0; i < model.backUpModel.length; i++) {
                    if (model.backUpModel[i].id == self.responseModel["newModel"].id) {
                        for (var name in self.responseModel["newModel"]) {
                            if (model.backUpModel[i].hasOwnProperty(name)) {
                                model.backUpModel[i][name] = self.responseModel["newModel"][name];
                            }
                        }
                    }

                }
                self._autoMapperService.Map(model.model, self.oldData);
                self._cacheService.setParams("profile", self.oldData);
            }
            //  model.backUpModel = model.model;
            //  model.data = model.model;
            self.oldData[dataValueName] = model.model;
            self._cacheService.setParams("profile", self.oldData);
            if (typeof e === 'function') {
                e();
            }
        });
    }
    ConfirmEdit(e, model, myForm, url, componentName, componentId, dataValueName) {
        var self = this;
        if (myForm.valid) {
            if (model._isArray) {
                // if (JSON.stringify(model.data) == JSON.stringify(model.backUpModel) && model.model.id != "") {
                if (myForm.pristine && model.model.id != "") {
                    Materialize.toast('No change in data.', 3000, 'successTost');
                    model.readOnlyFormState = true;
                    model.model = model.backUpModel;
                }
                else {
                    this.loadLoader(model);
                    this.UpdateGridData(e, model, url, componentName, componentId, dataValueName);
                }
            }
            else {
                //   if (JSON.stringify(model.model) == JSON.stringify(model.backUpModel) && model.model.id != "") {
                if (myForm.pristine && model.model.id != "") {
                    Materialize.toast('No change in data.', 3000, 'successTost');
                    model.readOnlyFormState = true;
                } else {
                    this.loadLoader(model);
                    this.UpdateProfessionalData(e, model, url, componentName, componentId, dataValueName);
                }
            }
        }
        else {
            model.cardSubmitted = true;
        }
    }
    loadLoader(model) {
        model.isConfirmation = false;
        model.isCardLoader = true;
        if (model.setApprovalFlag()) {
            model.isConfirmation = true;
            this.isEditCard = true;
        }
    }
    DeleteGridData(item, cardModel) {
        cardModel.model = item;
        cardModel.readOnlyFormState = false;
        // cardModel.data = item;
        cardModel.isConfirmation = true;
        cardModel.isCardLoader = true;
        cardModel.header = "Delete"
        this.isDeleteCard = true;
    }
    DeleteData(e, url, cardModel, componentName, componentId, dataValueName) {
        var self = this;
        var objArray = new Array<any>();
        objArray.push(cardModel.model);
        var link = HttpSettings.apiBaseUrl + HttpSettings.apiEmpProfessionalUrl + url + "/" + this.id + "?isDeleted=true";
        this.PostData(link, cardModel["getChangeSet"](componentName, componentId, "id"), cardModel, function () {
            // cardModel.model = cardModel.backUpModel;
            cardModel.readOnlyFormState = true;
            if (cardModel.setApprovalFlag()) {
                cardModel.model = cardModel.data;
                for (var i = 0; i < cardModel.model.length; i++) {
                    if (cardModel.model[i].id == objArray[0].id) {
                        cardModel.model[i].stageStatusID = 1;
                    }
                }
                for (var i = 0; i < cardModel.backUpModel.length; i++) {
                    if (cardModel.backUpModel[i].id == objArray[0].id) {
                        cardModel.backUpModel[i].stageStatusID = 1;
                    }
                }
            }
            else {
                cardModel.model = cardModel.data;
                for (var i = 0; i < cardModel.model.length; i++) {
                    if (cardModel.model[i].id == objArray[0].id) {
                        cardModel.model.splice(i, 1);
                        cardModel.backUpModel.splice(i, 1);
                        // cardModel.data.splice(i, 1);
                    }
                }
            }
            // cardModel.backUpModel = cardModel.model;
            //  cardModel.data = cardModel.model;
            self.oldData[dataValueName] = cardModel.model;
            self._cacheService.setParams("profile", self.oldData);
            if (typeof e === 'function') {
                e();
            }
        });
    }
    PostData(url, postData, cardModel, callBack = null) {
        var self = this;
        //cardModel.isCardLoader = true;
        this._httpService.post(url, postData)
            .subscribe(
            data => {
                this.responseModel = data;
                self.loaderModalText = "Successfully updated record";
                self.loaderModalMsg = true;
                //TimerWrapper.setTimeout(() => {
                    cardModel.isCardLoader = false;
                    cardModel.isConfirmation = false;
                    self.loaderModalText = "";
                    self.loaderModalMsg = false;
                    self.isEditCard = false;
                    self.isDeleteCard = false;

                //}, 2000);
                if (typeof callBack === 'function') {
                    callBack();
                }
            },
            error => {
                console.log(error)
                self.loaderModalText = "Error occurred !";
                self.loaderModalMsg = true;
                //TimerWrapper.setTimeout(() => {
                    cardModel.isCardLoader = false;
                    cardModel.isConfirmation = false;
                    self.loaderModalText = "";
                    self.loaderModalMsg = false;
                    self.isEditCard = false;
                    self.isDeleteCard = false;
                //}, 2000);
            }
            // () => console.log('Post request has Completed')
            );
    }

    //// RS: This method will be moved to Utility later phase when we will do the cleanup
    setCardVisibility(id: number, cards: Array<number>): boolean {
        let pass = false;
        for (var i = 0; i < cards.length; i++) {
            if (id == cards[i]) {
                pass = true;
                break;
            }
        }
        return pass;
    }
}

