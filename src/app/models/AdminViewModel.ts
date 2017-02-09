import {UIProperty, UIClass} from '../infrastructure/decorators/UIMeta'
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"


@UIClass("AdminViewModel", { fetch: {} })
export class AdminViewModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "AdminViewModel", type: "view", label: "EmployeeID", placeholder: "", validation: "" })
    employeeID: number;

    @UIProperty({ hub: "AdminViewModel", type: "date", label: "From", placeholder: "", validation: "required" })
    fromDate: number;

    @UIProperty({ hub: "AdminViewModel", type: "date", label: "To", placeholder: "", validation: "" })
    toDate: string;

    @UIProperty({ hub: "AdminViewModel", type: "text", label: "Comments", placeholder: "", validation: "required" })
    comments: string;

    @UIProperty({ hub: "AdminViewModel", type: "view", label: "Admin ID", placeholder: "", validation: "" })
    adminID: string;

    @UIProperty({ hub: "AdminViewModel", type: "view", label: "Task Type", placeholder: "", validation: "" })
    taskType: number;
    
    @UIProperty({hub : "AdminViewModel", type: "text", lable: "Quantity", placeholder:"",validation: "required"})
    quantity : number;

    @UIProperty({hub : "AdminViewModel", type: "view", lable: "Leave Type", placeholder:"",validation: ""})
    subType : number;   
}