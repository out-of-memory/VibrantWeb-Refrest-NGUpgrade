import { Component, OnInit, Input } from '@angular/core';
//import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { ExpenseApprovalComponent } from './expense.approval.component';
import { ExpenseApprovalHistoryComponent } from './expense.approvalHistory.component';

@Component({
    selector: "expense"
    , templateUrl: './expense.approval.html'
   // , directives: [ROUTER_DIRECTIVES]
})

// @RouteConfig([
//     {
//         path: '/new',
//         name: 'Expense-Approval',
//         component: ExpenseApprovalComponent,
//         useAsDefault: true,
//     },
//     {
//         path: '/history',
//         name: 'Expense-History',
//         component: ExpenseApprovalHistoryComponent,
//         useAsDefault: false,
//     }
// ])


export class ExpApprovalComponent {
    MenuData: any;

    constructor() {
        //this.GetMenu();
        this.MenuData = [{ "routerName": "Expense-Approval", "routerPara": "", "title": "NEW REQUESTS" },
        { "routerName": "Expense-History", "routerPara": "", "title": "EXPENSE HISTORY" }];

    }


}