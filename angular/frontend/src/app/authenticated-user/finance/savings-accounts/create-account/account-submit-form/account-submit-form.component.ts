import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { BankModel } from 'src/app/models/bank.model';
import { CurrencyModel } from 'src/app/models/currency.model';
import { SavingsAccountCreateModel } from 'src/app/models/savings-account.model';
import { SavingsAccountSubmitted } from '../../savings-accounts.actions';
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
    console.log('submit savings account now ...')
    console.log(form.value);
    if (form.invalid) {
      console.log('single recurring submit form is invalid')
      console.log(form.errors);
      return;
    }
    console.log('valid!')
    
  }

}
