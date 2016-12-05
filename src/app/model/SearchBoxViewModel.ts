import {UIProperty, UIClass} from '../infrastructure/decorators/UIMeta'
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"

@UIClass("SearchBoxViewModel", { fetch: {} })
export class SearchBoxViewModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: "SearchBoxViewModel", type: "text", label: "", placeholder: "Search by Employee code/ Name/ Designation/ EmailID", validation: "minLength:2 maxLength:100 required c.CheckEmptystring", css: "col s8" })
    value: string;

    @UIProperty({ hub: "SearchBoxViewModel", type: "checkbox", label: "Search For Active And In-Active Users", validation: "minLength:2 maxLength:100", css: "col s4" })
    activeUser: boolean=false;

    checkboxText: string = 'Show In-Active User Also';
}