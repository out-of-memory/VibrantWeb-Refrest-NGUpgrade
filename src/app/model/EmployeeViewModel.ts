import { UIProperty, UIClass } from '../infrastructure/decorators/UIMeta'
import { IUIMetadata } from "../infrastructure/models/IUIMetadata"

@UIClass("Employee", { fetch: {} })
export class Employee implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "Employee", type: "text", label: "Name", placeholder: "", validation: "" })
    FullName: string;

    @UIProperty({ hub: "Employee", type: "text", label: "Employee Code", placeholder: "", validation: "" })
    id: number;

    @UIProperty({ hub: "Employee", type: "text", label: "Current Designation", placeholder: "", validation: "" })
    currentDesignation: string;

    @UIProperty({ hub: "Employee", type: "text", label: "Organization Email", placeholder: "", validation: "" })
    organizationEmail: string;

    //   @UIProperty({ hub: "Employee", type: "text", label:"Mobile", placeholder:"",validation: "" })
    //  mobile: string;

    //  @UIProperty({ hub: "Employee", type: "text", label:"Residence Number", placeholder:"",validation: "" })
    //  residenceNumber: string;

    @UIProperty({ hub: "Employee", type: "text", label: "Office Location", placeholder: "", validation: "" })
    ol: string;

    @UIProperty({ hub: "Employee", type: "text", label: "Office Location", placeholder: "", validation: "" })
    olText: string;

    @UIProperty({ hub: "Employee", type: "img", alt: "Profile Image" })
    imagePath: string;
}

@UIClass("PersonalDetailsModel", { fetch: {} })
export class PersonalDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "First Name", placeholder: "", validation: "required maxLength:20", css: "col s6" })
    firstName: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "Middle Name", placeholder: "", validation: " maxLength:20", css: "col s6" })
    middleName: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "Last Name", placeholder: "", validation: "required maxLength:20", css: "col s6" })
    lastName: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "date", label: "Date of Birth", placeholder: "", validation: "required", min: false, max: true, css: "col s6" })
    dateOfBirth: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "select", options: "gender", label: "Gender", validation: "c.select", multiple: false, css: "col s6  " })
    gender: string = '';

    @UIProperty({
        hub: "PersonalDetailsModel", type: "select", options: [{ id: 'Married', text: 'Married' }, { id: 'Single', text: 'Single' }, { id: 'divorced', text: 'Divorced' }, { id: 'Widowed', text: 'Widowed' }],
        label: "Marital Status", validation: "c.select", multiple: false, css: "col s6"
    })
    maritalStatus: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "date", label: "Wedding Date", placeholder: "", validation: "", min: false, max: true, css: "col s6  " })
    weddingDate: string = '';

    // @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "Spouse Name", placeholder: "", validation: "minLength:3 maxLength:20",css:"col s6  " })
    // spouseName: string = '';

    // @UIProperty({ hub: "PersonalDetailsModel", type: "date", label: "Spouse Birth Date", placeholder: "", validation: "",css:"col s6  " })
    // spouseBirthDate: string = '';

    // @UIProperty({ hub: "PersonalDetailsModel", type: "number", label: "Number of Children", placeholder: "", validation: "maxLength:2 ",css:"col s6  " })
    // noofChildren: string = '';

    // @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "1st Child Name", placeholder: "", validation: "maxLength:20",css:"col s6  " })
    // firstChildName: string = '';

    // @UIProperty({ hub: "PersonalDetailsModel", type: "date", label: "1st Child Birth Date", placeholder: "", validation: "",css:"col s6  " })
    // firstChildDateOfBirth: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "Email ID (Personal)", placeholder: "", validation: "c.email maxLength:50 required", css: "col s6  " })
    personalEmail: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "Residence Number", placeholder: "", validation: "c.phoneNo maxLength:25", css: "col s6  " })
    residenceNumber: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "Mobile Number", placeholder: "", validation: " c.phoneNo maxLength:25", css: "col s6  " })
    mobile: string = '';

    @UIProperty({ hub: "PersonalDetailsModel", type: "text", label: "Hobbies", placeholder: "", validation: "maxLength:500", css: "col s6  " })
    hobbies: string = '';

}

