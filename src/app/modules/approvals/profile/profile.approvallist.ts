import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, HttpService, EmployeeService, CacheService, UserService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { MaterializeDirective } from "angular2-materialize";
import { HttpSettings } from "../../../servicesFolder/http/http.settings"
import { Repeater } from '../../../infrastructure/components/repeater';
import { LoaderComponent } from '../../../infrastructure/components/loader.component';

@Component({
    selector: 'employeedetails-approval',
    templateUrl: './profile.approvallist.html',
})

export class EmployeeDetailsComponent {
    employeeData: Array<any> = [];
    router: Router;
    userProfile: any;

    loaderModalMsg: boolean = false;
    loaderModalText: any;
    loaderModal: boolean = false;
    isConformationModal: boolean = false;

    constructor(private _employeeService: EmployeeService, private _httpService: HttpService, private _cacheService: CacheService, private _activatedRoute: Router) {
        this.GetEmployeeData();
    }

    ngOnInit() {
        this.userProfile = this._cacheService.getParams("profile");
        if (this.userProfile.role.length != 0) {
            if (this.userProfile.role[0].roleId != 12) {
                this._activatedRoute.navigateByUrl('/my/dashboard');
            }
        }
    }

    GetEmployeeData() {
        this.loaderModal = true;
        var url = HttpSettings.apiBaseUrl + 'v1/approval/employee/approvals';
        var self = this;
        this._httpService.get(url).subscribe(
            data => {
                self.employeeData = data;
                self.loaderModal = false;
            });
    }

}