import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";
import { AppState } from 'src/app/reducers';
import { 
  savingsAccountSubmissionErrorMsg, 
  savingsAccountSubmissionSuccessMsg 
} from '../savings-accounts.selectors';
import { selectAllBanks } from 'src/app/authenticated-user/banks/banks.selectors';
import { selectAllCurrencies } from 'src/app/authenticated-user/currencies/currencies.selectors';
import { BankModel } from 'src/app/models/bank.model';
import { CurrencyModel } from 'src/app/models/currency.model';
import { SavingsAccountMessagesCleared } from '../savings-accounts.actions';
import { selectUserProfile } from 'src/app/authenticated-user/user.selectors';
import { UserProfileModel } from 'src/app/models/user-profile.model';




@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  accountSubmitErrMsg$: Observable<string | undefined>;
  accountSubmitSuccessMsg$: Observable<string | undefined>;
  banks$: Observable<BankModel[]>;
  currencies$: Observable<CurrencyModel[]>;
  usrProfile$: Observable<UserProfileModel | undefined>;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new SavingsAccountMessagesCleared());
  }

  onClearStatusMsgs() {
    this.store.dispatch(new SavingsAccountMessagesCleared());
  }

}
