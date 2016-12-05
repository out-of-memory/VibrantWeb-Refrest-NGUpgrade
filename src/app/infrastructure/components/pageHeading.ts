import {Component, Input} from "@angular/core";

@Component ({
    selector: 'page-heading',
    template: `<div class="breadcrumb-nav">
                <!--<div class="row margin-zero">
                    <div class="col s12">
                        <a href="#!" class="breadcrumb">My vibrant web</a>
                        <a href="#!" class="breadcrumb">Attendance</a>
                    </div>
                </div>-->
                <div class="row margin-zero">
                    <div class="col s12">
                        <h5>{{heading}}</h5>
                    </div>
                </div>
            </div>`
})

export class pageHeading{
    @Input() heading:string;
    
}