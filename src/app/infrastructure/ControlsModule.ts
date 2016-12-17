import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts'
import { DoughnutChart } from './components/DoughnutChart';
import { LineChart } from './components/LineChart';
import { LoaderComponent } from './components/loader.component';
import { FileUpload } from './components/file-upload';
import { Card } from './components/Card';
import { Repeater } from './components/repeater';
import { GridCard } from './components/GridCard';
import { StatusStep } from './components/StatusStep';
import { SearchBox } from './components/search-box';
import { UiInput } from './components/UiInput';
import { UiForm, UiFormControl } from './components/UiForm';
import { UiGirdForm } from './components/UiGridForm';
import { pageHeading } from './components/pageHeading';
import { EditConfirmation } from './components/editConfirmationMsg';
import { Confirmation } from './components/ConfirmationMsg';
import { UiCustomModal } from './components/UiCustomModal';
import { BasicCellC, BasicGrid } from './components/basic-grid';
import * as Materialize from "angular2-materialize";
import { MaterializeDirective } from "angular2-materialize";
//import {NKDatetime} from "ng2-datetime/ng2-datetime";

import { UpdateMaterializeParams, RestrictValueTo } from './directives/materialized.extension.directive';

import { ModulePipe, RatingPipe, TicketStatusPipe, FileExtension, FileNamePipe, ApprovalStatus, ApprovalStatusTitle, CurrencyPipe, OptionTextPipe, LocationPipe, CurrencyCommaPipe, CurrencyNamePipe, CapitalizePipe } from './Pipes/Pipes';
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ChartsModule],
  declarations: [SearchBox, RatingPipe, Confirmation, Repeater, UiGirdForm, EditConfirmation, GridCard, pageHeading, UiInput, MaterializeDirective, UpdateMaterializeParams, RestrictValueTo, Card, OptionTextPipe, ModulePipe, TicketStatusPipe, ApprovalStatus, ApprovalStatusTitle, DoughnutChart, LineChart, LoaderComponent, UiFormControl, UiCustomModal, UiForm, BasicCellC, BasicGrid, LocationPipe, CurrencyCommaPipe, StatusStep, CurrencyNamePipe, CurrencyPipe, FileUpload, FileExtension, FileNamePipe, CapitalizePipe],
  exports: [SearchBox, RatingPipe, Confirmation, Repeater, UiGirdForm, EditConfirmation, GridCard, pageHeading, UiInput, MaterializeDirective, ChartsModule, Card, CommonModule, FormsModule, ModulePipe, OptionTextPipe, TicketStatusPipe, ApprovalStatus, ApprovalStatusTitle, DoughnutChart, LineChart, UiFormControl, UiForm, UiCustomModal, BasicCellC, BasicGrid, LoaderComponent, LocationPipe, CurrencyCommaPipe, StatusStep, CurrencyNamePipe, CurrencyPipe, FileUpload, FileExtension, FileNamePipe, CapitalizePipe]
})
export class ControlsModule { }