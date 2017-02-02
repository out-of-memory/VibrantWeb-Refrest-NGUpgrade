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
            );


    }

    Search(query, isInActiveUser,adminSearch, callback: Function) {
        var url = HttpSettings.apiBaseUrl + 'v1/employee/'+(adminSearch?'search-for-admin/':'search/') + query + '?showInActive=' + isInActiveUser;
        if (query != undefined && query != "") {
            this._httpService.get(url)
                .subscribe(
                data => {
                    callback(data);
                },
                error => alert(error)
                );
        }




    }





}

