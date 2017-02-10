import { Component } from '@angular/core';
import { SearchBoxViewModel } from '../../model/SearchBoxViewModel';
import { SearchBox } from '../../infrastructure/components/search-box'
import { UiForm } from '../../infrastructure/components/UiForm';
import { pageHeading } from '../../infrastructure/components/pageHeading';
import { EmployeeService, UserService, CacheService } from '../../services';
import { Router } from '@angular/router';
import { CapitalizePipe } from '../../infrastructure/pipes/Pipes';
import { BasicCellC, BasicGrid } from '../../infrastructure/components/basic-grid';
import * as Materialize from "angular2-materialize";
import {AdminViewModel} from "../../models/AdminViewModel";

@Component({
    selector: 'employee-search',
    
    templateUrl: './admin.component.html'
    
})

export class AdminComponent {

    searchBoxViewModel: SearchBoxViewModel;
    searchBoxViewModelhub: any;
    searchBoxViewModelFormReadonly: boolean;
    
    adminModel:AdminViewModel;
    adminModelHub:any;

    headers: Array<any> = [];
    results: any;
    userProfile: any;
    showList: boolean = false;
    cardSubmitted: boolean = false;
    taskType:number=0;

    constructor(private _employeeService: EmployeeService, private userService: UserService, private _cacheService: CacheService, private router: Router) {
        this.searchBoxViewModelFormReadonly = false;
        this.searchBoxViewModel = new SearchBoxViewModel();
        this.searchBoxViewModelhub = this.searchBoxViewModel["hub"];
        this.adminModel= new  AdminViewModel();
        this.adminModelHub=this.adminModel["hub"];
    }
    ngOnInit() {

        this.userProfile = this._cacheService.getParams("profile");
        if (this.userProfile.role.length != 0) {
            // if (this.userProfile.role[0].roleId != 12 && this.userProfile.role[0].roleId != 27) {
            this.router.navigate(['my/dashboard']);
            //}
        }
    }

    onTaskChange(value:any)
    {

      this.taskType=parseInt(value);
      this.adminModel= new  AdminViewModel();
      this.adminModel.taskType=this.taskType;


    }

    Search(form: any) {
        if (form.valid) {
          this.taskType=0;
            var value = this.searchBoxViewModel.value;
            var isInActiveUser = this.searchBoxViewModel.activeUser;
            this.headers = [];

            this._employeeService.Search(value, isInActiveUser, (data) => {
                this.results = data;
                if (this.results && this.results.length > 0) {
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

    performAdminAction(form:any){}

    resetForm(form:any){

    this.adminModel= new  AdminViewModel();


    }

}