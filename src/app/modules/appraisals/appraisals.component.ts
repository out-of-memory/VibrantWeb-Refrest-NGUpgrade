import { Component, OnInit, Input} from '@angular/core';
import {ControlMeta} from '../../infrastructure/models/ControlMeta';
import {pageHeading} from '../../infrastructure/components/pageHeading';

import {UiForm} from '../../infrastructure/components/UiForm';
import {Card} from '../../infrastructure/components/Card';
import {MenuService} from '../../servicesFolder/menu/MenuService';
import {HttpService} from '../../servicesFolder/http/http.service';
import { CacheService} from '../../servicesFolder/CacheService';

import { ActivatedRoute } from '@angular/router';
import {MaterializeDirective} from "angular2-materialize";
import {HttpSettings} from "../../servicesFolder/http/http.settings"

@Component({
  selector: 'app-appraisals',
  templateUrl: './appraisals.component.html',
  styleUrls: ['./appraisals.component.css']
})
export class AppraisalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
