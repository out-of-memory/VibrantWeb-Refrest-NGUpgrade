import {UIProperty, UIClass} from "../infrastructure/Decorators/UIMeta"
import {IUIMetadata} from "../infrastructure/models/IUIMetadata"

@UIClass("AppraisalQuestionModel", { fetch: {} })

export class AppraisalQuestionModel {
    question: string = "";
    ID: number = 0;
    answer: string = "";
}

export class AppraisalParameterModel{
     ID : number = 0;
     parameter : string = "";
     score : number = 0;
}

export class AppraiseeFormModel {
    ID : number = 0;
    answer: string = "";
}

export class AppraisalListModel{
    reviewer : string = "";
    appraiser : string = "";
    grade:number= 0;
    status : number = 0;
    email: string = '';
    mobile: string = '';
    imagePath: string = '';
    address: string = '';
    employeeId: string = '';
    employeeName: string = '';
    designation: string = '';
    assignedTo:string = '';
    appraiserScore: number = 0;
    reviewerScore : number = 0;
}

export class AppraisalReviewerModel{
    AppraiseeId :number =0;
    Parameters : Array<any>;
    Comments : string = '';
}

export class AppraiseeDetails{
    ID:number =0
    appraiseeName : string ="";
    reviewerName : string = "";
    appraiserName : string = "";
}