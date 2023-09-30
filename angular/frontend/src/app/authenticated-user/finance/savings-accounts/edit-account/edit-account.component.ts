import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {select, Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { SavingsAccountMessagesCleared } from '../savings-accounts.actions';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { 
  savingsAccountSubmissionErrorMsg, 
  savingsAccountSubmissionSuccessMsg 
} from '../savings-accounts.selectors';
import { selectSavingsAccountById } from '../savings-accounts.selectors';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  accountSubmitErrMsg$: Observable<string | undefined>;
  accountSubmitSuccessMsg$: Observable<string | undefined>;
  idFromRouteData:number;
  savingsAccount$: Observable<SavingsAccountModel | undefined>;

  constructor(private route: ActivatedRoute, 
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new SavingsAccountMessagesCleared());
    this.idFromRouteData = this.route.snapshot.params['id'];
    this.savingsAccount$ = this.store.pipe(select(
      selectSavingsAccountById(this.idFromRouteData)
    ));
    this.accountSubmitErrMsg$ = this.store.pipe(
      select(savingsAccountSubmissionErrorMsg)
    );
    this.accountSubmitSuccessMsg$ = this.store.pipe(
      select(savingsAccountSubmissionSuccessMsg)
    );
  };

  onClearStatusMsgs() {
    this.store.dispatch(new SavingsAccountMessagesCleared());
  }

}
