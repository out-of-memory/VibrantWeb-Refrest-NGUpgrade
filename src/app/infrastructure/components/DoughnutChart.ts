import {Component,Input} from '@angular/core';

@Component({
  selector: 'doughnut-chart',
  template: `<canvas baseChart class="chart"
                [data]="data"
                [labels]="labels"
                [colors]="colors"
                chartType="doughnut">
              </canvas>
              <div>
                <ng-content></ng-content>
              </div>
              `,
  styles: [`
    .chart {
      display: block;
      width: 100%;
    }
  `],

})
export class DoughnutChart {
  @Input() labels;
  @Input() data;
  @Input() colors;
}