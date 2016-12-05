import { Component, OnInit, Input} from '@angular/core';
import {UiInput} from '../../infrastructure/components/UiInput.1';
import {UiFormMessage} from '../../infrastructure/components/UiFormMessage';
import {ControlMeta} from '../../infrastructure/models/ControlMeta';
import { FormBuilder, Validators, ControlGroup, AbstractControl} from '@angular/common';
import {ControlValidator} from "../Validators/ControlValidator"

@Component({
    selector: 'ui-form',
    template: `
    <ng-content></ng-content>
    <div [class]='formCss'>
    
        <form [ngFormModel]="mainForm" (submit)="doLogin($event)" class="form-element">
            <div *ngFor="let arr of orientationArray" class='row'>
                <div *ngFor="let meta of arr" > 
             <ui-input 
                    [(ngModel)]="model[meta.name]"
                    [form]="formBuilder"
                    [meta]='meta'
                    [readonly]='formReadonly'
                    [controlCss]='controlCss'
                    >
                </ui-input>
                </div>
            </div>
          
            <div>
                    <button *ngFor='let action of actionsArray' type="submit" (click)='performAction(action.task)'>{{action.lable}}</button>    
            </div>
    
        </form>
    </div>                          
                            `,
    directives: [UiInput, UiFormMessage],

})
export class UiForm implements OnInit {
    ////readonlyControls[meta.name]?readonlyControls[meta.name]:false
    @Input() controlMetas: Array<ControlMeta>;
    @Input() model: any;
    @Input() fields: string;
    @Input() visible: boolean;
    @Input() readonlyControls: any;
    @Input() formReadonly: boolean;
    @Input() formCss: string;
    @Input() controlCss: string;
    @Input() actions: any;
    @Input() columnOrientation: number = 2;
    formBuilder:FormBuilder;
    dataModel: string = "";
    actionsArray: Array<any> = [];
    dataModelControl: { [id: string]: AbstractControl } = {};
    mainForm: ControlGroup;
    modelTypeObject: boolean = true;
    
    private orientationArray: Array<Array<ControlMeta>>;
    constructor(private fb: FormBuilder) {
        this.orientationArray = new Array<Array<ControlMeta>>();
        this.formBuilder=this.fb;
    }
    ngOnInit() {
        let t: number = 0;
        for (var i = 0; i < Math.ceil(this.controlMetas.length / this.columnOrientation); i++) {
            let arr: Array<ControlMeta> = new Array<ControlMeta>();
            for (var j = 0; j < this.columnOrientation; j++) {
                if (t < this.controlMetas.length)
                    arr.push(this.controlMetas[t++]);
            }
            this.orientationArray.push(arr);
        }
        let group: { [id: string]: any } = {};
        this.mainForm = this.fb.group(group);
}

    httpAction(url, data) {

    }

    performAction(action: Function | string) {
        if (typeof (action) === 'string') {
            /// call httpAction     
        }
        else if (typeof (action) === 'function') {
            /// call action, abd action should return promise.
        }
        else {
            throw 'action should be of type "string" or "function"';
        }
    }


}