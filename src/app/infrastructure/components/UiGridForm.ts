import { Component, OnInit, Input, Output, EventEmitter, ContentChild, ContentChildren, ViewContainerRef,  TemplateRef, QueryList} from '@angular/core';
import {UiInput} from '../../infrastructure/components/UiInput';
import {UiFormMessage} from '../../infrastructure/components/UiFormMessage';
import {ControlMeta} from '../../infrastructure/models/ControlMeta';
import { FormBuilder, Validators, FormGroup, AbstractControl} from '@angular/forms';
import {ControlValidator} from "../Validators/ControlValidator"
import {UiFormControl} from "../../infrastructure/components/UiForm"

@Component({
    selector: 'ui-grid-form',
    template: `
    <ng-content></ng-content>
    <div [class]='formCss'>
        <div class="row heading-content">
                <div class="col s12 card-heading">
                    <span class="card-title">{{header}}</span>
                    <div class="right-align card-activity card-status">
                        <span *ngIf='!formReadonly && !isActivationset'  (click)='cancelEdit()' >
                            <i class="fa fa-times icon-btn cancel" aria-hidden="true"></i>
                        </span>
                        <span  (click)='Add()'>
                            <i class="fa fa-floppy-o icon-btn save" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </div>
        <form [formGroup]="mainForm" (submit)="doLogin($event)" class="form-element">
            <div *ngFor="let arr of orientationArray" class='row m-bottom10'>
                <div *ngFor="let meta of arr; let i =index" > 
             <ui-input 
                    [(ngModel)]="model[meta.name]"
                    [(formControl)]='dataModelControl[meta.name+"Control"]'
                    [errors]= 'dataModelControl[meta.name+"Control"]'
                    [meta]='meta'
                    [readonly]='formReadonly'
                    [errors]='dataModelControl[meta.name+"Control"]'
                    [errorOnlyOnSubmit]='errorOnlyOnSubmit'
                    [attrs]='meta.attrs'
                    [depends]='model[depends]'
                    [labelPosition]=inputLabelPosition
                    (onDropDownChange)='onChange($event)'
                    >                   
                </ui-input>
                </div>
            </div>
            
            <div >
                    <button *ngFor='let action of actionsArray' type="submit" (click)='performAction(action.task)'>{{action.lable}}</button>    
            </div>
    
        </form>
    </div>                          
    `,
   // directives: [UiInput, UiFormMessage, UiFormControl],

})
export class UiGirdForm implements OnInit {
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
    @Input() header: string;
    @Input() isActivationset: boolean;
    @Input() isAddEntryOn: boolean;
    @Output() addData = new EventEmitter();
    @Output() cancelData = new EventEmitter();
    @Input() columnOrientation: number = 2;
    @Input() errorOnlyOnSubmit: boolean;
    @Input() inputLabelPosition: string = '';
    isAdd: boolean;
    dataModel: string = "";
    @ContentChildren(UiFormControl) itemTemplateList: QueryList<UiFormControl>;

    noop = (evnt) => { console.log('no action') };
    actionsArray: Array<any> = [];
    eventArray: Array<any> = [];
    dataModelControl: { [id: string]: AbstractControl } = {};
    mainForm: FormGroup;
    modelTypeObject: boolean = true;
    private orientationArray: Array<Array<ControlMeta>>;
    constructor(private fb: FormBuilder, private viewContainerRef: ViewContainerRef) {
        this.orientationArray = new Array<Array<ControlMeta>>();
    }
    // ngOnInit() {
    //     let t: number = 0;
    //     for (var i = 0; i < Math.ceil(this.controlMetas.length / this.columnOrientation); i++) {
    //         let arr: Array<ControlMeta> = new Array<ControlMeta>();
    //         for (var j = 0; j < this.columnOrientation; j++) {
    //             if (t < this.controlMetas.length)
    //                 arr.push(this.controlMetas[t++]);
    //         }
    //         this.orientationArray.push(arr);
    //     }

    //     let group: { [id: string]: any } = {};
    //     this.filterControlMetas(this.fields);

    //     for (var i = 0; i < this.controlMetas.length; i++) {
    //         let meta = this.controlMetas[i];
    //         let control: any = this.addValidations(meta)
    //         group[meta.name + "Control"] = control;
    //         this.dataModelControl[meta.name + "Control"] = control as AbstractControl;
    //     }
    //     Validators
    //     this.mainForm = this.fb.group(group);

    //     for (var i = 0; i < this.controlMetas.length; i++) {
    //         let meta = this.controlMetas[i];
    //         this.dataModelControl[meta.name + "Control"] = this.mainForm.find(meta.name + "Control");
    //     }
    // }

    // ngOnChanges(changes) {
    //     console.log(changes)
    //     //if(typeof(this.model)===''
    //     var actions = changes["actions"];
    //     if (actions) {
    //         if (actions.currentValue != actions.previoueValue) {
    //             for (var a in this.actions)

    //                 this.actionsArray.push(this.actions[a]);
    //         }
    //     }
    // }

    // filterControlMetas(fields) {
    //     if (fields === null || fields === undefined || fields.length === 0) return false;

    //     fields = this.Unique(fields);

    //     var newMeta = [];
    //     newMeta = this.controlMetas.filter(function (item) {
    //         return fields.indexOf(item.name) !== -1;
    //     });

    //     this.controlMetas = newMeta;
    // }

    // Unique(arrValues) {
    //     var uniqueArray = [];
    //     if (arrValues === null || arrValues.length === 0) return arrValues;

