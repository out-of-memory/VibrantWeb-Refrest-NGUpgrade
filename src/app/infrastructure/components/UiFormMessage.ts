import {Component, Provider, forwardRef, Input, OnInit} from "@angular/core";
import {ControlValueAccessor, AbstractControl,NG_VALUE_ACCESSOR, FormBuilder} from "@angular/forms";
import {BaseControlValueAccessor} from './BaseControlValueAccessor';


    
    const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UiFormMessage),
    multi: true
};
    

@Component({
    selector: 'ui-form-message',
    template: `
      <div class="col s6">
       {{errorMessages[0]}} 
      </div>
  `
,
       styles:[`
       .error-message {
            font-size: 0.8rem;
            color: #FF4081;
            margin-left: 12px;
        }
   `],
})
export class UiFormMessage implements OnInit {

    constructor() {


    }
    @Input() error: any;
    @Input() errorCss: string;
    @Input() successCss: string;
    cssClass: string;
    @Input() message: string;
    errorMessages: Array<string>;
    ngOnInit() {

        this.errorMessages = new Array<string>();
        this.processData(this.error);
    }

    ngOnChanges(data) {
        this.processData(data["error"]===undefined?null:data["error"].currentValue);
    }

    private processData(data: any) {
        if (data != null) {
            this.cssClass = this.errorCss;

            var keys = this.getErrorCodes(data);
           // console.log(keys);
            this.errorMessages = this.GetErrorMessages(keys);
           // console.log(this.errorMessages);
        }
        else {
            this.cssClass = this.successCss;
            this.errorMessages=[];
        }

    }

    private getErrorCodes(obj: any): Array<string> {
        let keys = Array<string>();
        for (var key in obj)
            keys.push(key);
        return keys;
    }

    private GetErrorMessages(keys: Array<string>): Array<string> {
        let errorMessages: Array<string> = [];
        let data = {  validateEmail:"Require Valid Email!",required: "Required!", minlength: "minLength", maxlength: "maxLength",validateSelect:"Plese select one option!",
                      validateNumber:"Only numbers allowed !",validateGrade:"Plese enter valid grade!",validateRating:"Please give rating between 1-10",
                      validatePhoneNo:"Please Enter valid phone no.",validateYear:"Please enter valid year.",validateEmpCodeForReport:"Please enter valid emp code.",
                      validateEmptyString:"Please enter value." }

        for (var key in keys){
          ///  console.log(keys[key]);
            errorMessages.push(data[keys[key]]);
        }
        return errorMessages;
    }

}