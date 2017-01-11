import { Component, ValueProvider, forwardRef, Input, ElementRef, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormBuilder } from "@angular/forms";
import { BaseControlValueAccessor } from './BaseControlValueAccessor';
import { OptionTextPipe, AlphabetPipe } from '../pipes/Pipes';
import { MaterializeDirective } from "angular2-materialize";
//import {NKDatetime} from "ng2-datetime/ng2-datetime";
import * as Materialize from "angular2-materialize";
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UiInput),
    multi: true
};



@Component({
    selector: 'ui-input',
    //pipes: [OptionTextPipe, AlphabetPipe],

    template: `
    
        <div class='view-form-info ui-input'>
            <div  [ngClass]="meta.css" *ngIf='meta.show' >
                <h6 *ngIf=' !readonly &&  meta.label!=="" && labelPosition==="top"' class="active">{{meta.label}}</h6>

               <h5 *ngIf='!readonly && (meta.type=="view")'>{{value}}
                </h5>
                <input 
                        style='position:relative'  
                        *ngIf='!readonly && (meta.type=="text"||meta.type=="number")'
                        [ngClass]='errors.errors?"invalidControl": "validControl"' 
                        [type]='meta.type' 
                        [attr.placeholder]='meta.placeholder'
                        [(ngModel)]="value"  />

                <input 
                        style='position:relative'  
                        *ngIf='!readonly && meta.type=="checkbox"'
                        [ngClass]='errors.errors?"invalidControl": "validControl"'
                        [type]='meta.type'
                        [(ngModel)]="value"  (change)="CheckboxClick($event, value)"/>

                <input
                        style='position:relative'
                        *ngIf='!readonly && meta.type=="textmaxlength"'
                        [ngClass]='errors.errors?"invalidControl": "validControl"' 
                        [type]='"text"' 
                        [attr.placeholder]='meta.placeholder' 
                        [(ngModel)]="value" [attr.maxlength]='meta.maxlength'/>

                <input
                        style='position:relative'
                        *ngIf='!readonly && meta.type=="time"'
                        [ngClass]='errors.errors?"invalidControl": "validControl"' 
                        [type]='"time"' 
                        [attr.placeholder]='meta.placeholder' 
                        [(ngModel)]="value" />
                
                <textarea #textarea
                        style='position:relative' 
                        class='materialize-textarea custom-textarea'
                        *ngIf='!readonly && meta.type=="textarea"'
                        [ngClass]='errors.errors?"invalidControl": "validControl"'
                        [attr.placeholder]='meta.placeholder'
                        [(ngModel)]="value"
                        [attr.cols]='meta.cols'
                        [attr.rows]='meta.rows'></textarea>
                
                <select  #select
                        
                        style='position:relative' 
                        *ngIf='!readonly && meta.type=="select"'
                        [ngClass]='errors.errors?"invalidControl": "validControl"'
                        class=" browser-default" 
                        [(ngModel)]='value'>
                            <option *ngFor="let p of meta.options" [value]="p.id">{{p.text}}</option>
                </select>

                <select
                        
                        materialize="material_select"
                        style='position:relative' 
                        *ngIf='!readonly && meta.type=="selectMaterialize"'
                        [ngClass]='errors.errors?"invalidControl": "validControl"'
                        class=""
                        [(ngModel)]='value' [materializeSelectOptions]="meta.options">
                            <option value="" disabled class="disabled" >Select</option>
                            <option *ngFor="let p of meta.options" [value]="p.id">{{p.text}}</option>
                </select>
                <select
                        
                        materialize="material_select"
                        style='position:relative' 
                        *ngIf='!readonly && meta.type=="selectMaterialize-custom"'
                        [ngClass]='errors.errors?"invalidControl": "validControl"'
                        class="" 
                        [multiple]='meta.multiple'
                        (change)="setSelected($event)"
                        [(ngModel)]='value' [materializeSelectOptions]="meta.options">
                            <option value='null'  class="disabled" >{{meta.defaultselect}}</option>
                            <option *ngFor="let p of meta.options" [value]="p.id">{{p.text}}</option>
                </select>

                <input  #date
                    style='position:relative' 
                    *ngIf='!readonly && meta.type=="date"'
                    [ngClass]='errors.errors?"invalidControl": "validControl"'
                    type='text'
                    [(ngModel)]="value"
                    
                    [attr.placeholder]='meta.placeholder'
                    materialize="pickadate" 
                    [(materializeParams)]="meta.materializedParams" 
                    updateMaterializeParams
                    [updateParams]='updateParams'
                     />
                    <div class='errorMessage' *ngIf='!readonly && errors.errors' ><span *ngIf=' errors.errors && errorOnlyOnSubmit'>Value is not in correct format.</span></div>        
                <h5 *ngIf='readonly && meta.type !="select"' class="new-line-word" >{{value}}</h5>
                <h5 *ngIf='readonly && meta.type=="select"'>{{value|option:meta.options}}</h5>
                <div *ngIf="showSpan==true">
                    <span *ngIf='labelPosition=="bottom" ||  labelPosition=="" || labelPosition==undefined || readonly'>
                        <h6 *ngIf='value || !readonly && meta.label!=="" && showSpan==true' class="active">{{meta.label}}</h6>
                    </span>
                </div>

            </div>     
        </div>
  `,
    //declarations: [MaterializeDirective],//NKDatetime],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class UiInput extends BaseControlValueAccessor {
    @Input() meta: any;
    @Input() readonly: boolean = false;
    @Input() cssClass: string;
    @Input() errors: any;
    @Input() errorOnlyOnSubmit: boolean;
    @Input() attrs: any;
    @Input() depends: any
    @Input() labelPosition: string = 'bottom';
    @Input() showSpan: boolean = true;
    @ViewChild("input") input;
    @ViewChild("textarea") textarea;
    @ViewChild("select") select;
    @ViewChild("date") date;
    isChanged: boolean = false;
    updateParams: any = undefined;
    slectedvalue: any;
    constructor(ref: ElementRef) {
        super();
    }
    ngOnInit() {
        this.ngAfterViewInit();
    }

    ngOnChanges(changes) {
        this.isChanged = true;
        this.ngAfterViewInit();
        this.isChanged = false;
    }
    ngAfterViewInit() {
        if (!this.meta.show && (this.meta.validation != undefined))
            this.meta.show = true;
        if (this.attrs) {
            this.attrs = typeof (this.attrs) === "string" ? JSON.parse(this.attrs) : this.attrs;
            this.setupParameters();

        }
    }

    private setupEvent() {
        if (!this.meta["change"])
            this.meta["change"] = (val) => { };

    }
    private setupParameters() {
        switch (this.meta.type) {
            case 'date':
                this.MaterializedDateParams();
                break;
            default:
                break;
        }
    }

    //ValueFormat: date|today:format{mm/dd/yyyy,dd/mm/yyyy,yyyy/mm/dd}:+-years
    DateParser(value) {

        var dateparts = value.split(":");
        let date = null;
        if (dateparts[0] == 'today') {
            date = new Date();

        }
        else {


            if (dateparts[0] == "") {
                date = new Date();
            }
            else {
                let dateArr = dateparts[0].split("/");
                switch (dateparts[1]) {
                    case "dd/mm/yyyy":
                        date = new Date(parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0]));
                        break;
                    case "mm/dd/yyyy":
                        date = new Date(parseInt(dateArr[2]), parseInt(dateArr[0]) - 1, parseInt(dateArr[1]));
                        break;
                    case "yyyy/mm/dd":
                        date = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]));
                        break;
                    default:
                        date = new Date(parseInt(dateArr[2]), parseInt(dateArr[1]) - 1, parseInt(dateArr[0]));
                        break;
                }
            }

        }
        if (dateparts[2]) {
            date.setFullYear(date.getFullYear() + parseInt(dateparts[2]));

        }
        return date;

    }

    private MaterializedDateParams() {
        let materializedParams = [{ format: 'mm/dd/yyyy', today: '', selectYears: 30 }];
        if (this.attrs && this.attrs.forEach) {
            this.attrs.forEach(item => {
                //console.log(item);
                materializedParams[0][item.name] = this.TransForms(this.meta.type, item);
                if (item.name == "default")
                    this.value = new Date();
            })
        }

        this.meta.materializedParams = materializedParams;
        if (this.isChanged)
            this.updateParams = materializedParams;
    }

    private TransForms(from, kvp): any {
        let returnValue: any = null;
        if (from == 'date') {
            switch (kvp.name) {
                case "min":
                case "max":
                    returnValue = this.DateParser(kvp.value);
                    break;
                default:
                    returnValue = returnValue = kvp.value;
                    break;
            }
        }
        return returnValue;
    }

    private CheckboxClick(e: any, checked: boolean) {
        this.value = !checked;
    }

    private setSelected(selectElement) {
        if (this.meta.multiple == true) {
            let str: Array<any> = [];
            for (var i = 0; i < selectElement.currentTarget.options.length; i++) {
                var optionElement = selectElement.currentTarget.options[i];
                if (optionElement.selected == true) {
                    this.slectedvalue = optionElement.value.split(':');
                    str.push(parseInt(this.slectedvalue[1]));
                }
                else {
                    optionElement.selected == false;
                }
            }
            this.value = str;
        }

    }
}