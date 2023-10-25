import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ExpensesEffects } from './expenses/expenses.effects';
import { expensesReducer } from './expenses/expenses.reducers';
import { SpendingRecordsEffects } from './spending-records/spending-records.effects';
import { spendingRecordsReducer } from './spending-records/spending-records.reducers';
import { SpendingRoutingModule } from './spending-routing.module';
import { SpendingComponent } from './spending.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SpendingRecordsComponent } from './spending-records/spending-records.component';


@NgModule({
  declarations: [
    SpendingComponent,
    ExpensesComponent,
    SpendingRecordsComponent
  ],
  imports: [
    CommonModule,
    SpendingRoutingModule,
    StoreModule.forFeature('expenses', expensesReducer),
    EffectsModule.forFeature([ExpensesEffects]),
    StoreModule.forFeature('spending', spendingRecordsReducer),
    EffectsModule.forFeature([SpendingRecordsEffects]),
  ]
})
export class SpendingModule { }
