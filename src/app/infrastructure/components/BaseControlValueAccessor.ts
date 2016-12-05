import {Component, Provider, forwardRef, Input} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR,/* CORE_DIRECTIVES,*/AbstractControl, FormBuilder} from "@angular/forms";
const noop = () => {};
export class BaseControlValueAccessor implements ControlValueAccessor{

    //The internal data model
    private _value: any ;
  
    //Placeholders for the callbacks
    private _onTouchedCallback: () => void = noop;
   
    private _onChangeCallback: (_:any) => void = noop;
  
    //get accessor
    get value(): any { return this._value; };
  
    //set accessor including call the onchange callback
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this._onChangeCallback(v);
      }
    }
    
    //Set touched on blur
    onTouched(){
      this._onTouchedCallback();
    }
  
    //From ControlValueAccessor interface
    writeValue(value: any) {
      this._value = value;
    }
  
    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
      this._onChangeCallback = fn;
    }
  
    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
      this._onTouchedCallback = fn;
    }
    
}