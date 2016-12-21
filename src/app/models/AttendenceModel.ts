import { UIProperty, UIClass } from "../infrastructure/Decorators/UIMeta"
import { IUIMetadata } from "../infrastructure/models/IUIMetadata"

@UIClass("AttendenceModel", { fetch: {} })
export class AttendenceModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "AttendenceModel", type: "date", label: "Date", placeholder: "", validation: "required", css: "col s6  " })
    date: string = '';

    @UIProperty({ hub: "AttendenceModel", type: "text", label: "Time In", placeholder: "", validation: "required", css: "col s6  " })
    signInTime: string = '';

    @UIProperty({ hub: "AttendenceModel", type: "text", label: "Time Out", placeholder: "", validation: "required", css: "col s6  " })
    signOutTime: string = '';

    @UIProperty({ hub: "AttendenceModel", type: "text", label: "Total Hours", placeholder: "", validation: "required", css: "col s6  " })
    totalHoursWorked: number = 0;

    @UIProperty({ hub: "AttendenceModel", type: "text", label: "Narration", placeholder: "", validation: "required", css: "col s6  " })
    narration: string = '';

    isManual: string = '';
    id: any = '';
}

@UIClass("SISOModel", { fetch: {} })
export class SISOModel implements IUIMetadata {
    hub: Array<any> = [];
    constructuor() {
        this.hub = new Array<any>();
    }
    test(n: number) { }

    @UIProperty({ hub: "SISOModel", type: "date", label: "Date", placeholder: "", validation: "required", css: "col s6" })
    date: string = '';

    @UIProperty({ hub: "SISOModel", type: "selectMaterialize", options: [{ "id": 1, "text": "Sign In", "selected": true }, { "id": 2, "text": "Sign Out", "selected": false }], label: "IsSignInOut", placeholder: "", validation: "required", multiple: false, css: "col s6" })
    IsSignInOut: string = '1';

    IsSignIn: boolean = false;
    IsSignOut: boolean = false;
    Time: string = '';

    @UIProperty({
        hub: "SISOModel", type: "selectMaterialize", options: [{ "id": "00", "text": "00", "selected": true },
        { "id": "01", "text": "01" },
        { "id": "02", "text": "02" },
        { "id": "03", "text": "03" },
        { "id": "04", "text": "04" },
        { "id": "05", "text": "05" },
        { "id": "06", "text": "06" },
        { "id": "07", "text": "07" },
        { "id": "08", "text": "08" },
        { "id": "09", "text": "09" },
        { "id": "10", "text": "10" },
        { "id": "11", "text": "11" },
        { "id": "12", "text": "12" },
        { "id": "13", "text": "13" },
        { "id": "14", "text": "14" },
        { "id": "15", "text": "15" },
        { "id": "16", "text": "16" },
        { "id": "17", "text": "17" },
        { "id": "18", "text": "18" },
        { "id": "19", "text": "19" },
        { "id": "20", "text": "20" },
        { "id": "21", "text": "21" },
        { "id": "22", "text": "22" },
        { "id": "23", "text": "23" }], label: "Hours", validation: "required", multiple: false, css: "col s3"
    })
    TimetHr: string = '09';

    @UIProperty({
        hub: "SISOModel", type: "selectMaterialize", options: [{ "id": "00", "text": "00", "selected": true },
        { "id": "01", "text": "01" },
        { "id": "02", "text": "02" },
        { "id": "03", "text": "03" },
        { "id": "04", "text": "04" },
        { "id": "05", "text": "05" },
        { "id": "06", "text": "06" },
        { "id": "07", "text": "07" },
        { "id": "08", "text": "08" },
        { "id": "09", "text": "09" },
        { "id": "10", "text": "10" },
        { "id": "11", "text": "11" },
        { "id": "12", "text": "12" },
        { "id": "13", "text": "13" },
        { "id": "14", "text": "14" },
        { "id": "15", "text": "15" },
        { "id": "16", "text": "16" },
        { "id": "17", "text": "17" },
        { "id": "18", "text": "18" },
        { "id": "19", "text": "19" },
        { "id": "20", "text": "20" },
        { "id": "21", "text": "21" },
        { "id": "22", "text": "22" },
        { "id": "23", "text": "23" },
        { "id": "24", "text": "24" },
        { "id": "25", "text": "25" },
        { "id": "26", "text": "26" },
        { "id": "27", "text": "27" },
        { "id": "28", "text": "28" },
        { "id": "29", "text": "29" },
        { "id": "30", "text": "30" },
        { "id": "31", "text": "31" },
        { "id": "32", "text": "32" },
        { "id": "33", "text": "33" },
        { "id": "34", "text": "34" },
        { "id": "35", "text": "35" },
        { "id": "36", "text": "36" },
        { "id": "37", "text": "37" },
        { "id": "38", "text": "38" },
        { "id": "39", "text": "39" },
        { "id": "40", "text": "40" },
        { "id": "41", "text": "41" },
        { "id": "42", "text": "42" },
        { "id": "43", "text": "43" },
        { "id": "44", "text": "44" },
        { "id": "45", "text": "45" },
        { "id": "46", "text": "46" },
        { "id": "47", "text": "47" },
        { "id": "48", "text": "48" },
        { "id": "49", "text": "49" },
        { "id": "50", "text": "50" },
        { "id": "51", "text": "51" },
        { "id": "52", "text": "52" },
        { "id": "53", "text": "53" },
        { "id": "54", "text": "54" },
        { "id": "55", "text": "55" },
        { "id": "56", "text": "56" },
        { "id": "57", "text": "57" },
        { "id": "58", "text": "58" },
        { "id": "59", "text": "59" }], label: "Minutes", validation: "required", multiple: false, css: "col s3"
    })
    TimetMin: string = '30';

    @UIProperty({ hub: "SISOModel", type: "text", label: "Narration", placeholder: "", validation: "required maxLength:120", css: "col s12" })
    Narration: string = '';

    IsManual: string = '';
    Id: any = '';
    TimeZoneName: string = '';
}