import { Injectable } from '@angular/core';
@Injectable()
export class TestService {

listOfEmployees:Array<EmployeeModel>;

constructor(){
    this.listOfEmployees=new Array<EmployeeModel>();
    this.INIT()
}


private INIT(){
    
    for(let i=0;i<10;i++)
    {
        let employee:EmployeeModel=new EmployeeModel();
        employee.id=i;
        employee.Name="Name_"+i;
        this.listOfEmployees.push(employee);
        
    }
    
    
}

    
    
}


export class EmployeeModel{
    id:number;
    Name:string;
}