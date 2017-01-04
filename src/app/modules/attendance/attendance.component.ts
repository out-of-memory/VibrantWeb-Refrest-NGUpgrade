import { Component } from '@angular/core';
import { AttendenceModel } from '../../models/AttendenceModel';
import { DropdownValue } from '../../infrastructure/components/DropDownValue';
import { UiForm, UiFormControl } from '../../infrastructure/components/UiForm';
import { DoughnutChart } from '../../infrastructure/components/DoughnutChart';
import { LineChart } from '../../infrastructure/components/LineChart';
import { CacheService, AutoMapperService, HttpService, HttpSettings } from '../../services';
import { SISOModel } from '../../models/AttendenceModel';
import { List, Map } from 'immutable';
import { MaterializeDirective } from "angular2-materialize";
import { LoaderComponent } from '../../infrastructure/components/loader.component';
import * as Materialize from "angular2-materialize";
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})

export class AttendanceComponent {
  attendenceModelCollection: Array<any> = [];
  monthCollection: Array<any> = [];
  yearCollection: Array<any> = [];
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  previousMonthValue: string = "";
  nextMonthValue: string = "";
  currentMonth: number = 0;
  selectedMonth: number;
  selectedYear: number;
  loaderModal: boolean = false;
  loaderModalMsg: boolean = false;
  loaderModalText: any;
  isConformationModal: boolean = false;
  nextMonthEnabled: boolean;
  previousMonthEnabled: boolean;
  formSubmitted: boolean = false;
  attendenceChartData: Array<any> = [];
  tempAttendenceChartData: Array<any> = [];
  attendenceChartlabels: Array<any> = [];
  attendenceChartColors: Array<any> = [];
  showChart: boolean = false;
  currentSiSOModel: SISOModel;
  currentSiSOModelHub: any;
  btnAutoText: string;
  rowData: any;
  date: any;
  monthForAttendence: any;
  isUs: boolean = false;
  lineChartData: Array<any> = [{ data: [], label: 'Daily Hours Worked' }];
  lineChartLabels: any = [];
  lineChartChartColors: any;
  isSignOut: boolean = false;
  isSignIn: boolean = false;
  totalHour: any;
  present: any;
  totalDays: any;
  weekEndsPresent: number = 0;
  previousDay: any;
  todayDate: any;
  holiday: any;
  searchUser: boolean = false;
  searchUserId: any;

  constructor(private _httpService: HttpService, private _autoMapperService: AutoMapperService, private _cacheService: CacheService, private activatedRoute: ActivatedRoute) {
    this.searchUser = this.activatedRoute.parent.snapshot.data["isViewOnly"];
    this.searchUserId = this.activatedRoute.parent.snapshot.params["id"];
    this.date = new Date();
    this.monthForAttendence = '23/' + this.date.getMonth() + '/' + this.date.getFullYear();
    this.attendenceModelCollection = new Array<AttendenceModel>();
    this.selectedYear = (this.date).getFullYear();
    this.currentMonth = this.date.getMonth();
    this.PopulateAttendencePage();
    this.currentSiSOModel = new SISOModel();
    this.currentSiSOModelHub = this.currentSiSOModel["hub"];
    var profileData = this._cacheService.getParams("profile");
    if (profileData["ol"] == 2) {
      this.isUs = true;
    }
    this.todayDate = new Date();
    var dd = this.todayDate.getDate() - 1;
    var mm = this.todayDate.getMonth() + 1; //January is 0!

    var yyyy = this.todayDate.getFullYear();
    if (dd < 10) {
      dd = 0 + dd
    }
    if (mm < 10) {
      mm = 0 + mm
    }
    this.previousDay = dd + '/' + mm + '/' + yyyy;
  }

  //Calls to populate all the controls of the page
  PopulateAttendencePage() {
    this.SetMonthButtonsText();
    this.PopulateMonthDropDown();
    this.PopulateYearDropDown();
    //Populate Grid
    this.GetAttendenceDetails(this.selectedMonth + 1, (this.date).getFullYear());
  }

