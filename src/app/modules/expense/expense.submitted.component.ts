import { Component, OnInit, Input } from '@angular/core';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { SubmittedExpense } from '../../model/NewExpenseDataModel';
import { BasicGrid, BasicCellC } from '../../infrastructure/components/basic-grid';
import { UiInput } from '../../infrastructure/components/UiInput';
import { ExpenseDetails } from '../../model/NewExpenseDataModel';
import { FileUpload } from '../../infrastructure/components/file-upload';
import { StatusStep } from '../../infrastructure/components/StatusStep';
import { CacheService } from '../../servicesFolder/CacheService';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, CurrencyNamePipe, FileExtension, CurrencyCommaPipe } from '../../infrastructure/pipes/pipes';
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import 'rxjs/Rx';
declare var $: any;

@Component({
    selector: 'expense-submitted',
    templateUrl: './expense-submitted-template.html',
    styles: [`
    [hidden] {
        display: none !important;    
    }
    .progress-bar
    {
        background-color: aquamarine;    
    }
    `],

})
export class ExpenseSubmittedComponent {

    url = HttpSettings.apiBaseUrl + "v1/expense/get-all-list";
    //url = 'http://localhost:55555/v1/expense/get-all-list';

    submittedExpense: SubmittedExpense[];
    submittedExpenseHub: any;
    submittedExpenseCollection: Array<any> = [];
    detailHub: any;
    submitted: SubmittedExpense;
    isClicked = false;
    hideElement = false;
    progress: number;
    uploadStatus: string = '';
    location: string = '';

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    isDelete: boolean = false;
    printItem: any;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.Component_Initialization();
        this.GetExpenseList();
    }

    GetExpenseList() {
        let dropdowns = this._cacheService.getParams('expenseDropdowns')['expenseCategory'];
        let clientNames = this._cacheService.getParams('expenseDropdowns')['clientName'];
        let lstcostCenter = this._cacheService.getParams('expenseDropdowns')['costCenter'];
        let approvers = this._cacheService.getParams('expenseDropdowns')['primaryApprover'];

        this.loaderModal = true;

        this._httpService.get(this.url)
            .subscribe
            (
            data => {
                this.loaderModal = false;
                if (data == null) {
                    //this.submittedExpense = new Array<SubmittedExpense>();
                    return false;
                }

                data.forEach(element => {
                    let totalAmount = 0;
                    let model = new SubmittedExpense();
                    let expenseDetailsCollection = Array<any>();
                    let totalOnstage = 0;

                    model.financeFormCode = element.formCode == '' || element.formCode == null ? '-' : element.formCode;
                    model.reimbursementTitle = element.reimbursmentTitle == '' ? 'No Title' : element.reimbursmentTitle;

                    model.status = 'Primary Approver';
                    model.expenseId = element.expenseId;
                    model.isRejected = element.isRejected;

                    model.totalExpenses = element.totalExpenses;
                    model.amountReimbursed = element.amountReimbursed;
                    model.advance = element.advance;

                    model.clientName = element.clientId > 0 ? clientNames.find(x => x.id === Number(element.clientId)).text : '-';
                    model.isClientReimbursment = element.isClientReimbursment == 1 ? 'Yes' : 'No';
                    model.currencyId = element.currencyId;
                    model.costCenter = element.costCenterId > 0 ? lstcostCenter.find(x => x.id === Number(element.costCenterId)).text : '-';

                    element.details.forEach(detailElement => {
                        let detailmodel = new ExpenseDetails();
                        totalAmount += detailElement.amount;
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
                                model.comments = statusElement.comment;
                            }
                        });
                    }

                    model.amount = String(totalAmount.toFixed(2));
                    model.onStage = String(totalOnstage + 1);
                    model.totalStages = element.totalStages + 1;

                    model.fullname = element.firstName + ' ' + element.lastName;
                    model.requestDate = element.createdDate;
                    model.createdBy = element.createdBy;
                    model.currencyName = 'Indian - Rupees';
                    model.chequeDetails = element.chequeDetails;
                    model.approverFullName = element.primaryApproverName;
                    model.officeLocation = element.employeeProfile.olText;

                    model.details = expenseDetailsCollection;

                    this.submittedExpenseCollection.push(model);
                });
                this.submittedExpense = this.submittedExpenseCollection;
            });
    }

    Component_Initialization() {
        this.submitted = new SubmittedExpense();
        this.submittedExpenseHub = this.submitted['hub'];

        this.detailHub = (new ExpenseDetails())['hub'];

        this.location = this._cacheService.getParams('profile').ol;
    }

    Hide(event, item: any) {
        event.preventDefault();

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

    Unhide() {
        this.isClicked = false;
        this.hideElement = false;
    }

    RemoveExpense(event, expense) {
        event.preventDefault();
        //let url = "http://localhost:55555/" + "v1/expense/delete-expense/" + expense.expenseId;
        let url = HttpSettings.apiBaseUrl + "v1/delete-expense/" + expense.expenseId;

        let toDelete = this.submittedExpense.indexOf(expense);

        this.submittedExpense.splice(toDelete);

        this._httpService.get(url).subscribe(
            data => {
            });
    }

    RemoveDetail(event, detail) {
        event.preventDefault();
        let url = "http://localhost:55555/" + "v1/expense/delete-expense/" + detail.expenseDetailId;
        //let url = HttpSettings.apiBaseUrl + "v1/expense/delete-expense/" + detail.expenseDetailId;
    }

    Eyeclicked(event) {
        event.preventDefault();
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

    CancelDelete(event) {
        event.preventDefault();
        this.isDelete = false;
    }
}