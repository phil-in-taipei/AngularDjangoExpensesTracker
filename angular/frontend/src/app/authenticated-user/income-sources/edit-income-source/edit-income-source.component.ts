import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {select, Store } from '@ngrx/store';
import { Observable } from "rxjs";

import { AppState } from 'src/app/reducers';
import { IncomeSourceMessagesCleared } from '../income-sources.actions';
import { IncomeSourceModel } from 'src/app/models/income-source.model';
import { 
  incomeSourceErrorMsg, incomeSourceSuccessMsg,
  selectIncomeSourcesById 
} from '../income-sources.selectors';

@Component({
  selector: 'app-edit-income-source',
  templateUrl: './edit-income-source.component.html',
  styleUrls: ['./edit-income-source.component.css']
})
export class EditIncomeSourceComponent implements OnInit {

  incomeSourceSubmitErrMsg$: Observable<string | undefined>;
  incomeSourceSubmitSuccessMsg$: Observable<string | undefined>;
  idFromRouteData:number;
  incomeSource$: Observable<IncomeSourceModel | undefined>;

  constructor(
    private store: Store<AppState>, 
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.store.dispatch(new IncomeSourceMessagesCleared());
    this.idFromRouteData = this.route.snapshot.params['id'];
    this.incomeSource$ = this.store.pipe(select(
      selectIncomeSourcesById(this.idFromRouteData)
    ));
    this.incomeSourceSubmitErrMsg$ = this.store.pipe(
      select(incomeSourceErrorMsg)
    );
    this.incomeSourceSubmitSuccessMsg$ = this.store.pipe(
          select(incomeSourceSuccessMsg)
        );
  }

  onClearStatusMsgs() {
    this.store.dispatch(new IncomeSourceMessagesCleared());
  }

}
