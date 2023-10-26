import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { ExpensesComponent } from './expenses/expenses-list/expenses.component';
import { SpendingComponent } from './spending.component';

const routes: Routes = [
  { path: '', component: SpendingComponent, children: [ 
      { path: 'create-expense', component: CreateExpenseComponent },
      { path: 'edit-expense/:id', component: EditExpenseComponent },
      { path: 'expenses', component: ExpensesComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpendingRoutingModule { }
