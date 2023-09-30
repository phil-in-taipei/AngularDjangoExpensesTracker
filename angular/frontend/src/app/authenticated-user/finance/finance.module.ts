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


@NgModule({
  declarations: [
    FinanceComponent,
    SavingsAccountsComponent,
    CreateAccountComponent,
    AccountSubmitFormComponent,
    SingleSavingsAccountComponent,
    EditAccountComponent,
    AccountEditFormComponent
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
