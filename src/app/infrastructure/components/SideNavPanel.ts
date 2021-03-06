import { Component, EventEmitter, Input } from '@angular/core';
import { NavbarModel } from '../../models/NavbarModel';
declare var $: any;

@Component({
    selector: 'sidenav-panel',
    templateUrl: './../templates/sidenav.html',
})
export class SideNavPanelComponent {


    @Input() navbar: NavbarModel[];
    @Input() isActive: boolean = false;

    public clickOutside = new EventEmitter();
    childNev: boolean = false;

    constructor() {

    }

    close(isActive: boolean) {
        this.isActive = !isActive;
        $(".button-collapse").removeClass("active");		       
        $("#slide-out").removeClass("active");
    }

    // ND: Need to modify this toggle event as this is creating a issue.
    toggle(e, item, childNavElement) {
        childNavElement = (typeof (childNavElement) === "string") ? document.getElementById(childNavElement) : childNavElement;

        if (item) {
            if (childNavElement.childElementCount > 0) {
                if (this.childNev == false) {
                    childNavElement.style.display = "block";
                    this.childNev = true;
                }
                else {
                    childNavElement.style.display = "none";
                    this.childNev = false;
                }
            }
            else {
                item.isActive = false;
                this.close(true);
            }
        }
        e.preventDefault();
    }
}
