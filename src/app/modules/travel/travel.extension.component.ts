import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../servicesFolder/http/http.service';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import * as Materialize from "angular2-materialize";
import { TravelExtension } from '../../model/TravelDataModel';

@Component({
    selector: 'travel-extension',
    templateUrl: './travel.extension.template.html',
    styles: [
        `
        .ng-valid[required], .ng-valid.required  {
  border-bottom: 1px solid #42A948; /* green */
}
.ng-invalid:not(form)  {
  border-bottom: 1px solid #a94442; /* red */
}
`
    ]
})
export class TravelExtensionComponent implements OnInit {

    extensionItem: TravelExtension = new TravelExtension();

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;

    constructor(private _httpService: HttpService) { }

    ngOnInit() { }

    SubmitTravelExtension(event, form) {
        event.preventDefault();

        if (!form.valid)
            return false;

        console.log(form);

        // let url = HttpSettings.apiBaseUrl + 'v1/travel/add-travel-extension';

        // this._httpService.post(url, this.extensionItem).subscribe(
        //     data => {
        //         if (data == true) {
        //             // var traveldata = this.travelsModel.find(x => Number(x.id) == this.extensionItem.travelId);
        //             // traveldata.arrival = this.extensionItem.arrival;
        //             // traveldata.travelExtensionImageUrl = "assets/images/trip-extension-red.svg";

        //             // this.travelsModel = JSON.parse(JSON.stringify(this.travelsModel));

        //             Materialize.toast('Travel Extension Saved Successfully', 3000, 'successTost');
        //             // this.isTravelExtension = false;
        //         }

        //     });
    }
}