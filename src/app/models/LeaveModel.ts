import { UIProperty, UIClass } from "../infrastructure/Decorators/UIMeta"
import { IUIMetadata } from "../infrastructure/models/IUIMetadata"

@UIClass("LeaveModel", { fetch: {} })
export class LeaveModel implements IUIMetadata {
    hub: Array<any> = [];

    test(n: number) { }

    @UIProperty({ hub: "LeaveModel", css: "col s6 m-top15", type: "select", options: [{ "id": 0, "text": "Comp Off", "selected": false }, { "id": 1, "text": "Leave", "selected": false }, { "id": 2, "text": "Leave Without Pay (LWP)", "selected": false }], label: "Leave Type", validation: "required", multiple: false })
    leaveType: number = 2;

    @UIProperty({ hub: "LeaveModel", css: "col s3 m-top15", type: "date", label: "From Date", placeholder: "", validation: "required" })
    fromDate: any = this.today();

    @UIProperty({ hub: "LeaveModel", css: "col s3 m-top15", type: "date", label: "To Date", placeholder: "", validation: "required" })
    toDate: any = '';

    @UIProperty({ hub: "LeaveModel", css: "col s12", type: "text", label: "Narration", placeholder: "", validation: "required maxLength:100" })
    narration: string = '';

    leaves: number = 0;
    absent: number = 0;
    status: string = '';
    id: number = 0;

    today() {
        var date = new Date();
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return (monthIndex + 1) + '/' + day + '/' + year;
    }
}

@UIClass("LeaveApprovalModel", { fetch: {} })
export class LeaveApprovalModel extends LeaveModel {


    @UIProperty({ hub: "LeaveApprovalModel", css: "col s6 m-top15", type: "string", label: "User name", placeholder: "User Name", validation: "required" })
    userName: any = '';
    statusComments: string = '';
    userId: number = 0;
    currentDesignation: string = '';
    olText: string = '';
    email: string = '';
    mobile: string = '';
    residenceNumber: string = '';
    imagePath: string = '';
}

@UIClass("LeaveApprovalStatus", { fetch: {} })
export class LeaveApprovalStatus implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    @UIProperty({
        hub: "LeaveApprovalStatus", type: "selectMaterialize", options: [{ id: '2', text: 'Approved' }, { id: '3', text: 'Rejected' }], label: "Action",
        validation: "c.select required", multiple: false, css: 'col s12 m5'
    })
    status: number = 1;

    @UIProperty({ hub: "LeaveApprovalStatus", type: "text", label: "Comments", placeholder: "", validation: "required maxLength:100", css: 'col s12' })
    statusComment: string = '';
}
