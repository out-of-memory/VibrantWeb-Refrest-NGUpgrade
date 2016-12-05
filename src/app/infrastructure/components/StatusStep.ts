import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'status-step',
    template: `
    <div class="row m-bottom0">
        <div class="col s12">
            <div class="status-wrapper">
                <span *ngFor="let step of steps" class="status-circle" [class.inprocess-status]="step<approvedTill" [class.approved-status]="step==approvedTill && lastApprovedStatus==0" 
                [class.cancelled-status]="step==approvedTill && lastApprovedStatus==1" [class.onhold-status]="step==approvedTill && lastApprovedStatus==2">
                    <i class="fa"></i>
                </span>
            </div>
            <div class="stage-data">
                {{lastApprovedComment}}
            </div>     
        </div>
    </div>
  `
})
export class StatusStep {
    @Input() totalStep: number;
    @Input() approvedTill: number;
    //lastApprovedStatus 0=Approved, 1=Rejected ,2=Pushedback
    @Input() lastApprovedStatus: number;
    @Input() lastApprovedComment: string;
    steps: any = [];

    ngOnInit() {
        for (var i = 0; i < this.totalStep; i++) {
            this.steps.push(i + 1);
        }
    }
}