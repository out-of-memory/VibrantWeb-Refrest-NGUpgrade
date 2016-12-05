import { Component, OnInit, Input} from '@angular/core';
//import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { LeaveApprovalComponent } from './leave.approval.component';
import { LeaveApprovalHistory } from './leave.approval.history';
@Component({
    selector: "leave"
    , templateUrl: './leave.approval.html'
    //, directives: [ROUTER_DIRECTIVES]
})

// @RouteConfig([
//     {
//         path: '/new',
//         name: 'Leave-Approval',
//         component: LeaveApprovalComponent,
//         useAsDefault: true,
//     },
//     {
//         path: '/history',
//         name: 'Leave-History',
//         component: LeaveApprovalHistory,
//         useAsDefault: false,
//     }
// ])


export class LeaveApproval {
    MenuData: any;

    constructor() {
        //this.GetMenu();
        this.MenuData = [{ "routerName": "Leave-Approval", "routerPara": "", "title": "NEW REQUESTS" },
         { "routerName": "Leave-History", "routerPara": "", "title": "APPROVED HISTORY" }];

    }


}