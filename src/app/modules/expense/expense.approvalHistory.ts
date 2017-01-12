import { Component, OnInit, Input } from '@angular/core';
import { ExpenseDetails } from '../../model/NewExpenseDataModel';
import { SubmittedExpense, ExpenseApprovalStatus } from '../../model/NewExpenseDataModel';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { BasicGrid, BasicCellC } from '../../infrastructure/components/basic-grid';
import { UiInput } from '../../infrastructure/components/UiInput';
import { LocationPipe, CurrencyPipe, ApprovalStatus, ApprovalStatusTitle, CurrencyCommaPipe, CurrencyNamePipe } from '../../infrastructure/pipes/pipes'
import { StatusStep } from '../../infrastructure/components/StatusStep';
import { CacheService } from '../../services';
import { UiForm, UiFormControl } from '../../infrastructure/components/UiForm';
import { MaterializeDirective } from "angular2-materialize";
import { RestrictValueTo } from '../../infrastructure/directives/materialized.extension.directive';
import { LoaderComponent } from '../../infrastructure/components/loader.component';

@Component({
    selector: "expense-approval-history"
    , templateUrl: './expense.approvalHistory.html',
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
    `]
})

export class ExpenseApprovalHistoryComponent {

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
    printItem: any;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.Component_Initialization();
        this.GetExpenseApprovalList();
    }

    Component_Initialization() {
        this.detailHub = (new ExpenseDetails())['hub'];

        this.submittedExpense = undefined;
        this.submittedExpenseCollection = new Array<any>();
        this.isFinanceApprover = false;

        this.actionItem = undefined;
        this.isApprove = false;

        this.location = this._cacheService.getParams('profile').ol;
    }

    GetExpenseApprovalList() {
        let dropdowns = this._cacheService.getParams('expenseDropdowns')['expenseCategory'];
        let clientNames = this._cacheService.getParams('expenseDropdowns')['clientName'];
        let lstcostCenter = this._cacheService.getParams('expenseDropdowns')['costCenter'];
        let approvers = this._cacheService.getParams('expenseDropdowns')['primaryApprover'];
        let profile = this._cacheService.getParams('profile');

        let url = HttpSettings.apiBaseUrl + 'v1/expense/approved-expense';
        // let url = "http://localhost:55555/v1/expense/approved-expense";

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
                    model.financeFormCode = element.formCode != null ? element.formCode : "-";;

                    model.clientName = element.clientId > 0 ? clientNames.find(x => x.id === Number(element.clientId)).text : '-';
                    model.isClientReimbursment = element.isClientReimbursment == 1 ? 'Yes' : 'No';
                    model.costCenter = element.costCenterId > 0 ? lstcostCenter.find(x => x.id === Number(element.costCenterId)).text : '-';

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
                                model.currentStatus = statusElement.status;
                            }
                        });
                    }

                    model.onStage = String(totalOnstage + 1);
                    model.totalStages = element.totalStages + 1;


                    model.fullname = element.firstName + ' ' + element.lastName;
                    model.requestDate = element.createdDate;
                    model.createdBy = element.createdBy;
                    model.currencyName = 'Indian - Rupees';
                    model.chequeDetails = element.chequeDetails;
                    if (profile.id != element.primaryApproverId) {
                        model.approverFullName = element.primaryApproverName;
                    } else {
                        model.approverFullName = profile.firstName + ' ' + profile.lastName;
                    }
                    model.officeLocation = element.employeeProfile.olText;

                    model.details = expenseDetailsCollection;

                    this.submittedExpenseCollection.push(model);
                });
                this.submittedExpense = this.submittedExpenseCollection;
            });
    }

    Hide(event, item: any) {
        event.preventDefault();

        // if (event.srcElement.type != undefined) ---hot fix for mozilla.
        //     return false; 

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

    PrintExpense(event, item) {

        this.loaderModal = true;
        // var printContents = document.getElementById("demoPrint").innerHTML;
        // var originalContents = document.body.innerHTML;
        // document.body.innerHTML = printContents;
        // window.print();
        // document.body.innerHTML = originalContents;

        this.printItem = item;

        setTimeout(() => {
            var printContents = document.getElementById("demoPrint").innerHTML;
            var popupWin = window.open('', '', 'width=1000,height=700');

            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="assets/css/styles.css" media="screen,projection,print"/><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"><link type="text/css" rel="stylesheet" href="assets/fonts/font-awesome/css/font-awesome.min.css" media="screen,projection"><link rel="stylesheet" type="text/css" href="assets/css/print-styles.css" media="screen,projection,print"/></head><body>' + printContents + '</body></html>');

            setTimeout(function () { // wait until all resources loaded 
                popupWin.document.close(); // necessary for IE >= 10
                popupWin.focus(); // necessary for IE >= 10
                popupWin.print();  // change window to winPrint
                popupWin.close();// change window to winPrint
            }, 500);

            this.loaderModal = false;
        }, 750);
    }
}



