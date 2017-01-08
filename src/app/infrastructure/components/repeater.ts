import { Component, ContentChild, ContentChildren, EventEmitter, TemplateRef, QueryList, Input, forwardRef, Directive} from "@angular/core";
import { ViewContainerRef, ChangeDetectorRef} from '@angular/core'
@Component({
    selector: "repeater",
    template:

    `
        <div *ngIf='children'>
            <div *ngFor='let current of source'>
                <template
                    [ngTemplateOutlet]="children"
                    [ngOutletContext]="{ item: current }">
                </template>
             </div>
        </div>
    `
})
export class Repeater {
    @ContentChild('tmplRepeater')
    children: TemplateRef<any>

    @Input()
    source: Array<any>;
}