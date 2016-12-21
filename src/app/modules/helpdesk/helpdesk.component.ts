import { Component, OnInit, Input } from '@angular/core';
import { ControlMeta } from '../../infrastructure/models/ControlMeta';
import { pageHeading } from '../../infrastructure/components/pageHeading';
import { NewHelpDeskComponent } from './newhelpdesk.component';
import { HelpDeskListComponent } from './helpdesklist.component';
import { UiForm } from '../../infrastructure/components/UiForm';
import { Card } from '../../infrastructure/components/Card';
import { MenuService } from '../../servicesFolder/menu/MenuService';
import { HttpService } from '../../servicesFolder/http/http.service';
import { CacheService } from '../../servicesFolder/CacheService';
import { ActivatedRoute } from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../servicesFolder/http/http.settings"

@Component({
    selector: 'helpdesk',
    templateUrl: './helpdesk.component.html'
})
export class HelpDeskComponent {
    isApprover: boolean = false;
    isUs: boolean = false;

    constructor(private _httpService: HttpService, private _cacheService: CacheService) {
        var data = this._cacheService.getParams("profile");
        if (data["ol"] == 2) {
            this.isUs = true;
        }
        var url = HttpSettings.apiBaseUrl + 'v1/leave-management/IsApprover/5';
        this._httpService.get(url).subscribe(
            data => {
                this.isApprover = data;
            });
    }
}
