import {Component, Input} from '@angular/core';
import {SideNavComponent} from './SideNav';

@Component({
    selector:'sidenav-panel',
    template:`    
        <sidenav [navbar]='source' [isActive]=isActive></sidenav>
    `
})
export class SideNavPanelComponent {
    @Input() isActive: boolean = false;
    @Input()source:any;
}
