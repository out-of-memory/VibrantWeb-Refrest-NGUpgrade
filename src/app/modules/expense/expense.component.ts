import { Component, OnInit, Input } from '@angular/core';
import { ExpenseNewComponent } from './expense.new.component';
import { ExpenseSubmittedComponent } from './expense.submitted.component';
import { MenuService } from '../../servicesFolder/Menu/MenuService';
import { ExpenseDrafts } from './expense.drafts.component'

@Component({
    selector: "expense",
    templateUrl: './expense-template.html'
})

export class ExpenseComponent {
    MenuData: any;

    constructor(private _menuService: MenuService) {
        //this.GetMenu();
        this.MenuData = [{ "routerName": "new", "routerPara": "", "title": "New Request" },
        { "routerName": "drafts", "routerPara": "", "title": "Drafts" },
        { "routerName": "submitted", "routerPara": "", "title": "Submitted" }];
    }


    GetMenu() {
        var self = this;
        this._menuService.FindSubMenu('parentRoute', 'finance/expense', function (data) {
            // console.log("menu data" + data);
            self.MenuData = data;
        });
    }
}