  //Creation of month array for dropdown
  PopulateMonthDropDown() {
    this.monthCollection = [];
    let joiningDate = this._cacheService.getParams("profile");
    let date = new Date(joiningDate.joiningDate);
    var joiningyear = new Date(joiningDate.joiningDate).getFullYear();
    var joiningMonth = new Date(joiningDate.joiningDate).getMonth();
    var month = this.months.length;
    var currentMonth = this.date.getMonth();
    var year = (this.date).getFullYear();
    if (this.selectedYear == 2016 || year == 2016) {
      if (joiningyear == 2016 && joiningMonth > 9) {
        for (var i = joiningMonth; i < currentMonth + 1; i++) {
          this.monthCollection.push(new DropdownValue(i, this.months[i]));
        }
      }
      else {
        if (this.selectedYear < year) {
          for (var i = 9; i < month; i++) {
            this.monthCollection.push(new DropdownValue(i, this.months[i]));
          }
        }
        else {
          for (var i = 9; i < currentMonth + 1; i++) {
            this.monthCollection.push(new DropdownValue(i, this.months[i]));
          }
        }
      }
    }
    else {
      if (joiningyear == year && this.selectedYear == year) {
        for (var i = joiningMonth; i < currentMonth + 1; i++) {
          this.monthCollection.push(new DropdownValue(i, this.months[i]));
        }
      }
      else {
        for (var i = 0; i < currentMonth + 1; i++) {
          this.monthCollection.push(new DropdownValue(i, this.months[i]));
        }
      }
    }
  }

  //Creation of year array for dropdown and fill it with last 5 years only
  PopulateYearDropDown() {
    let joiningDate = this._cacheService.getParams("profile");
    var joiningYear = new Date(joiningDate.joiningDate).getFullYear();
    var thisYear = (this.date).getFullYear();
    if (joiningYear > 2016) {
      for (var year = joiningYear; year <= thisYear; year++) {
        this.yearCollection.push(new DropdownValue(year, (year).toString()));
      }
    }
    else {
      for (var year = 2016; year <= thisYear; year++) {
        this.yearCollection.push(new DropdownValue(year, (year).toString()));
      }
    }
  }

  //Common method to set text of the buttons below the grid.
  SetMonthButtonsText() {
    this.selectedMonth = (this.date).getMonth();
    this.nextMonthValue = this.selectedMonth == 11 ? this.months[0] : this.months[this.selectedMonth + 1];
    this.previousMonthValue = this.selectedMonth == 0 ? this.months[11] : this.months[this.selectedMonth - 1];
    this.nextMonthEnabled = true;
    this.isPreviousMonthEnabled();
  }

  isPreviousMonthEnabled() {
    let joiningDate = this._cacheService.getParams("profile");
    var joiningyear = new Date(joiningDate.joiningDate).getFullYear();
    var joiningMonth = new Date(joiningDate.joiningDate).getMonth();
    var currentMonth = this.date.getMonth();
    var year = (this.date).getFullYear();
    if (this.selectedMonth == 9 && this.selectedYear == 2016) {
      this.previousMonthEnabled = true;
    }
    else {
      if (joiningyear == year && joiningMonth == currentMonth) {
        this.previousMonthEnabled = true;
      }
      else {
        this.previousMonthEnabled = false;
      }
    }
  }

  //Event hooked when month selection is changed
  onMonthSelected(selectedValue: number) {
    this.selectedMonth = +(selectedValue);
    //next and previous month calculation based on current month selected.
    this.nextMonthValue = selectedValue == 11 ? this.months[0] : this.months[this.selectedMonth + 1];
    this.previousMonthValue = selectedValue == 0 ? this.months[11] : this.months[this.selectedMonth - 1];

    //logic to disable month after the current month
    var currentYear = (this.date).getFullYear();
    if (this.selectedYear == currentYear) {
      this.nextMonthEnabled = this.selectedMonth >= (this.date).getMonth() ? true : false;
    }
    else {
      if (this.selectedYear < currentYear) {
        this.nextMonthEnabled = false;
      }
      else {
        this.nextMonthEnabled = this.selectedMonth == 11 ? true : false;
      }
    }
    this.previousMonthEnabled = this.selectedMonth == 0 ? true : false;
    this.isPreviousMonthEnabled();
    if (this.showChart == false) {
      this.GetAttendenceDetails(this.selectedMonth + 1, this.selectedYear);
    }
    else {
      this.showLineChartDetail();
    }
  }

