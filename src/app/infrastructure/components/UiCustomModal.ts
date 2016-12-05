import {Component,Input, Output, EventEmitter} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'ui-custom-model',
  template: `
                <!-- Modal Structure -->
                <div id="modal" class="modal-custom" *ngIf="edited==true">
                    <div class="modal-header">
                        <h4>{{modalHeader}}</h4>
                        <a class="right modal-close" (click)="close()"><i class="material-icons small">close</i></a>
                    </div>
                    <div class="modal-content">
                        <ng-content></ng-content>
                    </div>
                </div>
                <div class="modal-overlay" *ngIf="edited==true" (click)="close()"></div>
              `,
   styles:[`
        .modal-custom{
            z-index: 1003;
            display: block;
            opacity: 1;
            transform: scaleX(1);
            top: 10%;
            position: fixed;
            left: 0;
            right: 0;
            background-color: #fafafa;
            max-height: 80%;
            width: 40%;
            margin: auto;
            overflow-x: hidden;
            overflow-y: auto;
            border-radius: 2px;
            will-change: top, opacity;
            box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21);
            padding: 10px;
            background: #f9f9f9;
        }
        .modal-custom .modal-header {
            padding: 10px 10px 15px 10px;
            border-bottom: solid 1px #f15a24;
            clear: both;
        }
        .modal-custom .modal-header h4 {
            font-family: 'Lato-Bold';
            font-size: 16px;
            color: #000000;
            margin: 0;
            display: inline-block;
        }
        .modal-custom .modal-content .modal-footer {
            border-radius: 0 0 2px 2px;
            background-color: #fafafa;
            padding: 0 10px 0 0;
            height: 40px;
            width: 100%;
        }
        .modal-custom .modal-content .modal-footer .btn {
            float: right;
            background: #f15a24;
            margin: 0 10px 0 0;
        }
        .modal-custom i{
            color: #494342;
            vertical-align: middle;
            font-size: 20px;
        }
        .modal-custom h4{
            font-family: 'Lato-Bold';
            color: #000000;
            display: inline-block;
        }
        .modal-overlay{
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 100%;
            background: #000;
            z-index: 1002;
            display: block;
            opacity: 0.5;
            will-change: opacity;
        }
        .modal-custom .modal-close{
            cursor: pointer;
        }
   `],
})
export class UiCustomModal {
    @Input() edited: any;
    @Input() content: any;
    @Input() modalHeader:string;
    @Output() onClose = new EventEmitter();
    @Output() onModalClick = new EventEmitter();

    close() {
        this.edited=!this.edited
        this.onClose.emit('');
    }

}