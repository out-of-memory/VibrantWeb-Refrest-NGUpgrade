import { Component, OnInit, Input } from '@angular/core';
import { AutoMapperService, HttpService, HttpSettings, CacheService } from '../../services';

@Component({
    selector: "leave"
    , templateUrl: './leave.html'
})

export class LeaveApproval {
    isUs: boolean = false;
    data: any;
    isApprover: boolean = false;

    constructor(private _cacheService: CacheService, private _httpService: HttpService) {
        this.data = this._cacheService.getParams("profile");
        if (this.data["ol"] == 2) {
            this.isUs = true;
        }
        var url = HttpSettings.apiBaseUrl + 'v1/leave-management/IsApprover/1';
        this._httpService.get(url).subscribe(
            data => {
                this.isApprover = data;
            });
    }
}