import { UIProperty, UIClass } from '../infrastructure/decorators/UIMeta';
import { IUIMetadata } from '../infrastructure/models/IUIMetadata';
import { PassportDetailsModel, VisaDetailsModel, DeliveryUnitDetailsModel, EmergencyContacts } from '../model/EmployeeViewModel'

@UIClass('TravelClientInformation', { fetch: {} })
export class ClientInformation implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'TravelClientInformation', css: "col s12", type: 'selectMaterialize', label: 'Client Name', 'labelPosition': 'top', multiple: false, options: 'clientName', placeholder: 'Client Name', validation: 'required' })
    clientId: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "col s12", type: 'textmaxlength', label: 'Business Prospect', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '50' })
    businessProspect: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "col s12", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Client-Reimbursement', multiple: false, options: [{ 'id': 'true', text: 'Yes' }, { 'id': 'false', text: 'No' }], validation: 'required' })
    isClientReimbursment: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: " col s12", type: 'textmaxlength', label: 'Purpose of Visit', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    purposeOfVisit: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "col s12", type: 'textmaxlength', label: 'Client Contact Number', 'labelPosition': 'top', placeholder: '', validation: 'required c.phoneNo maxLength:25', maxlength: '20' })
    contactNumber: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: " col s12", type: 'textmaxlength', label: 'Client Address', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    adddress: string = '';

    @UIProperty({ hub: 'TravelClientInformation', css: "col s12", type: 'textmaxlength', label: 'Client EmailId', 'labelPosition': 'top', placeholder: '', validation: 'required c.email', maxlength: '100' })
    emailId: string = '';

    clientName: string = '';
}

