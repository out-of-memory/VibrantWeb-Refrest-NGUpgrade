import { Component, OnInit, Input } from '@angular/core';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { HttpService } from '../../servicesFolder/http/http.service';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService';
import { SubmittedExpense } from '../../model/NewExpenseDataModel';
import { BasicGrid, BasicCellC } from '../../infrastructure/components/basic-grid';
import { UiInput } from '../../infrastructure/components/UiInput';
import { ExpenseDetails } from '../../model/NewExpenseDataModel';
import { ActivatedRoute } from '@angular/router';
import { CacheService } from '../../servicesFolder/CacheService';
import { StatusStep } from '../../infrastructure/components/StatusStep';
import * as Materialize from "angular2-materialize";
import { MaterializeDirective } from 'angular2-materialize';
import { CurrencyPipe, CurrencyCommaPipe } from '../../infrastructure/pipes/pipes';
import { Confirmation } from '../../infrastructure/components/confirmationMsg';
import { UiCustomModal } from '../../infrastructure/components/UiCustomModal';
import { LoaderComponent } from '../../infrastructure/components/loader.component';
declare var $: any;

@Component({
    selector: 'expense-drafts',
    templateUrl: './expense-drafts-template.html',
    styles: [`
    [hidden] {
        display: none !important;    
    }
    `]

})
export class ExpenseDrafts {



    submittedExpense: SubmittedExpense[];
    submittedExpenseHub: any;
    submittedExpenseCollection: Array<any> = [];
    detailHub: any;
    submitted: SubmittedExpense;
    isClicked = false;
    hideElement = false;
    isDelete: boolean = false;
    expenseToRemove: SubmittedExpense;
    location: string = '';

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService) {
        this.Component_Initialization();
        this.GetExpenseList();
    }

    GetExpenseList() {
        let dropdowns = this._cacheService.getParams('expenseDropdowns')['expenseCategory'];
        let clientNames = this._cacheService.getParams('expenseDropdowns')['clientName'];

        let url = HttpSettings.apiBaseUrl + "v1/expense/get-all-list/true";
        //let url = 'http://localhost:55555/v1/expense/get-all-list/true';
        this.loaderModal = true;
        this._httpService.get(url)
            .subscribe
            (
            data => {
                this.loaderModal = false;
                if (data == null)
                    return false;

                this.submittedExpenseCollection = new Array<SubmittedExpense>();
                this.submittedExpense = new Array<SubmittedExpense>();

                data.forEach(element => {
                    let totalAmount = 0;
                    let model = new SubmittedExpense();
                    let expenseDetailsCollection = Array<any>();

                    model.totalExpenses = element.totalExpenses;
                    model.amountReimbursed = element.amountReimbursed;
                    model.advance = element.advance;
                    model.currencyId = element.currencyId;

                    model.clientName = element.clientId > 0 ? clientNames.find(x => x.id === Number(element.clientId)).text : '-';
                    model.isClientReimbursment = element.isClientReimbursment == 1 ? 'Yes' : 'No';

                    model.financeFormCode = element.formCode == '' || element.formCode == null ? '-' : element.formCode;
                    model.reimbursementTitle = String(element.reimbursmentTitle).trim() === '' ? '-' : element.reimbursmentTitle;
                    model.amount = element.details.forEach(detailAmount => {
                        totalAmount += detailAmount.amount;
                    });
                    model.amount = String(totalAmount.toFixed(2));
                    model.status = 'Primary Approver';
                    model.expenseId = element.expenseId;

                    element.details.forEach(detailElement => {
                        let detailmodel = new ExpenseDetails();
                        this._autoMapperService.Map(detailElement, detailmodel);
                        detailmodel.expenseCategoryId = Number(detailmodel.expenseCategoryId) != 0 ? dropdowns.find(x => x.id === Number(detailmodel.expenseCategoryId)).text : '-';
                        detailmodel.fileExtension = detailmodel.attachedFile !== '' ? detailmodel.attachedFile.substr(detailmodel.attachedFile.lastIndexOf('.') + 1).toLocaleLowerCase() : '';
                        expenseDetailsCollection.push(detailmodel);
                    });

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
        // let url = "http://localhost:55555/" + "v1/expense/delete-expense/" + expense.expenseId;
        let url = HttpSettings.apiBaseUrl + "v1/expense/delete-expense/" + expense.expenseId;

        let toDelete = this.submittedExpense.indexOf(expense);

        this.submittedExpense.splice(toDelete);

        this._httpService.get(url).subscribe(
            data => {
                if (data == true) {
                    this.isDelete = false;
                    this.Component_Initialization();
                    this.submittedExpenseCollection = undefined;
                    this.submittedExpense = undefined;
                    Materialize.toast('Draft Deleted Successfully', 3000, 'successTost');
                    this.GetExpenseList();
                }
            });
    }

    RemoveDetail(event, detail) {
        event.preventDefault();
        let url = "http://localhost:55555/" + "v1/expense/delete-expense/" + detail.expenseDetailId;
        //let url = HttpSettings.apiBaseUrl + "v1/expense/delete-expense/" + detail.expenseDetailId;
    }

    confirmDelete(event, item: SubmittedExpense) {
        event.preventDefault();
        this.expenseToRemove = item;
        this.isDelete = true;
    }

    CancelDelete(event) {
        event.preventDefault();
        this.isDelete = false;
        this.expenseToRemove = undefined;
    }

    downloadFile(event, file: any) {
        event.preventDefault();

        var a = $("<a>").attr("href", file).attr("download", file.substring(file.lastIndexOf('/') + 1)).appendTo("body");
        a[0].click();
        a.remove();


        let url = HttpSettings.apiBaseUrl + "v1/expense/download/" + file;
        this._httpService.downloadCSV(url, '', undefined).subscribe(
            // this._httpService.downloadBinaryGet(url).subscribe(
            data => {

                var headers = data.headers;

                var filename = headers.get("Content-Disposition");
                var mediaType = 'application/octet-stream';
                // var blob = new Blob([data["_body"]], { type: mediaType });
                // var url = window.URL.createObjectURL(blob);
                // var anchor = new HTMLAnchorElement();

                var a = $("<a style='display: none;'/>");
                var url = window.URL.createObjectURL(new Blob([data["_body"]], { type: "application/octet-stream" }));
                a.attr("href", url);
                a.attr("download", filename.substring(21));
                $("body").append(a);
                a[0].click();
                window.URL.revokeObjectURL(url);
                a.remove();

                // anchor.href = url;

                // anchor.click();
                // window.URL.revokeObjectURL(url);


            });
    }
}
