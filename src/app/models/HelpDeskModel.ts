import {UIProperty, UIClass} from "../infrastructure/Decorators/UIMeta"
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"

@UIClass("HelpDeskModel", { fetch: {} })
export class HelpDeskModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "HelpDeskModel", type: "view", label: "Seating Location", multiple: false, placeholder: "Seating Location", validation: "", 'labelPosition': 'top', css: "col s12 m6" })
    seatingLocation: string = "";

    @UIProperty({ hub: "HelpDeskModel", labelPosition: 'top', type: "selectMaterialize", options: [{ "id": 0, "text": "Request", "selected": true }, { "id": 1, "text": "Issue", "selected": false }], label: "Type", readOnly: true, placeholder: "", validation: "required", css: "col s12 m6" })
    type: number = 0;

    @UIProperty({ hub: "HelpDeskModel", type: "view", label: "Phone Extension", multiple: false, placeholder: "Phone Extension", 'labelPosition': 'top', validation: "", css: "col s12 m6" })
    phoneExtension: number = 0;

    @UIProperty({ hub: "HelpDeskModel", labelPosition: 'top', type: "selectMaterialize", options: [{ "id": 0, "text": "High", "selected": true }, { "id": 1, "text": "Medium", "selected": false }, { "id": 2, "text": "Low", "selected": false }], label: "Severity", placeholder: "", validation: "required", css: "col s12 m6" })
    severity: number = 0;

    @UIProperty({ hub: "HelpDeskModel", type: "view", label: "Manager/Lead", multiple: false, placeholder: "Manager/Lead", 'labelPosition': 'top', validation: "", css: "col s12 m6" })
    reportingToName: string = "";

    @UIProperty({ hub: "HelpDeskModel", type: "date", label: "Required Till",placeholder: "", 'labelPosition': 'top', validation: "required", css: "col s12 m6" })
    requiredTill: string = "";
    
    comments: string = "";
    status: number = 1;
    categoryID: number = 0;
    subCategoryID: number = 0;
    attachedFiles: string = "";
    ID: number = 0;
    assignedTo = 0;
    IssueDate:any="";
    IsOtherDepartmant:boolean=false;
}

@UIClass("HelpDeskCommentModel", { fetch: {} })
export class HelpDeskCommentModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "HelpDeskCommentModel", labelPosition: 'top', type: "text", label: "", placeholder: "Enter Comments", validation: "required maxLength:900 ", css: "input-field col s12" })
    comments: string = "";
    ID: number = 0;
    personHelpDeskID: number = 0;
    CommentedBy: string = "";
    commentedDate: string = "";
    CommentedByName: string = "";
    CommentedByRole: string = "";
    attachedFiles: Array<any> = [];
}

export class HelpDeskList {
    ID: number = 0;
    number: string = "";
    issueDate: string = "";
    assignedToName: string = "";
    description: string = "";
    type: string = "";
    severity: string = "";
    status: number = 0;
    duration: number = 0;
    comments: string = "";
    assignedTo: number = 0;
    requestedBy: string = "";
    email: string = '';
    mobile: string = '';
    imagePath: string = '';
    address: string = '';
    employeeId: string = '';
    employeeName: string = '';
    designation: string = '';
    categoryID: number = 0;
    isPokeEnabled :boolean = false;
}


@UIClass("HelpDeskSubmitModel", { fetch: {} })
export class HelpDeskSubmitModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "HelpDeskSubmitModel", labelPosition: 'top', type: "text", label: "Type", readOnly: true, placeholder: "", validation: "required", css: "col s12 m6" })
    type: string = "";

    @UIProperty({ hub: "HelpDeskSubmitModel", type: "text", label: "Seating Location", multiple: false, placeholder: "Seating Location", validation: "", 'labelPosition': 'top', css: "col s12 m6" })
    seatingLocation: string = "";

    @UIProperty({ hub: "HelpDeskSubmitModel", labelPosition: 'top', type: "text", label: "Severity", placeholder: "", validation: "required", css: "col s12 m6" })
    severity: string = "";

    @UIProperty({ hub: "HelpDeskSubmitModel", type: "text", label: "Phone Extension", placeholder: "Phone Extension", 'labelPosition': 'top', validation: "", css: "col s12 m6" })
    phoneExtension: number = 0;

    @UIProperty({ hub: "HelpDeskSubmitModel", labelPosition: 'top', type: "text", label: "Categories", placeholder: "", validation: "required", css: "col s12 m6" })
    category: string = "";

    @UIProperty({ hub: "HelpDeskSubmitModel", type: "text", label: "Manager/Lead", multiple: false, placeholder: "Manager/Lead", 'labelPosition': 'top', validation: "", css: "col s12 m6" })
    reportingTo: string = "";

    @UIProperty({ hub: "HelpDeskSubmitModel", labelPosition: 'top', type: "text", label: "Sub Categories", placeholder: "", validation: "required", css: "col s12 m6" })
    subCategory: string = "";

    @UIProperty({ hub: "HelpDeskSubmitModel", labelPosition: 'top', type: "text", label: "Duration(Days)", placeholder: "Duration", validation: "required", css: "col s12 m6" })
    durationDisplay: string = "";
    
    @UIProperty({ hub: "HelpDeskSubmitModel", labelPosition: 'top', type: "text", label: "Required Till", placeholder: "", validation: "required", css: "col s12 m6" })
    requiredTill: string = "";

    duration: number = 0;
    status: number = 0;
    attachedFile: string = "";
    id: number = 0
    comments: string = "";
    number: string = "";
    issueDate: string = "";
    isPokedEnabled :boolean = false;
    assignedTo = 0;
}
