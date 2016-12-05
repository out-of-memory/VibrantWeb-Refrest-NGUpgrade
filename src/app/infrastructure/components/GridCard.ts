import {Component,Input,Output,EventEmitter} from '@angular/core'

@Component({
    selector:'grid-card',
    template:`        
        <div class='card white'>
            <div class="row heading-content">
                <div class="col s12 card-heading">
                    <span class="card-title">{{header}}</span>
                    <div class="right-align card-activity card-status">
                   <!-- <span *ngIf = 'nonEditable==false && isSentForApproval==false' (click)='formAddToggle()'>-->
                   <span *ngIf = 'nonEditable==false'  (click)='formAddToggle()'>
                         <i class="fa fa-plus icon-btn add" aria-hidden="true" title="Add"></i>
                    </span>
                    </div>
                </div>
            </div>                                       
            <ng-content></ng-content>
             <!--<div style="color:#f15a24" *ngIf = " isSentForApproval==true">Data sent for approval. Cannot update data.</div>-->
        </div>
    `
})
export class GridCard {
    @Input() header: string;
    @Input() formReadonly: boolean;
    @Input() isAddEntryOn: boolean;
    @Input() nonEditable:any;
    @Input() isSentForApproval:any;
    @Output() addActivationChanged = new EventEmitter();

    formAddToggle() {
        this.formReadonly = !this.formReadonly;
        this.isAddEntryOn = true;
        this.addActivationChanged.emit(this.isAddEntryOn);
    }
  
}
