import { Component, EventEmitter, Input, Output, Directive, ElementRef, HostListener } from '@angular/core';
import { NavbarModel } from '../../models/NavbarModel';
import { CacheService } from './../../servicesFolder/CacheService';
import { HttpService } from './../../servicesFolder/http/http.service';
import { MenuService } from './../../servicesFolder/Menu/MenuService';
import { ModulePipe } from '../../infrastructure/Pipes/Pipes';

@Directive({
    selector: '[clickOutside]'
})

@Component({
    selector: 'sidenav',
    templateUrl: './../templates/sidenav.html',
    providers: [HttpService]
})
export class SideNavComponent {
    @Input() navbar: NavbarModel[];
    @Input() isActive: boolean = false;

    @Output()
    public clickOutside = new EventEmitter();

    childNev: boolean = false;
    constructor(private _elementRef: ElementRef) {

    }

    close(isActive: boolean) {
        this.isActive = !isActive;
       
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