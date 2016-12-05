import{Injectable,Inject} from '@angular/core'
import{RouterModule,Router} from '@angular/router'

@Injectable()
export class RouteRegistrationService{
    
    constructor( private _router:Router){
        
    }
    
    addRoutes(component:any, routes:any[]){
       routes.forEach(route=>this._router.config.push(component,route));
    }
    
}