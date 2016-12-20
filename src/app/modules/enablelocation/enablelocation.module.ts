import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnablelocationComponent } from './enablelocation.component'


@NgModule({
  imports: [
    [RouterModule.forChild([
      { path: 'enablelocation', component: EnablelocationComponent }
    ])]
  ],
  declarations: [EnablelocationComponent],
  // exports: [RouterModule]
})
export class EnablelocationModule { }
