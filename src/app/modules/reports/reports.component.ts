import { Component, OnInit } from '@angular/core';
import {DashboardService} from './../../servicesFolder/dashboard/dashboardService';
import {HttpService} from './../../servicesFolder/http/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  
  providers:[HttpService,DashboardService]
})
export class ReportsComponent implements OnInit {



name:Abc;
  constructor(private dashboardService:DashboardService) {
      this.name=new Abc();
      this.name.name="Ravi"
      
      setTimeout(()=>{this.name.name="Ravi Kant Srivastava"}, 10000);
   }

  ngOnInit() {
  }

onCorrect(){
    
    this.name.name="Ravi Kant"
    
    
}
}

export class Abc{
    name:any;
    age:any;
}