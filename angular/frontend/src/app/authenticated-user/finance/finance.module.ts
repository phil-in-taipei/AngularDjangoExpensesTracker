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
import { CreateAccountComponent } from './savings-accounts/create-account/create-account.component';
import { AccountSubmitFormComponent } from './savings-accounts/create-account/account-submit-form/account-submit-form.component';


@NgModule({
  declarations: [
    FinanceComponent,
    SavingsAccountsComponent,
    CreateAccountComponent,
    AccountSubmitFormComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    StoreModule.forFeature('accounts', savingsAccountsReducer),
    EffectsModule.forFeature([SavingsAccountsEffects]),
  ]
})
export class FinanceModule { }
