import { Component, ContentChild, ContentChildren, EventEmitter, TemplateRef, QueryList, Input, forwardRef, Directive} from "@angular/core";
import { ChangeDetectionStrategy, ViewContainerRef, ChangeDetectorRef, ViewChildren,  ComponentRef} from '@angular/core'

@Component({
  selector: "ui-form-control",
  template: ``
  
})

export class UIFormControl {
  @Input() model: any;
  @Input() options: string;
  @Input() prop:string;
  @ContentChild(TemplateRef)
  template: TemplateRef<any>
  
}