@UIClass("Address", { fetch: {} })
export class Address implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: "Address", type: "textarea", label: "Address", placeholder: "", cols: "20", rows: "5", validation: " required maxLength:500 ", css: "col s12" })
    currentAddress: string = '';

    @UIProperty({ hub: "Address", type: "text", label: "Country", placeholder: "", validation: "required maxLength:50", css: " col s12" })
    currentAddressCountry: string = '';

    @UIProperty({ hub: "IsCurrent", type: "text", label: "Is Current", placeholder: "", validation: " required maxLength:50 ", css: "" })
    isCurrent: string = '';

    @UIProperty({ hub: "AddressLabel", type: "text", label: "Address Label", placeholder: "", validation: " required maxLength:50 ", css: "" })
    addressLabel: string = '';

    // @UIProperty({ hub: "Address", type: "text", label: "Permanent Address", placeholder: "", validation: "maxLength:500" })
    // permanentAddress: string = '';

    // @UIProperty({ hub: "Address", type: "text", label: "Country", placeholder: "", validation: "" })
    // permanentAddressCountry: string = '';
    stageStatusID: string = '';
    id: string = '';
}

@UIClass("Education", { fetch: {} })
export class Education implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: "Education", type: "text", label: "University", placeholder: "", validation: "maxLength:50 required", css: "col s12" })
    university: string = '';

    @UIProperty({ hub: "Education", type: "selectMaterialize", options: "qualification", label: "Qualification", validation: "c.select", multiple: false, css: "col s12" })
    qualificationID: string = '';

    @UIProperty({ hub: "Education", type: "text", label: "Year", placeholder: "", validation: "required c.numbers c.currentYear maxLength:4", css: "col s12" })
    passingYear: string = '';

    @UIProperty({ hub: "Education", type: "text", label: "Grade Class", placeholder: "", validation: "required maxLength:10 ", css: "col s12" })
    grade_Class: string = '';

    @UIProperty({ hub: "Education", type: "text", label: "Specialization", placeholder: "", validation: "required maxLength:100", css: "col s12" })
    specialization: string = '';

    @UIProperty({ hub: "Education", type: "text", label: "Institute", placeholder: "", validation: " maxLength:200", css: "col s12" })
    institute: string = '';

    @UIProperty({
        hub: "Education", type: "selectMaterialize", label: "Qualification Type", options: [{ id: '1', text: 'Full Time' }, { id: '2', text: 'Part Time' }, { id: '3', text: 'Correspondence' }],
        validation: "c.select", css: "col s12"
    })
    qualificationType: string = '';

    //@UIProperty({ hub: "Education", type: "text", label: "Status ID", placeholder: "", validation: "" })
    statusId: string = '';
    stageStatusID: string = '';
    id: string = '';
    //personID: string = '';
}


@UIClass("EmergencyContacts", { fetch: {} })
export class EmergencyContacts implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: "EmergencyContacts", type: "text", label: "Contact Person Name", placeholder: "", validation: "maxLength:20 required", css: "col s12" })
    contactPersonName: string = '';

    @UIProperty({ hub: "EmergencyContacts", type: "selectMaterialize", options: "relation", label: "Relation", validation: "c.select", multiple: false, css: "col s12" })
    relation: string = '';

    @UIProperty({ hub: "EmergencyContacts", type: "text", label: "Emergency Contact No", placeholder: "", validation: " required c.phoneNo maxLength:25", css: "col s12" })
    emergencyContactNo: string = '';

    @UIProperty({ hub: "EmergencyContacts", type: "text", label: "Emergency Email", placeholder: "", validation: 'c.email maxLength:50', css: "col s12" })
    emergencyEmail: string = '';

    @UIProperty({ hub: "EmergencyContacts", type: "textarea", label: "Contact Person Address", cols: "20", rows: "5", placeholder: "", validation: 'required maxLength:500', css: "col s12" })
    contactAddress: string = '';

    id: string = '';
    stageStatusID: string = '';
    //personID: string = '';
}

