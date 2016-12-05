import {UIProperty, UIClass} from '../infrastructure/decorators/UIMeta'
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"
@UIClass("CompoffApprovalModel", { fetch: {} })
export class CompoffApprovalModel implements IUIMetadata {
    hub: Array<any> = [];
    test(n: number) { }

    @UIProperty({
        hub: "CompoffApprovalModel", type: "selectMaterialize", options: [{ id: '1', text: 'Approved' }, { id: '2', text: 'Rejected' }], label: "",
        validation: "c.select required", multiple: false, css: 'col s6'
    })
    status: number = 0;

    @UIProperty({ hub: "CompoffApprovalModel", type: "text", label: "", placeholder: "Comment", validation: "required maxLength:100", css: 'col s6' })
    statusComment: string = '';
}