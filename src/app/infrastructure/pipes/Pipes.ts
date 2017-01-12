import { Pipe, PipeTransform } from '@angular/core';
import { CacheService } from '../../services';

@Pipe({
    name: 'option'
})
export class OptionTextPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        if (!args || args.length == 0) throw new Error('OptionTextPipe is to show text value of dropdown, please provide option list in following formety [{id:val, text:text}]');
        let data = args;
        let found = "";
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id.toString().toLowerCase() == value.toString().toLowerCase()) {
                    found = data[i].text;
                    break;
                }
            }
        }
        if (found == "" && value == 0) {
            return found;
        }
        else {
            return found == "" ? value : found;
        }
    }
}

@Pipe({
    name: 'rating'
})
export class RatingPipe implements PipeTransform {
    transform(value: number, args: any[]): any {

        let html = "";
        if (value) {
            value = Math.floor(value);
            var ratings = ['None', 'Novice', 'Learning', 'Intermediate', 'Expert', 'Advance']
            html = `<div class="prof-level">${ratings[value]}</div><div title=${ratings[value]}>`;
            for (var i = 0; i < value; i++)
                html += '<i class="fa fa-star active-star" aria-hidden="true"></i>';
            html += '</div>';
        }
        return html;
    }
}

@Pipe({
    name: 'alphabet'
})
export class AlphabetPipe implements PipeTransform {
    transform(value: any, args: any[]): any {
        let newValue = "";
        if (value) {
            value = value.replace(/\s/g, '');
            newValue = value.replace(/[^\w\s]/gi, '');
            newValue = newValue.replace(/[0-9]/g, '');
        }
        return newValue;
    }
}

@Pipe({
    name: 'module'
})
export class ModulePipe implements PipeTransform {
    transform(value: number, args: any): any {
        let capModules: Array<string> = ["Leave", "Profile", "Expense", "Compensatory Off", "HelpDesk","Travel","Appraisals"];
        let smallModules: Array<string> = ["leave", "profile", "expense", "compoff", "helpdesk","travel","appraisals"];
        let shortModules: Array<string> = ["L", "P", "E", "CO", "HD", "T", "A"];
        if (args == "cap") {
            return capModules[value - 1];
        }
        else if (args == "small") {
            return smallModules[value - 1];
        }
        else {
            return shortModules[value - 1];
        }
    }
}


@Pipe({ name: 'location' })
export class LocationPipe implements PipeTransform {
    transform(value: Number, args: any): any {
        if (value == 0) {
            return args = "Mumbai, India";
        }
        else if (value == 1) {
            return args = "Banglore, India";
        }
        else if (value == 2) {
            return args = "Santa Clara, USA"
        }
    }
}


@Pipe({ name: 'restrict' })
export class RestrictPipe implements PipeTransform {
    transform(value: any, args: any): any {
        return value;
    }
}


// 1	Indian Rupees - INR
// 2	Dollar
// 3	GBP

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = "inr";
        }
        else if (value == 2) {
            return args = "usd";
        }
        else if (value == 3) {
            return args = "gbp"
        }
    }
}

@Pipe({ name: 'approvalstatus' })
export class ApprovalStatus implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = "fa fa-check status-approved";
        }
        else if (value == 2) {
            return args = "fa fa-times status-rejected";
        }
        else if (value == 3) {
            return args = "fa fa-pause status-pending"
        }
        else if (value == 4) {
            return args = "fa fa-ban status-cancelled"
        }
        else if (value == 0) {
            return args = "fa fa-clock-o status-pending"
        }
    }
}


@Pipe({ name: 'approvalstatusTitle' })
export class ApprovalStatusTitle implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = "Approved";
        }
        else if (value == 2) {
            return args = "Rejected";
        }
        else if (value == 3) {
            return args = "On-Hold"
        }
        else if (value == 4) {
            return args = "Canceled"
        }
        else if (value == 0) {
            return args = "Pending"
        }
    }
}
@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
    transform(value: any): any {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }
}