@UIClass('TravelRequirements', { fetch: {} })
export class TravelRequirements implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'textmaxlength', label: 'Travel Title', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    travelTitle: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Travel Type', multiple: false, options: [{ 'id': '1', text: 'Domestic' }, { 'id': '2', text: 'International' }], validation: 'required' })
    travelType: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'textmaxlength', label: 'From', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    travelFrom: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'textmaxlength', label: 'To', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    travelTo: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'date', label: 'Departure', placeholder: '', validation: 'required' })
    departure: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'date', label: 'Arrival', placeholder: '', validation: 'required' })
    arrival: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'textarea', label: 'Additional Information', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    additionalInformation: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Meal Preference', multiple: false, options: [{ 'id': '1', text: 'Vegetarian' }, { 'id': '2', text: 'Non-Vegetarian' }], validation: 'required' })
    mealPreference: string = '';

    @UIProperty({ hub: 'TravelRequirements', css: "col s12", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Seat Location Preference', multiple: false, options: [{ 'id': '1', text: 'Window' }, { 'id': '2', text: 'Middle' }, { 'id': '3', text: 'Option 3' }], validation: 'required' })
    seatLocationPreference: string = '';

    comments: string = '';

}

export class TravelViewModel {

    travelTitle: string = '';
    clientInformation: ClientInformation = new ClientInformation();
    travelDetails: TravelRequirements = new TravelRequirements();
    employeePassport: PassportDetailsModel = new PassportDetailsModel();
    primaryApproverId: string = '';
    userProfile: ApprovalUserProfile = new ApprovalUserProfile();
    id: string = '';
    totalStages: number = 0;
    onStageStatus: number = 0;
    lastcomments: string = '';
    onStage: string = '';
    travelTo: string = '';
    travelFrom: string = '';
    departure: string = '';
    arrival: string = '';
    moneyTransactions: Array<TravelMoneyTransactions> = [];
    documentUploads: Array<UploadDocument> = [];
    employeeVisas: Array<VisaDetailsModel> = [];
    employeeContacts: Array<EmergencyContacts> = [];
    organizationDetails: DeliveryUnitDetailsModel = new DeliveryUnitDetailsModel();
    submitStatus: string = '';
    travelExtensionImageUrl: string = 'assets/images/trip-extension.svg';
    financeAdmin: number = 0;
    travelAdmin: number = 0;
    showForm: boolean = false;
}

export class ApprovalUserProfile {
    imageURL: string = '';
    id: string = '';
    fullName: string = '';
    designation: string = '';
    location: string = '';
    emailId: string = '';
    extensionNumber: string = '';
    mobileNumber: string = '';
}


@UIClass('MoneyTransactions', { fetch: {} })
export class TravelMoneyTransactions implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'MoneyTransactions', css: "col s6", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Travel Card Type', multiple: false, options: [{ 'id': '1', text: 'Master' }, { 'id': '2', text: 'Visa' }], validation: 'required' })
    cardType: string = '';

    @UIProperty({ hub: 'MoneyTransactions', css: "col s6", type: 'textmaxlength', label: 'Travel Card Details', 'labelPosition': 'top', placeholder: '', validation: 'required c.numbers', maxlength: '16' })
    cardDetails: string = '';

    @UIProperty({ hub: 'MoneyTransactions', css: "col s6", type: 'selectMaterialize', label: 'Currency', 'labelPosition': 'top', multiple: false, options: "currency", validation: 'required' })
    currencyId: string = '';

    // @UIProperty({ hub: 'MoneyTransactions', css: "col s6", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Transaction Type', multiple: false, options: [{ 'id': '1', text: 'Cash' }, { 'id': '2', text: 'Card' }], validation: 'required' })
    // transactionType: string = '';

    @UIProperty({ hub: 'MoneyTransactions', css: "col s6", type: 'textmaxlength', label: 'Cash', 'labelPosition': 'top', placeholder: '', maxlength: '5', validation: '5' })
    cash: number;

    @UIProperty({ hub: 'MoneyTransactions', css: "col s6", type: 'textmaxlength', label: 'Card Reloaded', 'labelPosition': 'top', placeholder: '', validation: 'required c.numbers', maxlength: '5' })
    cardAmount: number;

    @UIProperty({ hub: 'MoneyTransactions', css: "col s6", type: 'textmaxlength', label: 'Comment', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    comments: string = '';

    createdDate: string = '';

    travelId: string = '';

    transactionType: string = '';

    amount: number = 0;

}

@UIClass('UploadDocument', { fetch: {} })
export class UploadDocument implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    description: string = '';

    url: string = '';

    id: string = '';

    travelId: string = '';
}


//   "hotelId": 1015,
//   "travelId": 0,
//   "checkIn": "11/22/2016",
//   "checkOut": "11/22/2016",
//   "roomType": 2,
//   "hotelName": "Hotal taj",
//   "address": "sdfsdsdf",
//   "phone": "dsfsdfsdf",
//   "fax": "dfgdfgdfg",
//   "emailId": "sdfsdf@sdfsf.cpom",
//   "travelPreferences": "dsfsdfsdfnsdflknsldflsdflsdflsdflsdfl",

@UIClass('HotelBooking', { fetch: {} })
export class HotelBooking implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }


    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l4 p-bottom5", type: 'date', label: 'Check In Date', placeholder: '', validation: 'required' })
    checkIn: string = '';

    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l4 p-bottom5", type: 'date', label: 'Check Out Date', placeholder: '', validation: 'required' })
    checkOut: string = '';

    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l4 p-bottom5", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Room Type', multiple: false, options: [{ 'id': '1', text: 'Luxury' }, { 'id': '2', text: 'Normal' }], validation: 'required' })
    roomType: string = '';

    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l4 p-bottom5", type: 'textmaxlength', label: 'Hotel Name', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '100' })
    hotelName: string = '';

    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l8 p-bottom5", type: 'textmaxlength', label: 'Address', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '300' })
    address: string = '';

    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l4 p-bottom5", type: 'textmaxlength', label: 'Phone', 'labelPosition': 'top', placeholder: '', validation: 'required c.numbers', maxlength: '10' })
    phone: string = '';

    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l4 p-bottom5", type: 'textmaxlength', label: 'Fax', 'labelPosition': 'top', placeholder: '', validation: 'required c.numbers', maxlength: '20' })
    fax: string = '';

    @UIProperty({ hub: 'HotelBooking', css: "col s12 m6 l4 p-bottom5", type: 'textmaxlength', label: 'EmailId', 'labelPosition': 'top', placeholder: '', validation: 'required c.email', maxlength: '100' })
    emailId: string = '';

    kitchenPreferences: KitchenPreferences = new KitchenPreferences();
    mediaPreferences: MediaPreferences = new MediaPreferences();
    internetPreferences: Internet = new Internet();
    servicesPreferences: Services = new Services();
    generalPreferences: General = new General();
    costSummary: number = 0;

    travelPreferences: string = '';
    hotelId: number = 0;
    travelId: number = 0;
}

