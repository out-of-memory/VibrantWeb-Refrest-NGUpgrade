import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpSettings} from "../http/http.settings"
import {CacheService, MenuService, EmployeeService, HttpService} from "../../services"

@Injectable()
export class UserService {
    private loggedIn = false;

    constructor(private _service: HttpService, private _cacheService: CacheService, private _menuService: MenuService, private _employeeService: EmployeeService) {

    }



    challengeLogin(callBack, impersonate: number, interval) {
        var token = this._cacheService.getParams('auth_token');
        if (token == null || this.isInvalid(token) ||impersonate>0) {
            var url = HttpSettings.apiBaseUrl + 'account/apilogin' + ((impersonate > 0 ? "?imper=" + impersonate : ""));
            this._service.get(url)
                .subscribe(
                data => {
                    if (!data.error) {
                       // console.log(data);
                        data.timestamp = (new Date()).getTime();
                        this._cacheService.setParams('auth_token', data);
                        this.callBackAndScheduleNextCycyle(() => { callBack(data) },impersonate, interval)
                    }
                    else
                        this.forceLogin();
                },
                error => {
                    console.log(error);

                }
               // () => console.log('Get request has Completed')
                );
        }
        else {
            this.callBackAndScheduleNextCycyle(callBack ? () => { callBack(token) } : undefined, impersonate,interval)
        }
    }

    private callBackAndScheduleNextCycyle(callBack: any,impersonate ,interval) {

        if (callBack)
            callBack();
        interval = interval == 0 ? 18000 : interval;
        setTimeout(() => { this.challengeLogin(undefined,impersonate, interval) }, interval);

    }

    private isInvalid(token) {
        var currentStamp = (new Date()).getTime();
        var previousStamp = token.timestamp
        var timeElapse = Math.floor((currentStamp - previousStamp) / (1000 * 60));//convert to mins
        return (timeElapse > (Math.floor(parseInt(token.expires_in) / 60) - 10)); //parse to minutes and reduce 10 mins

    }



    profile(callback) {
        var profile = this._cacheService.getParams('profile');
        if (profile == null) {
            this._service
                .get(HttpSettings.apiBaseUrl + "v1/employee/my/profile")
                .subscribe(
                data => {
                    this._cacheService.setParams('profile', data);
                    callback(data);
                },
                error => {
                    console.log("Check if Api Url is working properly");

                }
               // () => console.log('Get request has Completed')
                );
        }
        else {
            callback(profile);
        }

    }

    fetchEmployee(id: any, callback) {
        this._employeeService.Profile(id, data => {
            //console.log(data);
            this._cacheService.setParams("search", data);
            callback(data);

        })

    }


    menu(callback) {
        var menu = this._cacheService.getParams('menu');
        if (menu != null) {
            callback(menu);
        }
        else {
            this._service
                .get(HttpSettings.apiBaseUrl + "v1/usermenu")
                .subscribe(
                data => {
                    data = this._menuService.CreateMenu(data, '');
                    this._cacheService.setParams('menu', data);
                    callback(data);
                },
                error => {
                    console.log("Check if Api Url is working properly");

                }
               // () => console.log('Get request has Completed')
                );
        }

    }

    pullDropDowns(callback) {

        this._service
            .get(HttpSettings.apiBaseUrl + "v1/employee/dropdowns/EmployeeDropdowns")
            .subscribe(
            data => {
                //RS:this need to refactored so that it can cater data for more dropdowns from any point/
                this._cacheService.setParams('dropdowns', data);
                callback();
            },
            error => {
                console.log("Check if Api Url is working properly");

            }
           // () => console.log('Get request has Completed')
            );
    }

    getApprovalStatus(isMyrecord:boolean,callback){
          this._service
            .get(HttpSettings.apiBaseUrl + "v1/employee/get-card-status?isMyRecord="+isMyrecord)
            .subscribe(
            data => {
                callback(data);
            },
            error => {
                console.log("Check if Api Url is working properly");

            }
           // () => console.log('Get request has Completed')
            );

    }



    private forceLogin() {
        var returnURL = window.location.href.split("?");
        window.location.href = HttpSettings.apiBaseUrl + "account/login?returnval=" + window.location.href + "|no";

    }

    Logout(callback) {
        var url = HttpSettings.apiBaseUrl + 'account/logoff';
        this._service.post(url, null)
            .subscribe(data => {
                this._cacheService.destroy();
                this.loggedIn = false;
                callback();

            });

    }
    
    ImpersonateLogout() {
                this._cacheService.destroy();
    }

    IsLoggedIn() {
        return this.loggedIn;
    }
}