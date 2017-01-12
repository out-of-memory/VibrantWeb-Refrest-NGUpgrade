import {Injectable,Inject} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpService} from './../http/http.service';
import {HttpSettings} from './../http/http.settings';


@Injectable()
export class DashboardService {
    
    constructor(private httpService:HttpService){
    }
    
    fetchPendingApprovalsForMe(callback:any)
    {
        
        var url = HttpSettings.apiBaseUrl+'v1/approval/by-me';
        this.httpService.get(url)
        .subscribe(
            data => {
               callback(data);
            },
            error => {}// alert(error)
        );
        
    }

    fetchPendingTicketStatusForMe(callback :any){
        var url = HttpSettings.apiBaseUrl+'v1/HelpDesk/get-status-count';
        this.httpService.get(url)
        .subscribe(
            data => {
               callback(data);
            },
            error => {} //alert(error),
        );
    }
}