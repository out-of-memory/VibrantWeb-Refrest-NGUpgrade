import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../services';

@Component({
  selector: 'app-maintainence',
  templateUrl: './maintainence.component.html',
  styleUrls: ['./maintainence.component.css']
})
export class MaintainenceComponent implements OnInit {
  isUs: boolean = false;
   
   constructor(private _cacheService: CacheService) {
    var data = this._cacheService.getParams("profile");
    if (data["ol"] == 2) {
      this.isUs = true;
    }
  }

  ngOnInit() {

  }
}
