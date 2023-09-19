import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { SavingsAccountsComponent } from './savings-accounts/savings-accounts.component';


@NgModule({
  declarations: [
    FinanceComponent,
    SavingsAccountsComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
