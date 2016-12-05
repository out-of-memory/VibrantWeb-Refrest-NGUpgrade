import {Component, Input} from '@angular/core'

@Component({
    selector:'sidenav-button',
    template:`
        <a href="#" data-activates="slide-out" class="button-collapse menu-icon show-on-large" [ngClass]="{'active': isActive}">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </a>    
    `})
export class SideNavButtonComponent {
    @Input() isActive: boolean = false;
}
