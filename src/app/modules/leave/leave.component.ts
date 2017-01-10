import { Component, OnInit } from '@angular/core';
import { HttpService, HttpSettings, AutoMapperService, CacheService } from './../../services';
import { LeaveModel } from '../../models/LeaveModel';
import { DropdownValue } from '../../infrastructure/components/DropDownValue';
import { ActivatedRoute } from '@angular/router';
import * as Materialize from "angular2-materialize";
declare var $: any;

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeavesComponent {
  leaveModelCollection: Array<any> = [];
  rowData: any;
  leaveChartData: Array<any> = [];
  tempLeaveChartData: Array<any> = [];
  leaveChartlabels: Array<any> = [];
  leaveChartColors: Array<any> = [];
  yearCollection: Array<any> = [];
  selectedYear: number;
  regex: any = /<br\s*[\/]?>/gi;
  addEditLeaveModel: LeaveModel;
  leaveModelHub: any;
  leaveTypeDropDownData: Array<any>;
  totalLeaves: number;
  leavesConsumed: number;
  leavesApplied: number;
  leaveStatus: string = "Apply For Leaves";
  holiday: boolean = false;
  holidayCollection: Array<any> = [];
  loaderModal: boolean = false;
  loaderModalMsg: boolean = false;
  loaderModalText: any;
  formSubmitted: boolean = false;
  isUs: boolean = false;
  data: any;
  tempData: any;
  deleteConfirm: boolean = false;
  compOffNumber: number;
  remainingLeaves: number;
  LWP: number;
  CompOffAvailable: number;
  compOffConsumed: number;
  leaveType = ["Compensatory Off", "Leave", "Leave Without Pay (LWP)", "Maternity"];
  searchUser: boolean = false;
  searchUserId: any;
  IsBirthdayApply: boolean = false;
  isConformationModal: boolean = false;

  constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService, private activatedRoute: ActivatedRoute) {
    this.searchUser = this.activatedRoute.parent.snapshot.data["isViewOnly"];
    this.searchUserId = this.activatedRoute.parent.snapshot.params["id"];
    this.selectedYear = (new Date()).getFullYear();
    this.addEditLeaveModel = new LeaveModel();
    this.leaveTypeDropDownData = new Array();
    this.leaveModelHub = this.addEditLeaveModel["hub"];
    this.PopulateLeaveModulePage();
    this.data = this._cacheService.getParams("profile");
    this.compOffNumber = this.data["compOff"];
    if (this.data["ol"] == 2) {
      this.isUs = true;
    }
    //this.populateLeaveTypeDropDown();
  }

  populateLeaveTypeDropDown() {
    this.leaveTypeDropDownData = new Array();
    var count = 0;
    this.leaveTypeDropDownData.push({ "id": 2, "text": 'Leave Without Pay (LWP)' });
    for (var i = 0; i < this.leaveType.length; i++) {
      switch (this.leaveType[i]) {
        case "Compensatory Off":
          if (this.compOffNumber > 0) {
            this.leaveTypeDropDownData.push({ "id": 0, "text": this.leaveType[i] + " (" + this.compOffNumber + ")" });
            if (count == 0) {
              this.addEditLeaveModel.leaveType = i;
              count++;
            }
          }
          break;
        case "Leave":
          if ((this.totalLeaves - this.leavesConsumed - this.leavesApplied) > 0) {
            this.leaveTypeDropDownData.push({ "id": 1, "text": this.leaveType[i] });
            if (count == 0) {
              this.addEditLeaveModel.leaveType = i;
              count++;
            }
          }
          break;
        case "Leave Without Pay (LWP)":
          if (count == 0) {
            count = i;
            count++;
          }
          break;
        case "Maternity":
          if (this.data["gender"] == 2)
            this.leaveTypeDropDownData.push({ "id": 3, "text": this.leaveType[i] });
          break;
        default:
          break;
      }
    }
    this.populateOptionHub(this.leaveTypeDropDownData);
    this.leaveModelHub = this.addEditLeaveModel["hub"];
  }

  populateLeaveTypeDropDownOnEdit(editLeaveType: number) {
    this.leaveTypeDropDownData = new Array();
    for (var i = 0; i < 1; i++) {
      switch (editLeaveType) {
        case 0:
          this.leaveTypeDropDownData.push({ "id": 0, "text": this.leaveType[editLeaveType] + " (" + this.compOffNumber + ")" });
          break;
        case 1:
          this.leaveTypeDropDownData.push({ "id": 1, "text": this.leaveType[editLeaveType] });
          break;
        case 2:
          this.leaveTypeDropDownData.push({ "id": 2, "text": this.leaveType[editLeaveType] });
          break;
        case 3:
          this.leaveTypeDropDownData.push({ "id": 3, "text": this.leaveType[editLeaveType] });
          break;
        case 4:
          this.leaveTypeDropDownData.push({ "id": 4, "text": this.leaveType[editLeaveType] });
          break;
        default:
          break;
      }
    }
    this.populateOptionHub(this.leaveTypeDropDownData);
  }

  populateOptionHub(dropdownOptions) {
    (this.leaveModelHub as Array<any>).forEach(function (hub) {
      if (typeof (hub["options"]) === 'string' || hub["type"] === "select") {
        hub["options"] = dropdownOptions;
      }
    });
    this.addEditLeaveModel.leaveType = dropdownOptions[0].id;
  }

  //Calls to populate all the controls of the page
  PopulateLeaveModulePage() {
    this.populateMonthYearDropDowns();
    this.populateLeaveGrid();
  }

  //Creation of month array for dropdown
  populateMonthYearDropDowns() {
    var thisYear = (new Date()).getFullYear();
    thisYear = thisYear + 1;
    for (var i = 2016; i <= thisYear; i++) {
      this.yearCollection.push(new DropdownValue(i, i.toString()));
    }
  }

  onYearSelected(value: any) {
    this.selectedYear = +(value);
    this.GetLeaveDetails(this.selectedYear);
  }

  //Populate Grid
  populateLeaveGrid() {
    this.GetLeaveDetails(this.selectedYear);
  }

  //Calculate present and remaining based on data count.Bound to change once leave is integrated.Populate chart.
  PopulateLeaveChart(totalLeaves: number, leavesTaken: number, leavesApplied: number, CompOffAvailable: number, LWP: number) {
    this.totalLeaves = totalLeaves;
    this.leavesConsumed = leavesTaken;
    this.leavesApplied = leavesApplied;
    this.CompOffAvailable = CompOffAvailable;
    this.LWP = LWP;
    this.leaveChartData = new Array<any>();
    this.leaveChartData.push(leavesApplied);
    this.leaveChartData.push(this.remainingLeaves);
    this.leaveChartData.push(leavesTaken);
    this.leaveChartData.push(this.compOffConsumed);
    this.leaveChartData.push(CompOffAvailable);
    this.leaveChartData.push(LWP);
    this.tempLeaveChartData = [];
    var labels = ["Applied", "Available", "Leaves Consumed", "Compensatory Off Consumed", "Compensatory Off Available", "Leave Without Pay"];
    var colors = ["#2D82B0", "#8DA408", "#F15B28", "#cd7320", "#76B1CD", "#c31205"];
    var tempLabels = [], tempColors = [];
    for (var i = 0; i < this.leaveChartData.length; i++) {
      if (this.leaveChartData[i] != 0) {
        tempLabels.push(labels[i]);
        tempColors.push(colors[i]);
      }
    }
    for (var j = 0; j < this.leaveChartData.length; j++) {
      this.tempLeaveChartData.push(this.leaveChartData[j]);
      if (this.leaveChartData[j] == 0) {
        this.leaveChartData.splice(j, 1);
        j--;
      }
    }
    this.leaveChartlabels = tempLabels;
    this.leaveChartColors = [{ backgroundColor: tempColors }];
    this.populateLeaveTypeDropDown();
  }

  addUpdateLeaves(myForm) {
    let url = HttpSettings.apiBaseUrl + "v1/leave-management/apply-or-update-leave/";
    var newFromDate = new Date(this.addEditLeaveModel.fromDate);
    var newDate = new Date();
    this.addEditLeaveModel.status = "1";
    if (this.addEditLeaveModel.leaveType.toString() == "3") {
      if (this.addEditLeaveModel.narration != "") {
        this.loaderModal = true;
        this.addUpdateLeave(url, this.addEditLeaveModel);
      }
      else {
        this.formSubmitted = true;
      }
    }
    else {
      if (myForm.mainForm.valid) {
        if (this.addEditLeaveModel.leaveType.toString() == "0") {
          this.checkCompOff(url, newFromDate, newDate);
        }
        else if (this.addEditLeaveModel.leaveType.toString() == "1" && myForm.mainForm.valid) {
          this.checkBackDateLeave(url, newFromDate, newDate);
        }
        else if (this.addEditLeaveModel.leaveType.toString() == "2" && myForm.mainForm.valid) {
          this.checkLongLeaveAndLWP(url, newFromDate, newDate);
        }
        else if (this.addEditLeaveModel.leaveType.toString() == "4" || myForm.mainForm.valid) {
          this.loaderModal = true;
          this.addUpdateLeave(url, this.addEditLeaveModel);
        }
        else {
          this.formSubmitted = true;
        }
      }
      else {
        this.formSubmitted = true;
      }
    }
  }

  checkCompOff(url: string, newFromDate: Date, newDate: Date) {
    var checkDate = newFromDate.getTime() - newDate.getTime();
    this.loaderModal = true;
    if (checkDate < 0 && newFromDate.getDate() < newDate.getDate()) {
      Materialize.toast("Back dated Comp-Offs are not allowed", 3000, 'errorTost');
      this.resetLeaves();
      this.formSubmitted = true;
      this.loaderModal = false;
    }
    else {
      this.addUpdateLeave(url, this.addEditLeaveModel);
    }
  }

  checkBackDateLeave(url: string, newFromDate: Date, newDate: Date) {
    var currentYear = newDate.getFullYear();
    var previousMonth = newDate.getMonth() - 1;
    var previousMonthDate = new Date(currentYear, previousMonth, 23);
    if (newDate.getDate() > 22) {
      var newCurrentMonthDate = new Date(currentYear, newDate.getMonth(), 23);
      var leaveApplied = newCurrentMonthDate.getTime() - newFromDate.getTime();
    }
    // ND: This is to check the leave applied will be for currnet attendance month.
    else {
      var leaveApplied = previousMonthDate.getTime() - newFromDate.getTime();
    }
    if (leaveApplied > 0) {
      Materialize.toast("Attendance data for the selected date has been frozen", 3000, 'errorTost');
      this.resetLeaves();
    }
    else {
      this.loaderModal = true;
      this.addUpdateLeave(url, this.addEditLeaveModel);
    }
  }

  checkLongLeaveAndLWP(url: string, newFromDate: Date, newDate: Date) {
    var distance = (new Date(this.addEditLeaveModel.toDate).getTime() - newFromDate.getTime());
    // ND: Converting the above milisecond time into no. of days.
    distance = Math.ceil(distance / 1000 / 60 / 60 / 24);
    var currentYear = new Date(this.addEditLeaveModel.toDate).getFullYear();
    var previousMonth = new Date(this.addEditLeaveModel.toDate).getMonth() - 1;
    var previousMonthDate = new Date(currentYear, previousMonth, 23);
    if (newDate.getDate() > 22) {
      var newCurrentMonthDate = new Date(currentYear, newDate.getMonth(), 23);
      var leaveApplied = newCurrentMonthDate.getTime() - newFromDate.getTime();
    }
    // ND: This is to check the leave applied will be for currnet attendance month.
    else {
      var leaveApplied = previousMonthDate.getTime() - newFromDate.getTime();
    }
    if (leaveApplied > 0) {
      Materialize.toast("Attendance data for the selected date has been frozen", 3000, 'errorTost');
      this.resetLeaves();
    }
    else {
      if (distance > 60) {
        Materialize.toast("Leave Without Pay(LWP) cannot be posted for more than 2 months", 3000, 'errorTost');
        this.resetLeaves();
      }
      else {
        this.loaderModal = true;
        this.addUpdateLeave(url, this.addEditLeaveModel);
      }
    }
  }

  resetLeaves() {
    this.leaveStatus = "Apply For Leaves";
    this.addEditLeaveModel = new LeaveModel();
    this.leaveModelHub = this.addEditLeaveModel["hub"];
    this.populateLeaveTypeDropDown();
  }

  resetLeavesForm(myForm) {
    this.leaveStatus = "Apply For Leaves";
    this.addEditLeaveModel = new LeaveModel();
    this.leaveModelHub = this.addEditLeaveModel["hub"];
    this.formSubmitted = false;
    this.populateLeaveTypeDropDown();
    if (myForm.mainForm.valid) {
      myForm.resetUIForm();
    }
  }

  editLeaveRequest(item: LeaveModel) {
    this.addEditLeaveModel = new LeaveModel();
    this.leaveModelHub = this.addEditLeaveModel["hub"];
    if (item) {
      this.leaveStatus = "Edit Leaves";
      this.addEditLeaveModel.id = item.id;
      this.addEditLeaveModel.fromDate = item.fromDate;
      this.addEditLeaveModel.toDate = item.toDate;
      this.addEditLeaveModel.narration = item.narration;
      this.addEditLeaveModel.leaveType = item.leaveType;
      this.populateLeaveTypeDropDownOnEdit(item.leaveType);
    }
  }

  cancelLeaves() {
    var item = new LeaveModel();
    item = this.tempData;
    let url = HttpSettings.apiBaseUrl + "v1/leave-management/apply-or-update-leave/";
    item.status = "4";
    this.addUpdateLeave(url, item)
  }

  //Get call to get leave data for the year
  GetLeaveDetails(year: number) {
    this.loaderModal = true;
    this.rowData = new Array<any>();
    this.leaveModelCollection.length = 0;
    this.rowData.length = 0;
    var count = 0;
    var url = HttpSettings.apiBaseUrl + "v1/leave-management/for-current-user/0/0/" + year;
    if (this.searchUser == true) {
      url = HttpSettings.apiBaseUrl + "v1/leave-management/for-search-user/0/0/" + year + '/' + this.searchUserId;
    }
    this._httpService.get(url)
      .subscribe
      (
      data => {
        data.employeeLeaveViewModels.forEach(element => {
          var model = new LeaveModel();
          this._autoMapperService.Map(element, model);
          this.leaveModelCollection.push(model);
          if (element.leaveType == 6 && (element.status == '1' || element.status == '2')) {
            count++;
          }
        });
        this.rowData = this.leaveModelCollection;
        this.compOffNumber = data.availableLeaves.compOffAvailable;
        this.compOffConsumed = data.availableLeaves.compOffConsumed;
        this.remainingLeaves = data.availableLeaves.leavesAvailable < 0 ? 0 : data.availableLeaves.leavesAvailable;
        this.PopulateLeaveChart(data.availableLeaves.totalLeaves, data.availableLeaves.leavesTaken, data.availableLeaves.leavesApplied, data.availableLeaves.compOffAvailable, data.availableLeaves.lwp);
        this.addEditLeaveModel = new LeaveModel();
        $('ul.tabs').tabs('select_tab', 'leaves-applied');
        if (count == 0) {
          this.IsBirthday();
        }
        else {
          this.loaderModal = false;
        }
      },
      error => {
        this.loaderModal = false;
      });
  }

  addUpdateLeave(url, postData, callBack = null) {
    let isAdd = postData.id == "" ? 0 : 1;
    this._httpService.post(url, postData)
      .subscribe(
      data => {
        if (typeof callBack === 'function') {
          callBack();
        }
        this.GetLeaveDetails(this.selectedYear);
        this.leaveStatus = "Apply For Leaves";
        if (data.isError == true) {
          Materialize.toast(data.errorMessage, 5000, 'errorTost');
        }
        else if (postData.status == 4) {
          Materialize.toast('Leave Deleted Successfully', 3000, 'successTost');
        }
        else if (isAdd == 0)
          Materialize.toast('Leave Added Successfully', 3000, 'successTost');
        else
          Materialize.toast('Leave Updated Successfully', 3000, 'successTost');
        this.resetLeaves();
        this.formSubmitted = false;
        $('ul.tabs').tabs('select_tab', 'leaves-applied');
        this.loaderModal = false;
      },
      error => {
        this.loaderModal = false;
      });
  }

  openHolidayList() {
    this.holidayCollection = new Array<any>();
    var url = HttpSettings.apiBaseUrl + "v1/leave-management/current-year-holidaylist/" + this.data["ol"] + "/" + this.selectedYear;
    this._httpService.get(url)
      .subscribe
      (
      data => {
        data.forEach(element => {
          this.holidayCollection.push(element);
        });
        this.holiday = true;
      },
      error => console.log(error)
      );
  }

  onHolidayClose(e) {
    this.holiday = false;
  }

  onModelClose(e) {
    this.deleteConfirm = false;
  }

  confirmToCancel(item: LeaveModel) {
    this.tempData = new LeaveModel();
    this.tempData = item;
    this.deleteConfirm = true;
  }

  isCancel(status: number, date: any) {
    var tempDate = new Date(date);
    var newDate = new Date();
    if (status == 4 || status == 3) {
      return false;
    }
    else if (status == 2) {
      if (tempDate <= newDate) {
        return false
      }
      else {
        return true;
      }
    }
    else {
      if (tempDate <= newDate) {
        return false
      }
      else {
        return true;
      }
    }
  }

  isEdit(status: number, date: any, type: number) {
    var tempDate = new Date(date);
    var newDate = new Date();
    if (type == 3) {
      return false;
    }
    else {
      if (status == 1) {
        if (tempDate <= newDate) {
          return false
        }
        else {
          return true;
        }
      }
      else {
        return false;
      }
    }
  }

  GetDays(days: any) {
    var d = new Date(days);
    var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
    return weekday[d.getDay()];
  }

  IsBirthday() {
    this.holidayCollection = new Array<any>();
    var url = HttpSettings.apiBaseUrl + "v1/leave-management/current-year-holidaylist/" + this.data["ol"] + "/" + (new Date()).getFullYear();
    this._httpService.get(url).subscribe(
      data => {
        data.forEach(element => {
          this.holidayCollection.push(element);
        });
        var birthday = new Date(this.data.dateOfBirth), today = new Date();
        birthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
        if (birthday.getMonth() == 0 && today.getMonth() == 11) {
          birthday = new Date((today.getFullYear()) + 1, birthday.getMonth(), birthday.getDate());
        }
        if (this.GetDays(birthday) == "Sunday" || this.GetDays(birthday) == "Saturday") {
          this.IsBirthdayApply = false;
        }
        else {
          var beforBirthday = new Date(birthday.getFullYear(), birthday.getMonth(), birthday.getDate());
          beforBirthday.setDate(beforBirthday.getDate() - 30);
          if (today <= birthday && today >= beforBirthday) {
            for (var i = 0; i < this.holidayCollection.length; i++) {
              if (new Date(this.holidayCollection[i].holidayDate) == birthday) {
                this.IsBirthdayApply = false;
              }
              else {
                this.IsBirthdayApply = true;
              }
            }
          }
          else {
            this.IsBirthdayApply = false;
          }
        }
        this.loaderModal = false;
      });
  }

  applyBirthdayLeave() {
    var birthday = new Date(this.data.dateOfBirth), today = new Date();
    birthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (birthday.getMonth() == 0) {
      birthday = new Date((today.getFullYear()) + 1, birthday.getMonth(), birthday.getDate());
    }
    this.loaderModal = true;
    var date = this.data.dateOfBirth.split("/");
    let url = HttpSettings.apiBaseUrl + "v1/leave-management/apply-birthday-leave/";
    this.addEditLeaveModel.status = "1";
    this.addEditLeaveModel.leaveType = 6;
    this.addEditLeaveModel.fromDate = date[0] + '/' + date[1] + '/' + birthday.getFullYear();
    this.addEditLeaveModel.toDate = date[0] + '/' + date[1] + '/' + birthday.getFullYear();
    this.addEditLeaveModel.narration = "Birthday Leave";
    this.addUpdateLeave(url, this.addEditLeaveModel);
  }
}