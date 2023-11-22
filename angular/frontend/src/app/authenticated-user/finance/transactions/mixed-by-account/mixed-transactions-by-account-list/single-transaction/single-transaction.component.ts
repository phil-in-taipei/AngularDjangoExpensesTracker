import { Component, Input, OnInit } from '@angular/core';

import { TransactionModel } from 'src/app/models/transaction-model';


@Component({
  selector: 'app-single-transaction',
  templateUrl: './single-transaction.component.html',
  styleUrls: ['./single-transaction.component.css']
})
export class SingleTransactionComponent implements OnInit {

  @Input() transaction: TransactionModel;
  transactionAmountString: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  formatThousand(value: number) {
    if (!value) return ''
    let strValue = value.toString()
    return strValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}
