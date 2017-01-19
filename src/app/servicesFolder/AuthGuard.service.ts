import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
declare var $: any;
declare var navigator: any;

@Injectable()

export class AuthGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot): boolean {

        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var isMozilla = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (!isSafari) {

            return navigator.permissions.query({ name: 'geolocation' }).then(function (PermissionStatus) {
                PermissionStatus.state == 'granted' ? true : false; // prompt, granted, denied
                let profileLocation = JSON.parse(localStorage.getItem("profile"));

                if (profileLocation != null) {

                    PermissionStatus.onchange = function () {
                        if (profileLocation.ol == 2) {
                            if (PermissionStatus.state != 'granted') {
                                window.location.href = '/vibranthelp/help-location.html';
                            }
                        }
                    }

                    if (profileLocation.ol == 2) {
                        if (PermissionStatus.state == 'granted') {

                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return true;
                    }
                }
            })
        }
        else {
            return true;
        }
    }
}