import { Component, OnInit, Input } from '@angular/core';
import { UIViewControl } from '../../infrastructure/components/UiViewControl';
import { ControlMeta } from '../../infrastructure/models/ControlMeta';

@Component({
    selector: 'short-profile',
    template: `
        <div class="employee-form">
                <div class="col s12 m2 l2 valign">
                    <div class="employee-search-img">
                        <ui-view-control [meta]='metaObject.imagePath' [model]='model.imagePath'></ui-view-control>
                        <div class="change-picture">
                            <i class="fa fa-camera" aria-hidden="true"></i>
                        </div>
                        <i class="fa fa-check active-status" aria-hidden="true"></i>
                    </div>                            
                </div>
                <div class="col s12 m3 l3">
                    <div class="row">
                        <div class="view-form-info col s12">
                            <ui-view-control [meta]='metaObject.FullName' [model]='model.firstName +" " + model.middleName + " " + model.lastName'></ui-view-control>
                        </div>
                    </div>
                    <div class="row">
                        <div class="view-form-info col s12">
                            <ui-view-control [meta]='metaObject.id' [model]='model.id'></ui-view-control>
                        </div>
                    </div>
                </div>
                <div class="col s12 m3 l3">
                    <div class="row">
                        <div class="view-form-info col s12">
                            <ui-view-control [meta]='metaObject.currentDesignation' [model]='model.currentDesignation'></ui-view-control>
                        </div>
                    </div>
                    
                </div>
   
        </div>  `,
})
export class ShortProfileComponent implements OnInit {
    @Input() controlMetas: Array<ControlMeta>;
    @Input() model: any;
    @Input() metaObject: any = {};
    constructor() {

    }
    ngOnInit() {
        for (var i in this.controlMetas)
            this.metaObject[this.controlMetas[i].name] = this.controlMetas[i];
    }
}