@UIClass("JoiningDetailsModel", { fetch: {} })
export class JoiningDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    @UIProperty({ hub: "JoiningDetailsModel", type: "text", label: "First Name", placeholder: "", validation: "required maxLength:20", css: "col s6" })
    firstName: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "text", label: "Last Name", placeholder: "", validation: "required maxLength:20", css: "col s6 " })
    lastName: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "text", label: "Email ID", placeholder: "", validation: "c.email", css: "col s12 m-bottom20 " })
    organizationEmail: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "date", label: "Joining Date", validation: "required", min: false, max: true, css: "col s6  " })
    joiningDate: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "date", label: "Confirmation Date", placeholder: "", min: false, max: true, validation: "", css: "col s6  " })
    confirmationDate: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "date", label: "Probation Review Date", placeholder: "", min: false, max: true, validation: "", css: "col s6  " })
    probationReviewDate: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "date", label: "Exit Date", placeholder: "", validation: "", css: "col s6  " })
    exitDate: string = '';

    // @UIProperty({ hub: "JoiningDetailsModel", type: "select", label: "Rejoined (Within a Year)", placeholder: "", options: [{ id: 'false', text: 'No' }, { id: 'true', text: 'Yes' }], validation:"c.select", css: "col s6  " })
    rejoinedWithinYear: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "text", label: "Office Location", placeholder: "", validation: "", css: "col s6 " })
    olText: string = '';

    @UIProperty({ hub: "JoiningDetailsModel", type: "text", label: "Seating Location", placeholder: "", validation: "", css: "col s12  " })
    seatingLocation: string = '';


}


@UIClass("LocationDetailsModel", { fetch: {} })
export class LocationDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "LocationDetailsModel", type: "text", label: "Office Location", validation: "required" })
    officeLocation: string = '';

    @UIProperty({ hub: "LocationDetailsModel", type: "text", label: "Holiday Calender", placeholder: "", validation: "required" })
    holidayCalender: string = '';
}

@UIClass("CompetencyDetailsModel", { fetch: {} })
export class CompetencyDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "CompetencyDetailsModel", type: "text", label: "Reporting To", validation: "required" })
    reportingTo: string = '';

    @UIProperty({ hub: "CompetencyDetailsModel", type: "text", label: "Competency Manager", placeholder: "", validation: "required" })
    competencyManager: string = '';

    @UIProperty({ hub: "CompetencyDetailsModel", type: "text", label: "Competency Manager/Exit Process Manager", placeholder: "", validation: "required" })
    exitProcessManager: string = '';
}

@UIClass("SkillsModel", { fetch: {} })
export class SkillsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "SkillsModel", type: "selectMaterialize", options: "skills", label: "Skill", validation: "c.select", multiple: false, css: "col s12" })
    skillID: string = '';

    // @UIProperty({ hub: "SkillsModel", type: "text",label:"Skill Name", validation: "required" })
    skillName: string = '';

    @UIProperty({ hub: "SkillsModel", type: "text", label: "Skill Rating", placeholder: "", validation: "required c.numbers c.rating maxLength:2", css: "col s12" })
    skillRating: number = 0;

    // @UIProperty({ hub: "SkillsModel", type: "text", label: "Experience Years", placeholder: "", validation: "required c.numbers maxLength:2",css:"" })
    experienceYears: string = '';

    // @UIProperty({ hub: "SkillsModel", type: "text", label: "Experience Months", placeholder: "", validation: "required c.numbers maxLength:2",css:"" })
    experienceMonths: string = '';

    // @UIProperty({ hub: "SkillsModel", type: "text", label: "Has Core Competency", placeholder: "", validation: "maxLength:10",css:"" })
    id: string = '';
    hasCoreCompetency: string = '';
    stageStatusID: string = '';
    //personID: string = '';
}

@UIClass("DependentsModel", { fetch: {} })
export class DependentsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "DependentsModel", type: "text", label: "Dependent Name", validation: "required maxLength:20", css: "col s12" })
    dependentName: string = '';

    @UIProperty({ hub: "DependentsModel", type: "selectMaterialize", options: "relation", label: "Relation With Dependent", validation: "c.select", multiple: false, css: "col s12" })
    relationWithDependent: string = '';

    @UIProperty({ hub: "DependentsModel", type: "date", label: "Date Of Birth Of Dependent", placeholder: "", min: false, max: true, validation: "", css: "col s12" })
    dateOfBirthOfDependent: string = '';

    // @UIProperty({ hub: "DependentsModel", type: "text", label: "Age", placeholder: "", validation: "maxLength:3 c.numbers", css: "" })
    age: string = '';
    stageStatusID: string = '';
    id: string = '';
    //personID: string = '';
}

