import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpService } from '../../servicesFolder/http/http.service';
import { HttpSettings } from '../../servicesFolder/http/http.settings';
import { Router } from '@angular/router';
import { CacheService } from '../../servicesFolder/CacheService'

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  MenuData: any;

  constructor(private router: Router, private _httpService: HttpService, private _cacheService: CacheService) {
    this.MenuData = [{ "routerName": "new", "routerPara": "", "title": "New Request" }, { "routerName": "history", "routerPara": "", "title": "Travel History" }];

    this.getDropdowns();
    
    var url = HttpSettings.apiBaseUrl + 'v1/travel/isApprovalAdmin';
    this._httpService.get(url).subscribe(
      data => {
        if (data == true) {
          this.MenuData.push({ "routerName": "newapproval", "routerPara": "", "title": "Travel Approvals" },
            { "routerName": "approvalhistory", "routerPara": "", "title": "Travel Approval History" });
        }
      });


  }

  ngOnInit() {
  }

  getDropdowns() {
    var url = HttpSettings.apiBaseUrl + 'v1/travel/dropdowns';
    this._httpService.get(url).subscribe(
      data => {
        this._cacheService.setParams('travelDropdowns', data);
      });
  }

}
