import { Component, Input, OnInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";

@Component({
    selector: 'multi-select',
    template: `
    <div class="row">
        <div class="p-left10 m-bottom10 m-top10">
            <div class="chip m-bottom5" *ngFor="let item of selectedItems">
                {{getName(item)}}<i class="close material-icons" (click)="removed(item)">close</i>
            </div>                                                   
        </div>
        <div class="custom-input-field input-field col s12">
            <h6>{{displayName}}</h6>
            <div>
                <select materialize="material_select" multiple [materializeSelectOptions]="selectOption" [(ngModel)]="selectedValues" (change)="onSelect($event.target.selectedIndex)">
	                <option value="" disabled>Choose your options</option>
	                <option *ngFor="#p of selectOption" [value]="p">{{getName(p)}}</option>
                </select>
            </div>
        </div>
    </div>
  `,
    directives: [MaterializeDirective]
})
export class MultiSelect {
    @Input() totalItems: any;
    @Input() selectedItems: any;
    @Input() displayName: any;
    selectOption: any = [];

    ngOnInit() {
        this.totalItems = [{ 'id': 1, 'name': 'Test' }, { 'id': 2, 'name': 'Text-1' }, { 'id': 3, 'name': 'Test-3' }, { 'id': 4, 'name': 'Test-2' }, { 'id': 5, 'name': 'Test-4' }, { 'id': 6, 'name': 'Test-5' }, { 'id': 7, 'name': 'Test-6' }, { 'id': 8, 'name': 'Test-7' }];
        this.selectedItems = [1, 4, 5];
        var count = 0;
        for (var i = 0; i < this.totalItems.length; i++) {
            count = 0;
            for (var j = 0; j < this.selectedItems.length; j++) {
                if (this.selectedItems[j] == this.totalItems[i].id) {
                    count++;
                }
            }
            if (count == 0) {
                this.selectOption.push(this.totalItems[i].id);
            }
        }
    }

    onSelect(val) {
        var tempData = [];
        tempData = this.selectOption;
        this.selectOption = [];
        this.selectedItems.push(tempData[val - 1])
        tempData.splice(val - 1, 1);
        for (var i = 0; i < tempData.length; i++) {
            this.selectOption.push(tempData[i]);
        }
    }

    removed(value) {
        var tempData = [];
        tempData = this.selectOption;
        this.selectOption = [];
        for (var i = 0; i < this.selectedItems.length; i++) {
            if (this.selectedItems[i] == value) {
                this.selectedItems.splice(i, 1);
                tempData.push(value);
            }
        }
        for (var j = 0; j < tempData.length; j++) {
            this.selectOption.push(tempData[j]);
        }
    }

    getName(id) {
        for (var i = 0; i < this.totalItems.length; i++) {
            if (this.totalItems[i].id == id) {
                return this.totalItems[i].name;
            }
        }
    }
}