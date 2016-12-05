import { Component, OnInit, Input,EventEmitter,Output} from '@angular/core';

@Component({
    selector: 'edit-confirm',
    template: ` <div class="modal-custom  modal-confirm">
                    <div class="modal-content">
                        <!--<h5 class="margin-zero">Please Confirm</h5>-->
                        <p style="width:321px">Your data will be sent for approval, after approval
                            process you will able to see the new data.</p>
                    </div>
                   <!-- <div class="modal-footer">
                        <a (click)='EditData()' class=" modal-action modal-close btn submit">OK</a>
                    </div>-->
                </div>
                           
                            `,
    

})
export class EditConfirmation {
    @Output() EditDataControl = new EventEmitter();

    // EditData() {
    //    this.EditDataControl.emit('');
    // }
}