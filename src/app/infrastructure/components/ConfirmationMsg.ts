import { Component, OnInit, Input,EventEmitter,Output} from '@angular/core';

@Component({
    selector: 'confirm',
    template: ` <div class="modal-custom  modal-confirm">
                             <div class="modal-content">
                                <h5 class="margin-zero">Please Confirm</h5>
                                <p>Are you sure to proceed?</p>
                            </div>
                            <div class="modal-footer">
                                <a (click)='CancelEdit()' class=" modal-action modal-close btn cancel">Cancel</a>
                                <a (click)='DeleteData()' class=" modal-action modal-close btn submit">OK</a>
                            </div>
                        </div>
                           
                            `

})
export class Confirmation {
    @Output() DeleteControl = new EventEmitter();
    @Output() CancelDelete= new EventEmitter();

    CancelEdit() {
       this.CancelDelete.emit('');
    }
    DeleteData() {
       this.DeleteControl.emit('');
    }
}