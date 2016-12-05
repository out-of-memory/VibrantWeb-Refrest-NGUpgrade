export class RouteComponentsService{
    
   private  _types:{[id:string]:Function}={};
    
    Register(key:string, component:Function):void{
        this._types[key]=component;
    }

    GetComponent(key:string){

        return this._types[key]||null;
    }    
    
}   