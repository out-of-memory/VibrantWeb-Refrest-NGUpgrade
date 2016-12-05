import { UIProperty, UIClass } from '../infrastructure/decorators/UIMeta';
import { IUIMetadata } from '../infrastructure/models/IUIMetadata';

@UIClass('NewExpenseModel', { fetch: {} })
export class NewExpenseModel implements IUIMetadata {
    hub: Array<any> = [];
    details: Array<ExpenseDetails> = [];
    constructuor() {
        this.hub = new Array<any>();
        this.details = new Array<ExpenseDetails>();
    }

    @UIProperty({ hub: 'NewExpenseModel', css: "col s12 m3", type: 'textmaxlength', label: 'Reimbursement Title', 'labelPosition': 'top', placeholder: '', validation: 'required', maxlength: '50' })
    reimbursmenttitle: string = '';

    @UIProperty({ hub: 'NewExpenseModel', css: "col s12 m3 custom-select-border", type: 'selectMaterialize', 'labelPosition': 'top', label: 'Client-Reimbursement', multiple: false, options: [{ 'id': '1', text: 'Yes' }, { 'id': '2', text: 'No' }], placeholder: 'Client-Reimbursement', validation: 'required' })
    isClientReimbursment: string = '';

    isDraft: boolean = false;

    expenseId: number = 0;

    @UIProperty({ hub: 'NewExpenseModel', css: "col s12 m3 custom-select-border", type: 'selectMaterialize', label: 'Client Name', 'labelPosition': 'top', multiple: false, options: 'clientName', placeholder: 'Client Name', validation: 'required' })
    clientId: string = '';

    //  @UIProperty({ hub: 'NewExpenseModel', css: "col m2", type: 'selectMaterialize', label: 'Currency', 'labelPosition': 'top', multiple: false, options: [{ 'id': '1', text: 'Rupees' }, { 'id': '2', text: 'Dollar' }], placeholder: 'Currency', validation: 'required' })
    @UIProperty({ hub: 'NewExpenseModel', css: "col s12 m2 custom-select-border", type: 'selectMaterialize', label: 'Currency', 'labelPosition': 'top', multiple: false, options: "currency", validation: 'required' })
    currencyId: string = '';

    @UIProperty({ hub: 'NewExpenseModel', css: "col s12 m3 custom-select-border", type: 'selectMaterialize', label: 'Cost Center', 'labelPosition': 'top', multiple: false, options: 'costCenter', placeholder: '', validation: 'required' })
    costCenterId: string = '';

    @UIProperty({
        hub: 'NewExpenseModel', css: "col s12 m3 custom-select-border", type: 'selectMaterialize', label: 'Approver', 'labelPosition': 'top', multiple: false, options: 'primaryApprover', placeholder: 'Primary Approver',
        validation: 'required'
    })
    primaryApproverId: string = '';

    // @UIProperty({ hub: 'NewExpenseModel', css: "col m3", type: 'view', label: 'Secondary Approver', 'labelPosition': 'top', multiple: false, options: 'secondaryApprover', placeholder: 'Primary Approver', validation: 'required' })
    // secondaryApproverId: string = '';

    isRejected: boolean = false;

    amountReimbursed: string = '';

    advance: string = '';

    totalExpenses: string = '';

    // @UIProperty({ hub: 'NewExpenseModel', css: "col m3", type: 'text', label: 'Form Code', 'labelPosition': 'top', placeholder: 'Form Code', validation: '', display: 'false' })
    // formCode: string = '';

    // @UIProperty({ hub: 'NewExpenseModel', css: "col m3", type: 'text', label: 'Cheque Details', 'labelPosition': 'top', placeholder: 'Cheque Details', validation: '', display: 'false' })
    // chequeDetails: string = '';

    stageId: string = '';

    // @UIProperty({ hub: 'NewExpenseModel', css: "radio-btn-holder", type: 'radio', label: 'Secondary Approver', 'labelPosition': 'top', options: [{ 'id': '1', 'name': 'Yes', text: 'Chetan Jain' }, { 'id': '2', 'name': 'Yes', text: 'Swati Thakkar' }], placeholder: '', validation: '' })
    // testRadio: string = '';
}


