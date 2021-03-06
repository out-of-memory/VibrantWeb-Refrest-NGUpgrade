import { Component, OnInit, Input} from '@angular/core';
import {ControlMeta} from '../../infrastructure/models/ControlMeta';
import {Employee} from '../../model/EmployeeViewModel';
import {SideMenu} from '../../infrastructure/components/sideMenu';
import {pageHeading} from '../../infrastructure/components/pageHeading';
//import {ShortProfileComponent} from './short-profile.component';
import {PersonalComponent} from './personal.component';
import {ProfessionalComponent} from './professional.component';
import {UiForm} from '../../infrastructure/components/UiForm';
import {Card} from '../../infrastructure/components/Card';
import {Router} from '@angular/router';
//import {MenuService} from '../../servicesFolder/menu/MenuService';
//import {HttpService} from '../../servicesFolder/http/http.service';
import {UserService} from '../../servicesFolder/user/user.service';
//import {EmployeeService} from '../../servicesFolder/employee/EmployeeService';
import {CacheService} from '../../servicesFolder/CacheService';
import { ActivatedRoute } from '@angular/router';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"

@Component({
    selector: 'main-employee',
    template: `
             <!--<side-menu visible='true'></side-menu>-->
             <!--<main>-->
              <div class="top-section" *ngIf='data'>
                     <page-heading heading="Employee Details"></page-heading>
                     
                  <!--<short-profile *ngIf='data'
                                 [controlMetas]="emphub" 
                                 [model]="data">
                  </short-profile>-->
                   <div class="tab-container">
                        <div class="row m-bottom0">
                            <div class="col s12 tab-control padding-zero">
                                <div class="col s12 l3 padding-zero">
                                    <ul class="tabs employee-tabs" style="width: 100%;">
                                        <li class="tab col s3" >
                                        <a [routerLink]="['professional']" data-target='#'>Professional</a>
                                        </li>    
                                        <li class="tab col s3" >
                                        <a [routerLink]="['personal']" data-target='#'>Personal</a> 
                                        </li>      
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <router-outlet></router-outlet>
                    </div>
               </div>
             <!--</main>-->     
 `,
    //directives: [ROUTER_DIRECTIVES, ProfessionalComponent, SideMenu, pageHeading, PersonalComponent, UiForm, Card, MaterializeDirective],
    //providers:[ActivatedRoute]

})
// @RouteConfig([
//     {
//         path: '/professional',
//         name: 'R-Profile-Professional',
//         component: ProfessionalComponent,
//         useAsDefault: true
//     },
//     {
//         path: '/personal',
//         name: 'R-Profile-Personal',
//         component: PersonalComponent
//     }
// ])
export class EmployeeComponent implements OnInit {
    employee: Employee;
    emphub: any;
    selectedId: string;
    errorMessage: string;
    data: any;
    formReadonly: boolean;
    MenuData: any;
    componentData: any;

    constructor( private _router: Router, private activatedRoute: ActivatedRoute, private _cacheService: CacheService, private userService: UserService) {
        this.employee = new Employee();
        this.emphub = this.employee["hub"];
        this.MenuData = [{ route: "R-Profile-Personal", name: "Personal" }, { route: "R-Profile-Professional", name: "Professional" }];
    }

    ngOnInit() {
        let rdata = this.activatedRoute;
        if (rdata.snapshot.data["from"] == "profile")
            this.data = this._cacheService.getParams("profile");
        else
            this.userService.fetchEmployee(rdata["id"], data => {
                this.data = data;

            })
    }

    ngOnChanges() {
    }
    routerOnActivate(curr: any, prev?: any): void {
    }
}