import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
declare var $: any;
declare var navigator: any;

@Injectable()

export class AuthGuard implements CanActivate {
    canActivate(): boolean {

        return navigator.permissions.query({ name: 'geolocation' }).then(function (PermissionStatus) {
            PermissionStatus.state == 'granted' ? true : false; // prompt, granted, denied
            let profileLocation = JSON.parse(localStorage.getItem("profile")).ol;

            PermissionStatus.onchange = function () {
                if (profileLocation == 2) {
                    if (PermissionStatus.state != 'granted') {
                        window.location.href = '/vibranthelp/help-location.html';
                    }
                }
            }
            if (profileLocation == 2) {
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
        })
    }
}
