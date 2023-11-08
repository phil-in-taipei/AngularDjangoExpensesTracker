import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './finance.component';
import { SavingsAccountsComponent } from './savings-accounts/savings-accounts-list/savings-accounts.component';
import { SavingsAccountsEffects } from './savings-accounts/savings-accounts.effects';
import { savingsAccountsReducer } from './savings-accounts/savings-accounts.reducers';
import { CreateAccountComponent } from './savings-accounts/create-account/create-account.component';
import { AccountSubmitFormComponent } from './savings-accounts/create-account/account-submit-form/account-submit-form.component';
import { SingleSavingsAccountComponent } from './savings-accounts/savings-accounts-list/single-savings-account/single-savings-account.component';
import { EditAccountComponent } from './savings-accounts/edit-account/edit-account.component';
import { AccountEditFormComponent } from './savings-accounts/edit-account/account-edit-form/account-edit-form.component';
import { DepositsListComponent } from './transactions/deposits/deposits-list/deposits-list.component';
import { CreateDepositComponent } from './transactions/deposits/create-deposit/create-deposit.component';
import { WithdrawalsListComponent } from './transactions/withdrawals/withdrawals-list/withdrawals-list.component';
import { CreateWithdrawalComponent } from './transactions/withdrawals/create-withdrawal/create-withdrawal.component';
import { MixedTransactionsByAccountListComponent } from './transactions/mixed-by-account/mixed-transactions-by-account-list/mixed-transactions-by-account-list.component';
import { DepositSubmitFormComponent } from './transactions/deposits/create-deposit/deposit-submit-form/deposit-submit-form.component';
import { NewlyCreatedDepositComponent } from './transactions/deposits/create-deposit/newly-created-deposit/newly-created-deposit.component';


@NgModule({
  declarations: [
    FinanceComponent,
    SavingsAccountsComponent,
    CreateAccountComponent,
    AccountSubmitFormComponent,
    SingleSavingsAccountComponent,
    EditAccountComponent,
    AccountEditFormComponent,
    DepositsListComponent,
    CreateDepositComponent,
    WithdrawalsListComponent,
    CreateWithdrawalComponent,
    MixedTransactionsByAccountListComponent,
    DepositSubmitFormComponent,
    NewlyCreatedDepositComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    FormsModule,
    StoreModule.forFeature('accounts', savingsAccountsReducer),
    EffectsModule.forFeature([SavingsAccountsEffects]),
  ]
})
export class FinanceModule { }