    //     uniqueArray = arrValues.filter(function (item, i, a) {
    //         return i == a.indexOf(item);
    //     });

    //     return uniqueArray;
    // }

    // private addValidations(meta: ControlMeta): any {
    //     let validations = meta.validation.split(' ')
    //     let arr: Array<any> = [];
    //     for (var i = 0; i < validations.length; i++) {

    //         let current = validations[i].split(":");

    //         if (current.length > 1)
    //             arr.push(this.identifyValidator(current[0])(current[1]));
    //         else
    //             arr.push(this.identifyValidator(current[0]));
    //     }
    //     return [meta.name + 'Control', Validators.compose(arr)];
    // }

    // doLogin(event) {
    //     console.log(this.mainForm);
    //     event.preventDefault();
    // }
    // identifyValidator(validation) {
    //     var validationPart = validation.split('.');
    //     if (validationPart.length == 1)
    //         return Validators[validation];
    //     return ControlValidator[validationPart[1]];

    // }

    // performAction(action: Function | string) {
    //     if (typeof (action) === 'string') {
    //         /// call httpAction     
    //     }
    //     else if (typeof (action) === 'function') {
    //         /// call action, abd action should return promise.
    //     }
    //     else {
    //         throw 'action should be of type "string" or "function"';
    //     }
    // }

    ngOnInit() {

        this.setupColumnOrientation();

    }

    ngAfterContentInit() {
        this.setupControls();
        this.registerControls();
        this.registerOnValueChange();
        this.registerEvents();
        // this.registerVisibility();
    }



    ngOnChanges(changes) {
        if (this.itemTemplateList) {
            this.registerVisibility();
            // console.log(this.controlMetas);
        }
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


    private setupColumnOrientation() {
        let t: number = 0;
        for (var i = 0; i < Math.ceil(this.controlMetas.length / this.columnOrientation); i++) {
            let arr: Array<ControlMeta> = new Array<ControlMeta>();
            for (var j = 0; j < this.columnOrientation; j++) {
                if (t < this.controlMetas.length)
                    arr.push(this.controlMetas[t++]);
            }
            this.orientationArray.push(arr);
        }
    }

    private registerControls() {

        for (var i = 0; i < this.controlMetas.length; i++) {
            let meta = this.controlMetas[i];
            this.dataModelControl[meta.name + "Control"] = this.mainForm.controls[meta.name + "Control"];
        }

    }

    private registerEvents() {
        this.controlMetas.forEach(meta => {

            this.itemTemplateList.forEach(element => {
                if (meta.name == element.for && element.for) {
                    if (element.onChange) {
                        meta["change"] = element.onChange;
                    }
                }
            });
        });

    }

    private registerVisibility() {
        this.controlMetas.forEach(meta => {

            this.itemTemplateList.forEach(element => {
                if (meta.name == element.for && element.for) {
                    meta["visible"] = true;
                    if (element.onChange) {
                        meta["visible"] = element.visible;
                    }
                }
            });
        });

    }


    private registerOnValueChange() {
        let count: number = 0;
        this.controlMetas.forEach(meta => {

            this.itemTemplateList.forEach(element => {
                if (meta.name == element.for && element.depends) {
                    var depndsArray = JSON.parse(element.depends);
                    depndsArray.forEach(depend => {
                        var dependSet = depend.split(":");
                        this.dataModelControl[dependSet[0] + "Control"]
                            .valueChanges
                            .subscribe(data => {
                                if (data != '') {
                                    switch (dependSet[1]) {
                                        case "changeattrs":
                                            meta = this.processChangeSet(element.changeattrs, meta, data);
                                            break;
                                        case "readonlyValue":
                                            meta = this.processReadonlyValues(element.readonlyValue, meta, data);
                                            break;
                                    }

                                }
                            });
                    })
                }
            });


        });

    }

    private processReadonlyValues(attrs, meta, data): any {
        var attrArr = JSON.parse(attrs);
        for (var i = 0; i < attrArr.length; i++) {
            meta.show = true;
            if (attrArr[i].toString() == data) {
                // console.log("it actually happened")
                meta.show = false;
                meta.validation = undefined;
                break;
            }
        }
        return meta;

    }

    private processChangeSet(attrs, meta, data): any {

        JSON.parse(attrs).forEach(attr => {
            var attrs = JSON.parse(meta.attrs);
            attrs.forEach(item => {
                if (attr == item.name) {
                    var x = item.value;
                    x = x.split(":");
                    x[0] = data;
                    x[2] = 0;
                    item.value = x.join(":");
                }
            })
            attrs.push({ "selectYears": true })
            meta.attrs = JSON.stringify(attrs);
        })
        return meta;
    }



    private setupControls() {
        for (var i = 0; i < this.controlMetas.length; i++) {
            let meta = this.controlMetas[i];

            meta = this.markIfTemplate(meta);
            let control: any = this.addValidations(meta)
            this.dataModelControl[meta.name + "Control"] = control as AbstractControl;
        }
        this.mainForm = this.fb.group(this.dataModelControl);
    }

    private markIfTemplate(meta: any): any {
        if (this.itemTemplateList) {
            let item: Array<any> = this.itemTemplateList.filter(obj => obj.for === meta.name)
            if (item.length > 0)
                meta.attrs = item[0].behaviours;

        }
        return meta;
    }

    doLogin(event) {
        // console.log(this.mainForm);
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


    Add() {
        this.addData.emit('');
    }

    cancelEdit() {
        this.cancelData.emit('');
    }
}