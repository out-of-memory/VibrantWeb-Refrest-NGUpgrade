import {Component, Input, Output, ElementRef, OnInit, EventEmitter} from '@angular/core';

import {ControlMeta} from '../models/ControlMeta';

import {FormBuilder, FormGroup, FormControl,Validators,AbstractControl} from '@angular/forms'
@Component({
    selector: 'ui-control',
    template: `<div>
                <label [attr.for]='modelMeta.name'>{{modelMeta.label}}</label>
                <input [type]='modelMeta.type' [(ngModel)]='model' [attr.placeholder]='modelMeta.placeholder'
                (ngModelChange)="changed($event)"   #control='ngForm' />
                <span *ngIf="submitted && control.valid">
                    {{modelMeta.name}} is required
                </span>
            </div>`
})
export class UIControl implements OnInit {
    @Input() modelMeta: ControlMeta;
    @Output() notify = new EventEmitter<any>();
    @Input() submitted:boolean=false;
    @Input() model: any;
    @Input() events: any;
    control:FormControl;
    element: ElementRef;
    constructor(elem: ElementRef) {

        this.element = elem;
    
    }

ngOnInit(){
    
        this.addValidations(); 
}
   changed(event) {
        this.notify.emit({key:this.modelMeta.name,value:this.model});
    }
    
    addValidations(){
        let validations=this.modelMeta.validation.split(' ')
        let arr:Array<any>=[];
        for(var i=0;i<validations.length;i++)
        {
            
            let current=validations[i].split(":");
           // console.log(current[0]);
            if(current.length>1)
            arr.push(Validators[current[0]](current[1]));
            else
            arr.push(Validators[current[0]]);
            
            
        }
        
        this.control=new FormControl('',Validators.compose(arr));
        
    }
 }


@Component({
    selector: 'ui-form',
    template: `<div>
    <form (onSubmit)='submit()'>
                    <div *ngFor='let model of hub'>
                    <ui-control [modelMeta]='model' [(submitted)]='submitted' [twoWay]='twoWay[model.name]' (notify)='updated($event)' ></ui-control>
                    </div>
                    <input type='submit' value='save' />
     </form>               
              </div>`,
    })
export class UIForm {
    @Input() twoWay: any;
    @Input() hub: Array<ControlMeta>;
    submitted:boolean=false;
    @Output() notify = new EventEmitter<any>();
    @Input() events: any;
    
    uiForm:FormGroup;
    uiControls:{[id:string]:AbstractControl};
    constructor(private formBuilder:FormBuilder){
        this.uiForm=formBuilder.group({});      
        
    }
    
    OnUiControlChange(property, value) {
        this.twoWay[property] = value;
        
    }
 
    
    updated(output: any) {
         this.twoWay[output.key] = output.value;
         this.notify.emit(this.twoWay);
    }
    submit(){
        this.submitted=true;
        
    }
    
    AddValidations(){
       
        
    }
    
    private generateControls(){
        for(var i=0;i<this.hub.length;i++)
        {
            
            //this[this.hub[i]+"Control"]=new AbstractControl();
            
        }
        
        
    }

}