  //Event hooked when year selection is changed
  onYearSelected(selectedValue: number) {
    this.selectedYear = +selectedValue;
    if (this.selectedMonth < 9 && this.selectedYear == 2016) {
      this.selectedMonth = 9
    }
    this.PopulateMonthDropDown();
    if (this.showChart == false) {
      var currentYear = (this.date).getFullYear();
      if (this.selectedYear == currentYear) {
        if ((this.date).getMonth() < +(this.selectedMonth)) {
          this.onMonthSelected((this.date).getMonth());
        }
        else {
          this.onMonthSelected(+(this.selectedMonth));
        }
      }
      else {
        this.onMonthSelected(+(this.selectedMonth));
      }
    }
    else {
      this.showLineChartDetail();
    }
  }

  //Populate grid based on month button click
  PopulateGridOnClick(buttonValue: any, type: any) {
    var currentYear = (this.date).getFullYear();
    if (buttonValue == "December") {
      if (type == 'Previous') {
        this.selectedYear = this.selectedYear - 1;
      }
      this.PopulateMonthDropDown();
      this.selectedMonth = this.months.indexOf(buttonValue);
      this.onMonthSelected(this.selectedMonth);
    }
    else if (buttonValue == "January") {
      if (type == 'Next') {
        this.selectedYear = this.selectedYear + 1;
      }
      this.PopulateMonthDropDown();
      this.selectedMonth = this.months.indexOf(buttonValue);
      this.onMonthSelected(this.selectedMonth);
    }
    else {
      this.selectedMonth = this.months.indexOf(buttonValue);
      this.onMonthSelected(this.selectedMonth);
    }
  }

  //Calculate present and remaining based on data count.Bound to change once leave is integrated.Populate chart.
  CalculateAttendenceDetails(count: number, weekEnds: number, leave: number, holidayList: Array<any>, absent: number, weekEndsPresent: number, previousLeave: number) {
    var month = +(this.selectedMonth) + 1;
    let daysInCurrentMonth = new Date(this.selectedYear, month, 0).getDate();
    let todaysDate = new Date();
    this.attendenceChartData = new Array<any>();
    this.attendenceChartData.push(count - weekEndsPresent);
    if (this.selectedMonth == new Date(this.date).getMonth() && this.selectedYear == new Date(this.date).getFullYear()) {
      var remainingDaysCount = this.GetRemainingDaysCountForChart(daysInCurrentMonth, todaysDate, month, holidayList, leave);
    }
    else {
      var remainingDaysCount = 0;
    }
    //this.attendenceChartData.push(daysInCurrentMonth - count - weekEnds - leave - holiday - absent + weekEndsPresent);
    this.attendenceChartData.push(remainingDaysCount);
    this.attendenceChartData.push(leave + previousLeave);
    this.attendenceChartData.push(holidayList.length);
    this.attendenceChartData.push(absent);
    this.attendenceChartData.push(weekEnds);
    this.attendenceChartData.push(weekEndsPresent);
    this.tempAttendenceChartData = [];
    var labels = ["Present", "Remaining", "Leave", "Holiday", "Absent", "WeekEnds", "WeekEnds Present"];
    var colors = ["#8DA408", "#888489", "#D87C43", "#76B1CD", "#c31205", "#A952A5", "#fbb03b"];
    var tempLabels = [], tempColors = [];
    for (var i = 0; i < this.attendenceChartData.length; i++) {
      if (i == 0 || i == 5) {
        tempLabels.push(labels[i]);
        tempColors.push(colors[i]);
      }
      else {
        if (this.attendenceChartData[i] != 0) {
          tempLabels.push(labels[i]);
          tempColors.push(colors[i]);
        }
      }
    }
    for (var j = 0; j < this.attendenceChartData.length; j++) {
      this.tempAttendenceChartData.push(this.attendenceChartData[j]);
      if (this.attendenceChartData[j] == 0 && j != 0) {
        this.attendenceChartData.splice(j, 1);
        j--;
      }
    }
    this.attendenceChartlabels = tempLabels;
    this.attendenceChartColors = [{ backgroundColor: tempColors }];
  }

