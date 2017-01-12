import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
declare var $: any;
declare var navigator: any;

@Injectable()

export class AuthGuard implements CanActivate {
    canActivate(): boolean {

        return navigator.permissions.query({ name: 'geolocation' }).then(function (PermissionStatus) {
            PermissionStatus.state == 'granted' ? true : false; // prompt, granted, denied

            PermissionStatus.onchange = function () {
                if (PermissionStatus.state != 'granted') {
                    window.location.href = '/vibranthelp/help-location.html';
                }
            }

            if (PermissionStatus.state == 'granted') {
                return true;
            }
            else {
                return false;
            }
        })
    }
}
