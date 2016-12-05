import {UIProperty, UIClass} from '../infrastructure/decorators/UIMeta'
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"
@UIClass("AttendanceReportModel", { fetch: {} })
export class AttendanceReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: "AttendanceReportModel", type: "date", label: "Start Date", placeholder: "", validation: "required", css: "col s12 m6 l4" })
    StartDate: any = '';

    @UIProperty({ hub: "AttendanceReportModel", type: "date", label: "End Date", placeholder: "", validation: "required", css: "col s12 m6 l4" })
    EndDate: any = '';

    @UIProperty({ hub: "AttendanceReportModel", type: "text", label: "Employee Code", placeholder: "", validation: " maxLength:4 c.empCodeForReport", css: "col s12 m6 l4 " })
    Employeecode: string = '';
}


@UIClass("EmployeeDetailsReportModel", { fetch: {} })
export class EmployeeDetailsReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({ hub: "EmployeeDetailsReportModel", type: "selectMaterialize", options: "empStatus", label: "Employment Status", placeholder: "", validation: "  ", multiple: false, css: "col s12 m6 l2" })
    EmploymentStatus: string = '';

     @UIProperty({ hub: "EmployeeDetailsReportModel", type: "selectMaterialize", options:  [{ id: '0', text: 'Inactive' }, { id: '1', text: 'Active' }], label: "Employee Status", placeholder: "", validation: "  ", multiple: false, css: "col s12 m6 l2" })
    EmployeeStatus: string = '1';


    @UIProperty({ hub: "EmployeeDetailsReportModel", type: "selectMaterialize", options: "deliveryUnit", label: "Delivery Unit", placeholder: "", validation: "  ", multiple: false, css: "col s12 m6 l2" })
    DeliveryUnit: string = '';

    @UIProperty({ hub: "EmployeeDetailsReportModel", type: "selectMaterialize", options: "deliveryTeam", label: "Delivery Team", placeholder: "", validation: "  ", multiple: false, css: "col s12 m6 l2" })
    DeliveryTeam: string = '';

    
    @UIProperty({ hub: "EmployeeDetailsReportModel", type: "text", label: "Employee Code", placeholder: "", validation: "c.empCodeForReport maxLength:4", css: "col s12 m6 l2" })
    EmployeeName: string = '';
}

@UIClass("LeaveSummaryReportModel", { fetch: {} })
export class LeaveSummaryReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({ hub: "LeaveSummaryReportModel", type: "text", options: "text", label: "UserID", placeholder: "", validation: " c.empCodeForReport maxLength:4 ", css: "col s12 m6 l4" })
    UserID: string = '';

    @UIProperty({ hub: "LeaveSummaryReportModel", type: "selectMaterialize", options: [{ id: '0', text: 'India-Mumbai' }, { id: '1', text: 'U.S.A-Santa Clara' }, { id: '2', text: 'India-Bengaluru' }], label: "Location", placeholder: "", multiple: false, css: "col s12 m6 l4" })
    Location: string = '';

    @UIProperty({ hub: "LeaveSummaryReportModel", type: "selectMaterialize", options: "deliveryUnit", label: "Delivery Unit", placeholder: "", validation: "  ", multiple: false, css: "col s12 m6 l4" })
    DeliveryUnit: string = '';
}

@UIClass("LeaveDetailsReportModel", { fetch: {} })
export class LeaveDetailsReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({ hub: "LeaveDetailsReportModel", type: "text",  label: "UserID", placeholder: "", validation: " c.empCodeForReport maxLength:4 ", css: "col s12 m6 l4" })
    UserID: string = '';

    @UIProperty({ hub: "LeaveDetailsReportModel", type: "date", label: "Start Date", placeholder: "", validation: "required", css: "col s12 m6 l4" })
    StartDate: any = '';

    @UIProperty({ hub: "LeaveDetailsReportModel", type: "date", label: "End Date", placeholder: "", validation: "required", css: "col s12 m6 l4" })
    EndDate: any = '';
    LeaveType: string = "1";
}