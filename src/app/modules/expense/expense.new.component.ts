import { Component, OnInit } from '@angular/core';
import { NewExpenseModel, ExpenseDetails } from '../../model/NewExpenseDataModel';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../../servicesFolder/CacheService';
import * as Materialize from "angular2-materialize";
import { Subscription } from 'rxjs';
import { MaterializeDirective } from "angular2-materialize";

@Component({
    selector: 'expense-new',
    templateUrl: './expense-new-template.html',
    styles: [`
            #modal
            {
                width:65%;
            }
            .isRed
            {
                color: red;
            }
    `],

})
export class ExpenseNewComponent implements OnInit {

    expenseModel: NewExpenseModel;
    expensehub: any;
    expenseDetailCollection: Array<any> = [];
    url = 'assets/TestData/expense.json';
    expenseDetail: ExpenseDetails[];

    detailHub: any;
    totalExpenses: string = '';
    showModal: boolean = false;
    errorCollection: Array<any> = [];
    detailCount: number = 0;
    expenseCategories: Array<any> = [];
    isValid: boolean = false;
    isValidCollection: Array<any> = [];
    lastvalid: boolean;
    amountReimbursed: string = '';
    advance: string = '';
    location: string = '';
    currentCurrency: string = '';
    formSubmitted: boolean = false;
    allRowsFilled: boolean = false;
    imageModal: boolean = false;

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    globalvalidate: boolean = false;

