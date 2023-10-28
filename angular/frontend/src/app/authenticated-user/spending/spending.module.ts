import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';

import { ExpensesEffects } from './expenses/expenses.effects';
import { expensesReducer } from './expenses/expenses.reducers';
import { SpendingRecordsEffects } from './spending-records/spending-records.effects';
import { spendingRecordsReducer } from './spending-records/spending-records.reducers';
import { SpendingRoutingModule } from './spending-routing.module';
import { SpendingComponent } from './spending.component';
import { ExpensesComponent } from './expenses/expenses-list/expenses.component';
import { SpendingRecordsComponent } from './spending-records/spending-records-list/spending-records.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { ExpenseSubmitFormComponent } from './expenses/create-expense/expense-submit-form/expense-submit-form.component';
import { ExpenseEditFormComponent } from './expenses/edit-expense/expense-edit-form/expense-edit-form.component';
import { SingleExpenseComponent } from './expenses/expenses-list/single-expense/single-expense.component';
import { SingleSpendingRecordComponent } from './spending-records/spending-records-list/single-spending-record/single-spending-record.component';
import { CreateSpendingRecordComponent } from './spending-records/create-spending-record/create-spending-record.component';
import { SpendingRecordSubmitFormComponent } from './spending-records/create-spending-record/spending-record-submit-form/spending-record-submit-form.component';
import { EditSpendingRecordComponent } from './spending-records/edit-spending-record/edit-spending-record.component';
import { EditSpendingRecordFormComponent } from './spending-records/edit-spending-record/edit-spending-record-form/edit-spending-record-form.component';
import { SelectMonthlySpendingRecordsComponent } from './spending-records/spending-records-list/select-monthly-spending-records/select-monthly-spending-records.component';
import { ReselectMonthlySpendingRecordsComponent } from './spending-records/spending-records-list/reselect-monthly-spending-records/reselect-monthly-spending-records.component';


@NgModule({
  declarations: [
    SpendingComponent,
    ExpensesComponent,
    SpendingRecordsComponent,
    CreateExpenseComponent,
    EditExpenseComponent,
    ExpenseSubmitFormComponent,
    ExpenseEditFormComponent,
    SingleExpenseComponent,
    SingleSpendingRecordComponent,
    CreateSpendingRecordComponent,
    SpendingRecordSubmitFormComponent,
    EditSpendingRecordComponent,
    EditSpendingRecordFormComponent,
    SelectMonthlySpendingRecordsComponent,
    ReselectMonthlySpendingRecordsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SpendingRoutingModule,
    StoreModule.forFeature('expenses', expensesReducer),
    EffectsModule.forFeature([ExpensesEffects]),
    StoreModule.forFeature('spending', spendingRecordsReducer),
    EffectsModule.forFeature([SpendingRecordsEffects]),
  ]
})
export class SpendingModule { }
