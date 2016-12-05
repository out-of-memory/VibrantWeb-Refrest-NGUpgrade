
import {UIProperty, UIClass} from "../infrastructure/Decorators/UIMeta"
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"

@UIClass("TestModel",{fetch:{task:"",lable:"Fetch"},save:{task:"",lable:"Save"},edit:{task:"",lable:"Edit"}})
export class TestModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "TestModel", type: "text",label:"First Name", placeholder:"Please provide First Name", validation: "minLength:10 maxLength:500 required"})
    FirstName: string;

    @UIProperty({ hub: "TestModel", type: "text", label:"Middle Name", placeholder:"Please provide Second Name",validation: "required"})
    MiddleName: string;

    @UIProperty({ hub: "TestModel", type: "text", label:"Last Name", placeholder:"Please provide Second Name",validation: "required" })
    LastName: string;
    
    @UIProperty({ hub: "TestModel", type: "text", label:"Address", placeholder:"Please provide Address",validation: "required" })
    Address: string;
    
    @UIProperty({ hub: "TestModel", type: "checkbox", label:"Is Active", placeholder:"",validation: "" })
    IsActive: boolean;
    
    @UIProperty({ hub: "TestModel", type: "text", label:"No of Participants", placeholder:"",validation: ""})
    NoOfParticipants: number;

     @UIProperty({ hub: "TestModel", type: "textarea", label:"Description", placeholder:"Please provide description",validation: "minLength:10 maxLength:500 required",
                    cols:40, rows:6 })
    data5: string;
    
    @UIProperty({ hub: "TestModel", type: "select", options:[{name: 'option1', value: 1}, {name: 'option2', value: 2},{name: 'option3', value:3}], 
                  placeholder:"",validation: "", multiple:false })
    data6: string;
}
