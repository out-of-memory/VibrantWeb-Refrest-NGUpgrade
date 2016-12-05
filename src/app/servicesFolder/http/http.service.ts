import { Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {CacheService} from "./../CacheService"
@Injectable()
export class HttpService {
    constructor(private _http: Http, private _cacheService: CacheService) {

    }

    get(url) {
        let headers = undefined;
        headers = this.configureHeaders();
        return this._http.get(url, { headers: headers })
            .map(res => res.json());
    }

    post(url, data, headers = undefined) {

        let _headers = this.configureHeaders();

        return this._http.post(url, data, {
            headers: _headers
        })
            .map(res => res.json());
    }

    downloadCSV(url, data, headers = undefined) {

        let _headers = this.configureHeaders();

        return this._http.post(url, data, {
            headers: _headers
        })
            .map(res => res);
    }

    configureHeaders() {
        var headers = new Headers();

        if (headers.has('Content-Type') === false) {
            headers.append('Content-Type', 'application/json');
        }
        var token = this._cacheService.getParams("auth_token");
        if (token != null) {
            headers.append("Authorization", "Bearer " + token.access_token);
        }
        return headers;

    }
}