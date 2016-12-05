import { Component, ContentChild, ContentChildren, EventEmitter, TemplateRef, QueryList, Input, forwardRef, Directive} from "@angular/core";
import { ViewContainerRef, ChangeDetectorRef} from '@angular/core'
@Component({
    selector: "repeater",
    template:

    `
        <div *ngIf='children'>
            <div *ngFor='let current of source'>
                <template
                    [ngTemplateOutlet]="children._results[0]"
                    [ngOutletContext]="{ item: current }">
                </template>
             </div>
        </div>
    `
})
export class Repeater {
    @ContentChildren(TemplateRef)
    children: QueryList<TemplateRef<any>>

    @Input()
    source: Array<any>;
}