import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";

import { AppState } from 'src/app/reducers';
import { IncomeSourceMessagesCleared } from '../income-sources.actions';
import { 
  incomeSourceSubmissionErrorMsg, incomeSourceSubmissionSuccessMsg 
} from '../income-sources.selectors';


@Component({
  selector: 'app-create-income-source',
  templateUrl: './create-income-source.component.html',
  styleUrls: ['./create-income-source.component.css']
})
export class CreateIncomeSourceComponent implements OnInit {

  incomeSourceSubmitErrMsg$: Observable<string | undefined>;
  incomeSourceSubmitSuccessMsg$: Observable<string | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new IncomeSourceMessagesCleared());
    this.incomeSourceSubmitErrMsg$ = this.store.pipe(
      select(incomeSourceSubmissionErrorMsg)
    );
    this.incomeSourceSubmitSuccessMsg$ = this.store.pipe(
          select(incomeSourceSubmissionSuccessMsg)
        );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new IncomeSourceMessagesCleared());
  }

}
