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
        window.localStorage.setItem("key", JSON.stringify(model));
        window.onstorage=function(e){
        }
    }
    
    
}