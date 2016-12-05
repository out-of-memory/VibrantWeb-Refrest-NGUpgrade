
import {UIProperty, UIClass} from "../infrastructure/Decorators/UIMeta"
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"

@UIClass("PersonModel",{fetch:{task:"",lable:"Fetch"},save:{task:"",lable:"Save"},edit:{task:"",lable:"Edit"}})
export class PersonModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "PersonModel", type: "text",label:"First Name", placeholder:"Please provide First Name", validation: "minLength:10 maxLength:500 required" })
    data: string;

    @UIProperty({ hub: "PersonModel", type: "text", label:"Middle Name", placeholder:"Please provide Second Name",validation: "required" })
    data1: string;

    @UIProperty({ hub: "PersonModel", type: "text", label:"Last Name", placeholder:"Please provide Second Name",validation: "required" })
    data2: string;
    
    @UIProperty({ hub: "PersonModel", type: "text", label:"Address", placeholder:"Please provide Address",validation: "required" })
    data3: string;
    
    @UIProperty({ hub: "PersonModel", type: "checkbox", label:"Is Active", placeholder:"",validation: "", })
    data4: boolean;


}