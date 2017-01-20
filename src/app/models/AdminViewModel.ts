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
    employeeID: string;

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

    
}