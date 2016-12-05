import {ControlMetaService} from '../services/ControlService';
import {ControlMeta} from '../models/ControlMeta';

export function UIProperty(options: Object) {
    return (target: any, name: string) => {
        let service: ControlMetaService = ControlMetaService.Instance();
        let meta = options as ControlMeta;
        meta.name = name;
        service.addNewMeta(meta);
    }
}


export function UIClass(hub: string, actions:any) {
    return (target: Function) => {
        let service: ControlMetaService = ControlMetaService.Instance();
     
        service.addModelAction(hub,actions);
        
        Object.defineProperty(
            target.prototype,
            "hub",
            {
                get: function() {
                    var data = service.getControlMeta(hub);
                   
                        let returnData: Array<any> = new Array<any>();
                        for (let x in data)
                            returnData.push(data[x]);
                        return returnData;
                   
                },
                set: function(data) { }
            });
            
            Object.defineProperty(
            target.prototype,
            "actions",
            {
                get: function() {
                    return service.getModelAction(hub);
                   
                },
                set: function(data) { }
            });
            
    }
}