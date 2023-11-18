import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { TransactionModel } from 'src/app/models/transaction-model';

@Component({
  selector: 'app-single-deposit',
  templateUrl: './single-deposit.component.html',
  styleUrls: ['./single-deposit.component.css']
})
export class SingleDepositComponent implements OnInit {

  @Input() deposit: TransactionModel;
  @Output() onDeletionConfirmed = new EventEmitter<number>();
  depositAmountString: string = ''
  deletionPopupVisible: boolean = false;
;
  constructor() { }

  ngOnInit(): void {
  }

  formatThousand(value: number) {
    if (!value) return ''
    let strValue = value.toString()
    return strValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  showDeletionPopup() {
    this.deletionPopupVisible = true;
  }

  hideDeletionPopup() {
    this.deletionPopupVisible = false;
  }

  onConfirmDeletion() {
    this.onDeletionConfirmed.emit(+this.deposit.id);
  }
}
