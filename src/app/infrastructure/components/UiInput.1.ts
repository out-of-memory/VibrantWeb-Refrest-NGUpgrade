import {Component, Provider, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES, AbstractControl, FormBuilder, NgFormControl} from "@angular/common";
import {BaseControlValueAccessor} from './BaseControlValueAccessor';
import {OptionTextPipe} from '../pipes/Pipes';
import {MaterializeDirective} from "angular2-materialize";
import { Validators, ControlGroup} from '@angular/common';
import {ControlValidator} from "../Validators/ControlValidator";
import {ControlMeta} from '../../infrastructure/models/ControlMeta';


const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => UiInput),
        multi: true
    });

@Component({
    selector: 'ui-input',
    pipes: [OptionTextPipe],
    template: `
        <div class='view-form-info'>
            <div *ngIf='meta.type=="text"' [ngClass]="meta.css" >
                <input class="validate" *ngIf='!readonly' [type]='meta.type' [attr.placeholder]='meta.placeholder' [(ngModel)]="value" [(ngFormControl)]='control.control'>
                <h5 *ngIf='readonly' >{{value}}</h5>
                <h6 *ngIf='value || !readonly' class="active">{{meta.label}}</h6>
            </div>     
            <div *ngIf='meta.type=="number"' [ngClass]="meta.css" >
                <input class="validate" *ngIf='!readonly' [type]='meta.type' [attr.placeholder]='meta.placeholder' [(ngModel)]="value" [(ngFormControl)]='control.control'>
                <h5 *ngIf='readonly' >{{value}}</h5>
                <h6 *ngIf='value || !readonly' class="active">{{meta.label}}</h6>
            </div> 
            <div [ngClass]="meta.css" *ngIf='meta.type=="textarea"'>
                <textarea *ngIf='!readonly' class="validate"
                        [attr.placeholder]='meta.placeholder'
                        [(ngModel)]="value"
                        [attr.cols]='meta.cols'
                        [attr.rows]='meta.rows'
                        [(ngFormControl)]='control.control'
                        ></textarea>
                <h5 *ngIf='readonly' class='view-form-info'>{{value}}</h5>
                <h6 *ngIf='value || !readonly' class="active">{{meta.label}}</h6>
            </div>

            <div [ngClass]="meta.css" *ngIf='meta.type=="checkbox"'>
                <input *ngIf='!readonly' class="validate"
                    [type]='meta.type'
                    [attr.placeholder]='meta.placeholder'
                    [(ngModel)]="value"
                    [(ngFormControl)]='control.control'
                    >
                
                <h5 *ngIf='readonly'>{{value}}</h5>
                <h6>{{meta.label}}</h6>
            </div>

            <div *ngIf='meta.type=="select"' [ngClass]="meta.css">
                <select *ngIf='!readonly' class="validate browser-default" [(ngModel)]='value' [(ngFormControl)]='control.control'>
                    <option *ngFor="let p of meta.options" [value]="p.id">{{p.text}}</option>
                </select>
                <h5 *ngIf='readonly' class='view-form-info'>{{value|option:meta.options}}</h5>
                <h6>{{meta.label}}</h6>

            </div>

            <div [ngClass]="meta.css" *ngIf='meta.type=="date"'>
                <input *ngIf='!readonly'
                    class='validate'
                    type='text'
                    [(ngModel)]="value"
                    [(ngFormControl)]='control.control'
                    [attr.placeholder]='meta.placeholder'
                    materialize="pickadate" [materializeParams]="[{format:'mm/dd/yyyy',closeOnSelect: true}]" />
                <h5 *ngIf='readonly' class='view-form-info'>{{value }}</h5>
                <h6 *ngIf='value || !readonly'>{{meta.label}}</h6>
            </div>
        </div>
  `,
    directives: [CORE_DIRECTIVES, MaterializeDirective],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class UiInput extends BaseControlValueAccessor {
    @Input() meta: any;
    @Input() readonly: boolean = false;
    @Input() cssClass: string;
    @Input() form: FormBuilder;
    control: any;

    constructor() {

        super();

    }


    ngOnInit() {
        this.control = this.addValidations(this.meta);
        this.form.group(this.control.name, this.control.control as AbstractControl);
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
        return { name: meta.name + 'Control', control: Validators.compose(arr) };
    }


    identifyValidator(validation) {
        var validationPart = validation.split('.');
        if (validationPart.length == 1)
            return Validators[validation];
        return ControlValidator[validationPart[1]];

    }

}