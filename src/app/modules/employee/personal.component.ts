import {Component} from '@angular/core';
import {CacheService} from '../../servicesFolder/CacheService';
import {AutoMapperService} from '../../servicesFolder/AutoMapperService';
import {PersonalDetailsModel, Address, Education, EmergencyContacts, MedicalHistoryModel, CertificationDetailsModel,
    DependentsModel, VisaDetailsModel, PassportDetailsModel, GapExperienceModel} from '../../model/EmployeeViewModel';
import {PersonalDetails, EmergencyContactsDetails, EducationDetails, PersonalAddress, MedicalHistory, CertificationDetails,
    ExperienceDetails, VisaDetails, PassportDetails, GapExperienceDetails} from '../../model/EmployeeDataModel';
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
import { Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {UserService} from "../../servicesFolder/user/user.service"
import {HttpSettings} from "../../servicesFolder/http/http.settings"
import {LoaderComponent} from  '../../infrastructure/components/loader.component';
//import {BaseComponent} from"../../modules/Employee/BaseComponent"
import {CardModel, GridCardModel} from '../../models/CardModels'
import {Confirmation} from '../../infrastructure/components/confirmationMsg';
import {EditConfirmation} from '../../infrastructure/components/EditConfirmationMsg';
import {UiInput} from '../../infrastructure/components/UiInput';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from "angular2-materialize";
declare var $: any;

@Component({
    selector: 'employee-personal',
    template: `
    <div class="col s12 tab-content">
         <div class="card-container" *ngIf='personCard && approvalStatus'>
         
            <card header="Personal Details"  *ngIf='setCardVisibility(personCard.id,cardsVisibilityArr)'  [formReadonly]='personCard.readOnlyFormState' [nonEditable]='isViewOnly' [isSentForApproval]="GetApprovalStatus(personCard,approvalStatus)"
                  (readOnlyChanged)="personalFormReadOnlyChanged($event,personCard)"
                (saveData) = "ConfirmEdit($event,personCard,personalForm.mainForm,'v1/employee/personal/personalupdate/','pDCard',personCard.id,'')" (cancelData) ="CancelEdit($event,personCard)">
                    <ui-form #personalForm
                        [controlMetas]="personCard.hub"
                        [(model)]="personCard.model"
                        [formReadonly]='personCard.readOnlyFormState'
                        [errorOnlyOnSubmit]='personCard.cardSubmitted'
                        formCss='view-card'
                        columnOrientation='2'
                        inputLabelPosition='top'
                        controlCss='view-form-info'>
                        <ui-control-item for='weddingDate' behaviours='[{"name":"min","value":"{{personCard.model.dateOfBirth}}:mm/dd/yyyy:18"},{"name":"max","value":"today"}]'
                        depends='["maritalStatus:readonlyValue"]' readonlyValue='["Single"]'>
                        </ui-control-item>
                        <ui-control-item for='dateOfBirth' behaviours='[{"name":"max","value":"{{personCard.model.weddingDate}}:mm/dd/yyyy:-18"}]'>
                        </ui-control-item>
                    </ui-form>
            <loader-component [(loading)]='personCard.isCardLoader' [isConformationModal]='personCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
            <edit-confirm *ngIf='isEditCard' ></edit-confirm>
           </loader-component>  
            </card>
            <grid-card header="Contact Details" *ngIf='setCardVisibility(addressCard.id,cardsVisibilityArr)' [nonEditable]='true' 
            [isSentForApproval]="GetApprovalStatus(addressCard,approvalStatus)" [formReadonly]='addressCard.readOnlyFormState'>
                     <repeater [source]='addressCard.model' *ngIf='addressCard.readOnlyFormState'>
                        <template  #tmplRepeater let-item='item'>
                            <div class="saved-data">
                                <div class="row m-bottom10">
                                    <div class="col s8">
                                        <div class="view-form-info" >
                                            <h5>{{item.addressLabel}}</h5>
                                        </div>
                                    </div>
                                    <div class="col s4 valign right-align" *ngIf='item.stageStatusID==0'>
                                        <span *ngIf='!isViewOnly' (click)="EditGridData(item,addressCard)">
                                            <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                        </span>
                                        <!--<span (click)="DeleteGridData(item,addressCard)">
                                            <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                        </span>-->
                                    </div>
                                </div>
                                <div class="row m-bottom10">
                                    <div class="col s10">
                                        <div class="view-form-info">
                                            <h5>{{item.currentAddress}}</h5>
                                            <h6>Address</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s6">
                                        <div class="view-form-info">
                                            <h5>{{item.currentAddressCountry}}</h5>
                                            <h6>Country</h6>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="row">
                                    <div class="col s6">
                                        <div class="view-form-info">
                                            <h5>{{item.isCurrent == 'true' | iif : "Current Address" : "Permanent Address"}}</h5>
                                        </div>
                                    </div>
                                </div>-->
                                 <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                            </div>
                        </template>
                    </repeater>
            <ui-grid-form #contactForm [header]="addressCard.header + ' Contact Details'" *ngIf='!addressCard.readOnlyFormState' (cancelData) = "CancelEdit($event,addressCard)"  
                        (addData)= "ConfirmEdit($event,addressCard,contactForm.mainForm,'v1/employee/personal/addressupdate/','cDCard',addressCard.id,'addresses')"
                        [controlMetas]="addressCard.hub"
                        [model]="addressCard.model"
                        [errorOnlyOnSubmit]='addressCard.cardSubmitted'
                        [formReadonly]='addressCard.readOnlyFormState'
                        formCss='view-card saved-data'
                         inputLabelPosition='top'
                        controlCss='view-form-info'>
             </ui-grid-form>
           <loader-component [(loading)]='addressCard.isCardLoader' [isConformationModal]='addressCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
            <confirm  *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'qualificationmanage',addressCard,'addresses')" (CancelDelete)="CancelEdit($event,addressCard)"></confirm>
            <edit-confirm *ngIf='isEditCard' ></edit-confirm>
           </loader-component>  
           </grid-card>
             <grid-card header="Education Details" *ngIf='setCardVisibility(educationCard.id,cardsVisibilityArr)' [formReadonly]='educationCard.readOnlyFormState' [isSentForApproval]="GetApprovalStatus(educationCard,approvalStatus)" [nonEditable]='isViewOnly' 
             (addActivationChanged)="GridAddNew($event,educationCard)">
                     <repeater [source]='educationCard.model' *ngIf='educationCard.readOnlyFormState'>
                        <template #tmplRepeater let-item='item'>
                            <div class="saved-data">
                                <div class="row m-bottom10">
                                    <div class="col s7">
                                        <div class="view-form-info" >
                                            <div *ngFor="let p of educationCard.hub[1].options">
                                            <h5 *ngIf='p.id==item.qualificationID'>{{p.text}}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col s5 valign right-align" *ngIf='item.stageStatusID==0'>
                                        <span *ngIf='!isViewOnly' (click)="EditGridData(item,educationCard)">
                                            <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                        </span>
                                        <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,educationCard)">
                                            <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                        </span>
                                    </div>
                                </div>
                                <div class="row m-bottom10">
                                    <div class="col s10">
                                        <div class="view-form-info">
                                            <h5>{{item.institute}}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m-bottom10">
                                    <div class="col s12">
                                        <div class="view-form-info" *ngFor="let p of educationCard.hub[6].options">
                                            <h6 *ngIf='p.id==item.qualificationType'>{{item.university}}  <span class="small-text"> - {{p.text}}</span></h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12">
                                        <div class="view-form-info">
                                            <h6>Grade Class <span class="small-text"> - {{item.grade_Class}}</span></h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s6">
                                        <div class="view-form-info">
                                            <h5>{{item.passingYear}}</h5>
                                            <h6>Year</h6>
                                        </div>
                                    </div>
                                    <div class="col s6">
                                        <div class="view-form-info">
                                            <h5>{{item.specialization}}</h5>
                                            <h6>Specialization</h6>
                                        </div>
                                    </div>
                                </div>
                                 <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                            </div>
                        </template>
                    </repeater>
            <ui-grid-form [header]="educationCard.header + ' Education Details'" #educationForm *ngIf='!educationCard.readOnlyFormState' (cancelData) = "CancelEdit($event,educationCard)"  
                        (addData)= "ConfirmEdit($event,educationCard,educationForm.mainForm,'v1/employee/personal/qualificationmanage/','eduCard',educationCard.id,'qualifications')"
                        [controlMetas]="educationCard.hub"
                        [model]="educationCard.model"
                        [errorOnlyOnSubmit]='educationCard.cardSubmitted'
                        [formReadonly]='educationCard.readOnlyFormState'
                        formCss='view-card saved-data'
                         inputLabelPosition='top'
                           columnOrientation='1'
                        controlCss='view-form-info'>
             </ui-grid-form>
           <loader-component [(loading)]='educationCard.isCardLoader' [isConformationModal]='educationCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
            <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'qualificationmanage',educationCard,'educationCard',educationCard.id,'qualifications')" (CancelDelete)="CancelEdit($event,educationCard)"></confirm>
            <edit-confirm *ngIf='isEditCard' ></edit-confirm>
           </loader-component>  
           </grid-card>
           <card header="Passport Details" *ngIf='setCardVisibility(passportCard.id,cardsVisibilityArr)' [formReadonly]='passportCard.readOnlyFormState' [nonEditable]='isViewOnly' [isSentForApproval]="GetApprovalStatus(passportCard,approvalStatus)" (readOnlyChanged)="personalFormReadOnlyChanged($event,passportCard);displaypassport=true"
                (saveData) = "ConfirmEdit($event,passportCard,passportForm.mainForm,'v1/employee/personal/passportmanage/', 'passportCard',passportCard.id,'employeePassport')"
                (cancelData) = "CancelEdit($event, passportCard);displaypassport=false">
                <div [class.zeroHeight]="oldData.employeePassport.length==0 && displaypassport!=true">
                    <ui-form #passportForm  
                        [controlMetas]="passportCard.hub"
                        [model]="passportCard.model"
                        [errorOnlyOnSubmit]='passportCard.cardSubmitted'
                        [formReadonly]='passportCard.readOnlyFormState'
                        formCss='view-card'
                         columOrientation='2'
                        inputLabelPosition='top'
                        controlCss='view-form-info'>
                         <ui-control-item for='dateOfIssue' behaviours='[{"name":"max","value":"{{passportCard.model.dateOfExpiry}}:mm/dd/yyyy"}]'
                            depends='["dateOfExpiry:changeattrs"]' changeattrs='["max"]'>
                        </ui-control-item>
                        <ui-control-item for='dateOfExpiry' behaviours='[{"name":"min","value":"{{passportCard.model.dateOfIssue}}:mm/dd/yyyy"}]'
                            depends='["dateOfIssue:changeattrs"]' changeattrs='["min"]'>
                        </ui-control-item>
                    </ui-form>
                    </div>
            <loader-component [(loading)]='passportCard.isCardLoader' [isConformationModal]='passportCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
             <edit-confirm *ngIf='isEditCard'></edit-confirm>
            </loader-component>  
            </card> 
             <grid-card header="Emergency Contact" *ngIf='setCardVisibility(emergencyCard.id,cardsVisibilityArr)' [formReadonly]='emergencyCard.readOnlyFormState' [nonEditable]='isViewOnly' [isSentForApproval]="GetApprovalStatus(emergencyCard,approvalStatus)" (addActivationChanged)="GridAddNew($event,emergencyCard)">
                    <repeater [source]='emergencyCard.model' *ngIf='emergencyCard.readOnlyFormState'>
                    <template  #tmplRepeater let-item='item'>
                    <div class="saved-data">
                        <div class="row">
                            <div class="col s7">
                                <div class="view-form-info">
                                <div *ngFor="let p of emergencyCard.hub[1].options">                             
                                    <h5 *ngIf='p.id==item.relation'>{{item.contactPersonName}}<span class="p-left10">{{p.text}}</span></h5>
                                </div>
                                </div>
                            </div>
                            <!--<div class="col s4 valign right-align" *ngIf= "!GetApprovalStatus(emergencyCard,approvalStatus)">-->
                            <div class="col s5 valign right-align" *ngIf='item.stageStatusID==0'>
                                <span *ngIf='!isViewOnly' (click)="EditGridData(item,emergencyCard)" >
                                    <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                </span>
                                <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,emergencyCard)">
                                    <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <div class="view-form-info">
                                    <h5><i class="fa fa-phone" aria-hidden="true"></i>{{item.emergencyContactNo}}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <div class="view-form-info">
                                    <h5> {{item.contactAddress}}</h5>
                                    <h6 *ngIf="item.contactAddress">Contact Person Address</h6>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s12">
                                <div class="view-form-info">
                                    <h5 class="new-line-word" *ngIf="item.emergencyEmail" ><i class="fa fa-envelope" aria-hidden="true"></i>{{item.emergencyEmail}}</h5>
                                </div>
                            </div>
                        </div>
                         <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                    </div>
                    </template>
                    </repeater>
                    <ui-grid-form #emergencyForm [header]="emergencyCard.header + ' Emergency Contact'" *ngIf='!emergencyCard.readOnlyFormState' (cancelData) = "CancelEdit($event,emergencyCard)" 
                         (addData)= "ConfirmEdit($event,emergencyCard,emergencyForm.mainForm,'v1/employee/personal/emergencymanage/','emerCoCard',emergencyCard.id,'emergencyContacts')"
                        [controlMetas]="emergencyCard.hub"
                        [model]="emergencyCard.model"
                        [errorOnlyOnSubmit]='emergencyCard.cardSubmitted'
                        [formReadonly]='emergencyCard.readOnlyFormState'
                        formCss='view-card saved-data'
                         inputLabelPosition='top'
                           columnOrientation='1'
                        controlCss='view-form-info'>
                    </ui-grid-form>
            <loader-component [(loading)]='emergencyCard.isCardLoader' [isConformationModal]='emergencyCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
                <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'emergencymanage',emergencyCard,'emergencyCard',emergencyCard.id,'emergencyContacts')" (CancelDelete)="CancelEdit($event,emergencyCard)"></confirm>
                 <edit-confirm *ngIf='isEditCard' ></edit-confirm>
            </loader-component>        
            </grid-card>
             <grid-card header="Certification Details" *ngIf='setCardVisibility(certificationCard.id,cardsVisibilityArr)' [formReadonly]='certificationCard.readOnlyFormState' [isSentForApproval]="GetApprovalStatus(certificationCard,approvalStatus)" [nonEditable]='isViewOnly' (addActivationChanged)="GridAddNew($event,certificationCard)">
                     <repeater [source]='certificationCard.model' *ngIf='certificationCard.readOnlyFormState'>
                     <template #tmplRepeater  let-item='item'>
                     <div class="saved-data">
                        <div class="row">
                            <div class="col s8">
                                <div class="view-form-info">
                                 <div *ngFor="let p of certificationCard.hub[0].options"> 
                                    <h5 *ngIf='p.id==item.certificationID'>{{p.text}}</h5>
                                </div>
                                    <h6 *ngIf='item.grade'>Grade Class- <span class="small-text">{{item.grade}}</span></h6>
                                </div>
                            </div>
                            <div *ngIf='item.stageStatusID==0' class="col s4 valign right-align">
                                <span *ngIf='!isViewOnly' (click)="EditGridData(item,certificationCard)" >
                                    <i class="fa fa-pencil icon-btn edit" aria-hidden="true"  title="Edit"></i>
                                </span>
                                <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,certificationCard)">
                                    <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <div class="view-form-info">
                                    <h5>{{item.certificationNumber}}</h5>
                                    <h6 *ngIf="item.certificationNumber">Certification Number</h6>
                                </div>
                            </div>
                            <div class="col s6">
                                <div class="view-form-info">
                                    <h5>{{item.certificationDate}}</h5>
                                    <h6>Certification Date</h6>
                                </div>
                            </div>
                        </div>
                         <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                    </div>
                     </template>
                     </repeater>
                   
                    <ui-grid-form #certificationForm [header]="certificationCard.header + ' Certification Details'" *ngIf='!certificationCard.readOnlyFormState'(cancelData) = "CancelEdit($event,certificationCard)"
                         (addData)= "ConfirmEdit($event,certificationCard,certificationForm.mainForm,'v1/employee/personal/certificationmanage/','certificationCard',certificationCard.id,'certifications')"                       
                        [controlMetas]="certificationCard.hub"
                        [model]="certificationCard.model"
                        [errorOnlyOnSubmit]='certificationCard.cardSubmitted'
                        [formReadonly]='certificationCard.readOnlyFormState'
                        formCss='view-card saved-data'
                         inputLabelPosition='top'
                           columnOrientation='1'
                        controlCss='view-form-info'>
                          <ui-control-item for='certificationDate' behaviours='[{"name":"max","value":"today"}]' ></ui-control-item>
                    </ui-grid-form>
            <loader-component [(loading)]='certificationCard.isCardLoader' [isConformationModal]='certificationCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
             <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'certificationmanage',certificationCard,'certificationCard',certificationCard.id,'certifications')" (CancelDelete)="CancelEdit($event,certificationCard)"></confirm>
            <edit-confirm *ngIf='isEditCard' ></edit-confirm>
            </loader-component> 
             </grid-card>
              <grid-card header="Dependent Details" *ngIf='setCardVisibility(dependentCard.id,cardsVisibilityArr)' [formReadonly]='dependentCard.readOnlyFormState' [isSentForApproval]="GetApprovalStatus(dependentCard,approvalStatus)" [nonEditable]='isViewOnly' (addActivationChanged)="GridAddNew($event,dependentCard)">
                     <repeater [source]='dependentCard.model' *ngIf='dependentCard.readOnlyFormState'>
                      <template  #tmplRepeater let-item='item'>
                      <div class="saved-data">
                        <div class="row valign-wrapper">
                            <div class="col s7">
                                <div class="view-form-info">
                                <div *ngFor="let p of dependentCard.hub[1].options">
                                    <h5 *ngIf='p.id==item.relationWithDependent'>{{item.dependentName}}<span class="p-left10">{{p.text}}</span></h5>
                                </div>
                                    <h6>
                                      <i class="fa fa-birthday-cake" aria-hidden="true"></i>{{item.dateOfBirthOfDependent}} 
                                       <!--<span class="small-text m-left5">(28 Years)</span>-->
                                    </h6>
                                </div>
                            </div>
                             <div class="col s5 valign right-align" *ngIf='item.stageStatusID==0 '>
                                    <span *ngIf='!isViewOnly' (click)="EditGridData(item,dependentCard)">
                                    <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                    </span>
                                    <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,dependentCard)">
                                            <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                    </span>
                            </div>
                        </div>
                         <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                       </div>
                      </template>
                      </repeater>
                    <ui-grid-form #dependentForm  [header]="dependentCard.header + ' Dependent Details'" *ngIf='!dependentCard.readOnlyFormState' (cancelData) = "CancelEdit($event,dependentCard)" 
                        (addData)= "ConfirmEdit($event,dependentCard,dependentForm.mainForm,'v1/employee/personal/dependentmanage/','dependentCard',dependentCard.id,'dependents')"                      
                        [controlMetas]="dependentCard.hub"
                        [model]="dependentCard.model"
                        [errorOnlyOnSubmit]='dependentCard.cardSubmitted'
                        [formReadonly]='dependentCard.readOnlyFormState'
                        formCss='view-card saved-data'
                         inputLabelPosition='top'
                        columnOrientation='1'
                        controlCss='view-form-info'>
                        <ui-control-item for='dateOfBirthOfDependent' behaviours='[{"name":"max","value":"today"}]' ></ui-control-item>
                    </ui-grid-form >
                    
            <loader-component [(loading)]='dependentCard.isCardLoader' [isConformationModal]='dependentCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
              <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'dependentmanage',dependentCard,'dependentCard',dependentCard.id,'dependents')" (CancelDelete)="CancelEdit($event,dependentCard)"></confirm>
              <edit-confirm *ngIf='isEditCard' ></edit-confirm>
            </loader-component> 
            </grid-card>
              <grid-card header="Visa Details" *ngIf='setCardVisibility(visaCard.id,cardsVisibilityArr)' [formReadonly]='visaCard.readOnlyFormState' [isSentForApproval]="GetApprovalStatus(visaCard,approvalStatus)" [nonEditable]='isViewOnly' (addActivationChanged)="GridAddNew($event,visaCard)">
                      <repeater [source]='visaCard.model' *ngIf='visaCard.readOnlyFormState'>
                      <template  #tmplRepeater let-item='item'>
                      <div class="saved-data">
                        <div class="row">
                            <div class="col s8">
                                <div class="view-form-info">
                                 <div *ngFor="let p of visaCard.hub[1].options"> 
                                    <h5 *ngIf='p.id==item.visaTypeID'>{{p.text}}</h5>
                                </div>
                                <div *ngFor="let p of visaCard.hub[0].options"> 
                                    <h6 *ngIf='p.id==item.countryID'>Country<span class="p-left10">{{p.text}}</span></h6>
                                </div>
                                    <h6>Valid Till<span class="p-left10">{{item.validTill}}</span></h6>
                                </div>
                            </div>
                             <div class="col s4 valign right-align" *ngIf='item.stageStatusID==0'>
                                <span *ngIf='!isViewOnly' (click)="EditGridData(item,visaCard)">
                                    <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                                </span>
                                <!--<i class="fa fa-cloud-download icon-btn download" aria-hidden="true" title="Download"></i>-->
                                <span *ngIf='!isViewOnly' (click)="DeleteGridData(item,visaCard)">
                                    <i class="fa fa-trash icon-btn remove" aria-hidden="true" title="Remove"></i>
                                </span>
                            </div>
                        </div>
                         <div class="approval-data-msg" *ngIf='item.stageStatusID==1' >Data sent for approval. Cannot update data.</div>
                       </div>
                      </template>
                      </repeater>
                    <ui-grid-form #visaForm  [header]="visaCard.header + ' Visa Details'" *ngIf='!visaCard.readOnlyFormState' (cancelData) = "CancelEdit($event,visaCard)"
                     (addData)= "ConfirmEdit($event,visaCard,visaForm.mainForm,'v1/employee/personal/visamanage/','visaCard',visaCard.id,'visas')"
                        [controlMetas]="visaCard.hub"
                        [model]="visaCard.model"
                        [errorOnlyOnSubmit]='visaCard.cardSubmitted'
                        [formReadonly]='visaCard.readOnlyFormState'
                        formCss='view-card saved-data'
                        columnOrientation='1'
                         inputLabelPosition='top'
                        controlCss='view-form-info'>
                         <ui-control-item for='validTill' behaviours='[{"name":"min","value":"today"}]' ></ui-control-item>
                    </ui-grid-form>
             <loader-component [(loading)]='visaCard.isCardLoader' [isConformationModal]='visaCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
              <confirm *ngIf='isDeleteCard' (DeleteControl)="DeleteData($event,'visamanage',visaCard,'visaCard',visaCard.id,'visas')" (CancelDelete)="CancelEdit($event,visaCard)"></confirm>
                <edit-confirm *ngIf='isEditCard' ></edit-confirm>
            </loader-component>     
             </grid-card>
             <card header="Medical History" *ngIf='setCardVisibility(medicalCard.id,cardsVisibilityArr)' [formReadonly]='medicalCard.readOnlyFormState' [isSentForApproval]="GetApprovalStatus(medicalCard,approvalStatus)" [nonEditable]='isViewOnly' (readOnlyChanged)="personalFormReadOnlyChanged($event,medicalCard);displaymedical=true"
                (saveData) = "ConfirmEdit($event,medicalCard,medicalForm.mainForm,'v1/employee/personal/medicalhistorymanage/','pDCard',medicalCard.id,'employeeMedicalHistories')"
                (cancelData) ="CancelEdit($event,medicalCard);displaymedical=false">
                  <div [class.zeroHeight]="oldData.employeeMedicalHistories.length==0 && displaymedical!=true">
                    <ui-form #medicalForm
                        [controlMetas]="medicalCard.hub"
                        [model]="medicalCard.model"
                        [errorOnlyOnSubmit]='medicalCard.cardSubmitted'
                        [formReadonly]='medicalCard.readOnlyFormState'
                        formCss='view-card'
                        columnOrientation='1'
                        inputLabelPosition='top'
                        controlCss='view-form-info'>
                    </ui-form>
                 </div>
            <loader-component [(loading)]='medicalCard.isCardLoader' [isConformationModal]='medicalCard.isConfirmation' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isCard'">
             <edit-confirm *ngIf='isEditCard'></edit-confirm>
            </loader-component>
            </card>
        </div>
    </div>
        <loader-component [(loading)]='loaderModal' [(showMsg)]='loaderModalMsg' [callBackMsg]='loaderModalText' [cardLoading]="'isPage'" [isConformationModal]="isConformationModal"></loader-component>
    `,
   // directives: [ROUTER_DIRECTIVES, Card, UiForm, UiInput, UiFormControl, UIGrid, UIGridColumn, Repeater, GridCard, UiGirdForm, LoaderComponent, Confirmation, EditConfirmation]
})
export class PersonalComponent {
    id: string;
    tempData: any = [];
    cardsVisibilityArr: Array<number> = [];// this need to be populated fro0m server data , by default it's empty no nulll'
    rdata: any;
    personCard: CardModel<PersonalDetailsModel>;
    addressCard: GridCardModel<Address>;
    medicalCard: CardModel<MedicalHistoryModel>;
    passportCard: CardModel<PassportDetailsModel>;
    educationCard: GridCardModel<Education>;
    emergencyCard: GridCardModel<EmergencyContacts>;
    certificationCard: GridCardModel<CertificationDetailsModel>;
    dependentCard: GridCardModel<DependentsModel>;
    gapCard: GridCardModel<GapExperienceModel>;
    visaCard: GridCardModel<VisaDetailsModel>;

    isReadOnlyMode: boolean = true;
    isSearchUser: boolean = false;
    dropdowncard: Array<any> = [];
    userid: string;
    isViewOnly: boolean = true;
    params: any = [];
    oldData: any;
    responseModel: any;
    displaypassport: boolean = false;
    displaymedical: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    loaderModal: boolean = false;
    isConformationModal: boolean = false;
    componentInfo: any;
    isEditCard: boolean = false;
    isDeleteCard: boolean = false;
    approvalStatus: Array<number>;
    constructor(private _cacheService: CacheService, private _activatedRoute: ActivatedRoute,private _router:Router, private _httpService: HttpService, private _autoMapperService: AutoMapperService, private userService: UserService) {
        //console.log(this._activatedRoute.root.currentInstruction.component.routeData.data);
        this.loaderModal = true;
        this.rdata = this._activatedRoute.parent;
        if (this.rdata)
            this.isReadOnlyMode = this.isViewOnly = this.displaymedical = this.displaypassport = this.rdata.snapshot.data["isViewOnly"];

        if (this.rdata) {
            this.InitializeCards(this._cacheService.getParams(this.rdata.snapshot.data["from"]));

            //  this.InitializeDropdownsForModels();
        }
        this.id = this._cacheService.getParams(this.rdata.snapshot.data["from"]).id;
        this.componentInfo = this._cacheService.getParams("componentData");
    }

    ngOnInit() {
        this.oldData = this._cacheService.getParams("profile");
        if (this.isReadOnlyMode) {
            if (this.oldData.role.length != 0) {
                if (this.oldData.role[0].roleId > 12 && this.oldData.role[0].roleId != 27 && this.oldData.role[0].roleId != 35 && this.oldData.role[0].roleId != 38 && this.oldData.role[0].roleId != 24) {
                    this._router.navigateByUrl('/my/dashboard');
                }
            }
        }
    }

    routerOnActivate(curr: any, prev?: any): void {
        //console.log(curr);
    }


    InitializeCards(data) {

        this.personCard = new CardModel<PersonalDetailsModel>(1, PersonalDetailsModel, false, this._autoMapperService, data, this.isViewOnly, data["approvals"]);
        this.addressCard = new GridCardModel<Address>(2, Address, true, null, data["addresses"], this.isViewOnly, data["approvals"]);
        this.passportCard = new CardModel<PassportDetailsModel>(4, PassportDetailsModel, false, this._autoMapperService, data["employeePassport"][0], this.isViewOnly, data["approvals"]);
        this.medicalCard = new CardModel<MedicalHistoryModel>(10, MedicalHistoryModel, false, this._autoMapperService, data["employeeMedicalHistories"][0], this.isViewOnly, data["approvals"]);
        // this.gapCard = new GridCardModel<GapExperienceModel>(GapExperienceModel, true, null, null, this.isViewOnly);
        this.educationCard = new GridCardModel<Education>(3, Education, true, null, data["qualifications"], this.isViewOnly, data["approvals"]);
        this.emergencyCard = new GridCardModel<EmergencyContacts>(5, EmergencyContacts, true, null, data["emergencyContacts"], this.isViewOnly, data["approvals"]);
        this.certificationCard = new GridCardModel<CertificationDetailsModel>(6, CertificationDetailsModel, true, null, data["certifications"], this.isViewOnly, data["approvals"]);
        this.dependentCard = new GridCardModel<DependentsModel>(17, DependentsModel, true, null, data["dependents"], this.isViewOnly, data["approvals"]);
        this.visaCard = new GridCardModel<VisaDetailsModel>(8, VisaDetailsModel, true, null, data["visas"], this.isViewOnly, data["approvals"]);

        this.dropdowncard.push(this.personCard);
        this.dropdowncard.push(this.educationCard);
        this.dropdowncard.push(this.emergencyCard);
        this.dropdowncard.push(this.certificationCard);
        this.dropdowncard.push(this.visaCard);
        this.dropdowncard.push(this.dependentCard);
        this.InitializeDropdownsForModels();
        this.cardsVisibilityArr = data["cards"];
        this.ApprovalData();

    }
    InitializeDropdownsForModels() {
        let dropdowns = this._cacheService.getParams("dropdowns");
        //console.log(dropdowns);
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
    personalFormReadOnlyChanged(e, model) {
        model.readOnlyFormState = e;
    }
    CancelEdit(e, model) {
        model.resetModel();
        model.data = model.resetDataModel();
        model.cardSubmitted = false;
        model.readOnlyFormState = true;
        model.isConfirmation = false;
        model.isCardLoader = false;
        this.isDeleteCard = false;
    }
    UpdatePersonalData(e: any, model, url, componentName, componentId, dataValueName) {
        var self = this;
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
    CancleGridEdit(e, objectName) {
        var model = this[objectName];
        // this._autoMapperService.Map(this.oldData, model.data);
        model.model = model.backUpModel;
        model.readOnlyFormState = true;
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
                // if (JSON.stringify(model.model) == JSON.stringify(model.backUpModel) && model.model.id != "") {
                if (myForm.pristine && model.model.id != "") {
                    Materialize.toast('No change in data.', 3000, 'successTost');
                    model.readOnlyFormState = true;
                }
                else {
                    this.loadLoader(model);
                    this.UpdatePersonalData(e, model, url, componentName, componentId, dataValueName);
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

    UpdateGridData(e, model, url, componentName, componentId, dataValueName) {
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
                if (dataValueName != "addresses") {
                    if (objArray[0].id == 0 || objArray[0].id == "") {
                        objArray[0].stageStatusID = 1;
                        model.model.push(objArray[0]);
                        model.backUpModel.push(objArray[0]);
                    }
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
                    if (dataValueName != "addresses") {
                        model.model.push(objArray[0]);
                        model.backUpModel.push(objArray[0]);
                    }
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

    DeleteGridData(item, cardModel) {
        cardModel.model = item;
        cardModel.readOnlyFormState = false;
        cardModel.isConfirmation = true;
        cardModel.isCardLoader = true;
        cardModel.header = "Delete"
        this.isDeleteCard = true;
    }
    DeleteData(e, url, cardModel, componentName, componentId, dataValueName) {
        var self = this;
        var objArray = new Array<any>();
        objArray.push(cardModel.model);
        var link = HttpSettings.apiBaseUrl + HttpSettings.apiEmpPersonalUrl + url + "/" + this.id + "?isDeleted=true";
        this.PostData(link, cardModel["getChangeSet"](componentName, componentId, "id"), cardModel, function () {
            //   cardModel.model = cardModel.backUpModel;
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
        this._httpService.post(url, postData)
            .subscribe(
            data => {
                self.responseModel = data;
                self.loaderModalText = "Successfully updated record";
                self.loaderModalMsg = true;
                //TimerWrapper.setTimeout(() => {
                    cardModel.isCardLoader = false;
                    cardModel.isConfirmation = false;
                    self.loaderModalText = "";
                    self.loaderModalMsg = false;
                    self.isEditCard = false;
                    self.isDeleteCard = false;
              //  }, 2000);
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
            //() => console.log('Post request has Completed')
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