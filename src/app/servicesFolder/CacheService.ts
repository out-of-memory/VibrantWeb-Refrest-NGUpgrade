import { Injectable } from '@angular/core';
 @Injectable()
export class CacheService {
    params: { [id: string]: any } = {};
    constructor() { }
    setParams(key: string, val: any) {
         localStorage.setItem(key, typeof(val)==='string' || typeof(val)==='number' ?val.toString(): JSON.stringify(val));
        this.params[key] = val;
    }
    getParams(key): any {
    var data=this.params[key];
    if(!data)
    {
        data =localStorage.getItem(key);
        if(!data)
        return null;
        data=JSON.parse(data);
        this.params[key] = data;
    }
        return data;
    }
    
   
    
    
    destroy(){
        
        localStorage.clear();
        this.params={};
        
    }
    
}



