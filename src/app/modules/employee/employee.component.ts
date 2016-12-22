import { Component, OnInit, Input } from '@angular/core';
import { ControlMeta } from '../../infrastructure/models/ControlMeta';
import { Employee } from '../../model/EmployeeViewModel';
import { SideMenu } from '../../infrastructure/components/sideMenu';
import { pageHeading } from '../../infrastructure/components/pageHeading';
import { PersonalComponent } from './personal.component';
import { ProfessionalComponent } from './professional.component';
import { UiForm } from '../../infrastructure/components/UiForm';
import { Card } from '../../infrastructure/components/Card';
import { Router } from '@angular/router';
import { UserService } from '../../servicesFolder/user/user.service';
import { CacheService } from '../../servicesFolder/CacheService';
import { ActivatedRoute } from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"

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
                                        <a [routerLink]="['professional']" routerLinkActive="router-link-active" data-target='#'>Professional</a>
                                        </li>    
                                        <li class="tab col s3" >
                                        <a [routerLink]="['personal']" routerLinkActive="router-link-active" data-target='#'>Personal</a> 
                                        </li>
                                        <li class="tab col s3" *ngIf="fromserch==true">
                                        <a [routerLink]="['attendance']" routerLinkActive="router-link-active" data-target='#'>Attendance</a>
                                        </li>
                                        <li class="tab col s3" *ngIf="fromserch==true">
                                        <a [routerLink]="['leave']" routerLinkActive="router-link-active" data-target='#'>Leave</a>
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

})

export class EmployeeComponent implements OnInit {
    employee: Employee;
    emphub: any;
    selectedId: string;
    errorMessage: string;
    data: any;
    formReadonly: boolean;
    MenuData: any;
    componentData: any;
    fromserch: boolean = false;

    constructor(private _router: Router, private activatedRoute: ActivatedRoute, private _cacheService: CacheService, private userService: UserService) {
        this.employee = new Employee();
        this.emphub = this.employee["hub"];
        this.MenuData = [{ route: "R-Profile-Personal", name: "Personal" }, { route: "R-Profile-Professional", name: "Professional" }];
    }

    ngOnInit() {
        let rdata = this.activatedRoute;

        this.activatedRoute.params.subscribe((param: any) => {
            if (param.id) {
                this.fromserch = true;
                if (rdata.snapshot.data["from"] == "profile")
                    this.data = this._cacheService.getParams("profile");
                else
                    this.userService.fetchEmployee(rdata["id"], data => {
                        this.data = data;
                    })
            }
            else {
                if (rdata.snapshot.data["from"] == "profile")
                    this.data = this._cacheService.getParams("profile");
                else
                    this.userService.fetchEmployee(rdata["id"], data => {
                        this.data = data;
                    })
            }
        });
    }

    ngOnChanges() {
    }
    routerOnActivate(curr: any, prev?: any): void {
    }
}