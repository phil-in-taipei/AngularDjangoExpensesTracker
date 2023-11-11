import { Injectable } from '@angular/core';
import {Observable, map} from "rxjs";
import { AppState } from '../../../reducers';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { 
  selectSavingsAccountById 
} from '../savings-accounts/savings-accounts.selectors';
import { 
  SavingsAccountDepositSaved 
} from 'src/app/authenticated-user/finance/savings-accounts/savings-accounts.actions';

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountBalanceService {

  savingsAccount$: Observable<SavingsAccountModel | undefined> = of(undefined);


  constructor(private store: Store<AppState>) { }
  updateAccountBalanceFollowingDeposit(
    id: number, depositAmount: number
    ) {
    let savingsAccount: SavingsAccountModel;
  this.store.pipe(
      select(selectSavingsAccountById(id))).pipe(map(savingsAccount => {
          console.log('this is the savings account')
          console.log(savingsAccount)
          return savingsAccount
        })
      );
    /*
    this.store.pipe(
          select(selectSavingsAccountById(id))).//subscribe(
            subscribe(
              account => {
                  console.log('this is the account', account)
                  if(account !== undefined) {
                    console.log('it is not undefined')
                    console.log(account)
                    savingsAccount = { ...account }
                  }
                }
              
    ).unsubscribe(); */
  
  }
}
