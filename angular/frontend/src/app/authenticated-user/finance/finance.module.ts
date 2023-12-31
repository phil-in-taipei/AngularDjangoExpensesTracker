import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import {
  IncomeSourceTemplateStringComponent
} from '../income-sources/income-source-template-string/income-source-template-string.component';
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
import { NewlyCreatedDepositComponent } from './transactions/deposits/create-deposit/deposit-submit-form/newly-created-deposit/newly-created-deposit.component';
import { CreateDepositNewBalanceComponent } from './transactions/deposits/create-deposit/deposit-submit-form/newly-created-deposit/create-deposit-new-balance/create-deposit-new-balance.component';
import { SavingsAccountTemplateStringComponent } from './savings-accounts/savings-account-template-string/savings-account-template-string.component';
import { SingleDepositComponent } from './transactions/deposits/deposits-list/single-deposit/single-deposit.component';
import { NewlyDeletedDepositComponent } from './transactions/deposits/deposits-list/newly-deleted-deposit/newly-deleted-deposit.component';
import {
  DeleteDepositNewBalanceComponent
}  from './transactions/deposits/deposits-list/newly-deleted-deposit/delete-deposit-new-balance/delete-deposit-new-balance.component';
import { WithdrawalSubmitFormComponent } from './transactions/withdrawals/create-withdrawal/withdrawal-submit-form/withdrawal-submit-form.component';
import { NewlyCreatedWithdrawalComponent } from './transactions/withdrawals/create-withdrawal/withdrawal-submit-form/newly-created-withdrawal/newly-created-withdrawal.component';
import { CreateWithdrawalNewBalanceComponent } from './transactions/withdrawals/create-withdrawal/withdrawal-submit-form/newly-created-withdrawal/create-withdrawal-new-balance/create-withdrawal-new-balance.component';
import { SingleWithdrawalComponent } from './transactions/withdrawals/withdrawals-list/single-withdrawal/single-withdrawal.component';
import { NewlyDeletedWithdrawalComponent } from './transactions/withdrawals/withdrawals-list/newly-deleted-withdrawal/newly-deleted-withdrawal.component';
import { DeleteWithdrawalNewBalanceComponent } from './transactions/withdrawals/withdrawals-list/newly-deleted-withdrawal/delete-withdrawal-new-balance/delete-withdrawal-new-balance.component';
import { SingleTransactionComponent } from './transactions/mixed-by-account/mixed-transactions-by-account-list/single-transaction/single-transaction.component';
import { MixedByAccountComponent } from './transactions/mixed-by-account/mixed-by-account.component';

@NgModule({
  declarations: [
    IncomeSourceTemplateStringComponent,
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
    NewlyCreatedDepositComponent,
    CreateDepositNewBalanceComponent,
    SavingsAccountTemplateStringComponent,
    SingleDepositComponent,
    NewlyDeletedDepositComponent,
    DeleteDepositNewBalanceComponent,
    WithdrawalSubmitFormComponent,
    NewlyCreatedWithdrawalComponent,
    CreateWithdrawalNewBalanceComponent,
    SingleWithdrawalComponent,
    NewlyDeletedWithdrawalComponent,
    DeleteWithdrawalNewBalanceComponent,
    SingleTransactionComponent,
    MixedByAccountComponent
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    FormsModule,
    NgbModule,
    StoreModule.forFeature('accounts', savingsAccountsReducer),
    EffectsModule.forFeature([SavingsAccountsEffects]),
  ]
})
export class FinanceModule { }
