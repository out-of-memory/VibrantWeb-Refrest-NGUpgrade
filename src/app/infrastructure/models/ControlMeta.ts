export class ControlMeta{
    //Props
    hub:string;
    name:string;
    type:string;
    css:string;
    value:string|Array<any>;
    source:Array<any>;
    validation:string;
    label:string;
    placeholder:string;
    options:any={};
    cols:number;
    rows:number;
    multiple:boolean;
    checked:boolean;
    alt:string;
    min:boolean;
    max:boolean;
    attrs:any={}
    show:boolean=true

    //events
    //TODO:Will take this decision little later:RS
    
    
}