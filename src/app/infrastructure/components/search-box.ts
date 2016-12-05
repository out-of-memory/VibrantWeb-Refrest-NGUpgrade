import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'search-box',
    template: `
        <ng-content></ng-content>
        <a class="btn waves-effect waves-light" (click) = 'Search($event)'><i class="material-icons">search</i></a>
    `
})
export class SearchBox {
    @Output() search = new EventEmitter(); 
    @Input() form:any;  

    constructor() {
    }

    Search(e) {
        e.preventDefault();
        this.search.emit(this.form);
    }
}