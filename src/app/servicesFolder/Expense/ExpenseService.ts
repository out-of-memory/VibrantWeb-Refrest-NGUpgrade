import { Injectable } from '@angular/core';
import { HttpSettings } from "../http/http.settings"
import { CacheService } from "../CacheService"
import {  HttpService } from "../http/http.service"

@Injectable()
export class ExpenseService {
    constructor(private _service: HttpService, private _cacheService: CacheService) {
    }

    getDropdowns() {
        let url = HttpSettings.apiBaseUrl + 'v1/expense/dropdowns';

        this._service.get(url).subscribe(
            data => {
                //RS:this need to refactored so that it can cater data for more dropdowns from any point/
                this._cacheService.setParams('expenseDropdowns', data);
            },
            error => {
                console.log("expenseDropdowns : Check if Api Url is working properly");

            }
           // () => console.log('expenseDropdowns : Get request has Completed')
        );
    }
}