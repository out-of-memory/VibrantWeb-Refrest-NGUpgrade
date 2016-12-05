
import {UIProperty, UIClass} from "../infrastructure/Decorators/UIMeta"
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"

@UIClass("EmployeeDetailsModel",{fetch:{}})
export class EmployeeDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "EmployeeDetailsModel", type: "text",label:"Name", placeholder:"", validation: "" })
    name: string;

    @UIProperty({ hub: "EmployeeDetailsModel", type: "text", label:"Employee Code", placeholder:"",validation: "required" })
    code: number;

    @UIProperty({ hub: "EmployeeDetailsModel", type: "text", label:"Current Designation", placeholder:"",validation: "required" })
    designation: string;
    
    @UIProperty({ hub: "EmployeeDetailsModel", type: "text", label:"PAN Number", placeholder:"",validation: "required" })
    pan: string;
    
     @UIProperty({ hub: "EmployeeDetailsModel", type: "text", label:"PF Number", placeholder:"",validation: "required" })
    pf: string;

      @UIProperty({ hub: "EmployeeDetailsModel", type: "text", label:"Passport Number", placeholder:"",validation: "required" })
    passport: string;

      @UIProperty({ hub: "EmployeeDetailsModel", type: "text", label:"Comments Made", placeholder:"Type something",validation: "required" })
    comments: string;

       @UIProperty({ hub: "EmployeeDetailsModel", type: "img", alt:"Profile Image" })
    image: string;
    
}
