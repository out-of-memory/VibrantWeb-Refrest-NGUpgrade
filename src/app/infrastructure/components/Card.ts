import {Component,Input,Output,EventEmitter} from '@angular/core'

@Component({
    selector:'card',
    template:`        
        <div class='card white'>
            <div class="row heading-content">
                <div class="col s12 card-heading">
                    <span class="card-title">{{header}}</span>
                    <div class="right-align card-activity card-status">
                    <span *ngIf='isActivationset && !isViewOnly' (click)='formAddToggle("update")'>
                         <i class="fa fa-plus icon-btn add" aria-hidden="true" title="Add"></i>
                    </span>
                        <span *ngIf='!formReadonly && !isActivationset'  (click)='cancelEdit()' >
                            <i class="fa fa-times icon-btn cancel" aria-hidden="true" title="Cancel"></i>
                        </span>                    
                        <!--<span  (click)='formToggle("update")' >
                            <i class="fa fa-{{!formReadonly?'floppy-o':'pencil'}} icon-btn {{!formReadonly?'save':'edit'}}" aria-hidden="true"></i>
                        </span> -->
                        <span  (click)='Edit()' *ngIf = "nonEditable==false && formReadonly && isSentForApproval==false" >
                            <i class="fa fa-pencil icon-btn edit" aria-hidden="true" title="Edit"></i>
                        </span>
                        <span  (click)='Add()' *ngIf = '!formReadonly &&  isAddEntryOn' >
                            <i class="fa fa-floppy-o icon-btn save" aria-hidden="true" title="Save"></i>
                        </span>
                        <span  (click)='Save()' *ngIf = '!formReadonly && !isAddEntryOn' >
                            <i class="fa fa-floppy-o icon-btn save" aria-hidden="true" title="Save"></i>
                        </span>
                    </div>
                </div>
            </div>                                       
            <ng-content></ng-content>
            <div class="approval-data-msg" *ngIf = " isSentForApproval==true">Data sent for approval. Cannot update data.</div>
        </div>
         
    `
})
export class Card {
    @Input() header: any;
    @Input() formReadonly: boolean;
    @Input() isActivationset: boolean;
    @Input() isAddEntryOn: boolean;
    @Input() isViewOnly: boolean;
    @Input() nonEditable:any;
    @Input() isSentForApproval:any;
    @Output() readOnlyChanged = new EventEmitter();
    @Output() addActivationChanged = new EventEmitter();
    @Output() saveData = new EventEmitter();
    @Output() addData = new EventEmitter();
    @Output() cancelData = new EventEmitter();
    isAdd:boolean;

    cancelEdit() {
        this.formReadonly = true;
        if (this.isAddEntryOn || this.isAdd) {
            this.isActivationset = true;
            this.isAddEntryOn = false;
        }
        this.readOnlyChanged.emit(this.formReadonly);
        this.cancelData.emit('');
    }

    // formToggle(action: string) {
    //     if(!this.formReadonly) {
    //         this.saveData.emit(this.formReadonly);
    //     }
    //     this.formReadonly = !this.formReadonly;
    //     if (this.isActivationset || this.isAddEntryOn) {
    //         this.isActivationset = !this.isActivationset; 
    //         this.isAddEntryOn=true;           
    //     }
    //     this.readOnlyChanged.emit(this.formReadonly);
    // }

    Edit() {
        this.formReadonly = false;
        if (this.isActivationset ) {
            this.isActivationset = false; 
            this.isAdd=true;
        }
        this.readOnlyChanged.emit(this.formReadonly);
    }

    Add() {        
        var self = this;
        self.addData.emit(function() {
            self.formReadonly = true;
            if (self.isActivationset ) {
                self.isActivationset = true; 
            }           
            self.readOnlyChanged.emit(self.formReadonly);
        });
    }

    Save() {        
        var self = this;
        self.saveData.emit(function() {
            self.formReadonly = true;
            if (self.isActivationset ) {
                self.isActivationset = true;
            }           
            self.readOnlyChanged.emit(self.formReadonly);
        });
    }

    formAddToggle() {
        this.formReadonly = !this.formReadonly;
        this.isActivationset = !this.isActivationset;
        this.isAddEntryOn = true;
        this.addActivationChanged.emit(this.isAddEntryOn);
    }
}
