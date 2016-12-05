import { Component} from '@angular/core';
import {HttpService} from '../../servicesFolder/http/http.service';
import {AutoMapperService} from '../../servicesFolder/AutoMapperService';
import {HelpDeskModel, HelpDeskList, HelpDeskCommentModel} from '../../models/HelpDeskModel';
import {UiForm, UiFormControl} from '../../infrastructure/components/UiForm';
import {CacheService} from '../../servicesFolder/CacheService';
import {BasicCellC, BasicGrid} from '../../infrastructure/components/basic-grid';
import {List, Map} from 'immutable';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"
import {LoaderComponent} from  '../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";
//import { FileUpload } from  '../../infrastructure/components/file-upload';
import {ActivatedRoute} from '@angular/router';
import {FileNamePipe} from '../../infrastructure/pipes/pipes'
declare var $: any;

@Component({
    selector: 'newhelpdesk',
    templateUrl: './newhelpdesk.component.html',
   // directives: [UiForm, UiFormControl, MaterializeDirective, FileUpload, LoaderComponent, ROUTER_DIRECTIVES],
    providers: [HttpService],
   // pipes: [FileNamePipe]
})

export class NewHelpDeskComponent {
    helpDeskModel: HelpDeskModel;
    helpDeskHub: any;

    helpDeskCommentModel: HelpDeskCommentModel
    helpDeskCommentHub: any;

    categotyCollection: Array<any>;
    subCategoryCollection: Array<any>;
    helDeskattachedFile: string;

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;

    helpDeskList: HelpDeskList;
    helpDeskTicketList: Array<HelpDeskList>;
    rowData: any;
    isConformationModal: boolean = false;
    attachedFilesArray: Array<any>;
    formSubmitted: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.populateNewTicket();
    }

    getCurrentDateTime() {
        var currentTime = new Date().getTime();
        var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
        var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
        return stamp.toString();
    }

    populateNewTicket() {
        this.loaderModal = true;
        this.setHelpDeskTicket();
        this.categotyCollection = new Array<any>();
        this.subCategoryCollection = new Array<any>();
        this.getDropDownValue();
    }

    FileUploaded(data: any) {
        data = JSON.parse(data);
        this.attachedFilesArray.push(data.name);
    }

    onCategorySelected(val: any) {
        if (val == 0) {
            this.helpDeskModel.categoryID = +(val);
            this.subCategoryCollection.length = 0;
            this.subCategoryCollection.push({ "id": 0, "text": "Select" });
        }
        else {
            this.helpDeskModel.categoryID = +(val);
            this.loaderModal = true;
            this.subCategoryCollection.length = 0;
            var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-subcategory/" + val
            this._httpService.get(url)
                .subscribe
                (
                data => {
                    this.subCategoryCollection = data.subCategories;
                    this.helpDeskModel.subCategoryID = this.subCategoryCollection[0].id;
                    this.loaderModal = false;
                },
                error => console.log(error)
                );
        }
    }

    onSubCategorySelected(val: any) {
        this.helpDeskModel.subCategoryID = +(val);
    }

    getDropDownValue() {
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-dropdown"
        this._httpService.get(url)
            .subscribe
            (
            data => {
                this.categotyCollection.push({ "id": 0, "text": "Select" });
                this.subCategoryCollection.push({ "id": 0, "text": "Select" });
                data.categories.forEach(element => {
                    this.categotyCollection.push({ "id": element.id, "text": element.text });
                });
               
                this.ResetDropdownData();
                this.loaderModal = false;
            },
            error => {
                console.log(error)
                this.loaderModal = false;
            }
            );
    }
    addUpdateTickets(myForm, myCommentForm) {
        if (this.helpDeskModel.categoryID != 0 && this.helpDeskModel.subCategoryID != 0) {
            this.loaderModal = true;
            var todayTime = this.getCurrentDateTime();
            let url = HttpSettings.apiBaseUrl + "v1/HelpDesk/for-addupdate-ticket/" + todayTime;
            this.helpDeskModel.attachedFiles = this.attachedFilesArray.join('|');
            if (myForm.valid && myCommentForm.valid) {
                this.helpDeskModel.comments = this.helpDeskCommentModel.comments;
                this.helpDeskModel.IssueDate = todayTime;
                this.addUpdateTicket(url, this.helpDeskModel, null, myForm);
                this.subCategoryCollection = [];
                this.subCategoryCollection.push({ "id": 0, "text": "Select" });
                this.ResetDropdownData();
            }
            else {
                this.formSubmitted = true;
            }
            this.loaderModal = false;
        }
        else {
            Materialize.toast('Please select category and sub category', 5000, 'red');
            this.formSubmitted = true;
        }
    }

    addUpdateTicket(url, postData, callBack = null, submittedForm) {
        let isAdd = postData.id == "" ? 0 : 1;
        this._httpService.post(url, postData)
            .subscribe(
            data => {
                if (typeof callBack === 'function') {
                    callBack();
                }
                if (data == true) {
                    Materialize.toast('Your help desk ticket has been created', 5000, 'green')
                    this.setHelpDeskTicket();
                    this.getDropDownValue();
                    this.formSubmitted = false;
                }
                else {
                    Materialize.toast('Issue in creating help desk ticket.Please contact System Administrator', 5000, 'red');
                    this.formSubmitted = true;
                }
            },
            error => console.log(error),
            () => console.log('Post request has Completed')
            );
    }

    ResetDropdownData() {//RS: 05/12/2016 while upgrading .. .find function was missing so chnaged it with filter()[0], check if this doesn;t work
        this.helpDeskModel.categoryID = this.categotyCollection.filter(obj => obj.text == "Select")[0].id;
        this.helpDeskModel.subCategoryID = this.subCategoryCollection.filter(obj => obj.text == "Select")[0].id;
    }
    setHelpDeskTicket() {
        this.attachedFilesArray = new Array<any>();
        this.helpDeskModel = new HelpDeskModel();
        this.helpDeskModel.attachedFiles = "";
        this.helpDeskModel.severity = 1;
        this.helpDeskHub = this.helpDeskModel["hub"];
        this.helpDeskCommentModel = new HelpDeskCommentModel();
        this.helpDeskCommentHub = this.helpDeskCommentModel["hub"];
        this.populateCachedData();
    }

    populateCachedData() {
        var cachedUserDetails = this._cacheService.getParams('profile');
        this.helpDeskModel.seatingLocation = cachedUserDetails.location;
        this.helpDeskModel.reportingToName = cachedUserDetails.r1.name;
        this.helpDeskModel.assignedTo = cachedUserDetails.r1.id;
        this.helpDeskModel.phoneExtension = cachedUserDetails.extension;
    }

    removeAttachment(attachedFile: any) {
        let indexToRemove = this.attachedFilesArray.indexOf(attachedFile);
        this.attachedFilesArray.splice(indexToRemove, 1);
    }

    showImageModal(event) {
        Materialize.toast('Please select an image of jpeg, jpg or png file format.', 7000, 'errorTost');
    }
}
