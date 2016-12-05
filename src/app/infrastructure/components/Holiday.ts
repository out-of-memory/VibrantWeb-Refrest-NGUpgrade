import {Component,Input} from '@angular/core';
import {HolidayModel} from '../models/HolidayModel';

@Component({
    selector:'holiday-list',
    template:`
                <div>
                    <div *ngFor='let holiday of source'>
                    
                    <h5 *ngIf='holiday.type=="n"'>{{holiday.name}}</h5>
                    <h5 *ngIf='holiday.type=="d"'><i>{{holiday.name}}</i></h5>
                    <h6>{{holiday.date}}</h6>
                    <hr/>
                    </div>
                
                </div>
    
    `
    
})
export class HolidayList{
    
    @Input()
    source:Array<HolidayModel>;
    
    
    
    
}