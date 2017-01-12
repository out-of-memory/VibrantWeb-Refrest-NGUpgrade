import { Component } from '@angular/core';
import { UserService } from './servicesFolder/User/user.service';
import { ExpenseService } from './servicesFolder/Expense/ExpenseService';
import { RouteRegistrationService, DashboardService } from './services';
import { Decorator } from './Helper/Decorator';
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [RouteRegistrationService]

})

export class AppComponent {
    title: string;
    MenuData: any;
    id: string;
    isUserLoggedIn: boolean = false;
    isNavActive: boolean = false;
    userProfile: any;
    menu: any;
    impersonate: number = 0;
    dateObj: string;
    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    approvals: Array<any> = [];

    constructor(private _userService: UserService, rrs: RouteRegistrationService, private expenseService: ExpenseService, private approvalService: DashboardService) {
        this.Start(0);
        rrs.addRoutes(AppComponent, Decorator.App.Routes());
        this.title = "VibrantWeb-Refresh (Phoenix)";
        this.MenuData = Decorator.App.Routes();
        this.id = "";
        this.isNavActive = false;
        // let timer = Observable.timer(2000,60000);
        // timer.subscribe(this.GetDateTime);
        this.dateObj = new Date().toISOString();
        this.fetchPendingApprovals();
    }


    OnImpersonate() {
        this._userService.ImpersonateLogout();
        this.Start(this.impersonate);
    }

    Start(imprsonate: number) {
        var dis = this;
        this._userService.challengeLogin(data => {
            this._userService.pullDropDowns(() => { });
            this.expenseService.getDropdowns();
            this._userService.profile(data => {

                dis.userProfile = data;

                dis.menu = [
                    {
                        "name": "Dashboard",
                        "title": "Dashboard",
                        "imageUrl": `/images/${dis.userProfile.imagePath}`,
                        "iconCss": "",
                        "css": "first",
                        "parentRoute": "",
                        "routerName": "R-my-dashboard",
                        "routerUrl": "my/dashboard",
                        "subNav": []
                    }
                ];

                if (dis.userProfile.role.length != 0) {
                    if (dis.userProfile.role[0].roleId == 12 || dis.userProfile.role[0].roleId == 24 || dis.userProfile.role[0].roleId == 27 || dis.userProfile.role[0].roleId == 35 || dis.userProfile.role[0].roleId == 38) {
                        dis.menu.push({
                            "name": "Employee Search",
                            "title": "Employee Search",
                            "iconCss": "fa fa-users",
                            "css": "fourth",
                            "parentRoute": "",
                            "routerName": "R-employee-search",
                            "routerUrl": "employee/search",
                            "subNav": []
                        });
                    }
                }

                // ND: Commenting this as this is Partially Complete.
                if (this.approvals.length > 0) {
                    var subMenuArray = [];
                    this.approvals.forEach(element => {
                        subMenuArray.push({
                            "name": element.module,
                            "title": element.module,
                            "iconCss": "fa fa-flag",
                            "css": "second",
                            "parentRoute": "",
                            "routerPara": element.url,
                            "count": element.count
                        })
                    });
                    dis.menu.push({
                        "name": "Approvals",
                        "title": "Approvals",
                        "iconCss": "fa fa-flag",
                        "css": "second",
                        "parentRoute": "",
                        "routerName": "",
                        "IsPageLevelSubMenu": "false",
                        "subNav": subMenuArray
                    });
                }
                dis.menu.push({
                        "name": "Reports",
                        "title": "Reports",
                        "iconCss": "fa fa-file-text",
                        "css": "third",
                        "parentRoute": "",
                        "routerName": "R-Reports",
                        "routerUrl": "employee/reports/view",
                        "subNav": []
                    });
                dis.menu.push({
                    "name": "Expense",
                    "title": "Expense",
                    "iconCss": "fa fa-money",
                    "css": "fifth",
                    "parentRoute": "",
                    "routerName": "R-my-expense",
                    "routerUrl": "my/expense/new",
                    "subNav": []
                });
                dis.menu.push({
                    "name": "Helpdesk",
                    "title": "Helpdesk",
                    "iconCss": "fa fa-support",
                    "css": "sixth",
                    "parentRoute": "",
                    "routerName": "R-my-HelpDesk",
                    "routerUrl": "my/helpdesk/newticket",
                    "subNav": []
                });

                dis.isUserLoggedIn = true;

                if (imprsonate > 0)
                    window.location.href = window.location.href.split("#")[0];

            });
        }, imprsonate, 0);
    }

    Logout() {
        this.loaderModal = true;
        //this.loaderModalMsg = true;
        this.loaderModalText = "Logging Out...";
        this._userService
            .Logout(() => {
                this.isUserLoggedIn = false;
                this.userProfile = undefined;
                this.loaderModal = false;
                //this.loaderModalMsg = false;
                this.loaderModalText = "";
                window.location.href = window.location.href.split("#")[0];
            });

    }

    ngOnInit() {
        //this.fetchPendingApprovals();
        this.Start(0);
    }

    toggle(e) {
        e.preventDefault();
        var el = document.getElementById('slide-out');
        if (this.hasClass(el, 'active') == true) {
            this.isNavActive = false;
            $(".button-collapse").removeClass("active");
            $("#slide-out").removeClass("active");
        }
        else {
            this.isNavActive = true;
            $(".button-collapse").addClass("active");
            $("#slide-out").addClass("active");
        }
    }

    hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    // ND: Commenting this as this is Partially Complete.
    fetchPendingApprovals() {
        this
            .approvalService
            .fetchPendingApprovalsForMe((data) => {
                this.approvals = data;
                let smallModules: Array<string> = ["leave", "profile", "expense", "compoff", "helpdesk", "travel"];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].module == '1') {
                        this.approvals[i].url = 'my/leaves/approvals';
                    }
                    else if (data[i].module == '3') {
                        this.approvals[i].url = 'my/expense/newapproval';
                    }
                    else if (data[i].module == '5') {
                        this.approvals[i].url = 'my/helpdesk/newapproval';
                    }
                    else if (data[i].module == '6') {
                        this.approvals[i].url = 'my/travel/newapproval';
                    }
                    else {
                        this.approvals[i].url = 'approvals/' + smallModules[+(data[i].module) - 1]
                    }
                }
                this.Start(this.impersonate);
            });
    }

}
