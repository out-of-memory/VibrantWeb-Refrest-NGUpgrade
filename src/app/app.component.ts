import { Component } from '@angular/core';

import {UserService} from './servicesFolder/User/user.service';
import {ExpenseService} from './servicesFolder/Expense/ExpenseService';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
    
    constructor(private _userService:UserService, private expenseService:ExpenseService){
        
        this.Start(0);
        
    }
  title = 'app works!';
  isNavActive:boolean=false;
  userProfile: any;
  menu: any;
  approvals: Array<any> = [];
  isUserLoggedIn:boolean=false;
   
   toggle(e) {
        e.preventDefault();
        this.isNavActive= !this.isNavActive;
    }
    
     Start(imprsonate: number) {
        var dis = this;
        this._userService.challengeLogin(data => {
            // console.log("User Logged IN ");
            this._userService.pullDropDowns(() => { });
            this.expenseService.getDropdowns();
            this._userService.profile(data => {

                dis.userProfile = data;

                //  console.log(data);
                dis.menu = [
                    {
                        "name": "Dashboard",
                        "title": "Dashboard",
                        "imageUrl": `/images/${dis.userProfile.imagePath}`,
                        "iconCss": "",
                        "css": "first",
                        "parentRoute": "",
                        "routerName": "",
                        "subNav": []
                    },
                    {
                        "name": "Reports",
                        "title": "Reports",
                        "iconCss": "fa fa-file-text",
                        "css": "third",
                        "parentRoute": "",
                        "routerName": "reports",
                        "subNav": []
                    }
                ];

                if (dis.userProfile.role.length != 0) {
                    if (dis.userProfile.role[0].roleId == 12 || dis.userProfile.role[0].roleId == 27) {
                        dis.menu.push({
                            "name": "Employee Search",
                            "title": "Employee Search",
                            "iconCss": "fa fa-users",
                            "css": "fourth",
                            "parentRoute": "",
                            "routerName": "R-employee-search",
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
                            "routerPara": element.module,
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
                    "name": "Expense",
                    "title": "Expense",
                    "iconCss": "fa fa-money",
                    "css": "fifth",
                    "parentRoute": "",
                    "routerName": "R-my-expense",
                    "subNav": []
                });
                dis.menu.push({
                    "name": "Helpdesk",
                    "title": "Helpdesk",
                    "iconCss": "fa fa-support",
                    "css": "sixth",
                    "parentRoute": "",
                    "routerName": "R-my-HelpDesk",
                    "subNav": []
                });

                dis.isUserLoggedIn = true;

                if (imprsonate > 0)
                    window.location.href = window.location.href.split("#")[0];

            });
        }, imprsonate, 0);
    }

    
    
  
}
