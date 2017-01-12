import { Component, OnInit, Input, ContentChild, ContentChildren, ViewContainerRef, TemplateRef, QueryList } from '@angular/core';

import { UiFormMessage } from '../../infrastructure/components/UiFormMessage';
import { ControlMeta } from '../../infrastructure/models/ControlMeta';

import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ControlValidator } from "../Validators/ControlValidator"
//import {UiFormControl} from "./app/infrastructure/components/ui.form.control"


@Component({
    selector: "ui-control-item",
    template: ``

})

export class UiFormControl {
    @Input() column: any;
    @Input() for: any;
    @Input() behaviours: any;
    @Input() depends: any;
    @Input() changeattrs: any;
    @Input() onChange: any;
    @Input() visible: boolean = true;
    @Input() readonlyValue: any;
    @Input() requiredValue: any;
    @ContentChild(TemplateRef)
    template: TemplateRef<any>

}


@Component({
    selector: 'ui-form',
    template: `
    <ng-content *ngIf='1==2'></ng-content>
    <div [class]='formCss'>
        <form [formGroup]="mainForm" (submit)="doLogin($event)" class="form-element">
            <div *ngFor="let arr of orientationArray" class='row' >
                <div *ngFor="let meta of arr; let i =index" > 
                <ui-input 
                    [(ngModel)]="model[meta.name]"
                    [(formControl)]='dataModelControl[meta.name+"Control"]'
                    [errors]= 'dataModelControl[meta.name+"Control"]'
                    [meta]='meta'
                    [readonly]='formReadonly'
                    [errorOnlyOnSubmit]='errorOnlyOnSubmit'
                    [attrs]='meta.attrs'
                    [depends]='model[depends]'
                    [labelPosition]=inputLabelPosition
                    (onDropDownChange)='onChange($event)'
                    >
                </ui-input>
                </div>
            </div>
          
            <div>
                    <button *ngFor='let action of actionsArray' type="submit" (click)='performAction(action.task)'>{{action.lable}}</button>    
            </div>
    
        </form>
    </div>                          
                            `


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
    @Input() errorOnlyOnSubmit: boolean;
    @Input() inputLabelPosition: string = '';
    dataModel: string = "";
    @ContentChildren(UiFormControl) itemTemplateList: QueryList<UiFormControl>;

    noop = (evnt) => {  };
    actionsArray: Array<any> = [];
    eventArray: Array<any> = [];
    dataModelControl: { [id: string]: AbstractControl } = {};
    mainForm: FormGroup;
    modelTypeObject: boolean = true;
    private orientationArray: Array<Array<ControlMeta>>;
    bookingArray: Array<any> = [{ 'id': '1', text: 'WorldSpin Holidays' }, { 'id': '2', text: 'Booking 1' }, { 'id': '3', text: 'Other Agency' }];
    constructor(private fb: FormBuilder, private viewContainerRef: ViewContainerRef) {
        this.orientationArray = new Array<Array<ControlMeta>>();
    }


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
        }
    }

    resetUIForm() {
        this.ngAfterContentInit();
    }

    private addValidations(meta: ControlMeta): any {
        let validations = !meta.validation ? [] : meta.validation.split(' ')
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
            this.dataModelControl[meta.name + "Control"] = this.mainForm.get(meta.name + "Control");
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
                                        case "requiredValue":
                                            meta = this.processMandatory(element.requiredValue, meta, data);
                                            break;
                                    }

                                }
                            });
                    })
                }
            });


        });

    }

    processMandatory(attrs, meta, data): any {


        let thisModel = this;

        if (Number(thisModel.model.bookingFrom) != 3)
            thisModel.model.agencyName = this.bookingArray.find(x => x.id == thisModel.model.bookingFrom).text;
        else
            thisModel.model.agencyName = "";

        return meta;

    }

    private processReadonlyValues(attrs, meta, data): any {
        var attrArr = JSON.parse(attrs);
        for (var i = 0; i < attrArr.length; i++) {
            meta.show = true;
            if (attrArr[i].toString() == data) {
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