@UIClass("DeliveryUnitDetailsModel", { fetch: {} })
export class DeliveryUnitDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "DeliveryUnitDetailsModel", type: "text", label: "Organization Unit", validation: "", css: "col s6" })
    orgUnit: string = '';

    @UIProperty({ hub: "DeliveryUnitDetailsModel", type: "select", options: "deliveryUnit", label: "Delivery Unit", validation: "required c.select ", multiple: false, css: "col s6" })
    deliveryUnit: string = '';

    @UIProperty({ hub: "DeliveryUnitDetailsModel", type: "select", options: "deliveryUnit", label: "Current Delivery Unit", placeholder: "", multiple: false, validation: "required c.select ", css: "col s6" })
    currentDU: string = '';

    @UIProperty({ hub: "DeliveryUnitDetailsModel", type: "select", options: "deliveryTeam", label: "Delivery Team", validation: " required c.select ", multiple: false, css: "col s6" })
    deliveryTeam: string = '';

    @UIProperty({ hub: "DeliveryUnitDetailsModel", type: "select", options: "resourcePool", label: "Resource Pool Name", placeholder: "", multiple: false, validation: "required c.select", css: "col s6" })
    resourcePool: string = '';

    @UIProperty({ hub: "DeliveryUnitDetailsModel", type: "select", label: "Reporting To", options: "reportingManager", multiple: false, validation: "required c.select", css: "col s6" })
    reportingTo: string = '';

    @UIProperty({ hub: "DeliveryUnitDetailsModel", type: "select", label: "Exit Process Manager", options: "exitProcessManager", multiple: false, validation: "required c.select", css: "col s6" })
    exitProcessManager: string = '';
    reportingManager: string = '';
    ID: string = '';

}

@UIClass("ProjectDetailsModel", { fetch: {} })
export class ProjectDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Allocation Start Date", validation: "required" })
    allocationStartDate: string = '';

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Allocation End Date", placeholder: "", validation: "required" })
    allocationEndDate: string = '';

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Current Role", placeholder: "", validation: "required" })
    currentRole: string = '';

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Current Project", placeholder: "", validation: "required" })
    currentProject: string = '';

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Current Reporting Manager", placeholder: "", validation: "required" })
    repotingManager: string = '';

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Delivery Unit", placeholder: "", validation: "required" })
    deliveryUnit: string = '';

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Pooll Name", placeholder: "", validation: "required" })
    poolName: string = '';

    @UIProperty({ hub: "ProjectDetailsModel", type: "text", label: "Poll Manager", placeholder: "", validation: "required" })
    poolManager: string = '';
}

@UIClass("DeclarationDetailsModel", { fetch: {} })
export class DeclarationDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "DeclarationDetailsModel", type: "text", label: "Name", validation: "required maxLength:20", css: "col s6" })
    declaredPerson: string = '';

    @UIProperty({ hub: "DeclarationDetailsModel", type: "selectMaterialize", options: "relation", label: "Relation Type", validation: "c.select", multiple: false, css: "col s6" })
    relationType: string = '';

    @UIProperty({ hub: "DeclarationDetailsModel", type: "date", label: "Birth Date", placeholder: "", min: false, max: true, validation: "", css: "col s6" })
    birthDate: string = '';

    @UIProperty({ hub: "DeclarationDetailsModel", type: "text", label: "V2 Employee ID", placeholder: "", validation: "required c.numbers maxLength:5", css: "col s6" })
    v2PersonID: string = '';
    stageStatusID: string = '';
    //personID: string = '';
    id: string = '';

}

