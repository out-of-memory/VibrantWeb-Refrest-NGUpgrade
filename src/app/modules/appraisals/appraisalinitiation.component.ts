import { Component } from '@angular/core';
import { HttpService, HttpSettings } from './../../services';
import { CacheService } from '../../servicesFolder/CacheService';
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import { MaterializeDirective } from "angular2-materialize";
import { ActivatedRoute } from '@angular/router';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'app-appraisal-initiation',
    templateUrl: './appraisalinitiation.component.html',
})
export class AppraisalInitiationComponent {
    mainEmpList: any;
    filterEmpList: any;
    rowData: Array<any> = [];
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    isShow: boolean = false;
    confirmUnfreezed: boolean = false;
    confirmFreezed: boolean = false;
    unfreezedComment: any = "";
    freezedComment: any = "";
    selectedList: any = "";
    allManagers: any = "";
    selectedLocation: any = 0;
    selectedLevel: any = 0;
    employeeList: Array<any> = [];
    searchEmp: any = "";
    showFilterOption: boolean = false;
    searchEmpShow: any = "";

    constructor(private routeParams: ActivatedRoute, private _cacheService: CacheService, private _httpService: HttpService) {

    }

    populatelist(val) {
        this.loaderModal = true;
        this.resetFiltter();
        var url = HttpSettings.apiBaseUrl + "v1/appraisal/get-all-employess/" + val;
        this._httpService.get(url).subscribe(
            data => {
                this.mainEmpList = data;
                url = HttpSettings.apiBaseUrl + "v1/appraisal/get-all-managers";
                this._httpService.get(url).subscribe(
                    data => {
                        this.allManagers = data;
                        this.populategrid(this.mainEmpList)
                    },
                    error => { this.loaderModal = false });
            },
            error => { this.loaderModal = false });
    }

    populategrid(data) {
        this.rowData = new Array<any>();
        this.filterEmpList = new Array();
        for (var i = 0; i < data.length; i++) {
            this.filterEmpList.push(data[i]);
            this.filterEmpList[i].isSelect = false;
        }
        this.rowData = this.filterEmpList;
        this.isShow = true;
        this.loaderModal = false;
    }

    initiatEmp(data) {
        this.loaderModal = true;
        var tempData = data.filter(function (el) {
            if (el.isSelect == true) {
                this.allManagers.filter(function (item) {
                    if (item.id == el.appraiserId) {
                        el.appraiserName = item.text;
                    };
                    if (item.id == el.reviewerId) {
                        el.reviewerName = item.text;
                    };
                });
                return true;
            };
        }.bind(this));
        if (tempData.length > 0) {
            var url = HttpSettings.apiBaseUrl + "v1/appraisal/initiat-appraisal";
            this._httpService.post(url, tempData).subscribe(
                data => {
                    if (data == true) {
                        Materialize.toast('Selected Employees Initiated Successfully', 3000, 'successTost');
                        this.populatelist(this.selectedList)
                    }
                    else {
                        Materialize.toast('Somthis Wrong', 3000, 'errorTost');
                    }
                },
                error => { this.loaderModal = false });
        }
        else {
            this.loaderModal = false
            Materialize.toast('Select any data to Initiat', 3000, 'errorTost');
        }
    }

    FreezedEmp(data) {
        this.loaderModal = true;
        var tempData = data.filter(function (el) {
            if (el.isSelect == true) {
                el.freezedComment = this.freezedComment;
                return true;
            }
        }.bind(this));
        if (tempData.length > 0) {
            var url = HttpSettings.apiBaseUrl + "v1/appraisal/freezed-appraisal/1";
            this._httpService.post(url, tempData).subscribe(
                data => {
                    if (data == true) {
                        Materialize.toast('Selected Employees Freezed Successfully', 3000, 'successTost');
                        this.ConfirmClose();
                        this.populatelist(this.selectedList)
                    }
                    else {
                        Materialize.toast('Somthis Wrong', 3000, 'errorTost');
                    }
                },
                error => { this.loaderModal = false });
        }
        else {
            this.loaderModal = false
            this.ConfirmClose();
            Materialize.toast('Select any data to Freeze', 3000, 'errorTost');
        }
    }

    UnFreezedEmp(data) {
        this.loaderModal = true;
        var tempData = data.filter(function (el) {
            if (el.isSelect == true) {
                el.freezedComment = this.unfreezedComment;
                return true;
            }
        }.bind(this));
        if (tempData.length > 0) {
            var url = HttpSettings.apiBaseUrl + "v1/appraisal/freezed-appraisal/0";
            this._httpService.post(url, tempData).subscribe(
                data => {
                    if (data == true) {
                        Materialize.toast('Selected Employees UnFreezed Successfully', 3000, 'successTost');
                        this.ConfirmClose();
                        this.populatelist(this.selectedList)
                    }
                    else {
                        Materialize.toast('Somthis Wrong', 3000, 'errorTost');
                    }
                },
                error => { this.loaderModal = false });
        }
        else {
            this.loaderModal = false
            this.ConfirmClose();
            Materialize.toast('Select any data to UnFreeze', 3000, 'errorTost');
        }
    }

    ConfirmClose() {
        this.confirmFreezed = false;
        this.confirmUnfreezed = false;
        this.unfreezedComment = "";
        this.freezedComment = "";
    }

    filtterEmp() {
        var tempData = Object.assign([], this.mainEmpList);
        if (+(this.selectedLevel) != 0) {
            tempData = tempData.filter(function (el) {
                if (+(this.selectedLevel) != 0)
                    return el.grade == +(this.selectedLevel)
            }.bind(this));
        }
        if (this.searchEmp != "") {
            tempData = tempData.filter(function (el) {
                return String(el.empID).indexOf(String(this.searchEmp)) > -1;
            }.bind(this));
        }
        if (+(this.selectedLocation) != 0) {
            tempData = tempData.filter(function (el) {
                return el.location == this.selectedLocation
            }.bind(this));
        }
        this.rowData = new Array<any>();
        this.filterEmpList = new Array();
        this.filterEmpList = tempData;
        this.rowData = this.filterEmpList;
    }

    filterName() {
        this.employeeList = this.mainEmpList.filter(function (el) {
            return el.empName.toLowerCase().indexOf(this.searchEmp.toLowerCase()) > -1 || String(el.empID).indexOf(String(this.searchEmp)) > -1;
        }.bind(this));
    }

    resetFiltterEmp() {
        this.rowData = new Array<any>();
        this.filterEmpList = new Array();
        this.filterEmpList = Object.assign([], this.mainEmpList);
        this.rowData = this.filterEmpList;
    }

    selectEmployee(id, name) {
        this.employeeList = new Array<any>();
        this.searchEmp = id;
        this.searchEmpShow = name + ' (' + id + ')';
    }

    resetFiltter() {
        this.selectedLocation = 0;
        this.selectedLevel = 0;
        this.searchEmp = "";
        this.searchEmpShow = "";
        this.showFilterOption = false;
    }
}
