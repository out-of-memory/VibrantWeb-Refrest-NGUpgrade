import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SideNavPanelComponent }  from './components/SideNavPanel';

import {SideNavButtonComponent} from './components/SideNavButton';
import {MenuToggleDirective} from './directives/menu.toggle.directive';
import {ModulePipe} from "./pipes/Pipes";
@NgModule({
  imports:      [ CommonModule,RouterModule ],
  declarations: [ SideNavPanelComponent,ModulePipe,SideNavButtonComponent,MenuToggleDirective],
  exports:      [ SideNavPanelComponent,ModulePipe,SideNavButtonComponent,CommonModule,RouterModule, FormsModule ]
})
export class SideNavPanelModule { }