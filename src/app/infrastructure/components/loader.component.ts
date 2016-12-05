import {Component, Input} from '@angular/core';
@Component({
    selector: 'loader-component',
    template: `
        <div *ngIf="loading==true">
          <div [class.loading-wrapper]="cardLoading=='isPage'" [class.card-overlay]="cardLoading=='isCard'">
            <div *ngIf="isConformationModal==false" [class.overlay-content]="cardLoading=='isCard'">
              <div class="clear-loading loading-effect-1" *ngIf="showMsg!=true">
			          <span></span>
			          <span></span>
			          <span></span>
		          </div>
              <div *ngIf="showMsg==true">
                <h3 *ngIf="cardLoading=='isPage'" style="color: white;">{{callBackMsg}}</h3>
                <h5 *ngIf="cardLoading=='isCard'" style="color: white;">{{callBackMsg}}</h5>
              </div>
            </div>
            <div *ngIf="isConformationModal==true" [class.overlay-content]="cardLoading=='isCard'">
              <ng-content></ng-content>
            </div>		        
	        </div>
        </div>
        
    `,
    styles: [`
        .loading-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
      z-index: 9999;

}
/* Clear Loading */
.clear-loading {
  text-align: center;
  margin: 0 20px;
  position: relative;
  display: inline-block;
}
/* Loading Effect One */
.loading-effect-1 {
  width: 60px;
  height: 60px;
}
.loading-effect-1 span {
  display: block;
  -webit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
  border: 4px solid #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.loading-effect-1 span:first-child {
  width: 100%;
  height: 100%;
  border-color: #2d81af;
  border-left-color: transparent;
  top: 0;
  left: 0;
  -webkit-animation: effect-1-1 4s infinite linear;
  -moz-animation: effect-1-1 4s infinite linear;
  -ms-animation: effect-1-1 4s infinite linear;
  -o-animation: effect-1-1 4s infinite linear;
  animation: effect-1-1 4s infinite linear;
}
.loading-effect-1 span:nth-child(2) {
  width: 65%;
height: 65%;
border-color: #f15a24;
border-right-color: transparent;
top: 17.5%;
left: 17.5%;
  -webkit-animation: effect-1-2 3s infinite linear;
  -moz-animation: effect-1-2 3s infinite linear;
  -ms-animation: effect-1-2 3s infinite linear;
  -o-animation: effect-1-2 3s infinite linear;
  animation: effect-1-2 3s infinite linear;
}
.loading-effect-1 span:last-child {
  width: 30%;
    height: 30%;
    border-color: #888489;
    border-bottom-color: transparent;
    top: 35%;
    left: 35%;
  -webkit-animation: effect-1-1 4s infinite linear;
  -moz-animation: effect-1-1 4s infinite linear;
  -ms-animation: effect-1-1 4s infinite linear;
  -o-animation: effect-1-1 4s infinite linear;
  animation: effect-1-1 4s infinite linear;
}
@-webkit-keyframes effect-1-1 {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes effect-1-1 {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes effect-1-2 {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
@keyframes effect-1-2 {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-360deg);
    -moz-transform: rotate(-360deg);
    -ms-transform: rotate(-360deg);
    -o-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

   `],
})
export class LoaderComponent {
    @Input() loading: any;
    @Input() showMsg: any;
    @Input() callBackMsg: any;
    @Input() cardLoading: any;
    @Input() isConformationModal:any;
}