    dateFormat: any = '';
    expenseCategoryCollection: any;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private activatedRoute: ActivatedRoute, private _cacheService: CacheService) {
        this.Component_Initialization();
        this.FillDropdowns();
    }

    GetExpenseDetails(count: number) {

        if (count === 0 || count === undefined) {
            count = 5;
        }
        else if (count < 5) {
            count = 5 - count;
        }
        else if (count == 5 || count > 5) {
            count = 0;
        }
        this.expenseDetail = Array<ExpenseDetails>();
        this._httpService.get(this.url)
            .subscribe
            (
            data => {
                for (let index = 0; index < count; index++) {
                    let element = data.expenseDetails[0];
                    let model = new ExpenseDetails();
                    this._autoMapperService.Map(element, model);

                    this.expenseDetailCollection.push(model);
                }
                this.expenseDetail = this.expenseDetailCollection;
            },
            error => console.log(error)
            );
    }

    Component_Initialization() {
        this.expenseModel = new NewExpenseModel();
        this.expensehub = this.expenseModel['hub'];
        this.detailHub = (new ExpenseDetails())['hub'];

        // this.setReportingManager(this.expenseModel);

        this.location = this._cacheService.getParams('profile').ol;

        let date = new Date();
        this.dateFormat = [{ "format": "mm/dd/yyyy", "today": "", "selectYears": 30, "max": date }];

        this.expenseCategoryCollection = this._cacheService.getParams('expenseDropdowns')["expenseCategory"];
    }

    SaveExpense(expenseDetail: ExpenseDetails[], expenseForm) {
        this.errorCollection = new Array<any>();
        this.detailCount = 0;
        this.isValidCollection = new Array<any>();
        this.globalvalidate = false;

        if (String(expenseForm._value.reimbursmenttitleControl).trim() == '') {
            expenseForm._value.reimbursmenttitleControl = "";
        }

        if (expenseForm.valid) {
            expenseDetail.forEach(element => {
                if (!(String(element.receiptNo).trim() == '' && element.expenseDate == '' && element.expenseCategoryId == '' && String(element.amount).trim() == '' && String(element.comments).trim() == '')) {
                    this.isValid = this.ValidateGrid(element);
                    if (this.isValid == false) {
                        this.globalvalidate = true;
                    }
                }
            });
            if (this.isValid || this.globalvalidate)
                this.lastvalid = this.globalvalidate;
            else
                this.lastvalid = true;
            this.currentCurrency = this.expenseModel.currencyId;
            this.showModal = true;
        }
        else { this.formSubmitted = true; }
    }

    AddRow(event) {
        event.preventDefault();
        this.allRowsFilled = false;

        for (var i = 0; i < this.expenseDetail.length; i++) {
            var element = this.expenseDetail[i];
            if (!this.allRowsFilled) {
                this.ValidateRows(element);
            }
        }

        if (this.allRowsFilled) { return false; }

        this.expenseDetail = new Array<ExpenseDetails>();
        // this.Component_Initialization();

        this._httpService.get(this.url)
            .subscribe
            (
            data => {
                for (let index = 0; index < 5; index++) {
                    let model = new ExpenseDetails();
                    model.receiptNo = data.expenseDetails[0].receiptNo;
                    model.expenseDate = data.expenseDetails[0].expenseDate;
                    model.expenseCategoryId = data.expenseDetails[0].expenseCategoryId;
                    model.amount = data.expenseDetails[0].amount;
                    model.comments = data.expenseDetails[0].comments;
                    model.attachedFile = data.expenseDetails[0].attachedFile;

                    this.expenseDetailCollection.push(model);
                }

                this.expenseDetail = this.expenseDetailCollection;
            },
            error => console.log(error)
            );
    }

    ValidateRows(element: ExpenseDetails) {
        if (element.receiptNo == '' && element.expenseDate == '' && element.expenseCategoryId == '' && element.amount == '' && element.comments == '' && element.attachedFile == '') {
            this.allRowsFilled = true;
        }
    }

    SaveAsDraft(expenseModel: NewExpenseModel, expenseDetail: ExpenseDetails[]) {

        // let url = "http://localhost:55555/v1/expense/save-update";
        let url = HttpSettings.apiBaseUrl + 'v1/expense/save-update';
        let e = new NewExpenseModel();
        let detailCount: number = 0;
        let formCount: number = 0;

        if (String(expenseModel.reimbursmenttitle).trim() == '' && Number(expenseModel.isClientReimbursment) == 0 && Number(expenseModel.clientId) == 0 && Number(expenseModel.currencyId) == 0 && Number(expenseModel.costCenterId) == 0 && Number(expenseModel.primaryApproverId) == 0) {
            formCount = formCount + 1;
        }

        this._autoMapperService.Map(expenseModel, e);
        e.isDraft = true;
        e.advance = this.advance;
        e.totalExpenses = this.totalExpenses;
        e.amountReimbursed = this.amountReimbursed;
        e.details = [];
        e.reimbursmenttitle = String(e.reimbursmenttitle).trim();

        expenseDetail.forEach(element => {
            let model = new ExpenseDetails();
            this._autoMapperService.Map(element, model);
            model.amount = String(model.amount).trim();
            model.comments = String(model.comments).trim();
            model.receiptNo = String(model.receiptNo).trim();
            model.expenseCategoryId = element.expenseCategoryId;            

            if (element.receiptNo !== '' || element.expenseDate !== '' || Number(element.expenseCategoryId) > 0 || element.amount !== '' || element.comments !== '' || element.attachedFile != '') {
                e.details.push(model);
            }
            else if (element.expenseDetailId != 0) {
                model.isDetailsValid = false;
                e.details.push(model);
                detailCount = detailCount + 1;
            }
            else if (model.receiptNo == '' && element.expenseDate == '' && Number(element.expenseCategoryId) == 0 && model.amount == '' && model.comments == '' && element.attachedFile == '') {
                detailCount = detailCount + 1;
            }
        });

        if ((detailCount == expenseDetail.length) && formCount > 0) {
            Materialize.toast('Enter atleast one value to save as draft.', 3000, 'errorTost');
            return false;
        }

        this.loaderModal = true;

        this._httpService.post(url, e).subscribe(
            data => {
                this.loaderModal = false;
                Materialize.toast('Draft Saved successfully', 3000, 'successTost');
                this.Cancel(event);
            },
            error => console.log(error),
            () => {
                this.loaderModal = false;
            }
        );
    }

    Cancel(event) {

        if (event)
            event.preventDefault();
        this.expenseDetail = new Array<ExpenseDetails>();
        this.Component_Initialization();
        this.expenseDetailCollection = new Array<any>();
        this.isValidCollection = new Array<any>();
        this.errorCollection = new Array<any>();
        this.totalExpenses = '';
        this.GetExpenseDetails(0);
        this.advance = '';
        this.amountReimbursed = '';
        this.formSubmitted = false;
    }

    ngOnInit() {

        let rdata: any;

        this.activatedRoute.params.subscribe(
            (param: any) => {
                rdata = param['expenseId'];
            });

        if (rdata === undefined) {
            this.GetExpenseDetails(0);
            return true;
        }

        let url = HttpSettings.apiBaseUrl + 'v1/expense/get-expense-list/' + rdata;

        this._httpService.get(url)
            .subscribe
            (
            data => {
                if (data == null) {
                    this.GetExpenseDetails(0);
                    return false;
                }

                this.expenseDetailCollection = new Array<any>();
                this.expenseDetail = new Array<ExpenseDetails>();
                this.expenseModel = new NewExpenseModel();

                data = data[0];
                let model = new NewExpenseModel();
                this._autoMapperService.Map(data, model);
                model.isClientReimbursment = data.isClientReimbursment <= 0 ? '' : data.isClientReimbursment;
                model.clientId = data.clientId <= 0 ? '' : data.clientId;
                model.currencyId = data.currencyId <= 0 ? '' : data.currencyId;
                model.costCenterId = data.costCenterId <= 0 ? '' : data.costCenterId;
                model.primaryApproverId = data.primaryApproverId <= 0 ? '' : data.primaryApproverId;

                // this.setReportingManager(model);

                this.expenseModel = model;

                data.details.forEach(element => {
                    let model = new ExpenseDetails();
                    this._autoMapperService.Map(element, model);
                    model.isDetailsValid = true;
                    this.expenseDetailCollection.push(model);
                });
                this.expenseDetail = this.expenseDetailCollection;

                this.advance = this.expenseModel.advance;
                this.amountReimbursed = this.expenseModel.amountReimbursed;
                this.totalExpenses = this.expenseModel.totalExpenses;

                this.GetExpenseDetails(data.details.length);

            },
            error => console.log(error)
            );
    }

    FileUploaded(data: any, item: any) {
        data = JSON.parse(data);

        let toUpdate = this.expenseDetail.indexOf(item);
        this.expenseDetail[toUpdate].attachedFile = data.name;
    }

    amountChanged(expenseDetail: ExpenseDetails[], advance) {
        let totalAmount: number = 0;
        expenseDetail.forEach(element => {
            let value = Number(element.amount);
            if (!isNaN(value))
                totalAmount = totalAmount + Number(value);
        });
        this.totalExpenses = totalAmount > 0 ? String(totalAmount.toFixed(2)) : '';

        if (Number(this.advance) > 0) {
            this.amountReimbursed = (Number(this.totalExpenses) - Number(this.advance)).toFixed(2)
        }
        else {
            this.amountReimbursed = Number(this.totalExpenses).toFixed(2);
            this.advance = '';
        }
    }

    FillDropdowns() {
        let dropdowns = this._cacheService.getParams('expenseDropdowns');

        for (let index = 0; index < this.expensehub.length; index++) {
            let element = this.expensehub[index];
            if (typeof (element.options) === 'string') {
                this.expensehub[index].options = dropdowns[element.options];
            }
        }

        for (let index = 0; index < this.detailHub.length; index++) {
            let element = this.detailHub[index];
            if (typeof (element.options) === 'string') {
                this.detailHub[index].options = dropdowns[element.options];
            }
        }
        this.expenseCategories = dropdowns['expenseCategory'];
    }

    ValidateGrid(expenseDetail: ExpenseDetails) {

        let errormModel = new ErrorModel();
        let count = 0;

        if (String(expenseDetail.receiptNo).trim() == '') {
            errormModel.detail = this.pushModalCollection(errormModel.detail, Validity[1].toString());
            this.isValid = false;
            count = count + 1;
        } else {
            errormModel.detail = this.pushModalCollection(errormModel.detail, expenseDetail.receiptNo);
            this.isValid = true;
        }

        if (expenseDetail.expenseDate == '') {
            errormModel.detail = this.pushModalCollection(errormModel.detail, Validity[1].toString());
            this.isValid = false;
            count = count + 1;
        }
        else {
            errormModel.detail = this.pushModalCollection(errormModel.detail, expenseDetail.expenseDate);
            this.isValid = true;
        }
        if (expenseDetail.expenseCategoryId == '') {
            errormModel.detail = this.pushModalCollection(errormModel.detail, Validity[1].toString());
            this.isValid = false;
            count = count + 1;
        }
        else {
            let data = this.expenseCategories[Number(expenseDetail.expenseCategoryId) - 1].text;
            errormModel.detail = this.pushModalCollection(errormModel.detail, data);
            this.isValid = true;
        }

        if (String(expenseDetail.amount).trim() == '' || isNaN(Number(expenseDetail.amount)) || Number(expenseDetail.amount) <= 0) {
            errormModel.detail = this.pushModalCollection(errormModel.detail, Validity[1].toString());
            this.isValid = false;
            count = count + 1;
        }
        else {
            errormModel.detail = this.pushModalCollection(errormModel.detail, expenseDetail.amount);
            errormModel.detail[3].isAmount = true;  /// index of Array 3 is for amount.
            this.isValid = true;
        }

        if (String(expenseDetail.comments).trim() == '') {
            errormModel.detail = this.pushModalCollection(errormModel.detail, Validity[1].toString());
            this.isValid = false;
            count = count + 1;
        }
        else {
            errormModel.detail = this.pushModalCollection(errormModel.detail, expenseDetail.comments);
            this.isValid = true;
        }

        errormModel.rowNumber = this.detailCount = this.detailCount + 1;

        if (this.isValid && count == 0)
            this.isValidCollection.push(expenseDetail);
        else
            this.isValid = false;

        this.errorCollection.push(errormModel);

        return this.isValid;
    }

    pushModalCollection(model: Details[], value: any) {
        let d = new Details();
        d.value = value;
        if (value == "Invalid")
        { d.error = true; } else { d.error = false; }
        model.push(d);
        return model;
    }

    onModalClose(event) {

        this.showModal = false;
        this.errorCollection = new Array<any>();
        this.isValidCollection = new Array<any>();
        this.detailCount = 0;
        // this.Cancel(event);
    }

    Save(expenseModel: NewExpenseModel) {

        let url = HttpSettings.apiBaseUrl + "v1/expense/save-update";
        // let url = 'http://localhost:55555/v1/expense/save-update';

        let e = new NewExpenseModel();
        this._autoMapperService.Map(expenseModel, e);
        e.details = [];
        e.isDraft = false;
        e.advance = this.advance;
        e.totalExpenses = this.totalExpenses;
        e.amountReimbursed = this.amountReimbursed;
        e.isRejected = false;
        e.reimbursmenttitle = String(e.reimbursmenttitle).trim();

        this.isValidCollection.forEach(element => {
            let model = new ExpenseDetails();

            this._autoMapperService.Map(element, model);
            model.amount = String(model.amount).trim();
            model.comments = String(model.comments).trim();
            model.receiptNo = String(model.receiptNo).trim();
            model.expenseCategoryId = element.expenseCategoryId;
            e.details.push(model);
        });
        this.loaderModal = true;
        this._httpService.post(url, e).subscribe(
            data => {
                this.loaderModal = false;
                Materialize.toast('Reimbursement Submitted Successfully', 3000, 'successTost');
                this.showModal = false;
                this.Cancel(event);
            },
            error => console.log(error),
            () => {
                this.loaderModal = false;
            }
        );
    }

    setReportingManager(model: NewExpenseModel) {
        // var reporting = this._cacheService.getParams('profile');
        // model.primaryApproverId = reporting.r1.name;
        // model.secondaryApproverId = reporting.r2.name;
    }

    showImageModal(event) {
        Materialize.toast('Please select an image of jpeg, jpg or png file format.', 7000, 'errorTost');
        // this.imageModal = true;
    }

    closeImageModal(event) {
        // this.imageModal = false;
    }
}

export class ErrorModel {
    rowNumber: Number = 1;
    detail: Array<Details> = [];
}

export class Details {
    value: string;
    error: boolean;
    isAmount: boolean = false;
}

enum Validity {
    "Isvalid",
    "Invalid"
}