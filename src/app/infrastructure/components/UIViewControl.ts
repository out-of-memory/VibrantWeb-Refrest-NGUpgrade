import {Component, Provider, forwardRef, Input} from "@angular/core";
//import {ControlValueAccessor, NG_VALUE_ACCESSOR, CORE_DIRECTIVES,AbstractControl, FormBuilder} from "@angular/common";
@Component({
  selector: 'ui-view-control',
  template: `
          <div *ngIf='meta.type!=="img"'>
                <h5>{{model}}</h5>
           </div>
           <h6> {{meta.label}} </h6>
           <div *ngIf='meta.type=="img"'>
           <img  class="circle responsive-img" 
                 [attr.alt]='meta.alt'
                 [src]='model' />
           </div>
  `,
 // directives: [CORE_DIRECTIVES]
})
export class UIViewControl {
   @Input() meta:any;
   @Input() model:any;
}