  //Get the count of number of remaining working days in current month.
  GetRemainingDaysCountForChart(daysInCurrentMonth: number, todaysDate: Date, month: number, holidayList: Array<any>, leave: number) {
    var remainingDaysCount = daysInCurrentMonth - todaysDate.getDate(), days = [];
    for (var i = (todaysDate.getDate() + 1); i <= daysInCurrentMonth; i++) {
      days.push(i);
    }
    for (var j = 0; j < days.length; j++) {
      var d = month + '/' + days[j] + '/' + this.selectedYear
      if (this.GetDays(d) == 'Sun' || this.GetDays(d) == 'Sat') {
        remainingDaysCount--;
      }
    }
    for (var k = 0; k < holidayList.length; k++) {
      var currentDate = new Date().getDate();
      var holidayModel = holidayList[k]["holidayDate"];
      var holidayDate = new Date(holidayList[k]["holidayDate"].toString().split('/')[2], holidayList[k]["holidayDate"].toString().split('/')[0], holidayList[k]["holidayDate"].toString().split('/')[1]).getDate();
      if (currentDate < holidayDate)
        remainingDaysCount--;
    }
    if (leave >= 0) {
      return (remainingDaysCount - leave);
    }
    else {
      return (remainingDaysCount);
    }
  }

  //Get call to get attendence data for the month and year
  GetAttendenceDetails(month, year) {
    this.loaderModal = true;
    this.attendenceModelCollection.length = 0;
    this.rowData = new Array<any>();
    var currentTime = new Date().getTime();
    var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
    var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
    var todayTime = stamp.toString();
    var url = HttpSettings.apiBaseUrl + 'v1/attendance/for-current-user/' + month + '/' + year + '/' + todayTime;
    if (this.searchUser == true) {
      url = HttpSettings.apiBaseUrl + "v1/attendance/for-search-user/" + month + '/' + year + '/' + todayTime + "/" + this.searchUserId;
    }
    this._httpService.get(url)
      .subscribe
      (
      data => {
        var days = [], weekEnds = 0;
        this.weekEndsPresent = 0;
        let daysInCurrentMonth = new Date(this.selectedYear, month, 0).getDate();
        for (var i = 1; i <= daysInCurrentMonth; i++) {
          days.push(i);
        }
        this.totalDays = days.length;
        for (var j = 0; j < days.length; j++) {
          var d = month + '/' + days[j] + '/' + this.selectedYear
          if (this.GetDays(d) == 'Sun' || this.GetDays(d) == 'Sat') {
            weekEnds++;
          }
        }
        data.employeeSISOViewModels.forEach(element => {
          if (this.GetDays(element.date) == 'Sun' || this.GetDays(element.date) == 'Sat') {
            this.weekEndsPresent++;
          }
          var model = new AttendenceModel();
          this._autoMapperService.Map(element, model);
          this.attendenceModelCollection.push(model);
        });
        if (this.selectedYear == (this.date).getFullYear() && (this.date).getMonth() == this.selectedMonth) {
          this.isSignIn = data.todayStatus.isSignIn;
          this.isSignOut = data.todayStatus.isSignOut;
        }
        this.holiday = data.currentMonthHolidays;
        this.CalculateAttendenceDetails(this.attendenceModelCollection.length, weekEnds, data.leaveCount, data.currentMonthHolidays, data.absentCount, this.weekEndsPresent, data.previousLeaveCount);
        this.rowData = this.attendenceModelCollection;
        $('ul.tabs').tabs('select_tab', 'present-details');
        this.loaderModal = false;
      },
      error => {
        Materialize.toast(error, 3000, 'errorTost')
        this.loaderModal = false;
      });
  }

  DisplayManualPage(item: any) {
    this.currentSiSOModel = new SISOModel();
    this.currentSiSOModelHub = this.currentSiSOModel["hub"];
    if (item) {
      var day = ("0" + new Date(item.date).getDate()).slice(-2);
      var month = ("0" + (new Date(item.date).getMonth() + 1)).slice(-2);
      var today = (month) + "/" + (day) + "/" + new Date(item.date).getFullYear();
      this.currentSiSOModel.date = today;
      this.currentSiSOModel.IsSignIn = false;
      let Narration = item.narration.split('|');
      this.currentSiSOModel.Narration = Narration[1];
      this.currentSiSOModel.IsSignInOut = '2';
    }
  }

