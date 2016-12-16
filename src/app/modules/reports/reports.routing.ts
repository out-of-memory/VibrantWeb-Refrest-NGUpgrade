import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ViewReportsComponent } from './viewreports.component';
import { ReportsListComponent } from './reportslist.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'employee/reports', redirectTo: 'view', pathMatch: 'full' },
    {
      path: 'employee/reports', component: ReportsComponent,
      children: [
        { path: 'view', component: ReportsListComponent },
        { path: 'view/:id', component: ViewReportsComponent }
      ]
    }
  ])],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
