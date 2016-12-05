import {Injectable, Inject} from '@angular/core';

import {HttpService} from '../http/http.service';
import {HttpSettings} from '../http/http.settings';

@Injectable()
export class EmployeeService {

    constructor(@Inject(HttpService) private _httpService: HttpService) { }
    Profile(id, callback: Function) {
        var url = HttpSettings.apiBaseUrl + 'v1/employee/profile/' + id;
        this._httpService.get(url)
            .subscribe(
            data => {
                callback(data);
            },
            error => alert(error)
            //  () => console.log('Get request has Completed')
            );


    }

    Search(query, isInActiveUser, callback: Function) {
        var url = HttpSettings.apiBaseUrl + 'v1/employee/search/' + query + '?showInActive=' + isInActiveUser;
        if (query != undefined && query != "") {
            this._httpService.get(url)
                .subscribe(
                data => {
                    callback(data);
                },
                error => alert(error)
                // () => console.log('Get request has Completed')
                );
        }

    }





}

