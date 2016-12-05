export class PersonalDetails {
    dateOfBirth: string = '';
    gender: string = '';
    maritalStatus: string = '';
    weddingDate: string = '';
    spouseName: string = '';
    spouseBirthDate: string = '';
    noofChildren: string = '';
    FirststChildName: string = '';
    FirstChildBirthDate: string = '';
    hobbies: string = '';
}

export class PersonalAddress {
    currentAddress: string = '';
    currentAddressCountry: string = '';
   // permanentAddress: string = '';
  //  permanentAddressCountry: string = '';
    isCurrent:string='';
    personalEmail: string = '';
    residenceNumber: string = '';
    mobile: string = '';
}

export class EducationDetails {
    university: string = '';
    qualification: string = '';
    specialization: string = '';
    passingYear: string = '';
    institute: string = '';
    qualificationType: string = '';
    grade_Class: string = '';
    statusId: string = '';
}

export class EmergencyContactsDetails {
    contactPersonName: string = '';
    relation: string = '';
    emergencyContactNo: string = '';
    emergencyEmail: string = '';
}

export class JoiningDetails {
    userName: string = '';
    joiningDate: string = '';
    confirmationDate: string = '';
    probationReviewDate: string = '';
    exitDate: string = '';
    rejoinedWithinYear: string = '';
}

export class LocationDetails {
    officeLocation: string = '';
    holidayCalender: string = '';
}

export class DeliveryUnitDetails {
    orgUnit: string = '';
    parentDeliveryUnit: string = '';
    currentDeliveryUnit: string = '';
    deliveryTeam: string = '';
    resourcePoll: string = '';
}


export class CompetencyDetails {
    reportingTo: string = '';
    competencyManager: string = '';
    exitProcessManager: string = '';
}

export class ProjectDetails {
    allocationStartDate: string = '';
    allocationEndDate: string = '';
    currentRole: string = '';
    currentProject: string = '';
    repotingManager: string = '';
    deliveryUnit: string = '';
    poolName: string = '';
    poolManager: string = '';
}

export class SkillsDetails {
    skillID: string = '';
    skillRating: string = '';
    experienceYears: string = '';
    experienceMonths: string = '';
    hasCoreCompetency: string = '';
}

export class DependentDetails {
    dependentName: string = '';
    relationWithDependent: string = '';
    dateOfBirthOfDependent: string = '';
    age: string = '';
}

export class DeclarationDetails {
    name: string = '';
    relation: string = '';
    employeeStatus: string = '';
    employeeCode: string = ''; 
}


export class CertificationDetails {
    certificationName: string = '';
    certificationID: string = '';
    certificationDate: string = '';
    grade: string = '';
    personID: string = '';
    statusID: string = '';
    id: string = '';
}

export class MedicalHistory {
    bloodGroup: string = '';
    year: string = '';
    medicalDescription: string = '';
}

export class ExperienceDetails {
    id: string = '';
    organisationName: string = '';
    location: string = '';
    joiningDate: string = '';
    workedTill: string = '';
    lastDesignation: string = '';
    personID: string = '';
}

export class VisaDetails {
    country: string = '';
    visaType: string = '';
    validTill: string = '';
}

export class PassportDetails {
    nameAsInPassport: string = '';
    passport: string = '';
    dateOfIssue: string = '';
    dateOfExpiry: string = '';
   // relation: string = '';
    placeIssued: string = '';
    //PassportCopy: string = '';
}

export class ContractDetails {
    position: string = '';
    status: string = '';
    validTill: string = '';
	contractAmount: string = '';
}
export class GapExperienceDetails {
    reason: string = '';
    fromDate: string = '';
    toDate: string = '';
	gapDuration: string = '';
	description: string = '';
}
export class GrowthDetails {
    designation: string = '';
    grade: string = '';
    date: string = '';
	joiningDesignation: string = '';
}