  //Perform sign in and sign out for manual
  PerformManualSiso(e: any, dataModal, fromGrid, mainForm) {
    if (mainForm.valid == true) {
      this.loaderModal = true;
      var url = HttpSettings.apiBaseUrl + 'v1/attendance/add';
      this.currentSiSOModel = new SISOModel();
      var model = new SISOModel();
      this.currentSiSOModel.Time = this.CovertDateToTimeStamp(dataModal.date + " " + dataModal.TimetHr + ":" + dataModal.TimetMin);
      this.currentSiSOModel.Narration = dataModal.Narration;
      if (dataModal.IsSignInOut == '1') {
        this.currentSiSOModel.IsSignIn = true;
      }
      else {
        this.currentSiSOModel.IsSignIn = false;
      }
      this.currentSiSOModel.IsManual = "true";

      this._autoMapperService.Map(this.currentSiSOModel, model);
      this._httpService.post(url, model)
        .subscribe(
        data => {
          var self = this;
          if (data == 1) {
            var attendanceModel = this.MepAttendence(data)
            if (self.currentSiSOModel.IsSignIn == true) {
              Materialize.toast('Manual Sign-In Saved Successfully', 3000, 'successTost')
            }
            else {
              Materialize.toast('Manual Sign-Out Saved Successfully', 3000, 'successTost')
            }
            this.ResetManualSiso();
            this.hideLineChartDetail();
          }
          else if (data == 0) {
            Materialize.toast('Please Sign-In first', 3000, 'errorTost')
            this.loaderModal = false;
          }
          else if (data == 2) {
            Materialize.toast('Sign-In Time should not be greater than Sign-Out Time', 3000, 'errorTost')
            this.loaderModal = false;
          }
          else if (data == 3) {
            Materialize.toast('Sign-Out Time should not be less than Sign-In Time', 3000, 'errorTost')
            this.loaderModal = false;
          }
        },
        error => {
          Materialize.toast(error, 3000, 'errorTost')
          this.loaderModal = false;
        });
    }
    else {
      this.formSubmitted = true;
    }
  }

  //Perform sign in and sign out for auto
  PerformAutoSignIn(e: any, status) {
    this.loaderModal = true;
    let url = HttpSettings.apiBaseUrl + 'v1/attendance/add';
    this.currentSiSOModel = new SISOModel();
    var model = new SISOModel();
    if (status == "SignIn") {
      this.currentSiSOModel.IsSignIn = true;
    }
    else {
      this.currentSiSOModel.IsSignIn = false;
    }
    var currentTime = new Date().getTime();
    var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
    var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
    this.currentSiSOModel.Time = stamp.toString();
    this.currentSiSOModel.Narration = "Auto Approved";
    this.currentSiSOModel.IsManual = "false";

    this._autoMapperService.Map(this.currentSiSOModel, model);
    this._httpService.post(url, model)
      .subscribe(
      data => {
        var self = this;
        if (data == 1) {
          var attendanceModel = this.MepAttendence(data)
          if (self.currentSiSOModel.IsSignIn == true) {
            this.isSignIn = true;
            Materialize.toast('Signed In Successfully', 3000, 'successTost')
          }
          else {
            this.isSignOut = true;
            Materialize.toast('Signed Out Successfully', 3000, 'successTost')
          }
          this.ResetManualSiso();
          this.hideLineChartDetail();
        }
        else if (data == 0) {
          Materialize.toast('Please Sign-In first', 3000, 'errorTost')
          this.loaderModal = false;
        }
        else if (data == 2) {
          Materialize.toast('Sign-In Time should not be greater than Sign-Out Time', 3000, 'errorTost')
          this.loaderModal = false;
        }
        else if (data == 3) {
          Materialize.toast('Sign-Out Time should not be less than Sign-In Time', 3000, 'errorTost')
          this.loaderModal = false;
        }
      },
      error => {
        Materialize.toast(error, 3000, 'errorTost')
        this.loaderModal = false;
      });
  }

  //Common method to getting days of the date
  GetDays(days: any) {
    var d = new Date(days);
    var weekday = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
    return weekday[d.getDay()];
  }

  //Common method to getting holiday of the date
  GetHoliday(days: any) {
    for (var i = 0; i < this.holiday.length; i++) {
      if (new Date(this.holiday[i].holidayDate).getTime() == new Date(days).getTime()) {
        return true;
      }
    }
  }

