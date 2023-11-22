import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { TransactionModel } from 'src/app/models/transaction-model';

@Component({
  selector: 'app-single-withdrawal',
  templateUrl: './single-withdrawal.component.html',
  styleUrls: ['./single-withdrawal.component.css']
})
export class SingleWithdrawalComponent implements OnInit {

  @Input() withdrawal: TransactionModel;
  @Output() onDeletionConfirmed = new EventEmitter<number>();
  withdrawalAmountString: string = ''
  deletionPopupVisible: boolean = false;

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
    this.onDeletionConfirmed.emit(+this.withdrawal.id);
  }
}