@UIClass("PassportDetailsModel", { fetch: {} })
export class PassportDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    @UIProperty({ hub: "PassportDetailsModel", type: "text", label: "Full Name as in Passport", validation: "required maxLength:50", css: "col s6  " })
    nameAsInPassport: string = '';

    @UIProperty({ hub: "PassportDetailsModel", type: "date", label: "Date of Issue", placeholder: "", validation: "required", min: false, max: true, css: "col s6" })
    dateOfIssue: string = '';

    @UIProperty({ hub: "PassportDetailsModel", type: "date", label: "Date of Expiry", placeholder: "", validation: "required", min: true, max: false, css: "col s6" })
    dateOfExpiry: string = '';

    //@UIProperty({ hub: "PassportDetailsModel", type: "text", label: "Son of / Wife of / Daughter of", placeholder: "", validation: "",css:"col s6  " })
    //relation: string = '';

    @UIProperty({ hub: "PassportDetailsModel", type: "text", label: "Place of Issue", placeholder: "", validation: " required maxLength:100", css: "col s6  " })
    placeIssued: string = '';

    blankPagesLeft: number = 0;
    isDeleted: boolean = false;

    @UIProperty({ hub: "PassportDetailsModel", type: "text", label: "Passport Number", placeholder: "", validation: "required maxLength:50", css: "col s6  " })
    passportNumber: string = '';
    id: string = '';
    stageStatusID: string = '';
    //@UIProperty({ hub: "PassportDetailsModel", type: "text", label: "Passport Copy", placeholder: "", validation: "" })
    //PassportCopy: string = '';

    @UIProperty({ hub: "PassportDetailsModel", type: "file", label: "Passport upload", placeholder: "Upload Passport", moduletype: "passport", validation: "", css: "col s12 padding-top-10" })
    passportFileUrl: string = '';

}

@UIClass("CertificationDetailsModel", { fetch: {} })
export class CertificationDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    // @UIProperty({ hub: "CertificationDetailsModel", type: "text",label:"Certification Name", validation: "required" })
    certificationName: string = '';

    @UIProperty({ hub: "CertificationDetailsModel", type: "selectMaterialize", options: "certification", label: "Certification Name", validation: "c.select", multiple: false, css: "col s12" })
    certificationID: string = '';

    @UIProperty({ hub: "CertificationDetailsModel", type: "text", label: "Grade Class", placeholder: "", validation: "required maxLength:5 ", css: "col s12" })
    grade: string = '';

    @UIProperty({ hub: "CertificationDetailsModel", type: "date", label: "Certification Date", placeholder: "", min: false, max: true, validation: "required", css: "col s12" })
    certificationDate: string = '';

    @UIProperty({ hub: "CertificationDetailsModel", type: "text", label: "Certification Number", placeholder: "", validation: "maxLength:20", css: "col s12" })
    certificationNumber: string = '';

    // personID: string = '';
    statusID: string = '';
    stageStatusID: string = '';
    id: string = '';
}

@UIClass("MedicalHistoryModel", { fetch: {} })
export class MedicalHistoryModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    //@UIProperty({ hub: "MedicalHistoryModel", type: "text", label: "Blood Group", validation: "required maxLength:5",css:"col s6  " })
    //bloodGroup: string = '';

    @UIProperty({ hub: "MedicalHistoryModel", type: "text", label: "Year", placeholder: "", validation: "required c.numbers c.currentYear maxLength:4 ", css: "col s6  " })
    year: string = '';

    @UIProperty({ hub: "MedicalHistoryModel", type: "text", label: "Medical Description", placeholder: "", validation: "required maxLength:100", css: "col s12  " })
    description: string = '';
    id: string = '';

}

@UIClass("ExperienceDetailsModel", { fetch: {} })
export class ExperienceDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "ExperienceDetailsModel", type: "text", label: "Organization  Name", placeholder: "", validation: "required maxLength:100", css: "col s12 m-bottom10" })
    organisationName: string = '';

    @UIProperty({ hub: "ExperienceDetailsModel", type: "text", label: "Location", placeholder: "", validation: "required maxLength:50", css: "col s12" })
    location: string = '';

    @UIProperty({ hub: "ExperienceDetailsModel", type: "date", label: "Worked From", placeholder: "", min: false, max: true, validation: "required", css: "col s6" })
    joiningDate: string = '';

    @UIProperty({ hub: "ExperienceDetailsModel", type: "date", label: "Worked Till", placeholder: "", min: false, max: true, validation: "required", css: "col s6" })
    workedTill: string = '';

    @UIProperty({ hub: "ExperienceDetailsModel", type: "text", label: " Designation", placeholder: "", validation: "required maxLength:50", css: "col s12" })
    lastDesignation: string = '';
    stageStatusID: string = '';
    id: string = '';
    //personID: string = '';
}

