import { Injectable } from '@angular/core';
import {LoginModel} from '../../models/LoginModel';

@Injectable()

export class AuthService {

   isUserLoggedId():boolean{
       return true;
      // var xx= window.localStorage.getItem("key");
      // return xx!=null;
   }    
    
    login(model:LoginModel)
    {
       // console.log(JSON.stringify(model));
        window.localStorage.setItem("key", JSON.stringify(model));
        window.onstorage=function(e){
          //  console.log(JSON.stringify(e));
        }
    }
    
    
}