import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {DropdownValue} from  '../../infrastructure/components/DropdownValue';

@Component({
  selector: 'dropdown',
  template: `
    <div>
     <select (change)="onSelect($event.target.value)" [(ngModel)]="selectedItem.value">
      <option *ngFor="let dataOptions of dropDownDataSource" [value]="dataOptions.value">{{dataOptions.label}}</option>
     </select>
    </div>
  `,
  styleUrls: ['../../app/infrastructure/Css/UIGrid.component.css']
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() public dropDownDataSource: Array<any>;
  @Input() public selectedValue: number;
  @Output() onChanged = new EventEmitter<number>();

  public selectedItem: any;

  ngOnInit() {
    this.selectedItem = this.dropDownDataSource[this.selectedValue];
  }

  ngOnChanges(changes: any) {
    var changedMonth = changes["selectedValue"].currentValue;
    this.selectedItem = this.dropDownDataSource[changedMonth];
  }

  onSelect(selectedOption: number) {
    this.selectedItem = null;
    for (var i = 0; i < this.dropDownDataSource.length; i++) {
      if (this.dropDownDataSource[i].value == selectedOption) {
        this.selectedItem = this.dropDownDataSource[i];
      }
    }
    this.onChanged.emit(selectedOption);
  }


}