  //Common method to getting datetime of the timestamp
  CovertDateToTimeStamp(datetime: string) {
    var dateTimeParts = datetime.split(' ');
    let timePortion = dateTimeParts[1].split(':');
    let datePortion = dateTimeParts[0].split('/');
    let date = new Date(parseInt(datePortion[2]), parseInt(datePortion[0]) - 1, parseInt(datePortion[1], 10), parseInt(timePortion[0]), parseInt(timePortion[1]));
    var localOffset = (-1) * date.getTimezoneOffset() * 60000;
    var stamp = Math.round(new Date(date.getTime() + localOffset).getTime() / 1000);
    return stamp.toString();
  }

  isEditeble(data) {
    if (data.signOutTime == '00:00:00') {
      var date = new Date(data.date);
      if (date.getMonth() == (this.date).getMonth() && date.getDate() == (this.date).getDate()) {
        return false
      }
      else if (date.getDate() == (this.date).getDate() - 5 || date.getDate() == (this.date).getDate() - 4 || date.getDate() == (this.date).getDate() - 3 || date.getDate() == (this.date).getDate() - 2 || date.getDate() == (this.date).getDate() - 1) {
        return true;
      }
    }
  }

  ResetManualSiso() {
    this.currentSiSOModel = new SISOModel();
    this.currentSiSOModelHub = this.currentSiSOModel["hub"];
    this.formSubmitted = false;
  }

  MepAttendence(data) {
    var dataModal = new AttendenceModel();
    var attendanceModel = new AttendenceModel();
    dataModal.id = data.id;
    dataModal.isManual = data.isManual;
    dataModal.narration = data.narration;
    dataModal.date = data.date;
    dataModal.signInTime = data.signInTime;
    dataModal.signOutTime = data.signOutTime;
    dataModal.totalHoursWorked = data.totalHoursWorked;
    this._autoMapperService.Map(dataModal, attendanceModel);
    return attendanceModel;
  }

  showLineChartDetail() {
    this.loaderModal = true;
    this.lineChartData = [{ data: [], label: 'Present Hours' }];
    var month = +(this.selectedMonth) + 1;
    var currentTime = new Date().getTime();
    var localOffset = (-1) * new Date().getTimezoneOffset() * 60000;
    var stamp = Math.round(new Date(currentTime + localOffset).getTime() / 1000);
    var todayTime = stamp.toString();
    var url = HttpSettings.apiBaseUrl + 'v1/attendance/for-current-user/' + month + '/' + this.selectedYear + '/' + todayTime;
    this._httpService.get(url)
      .subscribe
      (
      data => {
        var time = [], days = [], count = 0, backgroundColor = [];
        this.totalHour = 0;
        let daysInCurrentMonth = new Date(this.selectedYear, month, 0).getDate();
        for (var i = 1; i <= daysInCurrentMonth; i++) {
          days.push(i);
          backgroundColor.push('#f16d3e');
        }
        data.employeeSISOViewModels.reverse();
        this.present = data.employeeSISOViewModels.length;
        for (var j = 0; j < data.employeeSISOViewModels.length; j++) {
          var thisDay = new Date(data.employeeSISOViewModels[j].date).getDate();
          if (thisDay == days[count]) {
            var a = data.employeeSISOViewModels[j].totalHoursWorked.replace(':', '.');
            this.totalHour = +(a) + this.totalHour;
            time.push(+(a));
            count++;
          }
          else if (days[count] < thisDay) {
            var temp = thisDay - days[count];
            for (var k = 0; k < temp; k++) {
              a = 0.00;
              time.push(a);
              count++;
            }
            if (thisDay == days[count]) {
              var a = data.employeeSISOViewModels[j].totalHoursWorked.replace(':', '.');
              this.totalHour = +(a) + this.totalHour;
              time.push(+(a));
              count++;
            }
          }
        }
        this.lineChartData[0].data = time;
        this.lineChartLabels = days;
        this.lineChartChartColors = [{ backgroundColor: backgroundColor }];
        this.loaderModal = false;
      },
      error => {
        Materialize.toast(error, 3000, 'errorTost')
        this.loaderModal = false;
      });
  }

  hideLineChartDetail() {
    var month = +(this.selectedMonth) + 1;
    this.GetAttendenceDetails(month, this.selectedYear);
  }

}