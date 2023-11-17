import { Component, OnInit, Input } from '@angular/core';

import { TransactionModel } from 'src/app/models/transaction-model';

@Component({
  selector: 'app-single-deposit',
  templateUrl: './single-deposit.component.html',
  styleUrls: ['./single-deposit.component.css']
})
export class SingleDepositComponent implements OnInit {

  @Input() deposit: TransactionModel;
  depositAmountString: string = ''
;
  constructor() { }

  ngOnInit(): void {
  }

  formatThousand(value: number) {
    if (!value) return ''
    let strValue = value.toString()
    return strValue.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }


}
