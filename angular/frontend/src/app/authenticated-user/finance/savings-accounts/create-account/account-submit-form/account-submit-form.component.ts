import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { BankModel } from 'src/app/models/bank.model';
import { CurrencyModel } from 'src/app/models/currency.model';
import { SavingsAccountCreateModel } from 'src/app/models/savings-account.model';
import { 
  SavingsAccountEditCancelled, 
  SavingsAccountSubmitted } from '../../savings-accounts.actions';
import { UserProfileModel } from 'src/app/models/user-profile.model';

@Component({
  selector: 'app-account-submit-form',
  templateUrl: './account-submit-form.component.html',
  styleUrls: ['./account-submit-form.component.css']
})
export class AccountSubmitFormComponent implements OnInit {
  @Input() usrProfile: UserProfileModel;
  @Input() banks: BankModel[];
  @Input() currencies: CurrencyModel[];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmitSavingsAccount(form: NgForm) {
    if (form.invalid) {
      this.store.dispatch(new SavingsAccountEditCancelled({err: {
        error: {
          Error: "The form values were not properly filled in!"
        }
      }} ));
      return;
    }
    const data: SavingsAccountCreateModel = {
      bank: form.value.bank,
      account_name: form.value.account_name,
      currency: form.value.currency,
      account_balance: form.value.account_balance,
      account_owner: this.usrProfile.user
    };
    this.store.dispatch(
      new SavingsAccountSubmitted({ savingsAccount: data })
      );
    form.reset();
  };

}

