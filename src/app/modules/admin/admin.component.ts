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

    employeeCode:number;
    adminModel:AdminViewModel;
    adminModelHub:any;
    employee:any=null;
   
    constructor(private _employeeService: EmployeeService, private userService: UserService, private _cacheService: CacheService, private router: Router) {
    }
    ngOnInit() {

    //     this.userProfile = this._cacheService.getParams("profile");
    //     if (this.userProfile.role.length != 0) {
    //         // if (this.userProfile.role[0].roleId != 12 && this.userProfile.role[0].roleId != 27) {
    //         this.router.navigate(['my/dashboard']);
    //         //}
    //     }
     }

 resetSearch(employeeId:any)
    {
       if(employeeId.length==0)
       {
         this.employee=null;

       }
    }

    onTaskChange(value:any)
    {

    //   this.taskType=parseInt(value);
    //   this.adminModel= new  AdminViewModel();
    //   this.adminModel.taskType=this.taskType;


    }

    Search() {
        
            this._employeeService.Search(this.employeeCode, true, true,(data) => {
              if(data!=null)
                this.employee=data;
                 else
                    Materialize.toast("No data available.", 3000, 'errorTost')

            });
        

    }

    performAdminAction(form:any){}

    resetForm(form:any){

    this.adminModel= new  AdminViewModel();


    }

}