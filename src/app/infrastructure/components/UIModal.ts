import {Component,Input} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {MaterializeDirective} from "angular2-materialize/dist/materialize-directive";

@Component({
  selector: 'ui-model',
  template: `
  <select materialize="material_select" [materializeSelectOptions]="selectOptions">
  <option [value]="0">first option</option>
  <option [value]="1">second option</option>
</select>
                <a materialize="leanModal" class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
                <!-- Modal Structure -->
                <div id="modal1" class="modal">
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
                <div class="modal-footer">
                    <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
                </div>
              `,
  directives: [MaterializeDirective]
})
export class UiModal {

}