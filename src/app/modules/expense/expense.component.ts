import { Component, OnInit, Input } from '@angular/core';
import { ExpenseNewComponent } from './expense.new.component';
import { ExpenseSubmittedComponent } from './expense.submitted.component';
import { MenuService } from '../../servicesFolder/Menu/MenuService';
import { ExpenseDrafts } from './expense.drafts.component'
import { CacheService } from '../../servicesFolder/CacheService';
import { HttpService } from '../../servicesFolder/http/http.service';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { Router } from '@angular/router';

@Component({
    selector: "expense",
    templateUrl: './expense-template.html'
})

export class ExpenseComponent {
    MenuData: any;
    isUs: boolean = false;


    constructor(private _menuService: MenuService, private _cacheService: CacheService, private _httpService: HttpService, private router: Router) {
        var data = this._cacheService.getParams("profile");
        if (data["ol"] == 2) {
            this.isUs = true;
        }

        // if (true) {
        //     let dfdsfsf = this.router;
        //     //this.router.navigate(['Finance_Expense_New']);
        // }

        // //  if (this.router.root.currentInstruction.child.urlPath == 'new' || this.router.root.currentInstruction.child.urlPath == '') {
        // //     this.router.navigate(['Finance_Expense_New']);
        // // }

        this.MenuData = [{ "routerName": "new", "routerPara": "", "title": "New Request" },
        { "routerName": "drafts", "routerPara": "", "title": "Drafts" },
        { "routerName": "submitted", "routerPara": "", "title": "Submitted" }];

        var url = HttpSettings.apiBaseUrl + 'v1/leave-management/IsApprover/3';
        this._httpService.get(url).subscribe(
            data => {
                if (data == true || data == false) {
                    this.MenuData.push({ "routerName": "newapproval", "routerPara": "", "title": "EXPENSE REQUESTS" });
                    this.MenuData.push({ "routerName": "approvalhistory", "routerPara": "", "title": "EXPENSE HISTORY" });
                }
            });
    }
}