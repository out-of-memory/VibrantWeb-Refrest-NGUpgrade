import { Component } from '@angular/core';
import { CacheService } from '../../servicesFolder/CacheService';
import { MaterializeDirective } from "angular2-materialize";
import { ActivatedRoute } from '@angular/router';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'app-appraisal-admin',
    templateUrl: './appraisalAdmin.component.html',
})
export class AppraisalAdminComponent {

    constructor(private routeParams: ActivatedRoute, private _cacheService: CacheService) {

    }
}
