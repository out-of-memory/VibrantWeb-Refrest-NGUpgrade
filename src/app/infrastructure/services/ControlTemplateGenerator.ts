import {Injectable} from '@angular/core';

import {ControlMetaService} from './ControlService';
import {ControlMeta} from '../Models/ControlMeta';

@Injectable()
export class ControlTemplateGeneratorService {

    metaService: ControlMetaService;

    constructor() {
        this.metaService = ControlMetaService.Instance();
    }

    GetTemplate(hub: string): string{
        var hubItem = this.metaService.getControlMeta(hub);
        if (hubItem === undefined)
            throw `Model metadata not listed for ${hub}`;
        return '';
    }
    
    private buildTemplate( list:{[id:string]:ControlMeta}):string{
        let output:string='';
        
        for(let item in list){
            output+=list[item];
            
        }
        
        
        return "";
    }


}