@UIClass('ExpenseDetails', { fetch: {} })
export class ExpenseDetails implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }

    @UIProperty({ hub: 'ExpenseDetails', type: 'textmaxlength', label: '', placeholder: 'Receipt No.', validation: 'required', maxlength: '50' })
    receiptNo: string = '';

    @UIProperty({ hub: 'ExpenseDetails', type: 'date', label: '', placeholder: 'Expense Date', validation: 'required' })
    expenseDate: string = '';

    @UIProperty({ hub: 'ExpenseDetails', css: "custom-select-border", type: 'selectMaterialize-custom', label: '', 'labelPosition': 'top', multiple: false, options: 'expenseCategory', placeholder: '', validation: 'required', defaultselect: 'Select Expense Category' })
    expenseCategoryId: string = ''

    @UIProperty({ hub: 'ExpenseDetails', type: 'textmaxlength', label: '', placeholder: 'Amount', validation: 'required', maxlength: '5', min: '1', max: '99999' })
    amount: string = '';

    @UIProperty({ hub: 'ExpenseDetails', type: 'textmaxlength', label: '', placeholder: 'Comments', validation: 'required', maxlength: '50' })
    comments: string = '';

    @UIProperty({ hub: 'ExpenseDetails', type: 'text', label: '', placeholder: 'Upload Receipts', validation: 'required' })
    attachedFile: string = '';

    expenseDetailId: number = 0;

    isDetailsValid: boolean = true;

    fileExtension: string = '';

    eyeDisplay: boolean = false;
}

@UIClass('SubmittedExpense', { fetch: {} })
export class SubmittedExpense implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
        this.details = new Array<ExpenseDetails>();
    }

    @UIProperty({ hub: 'SubmittedExpense', type: 'text', label: 'Finance Form Code', placeholder: '', validation: '' })
    financeFormCode: string = '';

    @UIProperty({ hub: 'SubmittedExpense', type: 'text', label: 'Reimbursement Title', placeholder: '', validation: '' })
    reimbursementTitle: string = '';

    @UIProperty({ hub: 'SubmittedExpense', type: 'text', label: 'Amount', placeholder: '', validation: '' })
    amount: string = '';

    @UIProperty({ hub: 'SubmittedExpense', type: 'text', label: 'Status', placeholder: '', validation: '' })
    status: string = '';

    expenseId: number = 0;

    details: Array<ExpenseDetails> = [];

    isDraft: boolean = false;

    isRejected: string = '';

    employeeName: string = '';

    totalStages: string = '';

    onStage: string = '';

    onStageStatus: number = 0;

    designation: string = '';

    email: string = '';

    mobile: string = '';

    imagePath: string = '';

    address: string = '';

    employeeId: string = '';

    formCode: string = '';

    chequeDetails: string = '';

    comments: string = '';

    isComment: boolean = false;

    submitStatus: string = "0";

    isFormCode: boolean = false;

    totalExpenses: string = '';

    amountReimbursed: string = '';

    advance: string = '';

    clientName: string = '';

    isClientReimbursment: string = '';

    currencyId: string = '';

    lastcomments: string = '';

    currentStatus: number = 0;

    isSelectValid: boolean = false;

    fullname: string = '';

    requestDate: string = '';

    createdBy: Number = 0;

    currencyName: string = '';

    costCenter: string = '';

    approverFullName: string = '';

    officeLocation: string = '';
}


@UIClass("ExpenseApprovalStatus", { fetch: {} })
export class ExpenseApprovalStatus implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }
    @UIProperty({
        hub: "ExpenseApprovalStatus", type: "selectMaterialize", options: [{ id: '1', text: 'Approved' }, { id: '2', text: 'Rejected' }], label: "Action",
        validation: "", multiple: false, css: ''
    })
    status: number = 0;

    @UIProperty({ hub: "ExpenseApprovalStatus", type: "text", label: "", placeholder: "Comments", validation: "required maxLength:100", css: '' })
    comment: string = '';

    @UIProperty({ hub: "ExpenseApprovalStatus", type: "text", label: "", placeholder: "Form Code", validation: "required maxLength:50", css: '' })
    formCode: string = '';

    @UIProperty({ hub: "ExpenseApprovalStatus", type: "text", label: "", placeholder: "Cheque Details", validation: "maxLength:50", css: '' })
    chequeDetails: string = '';
}