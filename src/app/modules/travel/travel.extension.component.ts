import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../servicesFolder/http/http.service';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import * as Materialize from "angular2-materialize";
import { TravelExtension, TravelRequirements } from '../../model/TravelDataModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoMapperService } from '../../servicesFolder/AutoMapperService'

@Component({
    selector: 'travel-extension',
    templateUrl: './travel.extension.template.html',
    styles: [
        `
        
        `
    ]
})
export class TravelExtensionComponent implements OnInit {

    extensionItem: TravelExtension = new TravelExtension();
    traveldetails: TravelRequirements = new TravelRequirements();
    extensionHub: any;

    loaderModal: boolean = false;
    loaderModalMsg: boolean = false;
    loaderModalText: any;
    isConformationModal: boolean = false;
    isSubmit: boolean = false;
    dateFormat: any;
    formSubmit = false;


    travelId: any;

    constructor(private _httpService: HttpService, private activatedRoute: ActivatedRoute, private _router: Router, private _autoMapperService: AutoMapperService) {

        this.extensionItem = new TravelExtension();
        this.extensionHub = this.extensionItem['hub'];
        this.extensionItem.departure = "1/23/2017";

        let date = new Date();
        this.dateFormat = [{ "format": "mm/dd/yyyy", "today": "", "selectYears": 30 }];
    }

    ngOnInit() {

        this.activatedRoute.params.subscribe(
            (param: any) => {
                this.travelId = Number(param['id']);
            });

        if (this.travelId <= 0)
            this._router.navigate(['my/dashboard']);

        let url = HttpSettings.apiBaseUrl + 'v1/travel/travel-details/' + this.travelId;


        this._httpService.get(url).subscribe(
            data => {
                this._autoMapperService.Map(data, this.traveldetails);
            });
    }

    SubmitTravelExtension(event, form) {
        event.preventDefault();

        if (!form.valid) {
            this.formSubmit = true;
            return false;
        }

        let url = HttpSettings.apiBaseUrl + 'v1/travel/add-travel-extension';
        this.extensionItem.travelId = this.travelId;
        this.extensionItem.departure = this.traveldetails.departure;

        this._httpService.post(url, this.extensionItem).subscribe(
            data => {
                if (data == true) {
                    Materialize.toast('Travel Extension Saved Successfully', 3000, 'successTost');
                    window.location.href = "/#/my/travel/history";
                }
            });
    }
}