import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../servicesFolder/CacheService';

@Component({
    selector: 'report-list',
    templateUrl: './reportslist.component.html'
})
export class ReportsListComponent implements OnInit {

    selectedId: string;
    isHR: boolean = false;
    data: any;
    isUs: boolean = false;

    constructor(private _cacheService: CacheService) {
        this.data = this._cacheService.getParams("profile");
        if (this.data["role"].length != 0 && this.data["role"][0].roleId == 12) {
            this.isHR = true;
        }
        if (this.data["ol"] == 2) {
            this.isUs = true;
        }
    }

    ngOnInit() {

    }
}