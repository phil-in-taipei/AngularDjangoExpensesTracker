import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { CreateSpendingRecordComponent } from './spending-records/create-spending-record/create-spending-record.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { ExpensesComponent } from './expenses/expenses-list/expenses.component';
import { SpendingComponent } from './spending.component';
import { 
  SpendingRecordsComponent 
} from './spending-records/spending-records-list/spending-records.component';

const routes: Routes = [
  { path: '', component: SpendingComponent, children: [ 
      { path: 'create-expense', component: CreateExpenseComponent },
      { path: 'create-spending-record', component: CreateSpendingRecordComponent },
      { path: 'edit-expense/:id', component: EditExpenseComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'spending-records', component: SpendingRecordsComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpendingRoutingModule { }
