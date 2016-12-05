import {Component} from '@angular/core';
import { BasicCellC, BasicGrid} from './../../../infrastructure/components/basic-grid';
import {DropdownValue} from  './../../../infrastructure/components/DropDownValue';
import {MaterializeDirective} from "angular2-materialize";
import {LoaderComponent} from  './../../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";

@Component({
  selector: 'attendence',
  templateUrl: './attendance.approval.component.html',
  
})

export class AttendanceApprovalComponent {
    monthCollection: Array<any> = [];
    yearCollection: Array<any> = [];
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    date: any;
    currentYear: any;
    currentMonth: any;

    constructor() {
    this.date = new Date();
    this.currentYear = (this.date).getFullYear();
    this.currentMonth = (this.date).getMonth();
    this.PopulateMonthDropDown();
    this.PopulateYearDropDown();
  }

  //Creation of month array for dropdown
  PopulateMonthDropDown() {
    this.monthCollection = [];
    var month = this.months.length;
    var year = (this.date).getFullYear();
    if (this.currentYear == year) {
      month = this.date.getMonth();
      month++;
    }
    for (var i = 0; i < month; i++) {
      this.monthCollection.push(new DropdownValue(i, this.months[i]));
    }
  }

  //Creation of year array for dropdown and fill it with last 5 years only
  PopulateYearDropDown() {
    var thisYear = (this.date).getFullYear();
    for (var i = 0; i < 5; i++) {
      this.yearCollection.push(new DropdownValue(thisYear, (thisYear).toString()));
      thisYear = thisYear - 1;
    }
  }

  //Event hooked when month selection is changed
  onMonthSelected(selectedValue: number) {
    this.currentMonth = +(selectedValue);
  }

  //Event hooked when year selection is changed
  onYearSelected(selectedValue: number) {
    this.currentYear = +selectedValue;
    this.PopulateMonthDropDown();
  }
}