export class KitchenPreferences {
    kitchenId: number = 0;
    kitchen: boolean = false;
    coffeeMachine: boolean = false;
    refridgerator: boolean = false;
    microwave: boolean = false;
    utensils: boolean = false;
}

export class MediaPreferences {
    media: boolean = false;
    mediaId: number = 0;
    flatTv: boolean = false;
    cableChannels: boolean = false;
    telephone: boolean = false;
    fax: boolean = false;
}

export class Internet {
    internet: boolean = false;
    internetId: number = 0;
    freeWiFi: boolean = false;
    paidInternet: boolean = false;
    amount: number = 0;
}

export class Services {
    services: boolean = false;
    serviceId: number = 0;
    atmOnSite: boolean = false;
    laundry: boolean = false;
    shoppingCenter: boolean = false;
    pickUpDrop: boolean = false;
}

export class General {
    general: boolean = false;
    generalId: number = 0;
    iron: boolean = false;
    hairDryer: boolean = false;
    ironFacilites: boolean = false;
}

@UIClass('FlightOptions', { fetch: {} })
export class Flight implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'FlightOptions', css: "custom-input-field input-field col s12 m3", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Travel Type', multiple: false, options: [{ 'id': '1', text: 'Domestic' }, { 'id': '2', text: 'International' }], validation: 'required' })
    travelType: string = '';

    @UIProperty({ hub: 'FlightOptions', css: "custom-input-field input-field col s12 m3", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Trip Type', multiple: false, options: [{ 'id': '1', text: 'One Way Trip' }, { 'id': '2', text: 'Round Trip' }], validation: 'required' })
    tripType: string = '';

    @UIProperty({ hub: 'FlightOptions', css: "custom-input-field input-field col s12 m3", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Booking From', multiple: false, options: [{ 'id': '1', text: 'WorldSpin Holidays' }, { 'id': '2', text: 'Booking 1' }, { 'id': '3', text: 'Other Agency' }], validation: 'required' })
    bookingFrom: string = '';

    @UIProperty({ hub: 'FlightOptions', css: "custom-input-field input-field col s12 m3", type: 'text', 'labelPosition': 'top', label: 'Agency Name', validation: 'required', maxlength: '50', show: true })
    agencyName: string = '';
}

@UIClass('FlightDetailOptions', { fetch: {} })
export class FlightDetails implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Travel From', multiple: false, validation: 'required', maxlength: '50' })
    travelFrom: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Travel To', multiple: false, validation: 'required', maxlength: '50' })
    travelTo: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'date', 'labelPosition': 'top', label: 'Departure Date', multiple: false, validation: 'required', maxlength: '100' })
    departure: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'date', 'labelPosition': 'top', label: 'Arrival Date', multiple: false, validation: 'required', maxlength: '100' })
    arrival: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'time', 'labelPosition': 'top', label: 'Departure Time', multiple: false, validation: 'required', maxlength: '100', options: [{ 'id': '1', text: '12' }, { 'id': '2', text: '13' }, { 'id': '3', text: '14' }] })
    departureTime: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'time', 'labelPosition': 'top', label: 'Arrival Time', multiple: false, validation: 'required', maxlength: '100', options: [{ 'id': '1', text: '1' }, { 'id': '2', text: '2' }, { 'id': '3', text: '3' }] })
    arrivalTime: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Airlines', multiple: false, options: [{ 'id': '1', text: 'Emirates' }, { 'id': '2', text: 'Booking 1' }, { 'id': '3', text: 'Booking 2' }], validation: 'required' })
    airlines: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Flight Class', multiple: false, options: [{ 'id': '1', text: 'Economy' }, { 'id': '2', text: 'First Class' }, { 'id': '3', text: 'Business Class' }], validation: 'required' })
    flightClassId: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Layover', multiple: false, options: [{ 'id': '1', text: '1' }, { 'id': '2', text: '2' }, { 'id': '3', text: '3' }], validation: '' })
    layOver: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'text', 'labelPosition': 'top', label: 'Layover Location', multiple: false, validation: '', maxlength: '50' })
    layOverLocation: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Layover Duration (hrs)', multiple: false, validation: '', maxlength: '5' })
    layOverDuration: string = '';

    @UIProperty({ hub: 'FlightDetailOptions', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Total Travel Duration (hrs)', multiple: false, validation: 'required c.numbers', maxlength: '5' })
    totalTravelDuration: string = '';

}

@UIClass('FlightCostDetail', { fetch: {} })
export class FlightCostDetail implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'FlightCostDetail', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Base Fare', multiple: false, validation: 'required c.numbers', maxlength: '6' })
    baseFare: string = '';

    @UIProperty({ hub: 'FlightCostDetail', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Taxes', multiple: false, validation: 'required c.numbers', maxlength: '6' })
    taxes: string = '';

    @UIProperty({ hub: 'FlightCostDetail', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Grand Total', multiple: false, validation: 'required c.numbers', maxlength: '6' })
    grandTotal: string = '';

    @UIProperty({ hub: 'FlightCostDetail', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Change Penalty', multiple: false, validation: 'required c.numbers', maxlength: '6' })
    changePenalty: string = '';

    @UIProperty({ hub: 'FlightCostDetail', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Cancellation Charges', multiple: false, validation: 'required c.numbers', maxlength: '6' })
    cancellationCharges: string = '';

    @UIProperty({ hub: 'FlightCostDetail', css: "custom-input-field input-field col s12 m6", type: 'textmaxlength', 'labelPosition': 'top', label: 'Baggage', multiple: false, validation: 'required c.numbers', maxlength: '3' })
    baggage: string = '';

    comments: string = '';
}

export class FlightViewModel {

    travelId: string = '';

    travelType: string = '';

    tripType: string = '';

    bookingFrom: string = '';

    agencyName: string = '';

    baseFare: number = 0;

    taxes: number = 0;

    grandTotal: number = 0;

    changePenalty: number = 0;

    cancellationCharges: number = 0;

    baggage: number = 0;

    flightDetails: Array<FlightDetailViewModel> = new Array<FlightDetailViewModel>();

    comments: string = '';

    createdDate: string = '';
}

export class FlightDetailViewModel {
    travelFrom: string = '';

    travelTo: string = '';

    departure: string = '';

    arrival: string = '';

    airlines: string = '';

    flightClassId: string = '';

    layOver: string = '';

    layOverLocation: string = '';

    layOverDuration: string = '';

    totalTravelDuration: string = '';
}


@UIClass('TravelExtension', { fetch: {} })
export class TravelExtension implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    departure: string = '';

    @UIProperty({ hub: 'TravelExtension', type: 'date', label: '', placeholder: 'Arrival Date', validation: 'required' })
    arrival: string = '';
    comments: string = '';
    travelId: number = 0;
    travelFrom: string = '';
    travelTo: string = '';
    isChanged: string = 'changed-value';
}

@UIClass('TravelClosingComments', { fetch: {} })
export class CommentModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    @UIProperty({ hub: 'TravelClosingComments', css: "custom-input-field input-field col s12", type: 'textarea', 'labelPosition': 'top', label: 'Comments', multiple: false, validation: 'required', maxlength: '200' })
    closingComments: string = '';
}    
