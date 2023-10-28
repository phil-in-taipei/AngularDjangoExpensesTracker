import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/reducers';
import { SpendingRecordModel } from 'src/app/models/spending-record.model';
import { SpendingRecordDeletionRequested } from '../../spending-records.actions';

@Component({
  selector: 'app-single-spending-record',
  templateUrl: './single-spending-record.component.html',
  styleUrls: ['./single-spending-record.component.css']
})
export class SingleSpendingRecordComponent implements OnInit {

  @Input() spendingRecord: SpendingRecordModel;

  deletionPopupVisible: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

  }

  showDelPopup() {
    this.deletionPopupVisible = true;
  }

  hideDelPopup() {
    this.deletionPopupVisible = false;
  }

  onRemoveSpendingRecord() {
    const payload = { id: +this.spendingRecord.id };
    this.store.dispatch(
      new SpendingRecordDeletionRequested(payload)
    );
  }

}
