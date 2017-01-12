import { Component, OnInit, Input} from '@angular/core';
import {UiInput} from '../../infrastructure/components/UiInput';
import {UiFormMessage} from '../../infrastructure/components/UiFormMessage';
import {ControlMeta} from '../../infrastructure/models/ControlMeta';
import { FormBuilder, Validators, ControlGroup, AbstractControl} from '@angular/common';
import {ControlValidator} from "../Validators/ControlValidator"

@Component({
    selector: 'ui-form',
    template: `
    <ng-content *ngIf='1==2'></ng-content>
    <div [class]='formCss'>
    
        <form [ngFormModel]="mainForm" (submit)="doLogin($event)" class="form-element">
            <div *ngFor="let arr of orientationArray" class='row'>
                <div *ngFor="let meta of arr; let i =index" > 
             <ui-input 
                    [(ngModel)]="model[meta.name]"
                    [(ngFormControl)]='dataModelControl[meta.name+"Control"]'
                    [errors]= 'dataModelControl[meta.name+"Control"]'
                    [meta]='meta'
                    [readonly]='formReadonly'
                    [controlCss]='controlCss'
                    [errors]='dataModelControl[meta.name+"Control"]'
                    [errorOnlyOnSubmit]='errorOnlyOnSubmit'
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
    @Input() errorOnlyOnSubmit:boolean;
    dataModel: string = "";
    actionsArray: Array<any> = [];
    dataModelControl: { [id: string]: AbstractControl } = {};
    mainForm: ControlGroup;
    modelTypeObject: boolean = true;
    private orientationArray: Array<Array<ControlMeta>>;
    constructor(private fb: FormBuilder) {
        this.orientationArray = new Array<Array<ControlMeta>>();
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
        this.filterControlMetas(this.fields);

        for (var i = 0; i < this.controlMetas.length; i++) {
            let meta = this.controlMetas[i];
            let control: any = this.addValidations(meta)
            group[meta.name + "Control"] = control;
            this.dataModelControl[meta.name + "Control"] = control as AbstractControl;
        }
        Validators
        this.mainForm = this.fb.group(group);

        for (var i = 0; i < this.controlMetas.length; i++) {
            let meta = this.controlMetas[i];
            this.dataModelControl[meta.name + "Control"] = this.mainForm.find(meta.name + "Control");
        }
    }

    ngOnChanges(changes) {
        //if(typeof(this.model)===''
        var actions = changes["actions"];
        if (actions) {
            if (actions.currentValue != actions.previoueValue) {
                for (var a in this.actions)

                    this.actionsArray.push(this.actions[a]);
            }
        }
    }

    filterControlMetas(fields) {
        if (fields === null || fields === undefined || fields.length === 0) return false;

        fields = this.Unique(fields);

        var newMeta = [];
        newMeta = this.controlMetas.filter(function(item) {
            return fields.indexOf(item.name) !== -1;
        });

        this.controlMetas = newMeta;
    }

    Unique(arrValues) {
        var uniqueArray = [];
        if (arrValues === null || arrValues.length === 0) return arrValues;

        uniqueArray = arrValues.filter(function(item, i, a) {
            return i == a.indexOf(item);
        });

        return uniqueArray;
    }

    private addValidations(meta: ControlMeta): any {
        let validations = meta.validation.split(' ')
        let arr: Array<any> = [];
        for (var i = 0; i < validations.length; i++) {

            let current = validations[i].split(":");

            if (current.length > 1)
                arr.push(this.identifyValidator(current[0])(current[1]));
            else
                arr.push(this.identifyValidator(current[0]));
        }
        return [meta.name + 'Control', Validators.compose(arr)];
    }

    doLogin(event) {
        event.preventDefault();
    }
    identifyValidator(validation) {
        var validationPart = validation.split('.');
        if (validationPart.length == 1)
            return Validators[validation];
        return ControlValidator[validationPart[1]];

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