import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    SpendingRoutingModule
  ]
})
export class SpendingModule { }
