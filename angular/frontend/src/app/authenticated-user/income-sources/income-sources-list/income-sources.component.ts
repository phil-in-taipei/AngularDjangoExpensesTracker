import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from "rxjs";
import { AppState } from 'src/app/reducers';

import { IncomeSourceModel } from 'src/app/models/income-source.model';
import { selectAllIncomeSources } from '../income-sources.selectors';
import { IncomeSourceMessagesCleared } from '../income-sources.actions';
import { 
  incomeSourceErrorMsg, incomeSourceSuccessMsg 
} from '../income-sources.selectors';

@Component({
  selector: 'app-income-sources',
  templateUrl: './income-sources.component.html',
  styleUrls: ['./income-sources.component.css']
})
export class IncomeSourcesComponent implements OnInit {

  incomeSources$: Observable<IncomeSourceModel[]>;
  incomeSourceDeleteErrMsg$: Observable<string | undefined>;
  incomeSourceDeleteSuccessMsg$: Observable<string | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.incomeSources$ = this.store.pipe(
      select(selectAllIncomeSources)
    );
    this.incomeSourceDeleteErrMsg$ = this.store.pipe(
      select(incomeSourceErrorMsg)
    );
    this.incomeSourceDeleteSuccessMsg$ = this.store.pipe(
          select(incomeSourceSuccessMsg)
        );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new IncomeSourceMessagesCleared());
  }

}
