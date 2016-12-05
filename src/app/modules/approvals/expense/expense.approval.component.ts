import { Component, OnInit, Input } from '@angular/core';
import { ExpenseDetails } from '../../../model/NewExpenseDataModel';
import { SubmittedExpense, ExpenseApprovalStatus } from '../../../model/NewExpenseDataModel';
import { HttpSettings } from '../../../servicesFolder/http/http.settings';
import { HttpService } from '../../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../../servicesFolder/AutoMapperService';
import { BasicGrid, BasicCellC } from '../../../infrastructure/components/basic-grid';
import { UiInput } from '../../../infrastructure/components/UiInput';
import { LocationPipe, CurrencyPipe, CurrencyCommaPipe } from '../../../infrastructure/pipes/pipes'
import { StatusStep } from '../../../infrastructure/components/StatusStep';
import { CacheService } from '../../../services';
import { UiForm, UiFormControl } from '../../../infrastructure/components/UiForm';
import { MaterializeDirective } from "angular2-materialize";
import * as Materialize from "angular2-materialize";
import { RestrictValueTo } from '../../../infrastructure/directives/materialized.extension.directive';
import { LoaderComponent } from '../../../infrastructure/components/loader.component';


@Component({
    selector: "expense-approval"
    , templateUrl: './expense-approval-template.html',
    //, directives: [BasicGrid, BasicCellC, UiInput, StatusStep, UiForm, UiFormControl, MaterializeDirective, RestrictValueTo, LoaderComponent],
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
    `],
    //pipes: [LocationPipe, CurrencyPipe, CurrencyCommaPipe]
})

export class ExpenseApprovalComponent {

    detailHub: any;
    submittedExpense: SubmittedExpense[];
    submittedExpenseCollection: Array<any> = [];
    isRed: boolean = false;
    isGray: boolean = true;
    isFinanceApprover: boolean = false;
    dllApprovalStatus: any = [{ value: '1', label: 'Approved' }, { value: '2', label: 'Rejected' }, { value: '3', label: 'On Hold' }];
    lastcomments: string = '';
    isApprove: boolean = false;
    confirmStatement: string = 'Approve';
    actionItem: SubmittedExpense;
    location: string = '';

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.Component_Initialization();
        this.GetExpenseApprovalList();
    }

    Component_Initialization() {
        this.detailHub = (new ExpenseDetails())['hub'];

        this.submittedExpense = undefined;
        this.submittedExpenseCollection = new Array<any>();
        this.isFinanceApprover = false;

        this.setApproverRights();

        this.actionItem = undefined;
        this.isApprove = false;

        this.location = this._cacheService.getParams('profile').ol;
    }

    GetExpenseApprovalList() {
        let dropdowns = this._cacheService.getParams('expenseDropdowns')['expenseCategory'];
        let clientNames = this._cacheService.getParams('expenseDropdowns')['clientName'];

        // let url = 'http://localhost:55555/v1/expense/get-approvals';
        let url = HttpSettings.apiBaseUrl + 'v1/expense/get-approvals';
        let totalOnstage = 0;
        this.loaderModal = true;

        this._httpService.get(url)
            .subscribe
            (
            data => {
                this.loaderModal = false;
                if (data == null)
                    return false;

                this.submittedExpense = Array<SubmittedExpense>();

                data.forEach(element => {
                    let totalAmount = 0;
                    let model = new SubmittedExpense();
                    let expenseDetailsCollection = Array<any>();
                    totalOnstage = 0;

                    this._autoMapperService.Map(element, model);

                    model.employeeName = element.firstName + ' ' + element.lastName;
                    model.reimbursementTitle = element.reimbursmentTitle;
                    model.amount = element.details.forEach(detailAmount => {
                        totalAmount += detailAmount.amount;
                    });
                    model.amount = String(totalAmount.toFixed(2));
                    model.status = 'Primary Approver';
                    model.expenseId = element.expenseId;
                    model.isDraft = element.isDraft;
                    model.isRejected = element.isRejected;
                    model.designation = element.employeeProfile.currentDesignation;
                    model.email = element.employeeProfile.email;
                    model.address = element.employeeProfile.ol;
                    model.imagePath = "/images/" + element.employeeProfile.imagePath;
                    model.mobile = element.employeeProfile.mobile;
                    model.employeeId = element.employeeProfile.id;

                    model.totalExpenses = element.totalExpenses;
                    model.amountReimbursed = element.amountReimbursed;
                    model.advance = element.advance;

                    model.clientName = element.clientId > 0 ? clientNames.find(x => x.id === Number(element.clientId)).text : '-';
                    model.isClientReimbursment = element.isClientReimbursment == 1 ? 'Yes' : 'No';

                    element.details.forEach(detailElement => {
                        let detailmodel = new ExpenseDetails();
                        this._autoMapperService.Map(detailElement, detailmodel);
                        detailmodel.expenseCategoryId = Number(detailmodel.expenseCategoryId) != 0 ? dropdowns.find(x => x.id === Number(detailmodel.expenseCategoryId)).text : '-';
                        detailmodel.fileExtension = detailmodel.attachedFile !== '' ? detailmodel.attachedFile.substr(detailmodel.attachedFile.lastIndexOf('.') + 1).toLocaleLowerCase() : '';
                        expenseDetailsCollection.push(detailmodel);
                    });

                    if (element.expenseStatus != null) {

                        element.expenseStatus.forEach(statusElement => {
                            if (statusElement.status > 0) {
                                totalOnstage = totalOnstage + 1;
                                model.onStageStatus = statusElement.status - 1;
                                model.lastcomments = statusElement.comment;
                            }
                        });
                    }

                    model.onStage = String(totalOnstage + 1);
                    model.totalStages = element.totalStages + 1;

                    model.details = expenseDetailsCollection;

                    this.submittedExpenseCollection.push(model);
                });
                this.submittedExpense = this.submittedExpenseCollection;
            },
            error => console.log(error));
    }

    Hide(event, item: any) {
        event.preventDefault();

        if (event.target.type != undefined)
            return false;

        if (event.currentTarget.className === "collapsible-header active") {
            event.currentTarget.parentElement.lastElementChild.hidden = true;
            event.currentTarget.parentElement.lastElementChild.style = "display:none";
            event.currentTarget.className = 'collapsible-header'
            return false;
        }

        var element = event.currentTarget.parentNode.parentElement.parentElement;

        for (var i = 0; i < element.children.length; i++) {
            let arr = element.children[i];

            for (var j = 0; j < arr.children.length; j++) {
                var div = arr.children[j].children;

                div[0].className = 'collapsible-header'
                div[1].style = 'display:none';
                div[1].hidden = true;
            }
        }



        if (event.currentTarget.className === 'collapsible-header') {
            event.currentTarget.className = 'collapsible-header active';
            event.currentTarget.parentElement.lastElementChild.style = "display:block";
            event.currentTarget.parentElement.lastElementChild.hidden = false;
        }

    }

    RejectExpense(event, expense: SubmittedExpense) {
        event.preventDefault();

        //var isValid = this.validateComments(expense);
        expense.isRejected = 'true';

        // let url = 'http://localhost:55555/v1/expense/reject-expense';
        let url = HttpSettings.apiBaseUrl + 'v1/expense/reject-expense';
        this.loaderModal = true;
        this._httpService.post(url, expense).subscribe(
            data => {
                this.loaderModal = false;
                Materialize.toast('Expense is Rejected.', 3000, 'successTost');
                this.Component_Initialization();
                this.GetExpenseApprovalList();
            },
            error => console.log(error),
            () => {
                this.loaderModal = false;
                console.log('Reject request has an error');
            }
        );
    }

    ApproveExpense(event, expense: SubmittedExpense) {
        event.preventDefault();

        // let url = 'http://localhost:55555/v1/expense/approve-expense';
        let url = HttpSettings.apiBaseUrl + 'v1/expense/approve-expense';

        var isValid = this.validateComments(expense);

        if (isValid && expense.submitStatus == '1') {
            expense.comments = expense.comments;
            expense.formCode = expense.formCode;
            expense.chequeDetails = expense.chequeDetails;
            this.loaderModal = true;
            this._httpService.post(url, expense).subscribe(
                data => {
                    this.loaderModal = false;
                    Materialize.toast('Expense approved successfully', 3000, 'successTost');
                    this.Component_Initialization();
                    this.GetExpenseApprovalList();
                },
                error => console.log(error),
                () => {
                    this.loaderModal = false;
                }
            );
        }
        else if (isValid && expense.submitStatus == '2') {
            this.RejectExpense(event, expense);
        }
        else if (isValid && expense.submitStatus == '3') {
            this.OnHoldExpense(expense);
        }
    }

    validateComments(expense: SubmittedExpense) {

        if (expense.submitStatus == '2' || expense.submitStatus == '3') {
            var comments = expense.comments;
            if (comments == '' || comments == null) {
                expense.isComment = true;
                // this.isGray = false;
                return false;
            } else {
                expense.isComment = true;
                return true;
            }
        }
        else if (expense.submitStatus == '1') {
            var formcode = expense.formCode;

            if ((formcode == '' || formcode == null) && this.isFinanceApprover) {
                expense.isFormCode = true;
                return false;
            }
            else {
                expense.isComment = false;
                return true;
            }
        }
        else if (expense.submitStatus == '0') {
            expense.isSelectValid = true;
            return false;
            // if (expense.isSelectValid) {
            //     return false;
            // }
            // else {
            //     return true;
            // }
        }
    }

    setApproverRights() {
        var data = this._cacheService.getParams('profile').role;

        data.forEach(element => {
            if (element.role == "Finance VP") {
                this.isFinanceApprover = true;
            }
        });

    }

    Reset(event, expense: SubmittedExpense) {
        expense.comments = '';
        expense.formCode = '';
        expense.chequeDetails = '';
        expense.submitStatus = '0';
        expense.isComment = false;
        expense.isFormCode = false;
    }

    OnHoldExpense(expense: SubmittedExpense) {
        // let url = "http://localhost:55555/v1/expense/on-hold-expense";
        let url = HttpSettings.apiBaseUrl + "v1/expense/on-hold-expense";

        this._httpService.post(url, expense).subscribe(
            data => {
                Materialize.toast('Expense is On-Hold.', 3000, 'successTost');
                this.Component_Initialization();
                this.GetExpenseApprovalList();
            },
            error => console.log(error),
            () => {
                // console.log('Post request has Completed');
            }
        );
    }

    confirmDelete(event, item: SubmittedExpense) {
        event.preventDefault();
        var isValid = this.validateComments(item);
        if (isValid) {
            switch (Number(item.submitStatus)) {
                case 1: this.confirmStatement = 'to approve';
                    break;
                case 2: this.confirmStatement = 'to reject';
                    break;
                case 3: this.confirmStatement = 'to put it on hold';
                    break;
            }
            this.isApprove = true;
            this.actionItem = item;
        }
    }

    CancelDelete(event) {
        event.preventDefault();
        this.actionItem = undefined;
        this.isApprove = false;
    }
}



