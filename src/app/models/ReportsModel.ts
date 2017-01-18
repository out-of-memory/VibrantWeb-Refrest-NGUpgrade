import { UIProperty, UIClass } from '../infrastructure/decorators/UIMeta'
import { IUIMetadata } from "../infrastructure/models/IUIMetadata"
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

@UIClass("sisoReportModel", { fetch: {} })
export class sisoReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: "sisoReportModel", type: "date", label: "Start Date", placeholder: "", validation: "required", css: "col s12 m6 l4" })
    StartDate: any = '';

    @UIProperty({ hub: "sisoReportModel", type: "date", label: "End Date", placeholder: "", validation: "required", css: "col s12 m6 l4" })
    EndDate: any = '';

    @UIProperty({ hub: "sisoReportModel", type: "text", label: "Employee Code", placeholder: "", validation: " maxLength:4 c.empCodeForReport", css: "col s12 m6 l4 " })
    Employeecode: string = '';
}


@UIClass("EmployeeDetailsReportModel", { fetch: {} })
export class EmployeeDetailsReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({
        hub: "EmployeeDetailsReportModel", type: "selectMaterialize-custom", options: "empStatus", label: "Employment Status", placeholder: "", validation: "  ", multiple: true,
        defaultselect: 'All', css: "col s12 m6 l2"
    })
    EmploymentStatus: string = null;

    @UIProperty({
        hub: "EmployeeDetailsReportModel", type: "selectMaterialize", options: [{ id: '0', text: 'Inactive' }, { id: '1', text: 'Active' }], label: "Employee Status",
        placeholder: "", validation: "", multiple: false, css: "col s12 m6 l2"
    })
    EmployeeStatus: string = '1';


    @UIProperty({
        hub: "EmployeeDetailsReportModel", type: "selectMaterialize-custom", options: "deliveryUnit", label: "Delivery Unit", placeholder: "", validation: "  ", multiple: true,
        defaultselect: 'All', css: "col s12 m6 l2"
    })
    DeliveryUnit: string = null;

    @UIProperty({
        hub: "EmployeeDetailsReportModel", type: "selectMaterialize-custom", options: "deliveryTeam", label: "Delivery Team", placeholder: "", validation: "  ", multiple: true,
        defaultselect: 'All', css: "col s12 m6 l2"
    })
    DeliveryTeam: string = null;


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

    @UIProperty({
        hub: "LeaveSummaryReportModel", type: "selectMaterialize-custom", options: [{ id: '0', text: 'India-Mumbai' }, { id: '1', text: 'U.S.A-Santa Clara' }, { id: '2', text: 'India-Bengaluru' }], label: "Location", validation: "",
        placeholder: "", multiple: false, defaultselect: 'All', css: "col s12 m6 l4"
    })
    Location: string = null;

    @UIProperty({
        hub: "LeaveSummaryReportModel", type: "selectMaterialize-custom", options: "deliveryUnit", label: "Delivery Unit", placeholder: "", validation: "  ", multiple: false,
        defaultselect: 'All', css: "col s12 m6 l4"
    })
    DeliveryUnit: string = null;
}

@UIClass("LeaveDetailsReportModel", { fetch: {} })
export class LeaveDetailsReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({ hub: "LeaveDetailsReportModel", type: "text", label: "UserID", placeholder: "", validation: " c.empCodeForReport maxLength:4 ", css: "col s12 m6 l2" })
    UserID: string = '';

    @UIProperty({ hub: "LeaveDetailsReportModel", type: "date", label: "Start Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    StartDate: any = '';

    @UIProperty({ hub: "LeaveDetailsReportModel", type: "date", label: "End Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    EndDate: any = '';
    @UIProperty({
        hub: "LeaveDetailsReportModel", type: "selectMaterialize-custom", options: [{ id: '0', text: 'Compansatory Off' }, { id: '1', text: 'Leave' }, { id: '2', text: 'Leave Wihtout Pay' }, { id: '3', text: 'Maternity Leave' }, { id: '4', text: 'Paternity Leave' }, { id: '5', text: 'Long Leave' }, { id: '6', text: 'Birthday Leave' }],
        label: "Leave Type", validation: "  ", placeholder: "", multiple: false, defaultselect: 'All', css: "col s12 m6 l2"
    })
    LeaveType: string = null;
}
@UIClass("LeaveTransactionReportModel", { fetch: {} })
export class LeaveTransactionReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({ hub: "LeaveTransactionReportModel", type: "text", label: "Employee Code", placeholder: "", validation: " c.empCodeForReport maxLength:4 ", css: "col s12 m6 l2" })
    UserID: string = '';

    @UIProperty({
        hub: "LeaveTransactionReportModel", type: "selectMaterialize-custom", options: [{ id: '0', text: 'India-Mumbai' }, { id: '1', text: 'U.S.A-Santa Clara' }, { id: '2', text: 'India-Bengaluru' }],
        label: "Location", validation: "  ", placeholder: "", multiple: false, defaultselect: 'All', css: "col s12 m6 l2"
    })
    Location: string = null;

    @UIProperty({
        hub: "LeaveTransactionReportModel", type: "selectMaterialize-custom", options: [{ id: '0', text: 'Compansatory Off' }, { id: '1', text: 'Leave' }, { id: '2', text: 'Leave Wihtout Pay' }, { id: '3', text: 'Maternity Leave' }, { id: '4', text: 'Paternity Leave' }, { id: '5', text: 'Long Leave' }, { id: '6', text: 'Birthday Leave' }],
        label: "Leave Type", validation: "  ", placeholder: "", multiple: false, defaultselect: 'All', css: "col s12 m6 l2"
    })
    LeaveType: string = null;
    @UIProperty({ hub: "LeaveTransactionReportModel", type: "date", label: "Start Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    StartDate: any = '';

    @UIProperty({ hub: "LeaveTransactionReportModel", type: "date", label: "End Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    EndDate: any = '';

}
@UIClass("HelpdeskReportModel", { fetch: {} })
export class HelpdeskReportModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({
        hub: "HelpdeskReportModel", type: "selectMaterialize", options: "department", label: "Category", placeholder: "", validation: "  ",
        multiple: false, css: "col s12 m6 l2"
    })
    category: string = '';

    @UIProperty({ hub: "HelpdeskReportModel", type: "date", label: " Issue Start Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    issuestartdate: any = '';

    @UIProperty({ hub: "HelpdeskReportModel", type: "date", label: "Issue End Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    issueenddate: any = '';

    @UIProperty({ hub: "HelpdeskReportModel", type: "date", label: "Report Start Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    reportstartdate: any = '';

    @UIProperty({ hub: "HelpdeskReportModel", type: "date", label: "Report End Date", placeholder: "", validation: "required", css: "col s12 m6 l2" })
    reportenddate: any = '';
}
export class HelpDeskStatus {
    Open: number = 0;
    OnHold: number = 0;
    PendingForApproval: number = 0;
    InProgress: number = 0;
    Rejected: number = 0;
    Resolved: number = 0;
    Request: number = 0;
    Issue: number = 0;
}
