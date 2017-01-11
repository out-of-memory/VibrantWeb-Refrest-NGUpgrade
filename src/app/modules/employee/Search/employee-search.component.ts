import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SearchBoxViewModel } from '../../../model/SearchBoxViewModel';
import { SearchBox } from '../../../infrastructure/components/search-box'
import { UiForm } from '../../../infrastructure/components/UiForm';
import { pageHeading } from '../../../infrastructure/components/pageHeading';
import { EmployeeService, UserService, CacheService } from '../../../services';
import { CapitalizePipe } from '../../../infrastructure/pipes/Pipes';
import { BasicCellC, BasicGrid } from '../../../infrastructure/components/basic-grid';
import * as Materialize from "angular2-materialize";

@Component({
    selector: 'employee-search',
    templateUrl: './employee-search-template.html',
})

export class EmployeeSearchComponent {

    searchBoxViewModel: SearchBoxViewModel;
    searchBoxViewModelhub: any;
    searchBoxViewModelFormReadonly: boolean;

    headers: Array<any> = [];
    results: any;
    userProfile: any;
    showList: boolean = false;
    cardSubmitted: boolean = false;
    isActive: boolean = false;

    constructor(private _employeeService: EmployeeService, private userService: UserService, private _cacheService: CacheService, private router: Router) {
        this.searchBoxViewModelFormReadonly = false;
        this.searchBoxViewModel = new SearchBoxViewModel();
        this.searchBoxViewModelhub = this.searchBoxViewModel["hub"];
    }
    ngOnInit() {

        this.userProfile = this._cacheService.getParams("profile");
        if (this.userProfile.role.length != 0) {
            // if (this.userProfile.role[0].roleId != 12 && this.userProfile.role[0].roleId != 27) {
            //this.router.navigate(['my/dashboard']);
            //}
        }
    }

    Search(form: any) {
        if (form.valid) {
            var value = this.searchBoxViewModel.value;
            var isInActiveUser = this.isActive;
            this.headers = [];

            this._employeeService.Search(value, isInActiveUser, (data) => {
                this.results = data;
                if (this.results.length > 0) {
                    var keys = Object.keys(this.results[0]);
                    for (var i = 0; i < keys.length; i++) {
                        this.headers.push(keys[i]);
                    }
                }
                else
                    Materialize.toast("No data available.", 3000, 'errorTost')

            });
        }
        else {
            this.cardSubmitted = true;
        }

    }

}