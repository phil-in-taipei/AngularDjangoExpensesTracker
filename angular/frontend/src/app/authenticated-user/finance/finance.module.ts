import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { SavingsAccountsComponent } from './savings-accounts/savings-accounts.component';
import { SavingsAccountsEffects } from './savings-accounts/savings-accounts.effects';
import { savingsAccountsReducer } from './savings-accounts/savings-accounts.reducers';


@NgModule({
  declarations: [
    FinanceComponent,
    SavingsAccountsComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    StoreModule.forFeature('accounts', savingsAccountsReducer),
    EffectsModule.forFeature([SavingsAccountsEffects]),
  ]
})
export class FinanceModule { }
