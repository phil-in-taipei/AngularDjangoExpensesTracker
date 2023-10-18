import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { BanksRequested } from './banks/banks.actions';
import { CurrenciesRequested } from './currencies/currencies.actions';
import { IncomeSourcesRequested } from './income-sources/income-sources.actions';
import { UserProfileRequested } from './user.actions';

@Component({
  selector: 'app-authenticated-user',
  templateUrl: './authenticated-user.component.html',
  styleUrls: ['./authenticated-user.component.css']
})
export class AuthenticatedUserComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    console.log('initializing the authenticated user component now...')
    this.store.dispatch(new BanksRequested());
    this.store.dispatch(new CurrenciesRequested());
    this.store.dispatch(new IncomeSourcesRequested());
    this.store.dispatch(new UserProfileRequested());
  }

}