@Pipe({ name: 'filename' })
export class FileNamePipe implements PipeTransform {
    transform(value: any, args: any): any {
        let stringArray = value.split('/');
        return stringArray[stringArray.length - 1];
    }
}

@Pipe({ name: 'ticketstatus' })
export class TicketStatusPipe implements PipeTransform {
    transform(value: number, args: any): any {
        let capModules: Array<string> = ["Pending For Approval", "Open", "Rejected", "In Progress", "On Hold", "Resolved", "Cancelled"];
        return capModules[value - 1];
    }
}

@Pipe({ name: 'fileExt' })
export class FileExtension implements PipeTransform {
    transform(value: string, args: any): any {
        if (value != undefined) {
            let ext = value.substr(value.lastIndexOf('.') + 1).toLocaleLowerCase();
            if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif') {
                return args = true;
            }
            else { return args = false; }
        }
    }
}


@Pipe({ name: 'currencyName' })
export class CurrencyNamePipe implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = "Indian Rupees - INR";
        }
        else if (value == 2) {
            return args = "Dollar";
        }
        else if (value == 3) {
            return args = "GBP";
        }
    }
}

@Pipe({ name: 'comma' })
export class CurrencyCommaPipe implements PipeTransform {
    transform(value: any, args: any): any {
        var parts = value.toString().split(".");
        return args = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
    }
}

@Pipe({ name: 'relation' })
export class RelationPipe implements PipeTransform {
    constructor(private _cacheService: CacheService) {
    }
    transform(value: any, args: any): any {
        let relation = this._cacheService.getParams('dropdowns')['relation'];
        return args = relation.find(x => x.id == value).text;
    }
}
@Pipe({ name: 'exitprocessmanager' })
export class ExitProcessManager implements PipeTransform {
    constructor(private _cacheService: CacheService) {
    }
    transform(value: any, args: any): any {
        let relation = this._cacheService.getParams('dropdowns')['exitProcessManager'];
        return args = relation.find(x => x.id == value).text;
    }
}
@Pipe({ name: 'visaType' })
export class VisaType implements PipeTransform {
    constructor(private _cacheService: CacheService) {
    }
    transform(value: any, args: any): any {
        let relation = this._cacheService.getParams('dropdowns')['visaType'];
        return args = relation.find(x => x.id == value).text;
    }
}
@Pipe({ name: 'countryName' })
export class CountryName implements PipeTransform {
    constructor(private _cacheService: CacheService) {
    }
    transform(value: any, args: any): any {
        let relation = this._cacheService.getParams('dropdowns')['country'];
        return args = relation.find(x => x.id == value).text;
    }
}
@Pipe({ name: 'travelType' })
export class TravelType implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = 'Domestic';
        }
        if (value == 2) {
            return args = 'International';
        }
    }
}
@Pipe({ name: 'tripType' })
export class TripType implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = 'One Way Trip';
        }
        if (value == 2) {
            return args = 'Round Trip';
        }
    }
}
@Pipe({ name: 'flightClass' })
export class FlightClass implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = 'Economy';
        }
        if (value == 2) {
            return args = 'First Class';
        }
        if (value == 3) {
            return args = 'Business Class';
        }
    }
}
@Pipe({ name: 'bookingFrom' })
export class BookingFrom implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = 'WorldSpin Holidays';
        }
        if (value == 2) {
            return args = 'Option 1';
        }
        if (value == 3) {
            return args = 'Option 1';
        }
    }
}
@Pipe({ name: 'airline' })
export class Airlines implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = 'Emirates';
        }
        if (value == 2) {
            return args = 'Airline 1';
        }
        if (value == 3) {
            return args = 'Airline 2';
        }
    }
}
// Room Type
@Pipe({ name: 'roomType' })
export class RoomType implements PipeTransform {
    transform(value: any, args: any): any {
        if (value == 1) {
            return args = 'Normal';
        }
        if (value == 2) {
            return args = 'Luxury';
        }
    }
}