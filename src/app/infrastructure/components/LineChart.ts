import {Component,Input} from '@angular/core';

@Component({
  selector: 'line-bar-chart',
  template: `<canvas baseChart class="chart"
                [datasets]="data"
                [labels]="labels"
                [options]="lineChartOptions"
                [colors]="colors"
                [legend]="lineChartLegend"
                [chartType]=chartType></canvas>
              <div>
                <ng-content></ng-content>
              </div>
              `,
  styles: [`
    .chart {
      display: block;
      width: 100%;
    }
  `]

})
export class LineChart {
  @Input() labels;
  @Input() data;
  @Input() colors;
  @Input() chartType;

  lineChartOptions:any = {
    animation: false,
    responsive: false
  };

  lineChartLegend:boolean = true;
}