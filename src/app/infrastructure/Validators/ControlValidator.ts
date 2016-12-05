import {AbstractControl} from '@angular/forms';
export class ControlValidator {

    static requiredCheckbox(c: AbstractControl): { [id: string]: boolean } {
        if (!c.value)
            return { "Chect Box is required": true }
        return null;
    }
    static email(c: AbstractControl): any {
        // let EMAIL_REGEXP = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm; 
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEXP.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        }
    }
    static select(c: AbstractControl): any {
        if (c.value == 0) {
            return {
                validateSelect: {
                    valid: false
                }
            }
        }
    }
    static numbers(c: AbstractControl): any {
        let NUMB_REGEXP = /^\d+$/;
        if (c.value != "") {
            if (!NUMB_REGEXP.test(c.value)) {
                return {
                    validateNumber: {
                        valid: false
                    }
                }
            }
        }

    }
    static grade(c: AbstractControl): any {
        let GRD_REGEXP = /^[+]?([A-Z0-9]+(?:[\.][A-Z0-9]*)?|\.[A-Z0-9]+)$/;
        if (!GRD_REGEXP.test(c.value)) {
            return {
                validateGrade: {
                    valid: false
                }
            }
        }
    }
    static rating(c: AbstractControl): any {
        let NUMB_REGEXP = /^([1-9]|10)$/;
        if (!NUMB_REGEXP.test(c.value)) {
            return {
                validateRating: {
                    valid: false
                }
            }
        }
    }
    static phoneNo(c: AbstractControl): any {
        let PHN_REGEXP = /(?:\(?\+\d{2}\)?\s*)?\d+(?:[ -]*\d+)*$/;
        if (!PHN_REGEXP.test(c.value)) {
            return {
                validatePhoneNo: {
                    valid: false
                }
            }
        }
    }
    static currentYear(c: AbstractControl): any {
        var _thisYear = new Date().getFullYear();;
        if (parseInt(c.value) > _thisYear || parseInt(c.value) < 1900)
            return {
                validateYear: {
                    valid: false
                }
            }
    }
    static empCodeForReport(c: AbstractControl): any {
        let CODE_REGEXP = /^(?:All)$/;
        let NUMB_REGEXP = /^\d+$/;
        if (!CODE_REGEXP.test(c.value) && !NUMB_REGEXP.test(c.value)) {
            return {
                validateEmpCodeForReport: {
                    valid: false
                }
            }
        }
    }
    static CheckEmptystring(c: AbstractControl): any {
        let CODE_REGEXP = /[^\s]/;
        if (!CODE_REGEXP.test(c.value)) {
            return {
                validateEmptyString: {
                    valid: false
                }
            }
        }
    }
}