@UIClass("ContractDetailsModel", { fetch: {} })
export class ContractDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "ContractDetailsModel", type: "text", label: "Position", validation: "required" })
    position: string = '';

    @UIProperty({ hub: "ContractDetailsModel", type: "text", label: "Status", placeholder: "", validation: "required" })
    status: string = '';

    @UIProperty({ hub: "ContractDetailsModel", type: "text", label: "Contract Over Date", placeholder: "", min: true, max: false, validation: "required" })
    validTill: string = '';

    @UIProperty({ hub: "ContractDetailsModel", type: "text", label: "Contract Amount", placeholder: "", validation: "" })
    contractAmount: string = '';
}

@UIClass("VisaDetailsModel", { fetch: {} })
export class VisaDetailsModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "VisaDetailsModel", type: "selectMaterialize", options: "country", label: "Country", validation: "c.select", multiple: false, css: "col s12" })
    countryID: string = '';

    @UIProperty({ hub: "VisaDetailsModel", type: "selectMaterialize", options: "visaType", label: "Visa Type", validation: "c.select", multiple: false, css: "col s12" })
    visaTypeID: string = '';

    @UIProperty({ hub: "VisaDetailsModel", type: "date", label: "Valid Till", placeholder: "", min: true, max: false, validation: "required", css: "col s12" })
    validTill: string = '';

    @UIProperty({ hub: "VisaDetailsModel", type: "file", label: "File upload", placeholder: "Upload Visa", moduletype: "visa", validation: "", css: "col s12" })
    visaFileUrl: string = '';

    visaName: string = '';
    countryName: string = '';
    stageStatusID: string = '';
    id: string = '';
    //personID: string = '';
}

@UIClass("GapExperienceModel", { fetch: {} })
export class GapExperienceModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    @UIProperty({ hub: "GapExperienceModel", type: "text", label: "Reason", validation: "required" })
    reason: string = '';

    @UIProperty({ hub: "GapExperienceModel", type: "text", label: "From Date", placeholder: "", min: false, max: true, validation: "required" })
    fromDate: string = '';

    @UIProperty({ hub: "GapExperienceModel", type: "text", label: "To Date", placeholder: "", min: false, max: true, validation: "required" })
    toDate: string = '';

    @UIProperty({ hub: "GapExperienceModel", type: "text", label: "Gap Duration", placeholder: "", validation: "" })
    gapDuration: string = '';

    @UIProperty({ hub: "GapExperienceModel", type: "text", label: "Description", placeholder: "", validation: "" })
    description: string = '';
}

@UIClass("GrowthModel", { fetch: {} })
export class GrowthModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    @UIProperty({ hub: "GrowthModel", type: "text", label: "Designation", validation: "required" })
    designation: string = '';

    @UIProperty({ hub: "GrowthModel", type: "text", label: "Grade", placeholder: "", validation: "required" })
    grade: string = '';

    @UIProperty({ hub: "GrowthModel", type: "text", label: "Joining Designation", placeholder: "", validation: "required" })
    joiningDesignation: string = '';

    @UIProperty({ hub: "GrowthModel", type: "text", label: "Date", placeholder: "", min: false, max: true, validation: "" })
    date: string = '';
}

@UIClass("ApprovalStatus", { fetch: {} })
export class ApprovalStatus implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    @UIProperty({
        hub: "ApprovalStatus", type: "selectMaterialize", options: [{ id: '1', text: 'Approved' }, { id: '2', text: 'Rejected' }, { id: '3', text: 'On Hold' }], label: "Action",
        validation: "c.select required", multiple: false, css: 'custom-input-field col s12 m5'
    })
    status: number = 1;

    @UIProperty({ hub: "ApprovalStatus", type: "text", label: "Comments", placeholder: "", validation: "required maxLength:100", css: 'custom-input-field input-field col s12' })
    comment: string = '';
}