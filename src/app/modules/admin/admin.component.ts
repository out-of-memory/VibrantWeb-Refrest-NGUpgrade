import { Component } from '@angular/core';
import { SearchBoxViewModel } from '../../model/SearchBoxViewModel';
import { SearchBox } from '../../infrastructure/components/search-box'
import { UiForm } from '../../infrastructure/components/UiForm';
import { pageHeading } from '../../infrastructure/components/pageHeading';
import { HttpService, HttpSettings, EmployeeService, UserService, CacheService } from '../../services';
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
    public selectedModule: any = -1;
    formSubmit = false;

    constructor(private _employeeService: EmployeeService, private userService: UserService, private _cacheService: CacheService, private _httpService: HttpService, private router: Router) {
    this.adminModel= new  AdminViewModel();
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

    

    onSelect(moduletype) { 
               this.selectedModule = moduletype;
               this.adminModel.subType = moduletype;
               this.formSubmit = false;         
    }


    Submit(event, form){
        event.preventDefault();

        if (!form.valid) {   
            this.formSubmit = true;        
            return false;
        }
    this.adminModel.employeeID = this.employeeCode;
          
    var data = JSON.stringify(this.adminModel);
        
    let url = HttpSettings.apiBaseUrl + "admin/task/"+ this.selectedModule;          

    this._httpService.post(url, data).subscribe(data => {       
        if (data.isError == true) {
          Materialize.toast(data.message, 4000, 'errorTost');
        }
        else 
        {
          Materialize.toast(data.message , 3000, 'successTost');
        }
        },error => {console.log(error)});
        
        
        this.adminModel = new AdminViewModel();        
        this.adminModel.subType = this.selectedModule;  
        this.Search();  
    }
    
    performAdminAction(form:any){}

    resetForm(){ 
    
    }
}