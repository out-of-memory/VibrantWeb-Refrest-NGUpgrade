import { Component, OnInit, Input} from '@angular/core';
import {ControlMeta} from '../../infrastructure/models/ControlMeta';
import {pageHeading} from '../../infrastructure/components/pageHeading';
import {NewHelpDeskComponent} from './newhelpdesk.component';
import {HelpDeskListComponent} from './helpdesklist.component';
import {UiForm} from '../../infrastructure/components/UiForm';
import {Card} from '../../infrastructure/components/Card';
import {MenuService} from '../../servicesFolder/menu/MenuService';
import {HttpService} from '../../servicesFolder/http/http.service';
import { CacheService} from '../../servicesFolder/CacheService';

import { ActivatedRoute } from '@angular/router';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"

@Component({
    selector: 'helpdesk',
    template: `
            <div class="breadcrumb-nav">
                <div class="row margin-zero">
                    <div class="col s12">
                        <h5>Help Desk
                        <a href="/vibranthelp/help-landing-page.html" target="_blank" title="Help" class="help-btn">
                            <i class="right fa fa-question-circle" aria-hidden="true"></i></a>
                        </h5>
                    </div>
                </div>
            </div>
            <div class="tab-container">
                <div class="row">
                    <div class="col s12 tab-control padding-zero">
                        <div class="col s12 m8 l5 padding-zero">
                            <ul class="tabs app-tabs" style="width: 100%;">
                                <li class="tab col s3"><a [routerLink]="['newticket']">RAISE  A TICKET</a></li>
                                <li class="tab col s3"><a [routerLink]="['ticketlist/0']">TICKET LIST</a></li>
                            </ul>
                        </div>
                    </div>                    
                    <div>
                        <router-outlet></router-outlet>
                    </div>     
                </div>
            </div>
             <!--</main>-->     
 `,
  //  directives: [ROUTER_DIRECTIVES, HelpDeskListComponent, pageHeading, NewHelpDeskComponent, UiForm, Card, MaterializeDirective],
})

// @RouteConfig([
//     {
//         path: '/newticket',
//         name: 'R-New-HelpDesk',
//         component: NewHelpDeskComponent,
//         useAsDefault: true,
//     },
//     {
//         path: '/ticketlist/:status',
//         name: 'R-HelpDesk-List',
//         component: HelpDeskListComponent
//     }
// ])
export class HelpDeskComponent {
    
}
