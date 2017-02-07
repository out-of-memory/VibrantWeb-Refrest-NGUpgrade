import { Component, OnInit } from '@angular/core';
import { CacheService,HttpService } from '../../services';
import { HttpSettings } from "../../servicesFolder/http/http.settings"

@Component({
    selector: 'report-list',
    templateUrl: './reportslist.component.html'
})
export class ReportsListComponent implements OnInit {

    selectedId: string;
    isHR: boolean = false;
    data: any;
    isUs: boolean = false;

    constructor(private _cacheService: CacheService,private _httpService: HttpService) {
        this.data = this._cacheService.getParams("profile");
        if (this.data["role"].length != 0 && this.data["role"][0].roleId == 12) {
            this.isHR = true;
        }
        if (this.data["ol"] == 2) {
            this.isUs = true;
        }
        this.getDropDownValue();
    }

    ngOnInit() {

    }
    getDropDownValue() {
        var url = HttpSettings.apiBaseUrl + "v1/HelpDesk/get-dropdown"
        this._httpService.get(url)
            .subscribe
            (
            data => {
                 this._cacheService.setParams('helpdeskCategories', data.categories);
            });
    }
}