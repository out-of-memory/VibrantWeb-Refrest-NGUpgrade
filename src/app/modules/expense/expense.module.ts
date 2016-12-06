import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }        from '@angular/router';
import {ControlsModule} from './../../infrastructure/ControlsModule';

import {ExpenseComponent} from './expense.component';
import {ExpenseSubmittedComponent} from './expense.submitted.component';
import {ExpenseDrafts} from './expense.drafts.component';
import {ExpenseNewComponent} from './expense.new.component';


@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule.forChild([
            { path: 'my/expense', component: ExpenseComponent,
              children: [
                            { path: 'new', component: ExpenseNewComponent },
                            { path: 'submitted', component: ExpenseSubmittedComponent },
                            { path: 'drafts',component: ExpenseDrafts },
                            { path: "new/:expenseId", component: ExpenseNewComponent  }
                        ]
            }
        ])
    
  ],
  declarations: [ExpenseComponent,ExpenseSubmittedComponent,ExpenseDrafts,ExpenseNewComponent],
  exports:[ControlsModule,RouterModule]
})
export class ExpenseModule { }


/*

 {
        path: '/new',
        name: 'Finance_Expense_New',
        component: ExpenseNewComponent,
        useAsDefault: true,
    },
    {
        path: '/submitted',
        name: 'Finance_Expense_Submitted',
        component: ExpenseSubmittedComponent
    },
    {
        path: "/drafts",
        name: "Finance_Expense_Drafts",
        component: ExpenseDrafts
    },
    {
        path: "/new/:expenseId",
        name: "Finance_Expense_New_Id",
        component: ExpenseNewComponent
    }


*/