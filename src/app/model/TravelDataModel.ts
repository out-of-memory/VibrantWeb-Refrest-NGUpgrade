import { UIProperty, UIClass } from '../infrastructure/decorators/UIMeta';
import { IUIMetadata } from '../infrastructure/models/IUIMetadata';
import { PassportDetailsModel, VisaDetailsModel, DeliveryUnitDetailsModel } from '../model/EmployeeViewModel'

@UIClass('TravelClientInformation', { fetch: {} })
export class ClientInformation implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'TravelClientInformation', css: "custom-input-field input-field col s12", type: 'selectMaterialize', label: 'Client Name', 'labelPosition': 'top', multiple: false, options: 'clientName', placeholder: 'Client Name', validation: 'required' })
    clientId: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "custom-input-field input-field col s12", type: 'textmaxlength', label: 'Business Prospect', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '50' })
    businessProspect: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "custom-input-field input-field col s12", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Client-Reimbursement', multiple: false, options: [{ 'id': 'true', text: 'Yes' }, { 'id': 'false', text: 'No' }], validation: 'required' })
    isClientReimbursment: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "custom-input-field input-field col s12", type: 'textmaxlength', label: 'Purpose of Visit', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    purposeOfVisit: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "custom-input-field input-field col s12", type: 'textmaxlength', label: 'Client Contact Number', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    contactNumber: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "custom-input-field input-field col s12", type: 'textmaxlength', label: 'Client Address', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    adddress: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "custom-input-field input-field col s12", type: 'textmaxlength', label: 'Client EmailId', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    emailId: string = '';

}

@UIClass('TravelRequirements', { fetch: {} })
export class TravelRequirements implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'TravelRequirements', css: "", type: 'textmaxlength', label: 'Travel Title', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    travelTitle: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Travel Type', multiple: false, options: [{ 'id': '1', text: 'Domestic' }, { 'id': '2', text: 'International' }], validation: 'required' })
    travelType: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "", type: 'textmaxlength', label: 'From', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    travelFrom: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "", type: 'textmaxlength', label: 'To', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    travelTo: string = '';

    @UIProperty({ hub: 'TravelRequirements', type: 'date', label: 'Departure', placeholder: '', validation: 'required' })
    departure: string = '';

    @UIProperty({ hub: 'TravelRequirements', type: 'date', label: 'Arrival', placeholder: '', validation: 'required' })
    arrival: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "", type: 'textarea', label: 'Additional Information', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    additionalInformation: string = '';

    comments: string = '';

}

export class TravelViewModel {

    travelTitle: string = '';
    clientInformation: ClientInformation = new ClientInformation();
    travelDetails: Array<TravelRequirements> = [];
    passportDetails: PassportDetailsModel = new PassportDetailsModel();

}